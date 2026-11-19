import process from 'node:process';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export interface StoredSubmission {
  id: string;
  worksheetId: 1 | 2 | 3 | 4;
  group: {
    groupName: string;
    className: string;
    members: string;
  };
  answers: Record<string, unknown>;
  autoScore: number;
  teacherScore?: number;
  teacherComment?: string;
  timeSpentSeconds: number;
  submittedAt: string;
}

// On Vercel / AWS Lambda, only /tmp directory is writeable
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_FILE = isVercel
  ? path.resolve('/tmp', 'submissions_store.json')
  : path.resolve(process.cwd(), 'submissions_store.json');

// In-memory cache fallback
let memorySubmissions: StoredSubmission[] | null = null;

function loadSubmissions(): StoredSubmission[] {
  if (memorySubmissions !== null) {
    return memorySubmissions;
  }
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const realOnly = parsed.filter(
          (item: StoredSubmission) => item && typeof item.id === 'string' && !item.id.startsWith('seed-')
        );
        memorySubmissions = realOnly;
        return realOnly;
      }
    }
  } catch (e) {
    console.error('Failed to read submissions storage:', e);
  }
  memorySubmissions = [];
  return memorySubmissions;
}

function saveSubmissions(list: StoredSubmission[]): void {
  memorySubmissions = list;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to write submissions storage (operating in-memory):', e);
  }
}

export function createApiApp() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  const router = express.Router();

  // GET all real group submissions
  router.get('/submissions', (_req: Request, res: Response) => {
    const submissions = loadSubmissions();
    res.json({ submissions });
  });

  // POST create or update a real group submission for a worksheet
  router.post('/submissions', (req: Request, res: Response) => {
    const { worksheetId, group, answers, autoScore, timeSpentSeconds } = req.body;
    if (!worksheetId || !group || !group.groupName) {
      res.status(400).json({ error: 'Thiếu thông tin nhóm hoặc số phiếu học tập.' });
      return;
    }

    const submissions = loadSubmissions();
    const normalizedGroup = group.groupName.trim().toLowerCase();
    const normalizedClass = (group.className || '').trim().toLowerCase();

    const existingIdx = submissions.findIndex(
      (s) =>
        s.worksheetId === Number(worksheetId) &&
        s.group.groupName.trim().toLowerCase() === normalizedGroup &&
        s.group.className.trim().toLowerCase() === normalizedClass
    );

    const record: StoredSubmission = {
      id: existingIdx >= 0 ? submissions[existingIdx].id : `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      worksheetId: Number(worksheetId) as 1 | 2 | 3 | 4,
      group: {
        groupName: group.groupName.trim(),
        className: (group.className || '7A1').trim(),
        members: (group.members || '').trim(),
      },
      answers,
      autoScore: typeof autoScore === 'number' ? autoScore : 0,
      teacherScore: existingIdx >= 0 ? submissions[existingIdx].teacherScore : undefined,
      teacherComment: existingIdx >= 0 ? submissions[existingIdx].teacherComment : undefined,
      timeSpentSeconds: typeof timeSpentSeconds === 'number' ? timeSpentSeconds : 0,
      submittedAt: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      submissions[existingIdx] = record;
    } else {
      submissions.unshift(record);
    }

    saveSubmissions(submissions);
    res.json({ submission: record, submissions });
  });

  // PATCH teacher score and comment on a group submission
  router.patch('/submissions/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { teacherScore, teacherComment } = req.body;
    const submissions = loadSubmissions();
    const idx = submissions.findIndex((s) => s.id === id);
    if (idx < 0) {
      res.status(404).json({ error: 'Không tìm thấy bài nộp của nhóm.' });
      return;
    }
    if (typeof teacherScore === 'number') {
      submissions[idx].teacherScore = Math.max(0, Math.min(100, teacherScore));
    }
    if (typeof teacherComment === 'string') {
      submissions[idx].teacherComment = teacherComment;
    }
    saveSubmissions(submissions);
    res.json({ submission: submissions[idx], submissions });
  });

  // DELETE a single submission
  router.delete('/submissions/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let submissions = loadSubmissions();
    submissions = submissions.filter((s) => s.id !== id);
    saveSubmissions(submissions);
    res.json({ submissions });
  });

  // POST clear all submissions
  router.post('/submissions/clear', (_req: Request, res: Response) => {
    saveSubmissions([]);
    res.json({ submissions: [] });
  });

  // Mount router under both '/api' and '/' to safely handle Vercel path rewrites
  app.use('/api', router);
  app.use('/', router);

  return app;
}

const app = createApiApp();
export default app;
