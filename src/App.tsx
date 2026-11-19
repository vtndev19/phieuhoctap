/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  Send,
  X,
  ArrowLeft,
} from 'lucide-react';
import {
  WORKSHEETS_META,
  WorksheetId,
  WorksheetMeta,
  GroupProfile,
  WorksheetSubmission,
  Worksheet1Answers,
  Worksheet2Answers,
  Worksheet3Answers,
  Worksheet4Answers,
  DEFAULT_W1_ANSWERS,
  DEFAULT_W2_ANSWERS,
  DEFAULT_W3_ANSWERS,
  DEFAULT_W4_ANSWERS,
  calculateWorksheetScore,
} from './data/worksheetsData';
import { GroupInfoModal } from './components/GroupInfoModal';
import { WorksheetHeaderBanner } from './components/WorksheetHeaderBanner';
import { Worksheet1View } from './components/worksheets/Worksheet1View';
import { Worksheet2View } from './components/worksheets/Worksheet2View';
import { Worksheet3View } from './components/worksheets/Worksheet3View';
import { Worksheet4View } from './components/worksheets/Worksheet4View';
import { TeacherDashboard } from './components/TeacherDashboard';

type ActiveTab = 'home' | 'worksheet' | 'teacher';

const STORAGE_GROUP_KEY = 'tinhoc7_bai1_group_profile_v1';
const STORAGE_ANSWERS_KEY = 'tinhoc7_bai1_answers_v1';
const STORAGE_SUBMISSIONS_KEY = 'tinhoc7_bai1_real_submissions_v2';

function loadLocalSubmissions(): WorksheetSubmission[] {
  try {
    // Also clean up old v1 mock storage key if present
    localStorage.removeItem('tinhoc7_bai1_all_submissions_v1');
    const raw = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item: WorksheetSubmission) => item && typeof item.id === 'string' && !item.id.startsWith('seed-')
        );
      }
    }
  } catch {
    // ignore
  }
  return [];
}

function saveLocalSubmissions(list: WorksheetSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function isJsonResponse(res: Response): boolean {
  const ct = res.headers.get('content-type') || '';
  return res.ok && ct.includes('application/json');
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeWorksheetId, setActiveWorksheetId] = useState<WorksheetId>(1);

  // Active student group profile
  const [group, setGroup] = useState<GroupProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GROUP_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { groupName: '', className: '7A1', members: '' };
  });

  // Group Modal state (shown whenever student clicks a worksheet card 1..4)
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [pendingWorksheet, setPendingWorksheet] = useState<WorksheetMeta | null>(null);

  // Answers state for all 4 worksheets
  const [w1Answers, setW1Answers] = useState<Worksheet1Answers>(DEFAULT_W1_ANSWERS);
  const [w2Answers, setW2Answers] = useState<Worksheet2Answers>(DEFAULT_W2_ANSWERS);
  const [w3Answers, setW3Answers] = useState<Worksheet3Answers>(DEFAULT_W3_ANSWERS);
  const [w4Answers, setW4Answers] = useState<Worksheet4Answers>(DEFAULT_W4_ANSWERS);

  // Countdown timer per worksheet (in seconds)
  const [timers, setTimers] = useState<Record<WorksheetId, number>>({
    1: 15 * 60,
    2: 20 * 60,
    3: 10 * 60,
    4: 15 * 60,
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Teacher / answer key visibility inside worksheet view
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  // Submitted status & scores per worksheet for current group
  const [submittedScores, setSubmittedScores] = useState<Partial<Record<WorksheetId, number>>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Teacher password modal state (password: admin123)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // All group submissions synced with localStorage and optional Express server
  const [allSubmissions, setAllSubmissions] = useState<WorksheetSubmission[]>(loadLocalSubmissions);

  const updateAllSubmissions = useCallback((nextList: WorksheetSubmission[]) => {
    setAllSubmissions(nextList);
    saveLocalSubmissions(nextList);
  }, []);

  // Load saved local answers on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ANSWERS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.w1) setW1Answers(parsed.w1);
        if (parsed.w2) setW2Answers(parsed.w2);
        if (parsed.w3) setW3Answers(parsed.w3);
        if (parsed.w4) setW4Answers(parsed.w4);
        if (parsed.scores) setSubmittedScores(parsed.scores);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist local answers
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_ANSWERS_KEY,
        JSON.stringify({
          w1: w1Answers,
          w2: w2Answers,
          w3: w3Answers,
          w4: w4Answers,
          scores: submittedScores,
        })
      );
    } catch {
      // ignore
    }
  }, [w1Answers, w2Answers, w3Answers, w4Answers, submittedScores]);

  // Fetch all submissions from Express backend if available, falling back to localStorage
  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch('/api/submissions');
      if (isJsonResponse(res)) {
        const data = await res.json();
        if (Array.isArray(data.submissions)) {
          const realOnly = data.submissions.filter(
            (item: WorksheetSubmission) => item && typeof item.id === 'string' && !item.id.startsWith('seed-')
          );
          updateAllSubmissions(realOnly);
          return;
        }
      }
    } catch {
      // Fall back to localStorage silently
    }
    setAllSubmissions(loadLocalSubmissions());
  }, [updateAllSubmissions]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Countdown Timer interval
  useEffect(() => {
    if (!isTimerRunning || activeTab !== 'worksheet') return;
    const interval = setInterval(() => {
      setTimers((prev) => {
        const current = prev[activeWorksheetId];
        if (current <= 1) {
          setIsTimerRunning(false);
          return { ...prev, [activeWorksheetId]: 0 };
        }
        return { ...prev, [activeWorksheetId]: current - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, activeTab, activeWorksheetId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // When student clicks one of the 4 Worksheet Cards on the Home screen -> open GroupInfoModal
  const handleSelectWorksheetCard = (meta: WorksheetMeta) => {
    setPendingWorksheet(meta);
    setIsGroupModalOpen(true);
  };

  const handleConfirmGroupModal = (newGroup: GroupProfile, targetWorksheetId?: WorksheetId) => {
    setGroup(newGroup);
    try {
      localStorage.setItem(STORAGE_GROUP_KEY, JSON.stringify(newGroup));
    } catch {
      // ignore
    }
    setIsGroupModalOpen(false);

    if (targetWorksheetId) {
      setActiveWorksheetId(targetWorksheetId);
      setActiveTab('worksheet');
      setIsTimerRunning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getAnswersForWorksheet = (id: WorksheetId) => {
    if (id === 1) return w1Answers;
    if (id === 2) return w2Answers;
    if (id === 3) return w3Answers;
    return w4Answers;
  };

  const handleSubmitCurrentWorksheet = async () => {
    if (!group.groupName.trim()) {
      const currentMeta = WORKSHEETS_META.find((m) => m.id === activeWorksheetId)!;
      setPendingWorksheet(currentMeta);
      setIsGroupModalOpen(true);
      return;
    }

    const currentMeta = WORKSHEETS_META.find((m) => m.id === activeWorksheetId)!;
    const answers = getAnswersForWorksheet(activeWorksheetId);
    const autoScore = calculateWorksheetScore(activeWorksheetId, answers);
    const totalSeconds = currentMeta.durationMinutes * 60;
    const timeSpentSeconds = Math.max(10, totalSeconds - timers[activeWorksheetId]);

    setSubmittedScores((prev) => ({
      ...prev,
      [activeWorksheetId]: autoScore,
    }));
    setIsTimerRunning(false);

    // Optimistically update local submissions store first
    const normalizedGroup = group.groupName.trim().toLowerCase();
    const normalizedClass = (group.className || '7A1').trim().toLowerCase();
    const currentList = [...allSubmissions];
    const existingIdx = currentList.findIndex(
      (s) =>
        s.worksheetId === activeWorksheetId &&
        s.group.groupName.trim().toLowerCase() === normalizedGroup &&
        s.group.className.trim().toLowerCase() === normalizedClass
    );

    const newRecord: WorksheetSubmission = {
      id:
        existingIdx >= 0
          ? currentList[existingIdx].id
          : `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      worksheetId: activeWorksheetId,
      group: {
        groupName: group.groupName.trim(),
        className: (group.className || '7A1').trim(),
        members: (group.members || '').trim(),
      },
      answers,
      autoScore,
      teacherScore: existingIdx >= 0 ? currentList[existingIdx].teacherScore : undefined,
      teacherComment: existingIdx >= 0 ? currentList[existingIdx].teacherComment : undefined,
      timeSpentSeconds,
      submittedAt: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      currentList[existingIdx] = newRecord;
    } else {
      currentList.unshift(newRecord);
    }
    updateAllSubmissions(currentList);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worksheetId: activeWorksheetId,
          group,
          answers,
          autoScore,
          timeSpentSeconds,
        }),
      });
      if (isJsonResponse(res)) {
        const data = await res.json();
        if (Array.isArray(data.submissions)) {
          updateAllSubmissions(data.submissions);
        }
      }
    } catch {
      // Local update already succeeded
    }

    showToast(
      `Đã nộp Phiếu học tập ${currentMeta.numberLabel} của ${group.groupName} (${group.className}) — Điểm chấm: ${autoScore}/100!`
    );
  };

  const handleUpdateTeacherGrade = async (
    id: string,
    teacherScore: number,
    teacherComment: string
  ) => {
    const clamped = Math.max(0, Math.min(100, teacherScore));
    const nextList = allSubmissions.map((s) =>
      s.id === id ? { ...s, teacherScore: clamped, teacherComment } : s
    );
    updateAllSubmissions(nextList);

    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherScore: clamped, teacherComment }),
      });
      if (isJsonResponse(res)) {
        const data = await res.json();
        if (Array.isArray(data.submissions)) {
          updateAllSubmissions(data.submissions);
        }
      }
    } catch {
      // Local update already succeeded
    }
    showToast('Đã lưu điểm và nhận xét của Giáo viên!');
  };

  const handleDeleteSubmission = async (id: string) => {
    const nextList = allSubmissions.filter((s) => s.id !== id);
    updateAllSubmissions(nextList);

    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      if (isJsonResponse(res)) {
        const data = await res.json();
        if (Array.isArray(data.submissions)) {
          updateAllSubmissions(data.submissions);
        }
      }
    } catch {
      // Local update already succeeded
    }
    showToast('Đã xóa bài nộp của nhóm.');
  };

  const handleClearAllSubmissions = async () => {
    updateAllSubmissions([]);

    try {
      const res = await fetch('/api/submissions/clear', { method: 'POST' });
      if (isJsonResponse(res)) {
        const data = await res.json();
        if (Array.isArray(data.submissions)) {
          updateAllSubmissions(data.submissions);
        }
      }
    } catch {
      // Local clear already succeeded
    }
    showToast('Đã xóa toàn bộ danh sách bài nộp.');
  };

  const currentWorksheetMeta = WORKSHEETS_META.find((m) => m.id === activeWorksheetId)!;

  const handleOpenTeacherLogin = () => {
    setTeacherPassword('');
    setPasswordError('');
    setIsPasswordModalOpen(true);
  };

  const handleTeacherLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherPassword.trim() === 'admin123') {
      setIsPasswordModalOpen(false);
      setTeacherPassword('');
      setPasswordError('');
      fetchSubmissions();
      setActiveTab('teacher');
    } else {
      setPasswordError('Mật khẩu không chính xác. Vui lòng nhập đúng mật khẩu Giáo viên.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-5 right-5 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* VIEW 1: MAIN INTERFACE - ONLY 4 WORKSHEETS + 1 TEACHER PAGE BUTTON */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleOpenTeacherLogin}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2B5B84] hover:bg-[#1E4466] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Trang Giáo viên</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKSHEETS_META.map((meta) => {
                const isDone = typeof submittedScores[meta.id] === 'number';
                const score = submittedScores[meta.id];
                const groupSubmissionsCount = allSubmissions.filter(
                  (s) => s.worksheetId === meta.id
                ).length;

                return (
                  <div
                    key={meta.id}
                    onClick={() => handleSelectWorksheetCard(meta)}
                    className="group bg-white rounded-xl border border-slate-200 hover:border-[#2B5B84] shadow-2xs hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Textbook PDF Banner Header inside each of the 4 cards */}
                      <div className="grid grid-cols-12 border-b border-slate-200">
                        <div className="col-span-4 bg-[#31628C] group-hover:bg-[#244D70] transition-colors text-white py-3.5 px-3 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-sky-100">
                            PHIẾU HỌC TẬP
                          </span>
                          <span className="text-2xl font-extrabold mt-0.5 tracking-tight">
                            {meta.numberLabel}
                          </span>
                        </div>
                        <div className="col-span-8 bg-[#D9E6F2] text-[#1D436B] py-3.5 px-4 flex flex-col justify-center">
                          <h3 className="text-base font-bold leading-snug">{meta.title}</h3>
                          <p className="text-xs italic text-slate-600 mt-0.5 font-mono-tabular">
                            {meta.activityCode} • {meta.durationMinutes} phút
                          </p>
                        </div>
                      </div>

                      {/* Card Body with Original PDF Thumbnail & Details */}
                      <div className="p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-5 bg-slate-50 rounded-lg border border-slate-200/80 p-2.5 flex items-center justify-center h-32">
                          <img
                            src={meta.thumbnailImg}
                            alt={`Hình minh họa Phiếu học tập ${meta.numberLabel}`}
                            referrerPolicy="no-referrer"
                            className="max-h-28 w-auto object-contain rounded"
                          />
                        </div>
                        <div className="sm:col-span-7 space-y-2.5">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {meta.shortDesc}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono-tabular">
                            <span>{meta.questionCount} câu hỏi</span>
                            <span aria-hidden="true">·</span>
                            <span>{meta.pageLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{groupSubmissionsCount} nhóm đã nộp</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="text-xs font-medium">
                        {isDone ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Đã hoàn thành · {score}/100 điểm</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Thời lượng: {meta.durationMinutes} phút</span>
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2B5B84] group-hover:bg-[#1E4466] rounded-lg transition-colors whitespace-nowrap shrink-0">
                        <span>Chọn Phiếu {meta.numberLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: INDIVIDUAL INTERACTIVE WORKSHEET (PHIẾU 1, 2, 3, 4) */}
        {activeTab === 'worksheet' && (
          <div className="space-y-6">
            <div className="print-sheet bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-6">
              <WorksheetHeaderBanner
                meta={currentWorksheetMeta}
                group={group}
                remainingSeconds={timers[activeWorksheetId]}
                isTimerRunning={isTimerRunning}
                showAnswerKey={showAnswerKey}
                isSubmitted={typeof submittedScores[activeWorksheetId] === 'number'}
                lastScore={
                  typeof submittedScores[activeWorksheetId] === 'number'
                    ? submittedScores[activeWorksheetId]!
                    : null
                }
                onToggleTimer={() => setIsTimerRunning((r) => !r)}
                onResetTimer={() => {
                  setIsTimerRunning(false);
                  setTimers((prev) => ({
                    ...prev,
                    [activeWorksheetId]: currentWorksheetMeta.durationMinutes * 60,
                  }));
                }}
                onToggleAnswerKey={() => setShowAnswerKey((s) => !s)}
                onOpenGroupModal={() => {
                  setPendingWorksheet(null);
                  setIsGroupModalOpen(true);
                }}
                onPrint={() => window.print()}
                onSubmitWorksheet={handleSubmitCurrentWorksheet}
                onBackHome={() => setActiveTab('home')}
              />

              {activeWorksheetId === 1 && (
                <Worksheet1View
                  answers={w1Answers}
                  showAnswerKey={showAnswerKey}
                  onChange={setW1Answers}
                />
              )}

              {activeWorksheetId === 2 && (
                <Worksheet2View
                  answers={w2Answers}
                  showAnswerKey={showAnswerKey}
                  onChange={setW2Answers}
                />
              )}

              {activeWorksheetId === 3 && (
                <Worksheet3View
                  answers={w3Answers}
                  showAnswerKey={showAnswerKey}
                  onChange={setW3Answers}
                />
              )}

              {activeWorksheetId === 4 && (
                <Worksheet4View
                  answers={w4Answers}
                  showAnswerKey={showAnswerKey}
                  onChange={setW4Answers}
                />
              )}

              {/* Exact PDF Page Footer */}
              <div className="pt-6 mt-8 border-t-2 border-[#2B5B84] flex items-center justify-between text-xs italic text-slate-500">
                <span>Tin học 7 – Bài 1. Thiết bị vào – ra | Phiếu học tập</span>
                <span className="not-italic font-mono-tabular">{currentWorksheetMeta.pageLabel}</span>
              </div>
            </div>

            {/* Bottom Navigation Switcher between 4 Worksheets */}
            <div className="no-print bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 mr-1">Chuyển nhanh:</span>
                {WORKSHEETS_META.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setActiveWorksheetId(m.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      activeWorksheetId === m.id
                        ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Phiếu {m.numberLabel}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSubmitCurrentWorksheet}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2B5B84] hover:bg-[#1E4466] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nộp Phiếu {currentWorksheetMeta.numberLabel} & Chấm điểm</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: TEACHER GROUP AGGREGATION DASHBOARD */}
        {activeTab === 'teacher' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại 4 Phiếu học tập</span>
              </button>
            </div>

            <TeacherDashboard
              submissions={allSubmissions}
              onUpdateGrade={handleUpdateTeacherGrade}
              onDeleteSubmission={handleDeleteSubmission}
              onClearAllSubmissions={handleClearAllSubmissions}
              onOpenWorksheet={(id) => {
                setActiveWorksheetId(id);
                setActiveTab('worksheet');
              }}
            />
          </div>
        )}
      </main>

      {/* Modal Nhập thông tin nhóm khi chọn Phiếu học tập 1..4 */}
      <GroupInfoModal
        isOpen={isGroupModalOpen}
        targetWorksheet={pendingWorksheet}
        initialGroup={group}
        onClose={() => setIsGroupModalOpen(false)}
        onConfirm={handleConfirmGroupModal}
      />

      {/* Modal Nhập mật khẩu Giáo viên (admin123) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-[#2B5B84] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-200" />
                <h3 className="text-base font-bold">Xác thực Trang Giáo viên</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-lg text-sky-100 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTeacherLoginSubmit} className="p-6 space-y-4">
              {passwordError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Nhập mật khẩu Giáo viên
                </label>
                <input
                  type="password"
                  autoFocus
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="Nhập mật khẩu để truy cập..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#2B5B84] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#2B5B84] rounded-lg hover:bg-[#1E4466] transition-colors whitespace-nowrap shrink-0"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
