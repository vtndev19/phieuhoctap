import React, { useState, useMemo } from 'react';
import {
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  Trash2,
  Save,
  Sparkles,
  FileSpreadsheet,
  Users,
} from 'lucide-react';
import {
  WORKSHEETS_META,
  WorksheetId,
  WorksheetSubmission,
  Worksheet1Answers,
  Worksheet2Answers,
  Worksheet3Answers,
  Worksheet4Answers,
  STANDARD_ANSWERS,
} from '../data/worksheetsData';

interface TeacherDashboardProps {
  submissions: WorksheetSubmission[];
  onUpdateGrade: (id: string, teacherScore: number, teacherComment: string) => Promise<void>;
  onDeleteSubmission: (id: string) => Promise<void>;
  onClearAllSubmissions: () => Promise<void>;
  onOpenWorksheet: (id: WorksheetId) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  submissions,
  onUpdateGrade,
  onDeleteSubmission,
  onClearAllSubmissions,
  onOpenWorksheet,
}) => {
  const [selectedWorksheet, setSelectedWorksheet] = useState<WorksheetId>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStandardKey, setShowStandardKey] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftScore, setDraftScore] = useState<number>(100);
  const [draftComment, setDraftComment] = useState<string>('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (s.worksheetId !== selectedWorksheet) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.group.groupName.toLowerCase().includes(q) ||
        s.group.className.toLowerCase().includes(q) ||
        s.group.members.toLowerCase().includes(q)
      );
    });
  }, [submissions, selectedWorksheet, searchQuery]);

  // Matrix of all groups across the 4 worksheets
  const groupMatrix = useMemo(() => {
    const map = new Map<
      string,
      {
        groupName: string;
        className: string;
        members: string;
        scores: Partial<Record<WorksheetId, number>>;
      }
    >();

    submissions.forEach((s) => {
      const key = `${s.group.groupName.toLowerCase()}_${s.group.className.toLowerCase()}`;
      const existing = map.get(key) || {
        groupName: s.group.groupName,
        className: s.group.className,
        members: s.group.members,
        scores: {},
      };
      const finalScore = typeof s.teacherScore === 'number' ? s.teacherScore : s.autoScore;
      existing.scores[s.worksheetId] = finalScore;
      if (s.group.members && !existing.members) {
        existing.members = s.group.members;
      }
      map.set(key, existing);
    });

    return Array.from(map.values());
  }, [submissions]);

  const currentMeta = WORKSHEETS_META.find((m) => m.id === selectedWorksheet)!;

  const startEdit = (sub: WorksheetSubmission) => {
    setEditingId(sub.id);
    setDraftScore(typeof sub.teacherScore === 'number' ? sub.teacherScore : sub.autoScore);
    setDraftComment(sub.teacherComment || '');
  };

  const handleSaveGrade = async (id: string) => {
    setSavingId(id);
    await onUpdateGrade(id, draftScore, draftComment);
    setSavingId(null);
    setEditingId(null);
  };

  const renderAnswersSummary = (sub: WorksheetSubmission) => {
    if (sub.worksheetId === 1) {
      const a = sub.answers as Worksheet1Answers;
      return (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-800">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B]">Câu 1 (Dạng thông tin):</p>
            <p className="mt-0.5">{a.q1Text || 'Chưa điền nội dung'}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B]">Câu 2 (Thiết bị vào):</p>
            <p className="mt-0.5">{a.q2Text || 'Chưa điền nội dung'}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B]">Câu 3 (Thiết bị ra):</p>
            <p className="mt-0.5">{a.q3Text || 'Chưa điền nội dung'}</p>
          </div>
        </div>
      );
    }

    if (sub.worksheetId === 2) {
      const a = sub.answers as Worksheet2Answers;
      return (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-800">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B]">Câu 1 (Các thiết bị trong Hình 1.2 & Thiết bị 2 chức năng):</p>
            <p className="mt-0.5 whitespace-pre-line">{a.q1Text || 'Chưa điền nội dung'}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B]">Câu 2 (Máy chiếu):</p>
            <p className="mt-0.5">{a.q2Text || 'Chưa điền nội dung'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-[#1D436B]">Câu 3 (Bộ điều khiển game):</p>
              <p className="mt-0.5">{a.q3Text || 'Chưa điền nội dung'}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-[#1D436B]">Câu 4 (Màn hình cảm ứng):</p>
              <p className="mt-0.5">{a.q4Text || 'Chưa điền nội dung'}</p>
            </div>
          </div>
        </div>
      );
    }

    if (sub.worksheetId === 3) {
      const a = sub.answers as Worksheet3Answers;
      const ports = a.ports || { a: '', b: '', c: '', d: '', e: '', f: '' };
      return (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-800">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B] mb-1.5">Câu 1 (Kết quả lắp cổng trên thân máy):</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono-tabular text-xs">
              <span>a) Bàn phím: <strong>Cổng {ports.a || '?'}</strong></span>
              <span>b) Dây mạng: <strong>Cổng {ports.b || '?'}</strong></span>
              <span>c) Chuột: <strong>Cổng {ports.c || '?'}</strong></span>
              <span>d) Dây màn hình: <strong>Cổng {ports.d || '?'}</strong></span>
              <span>e) Tai nghe: <strong>Cổng {ports.e || '?'}</strong></span>
              <span>f) Dây nguồn: <strong>Cổng {ports.f || '?'}</strong></span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="font-bold text-[#1D436B]">Câu 2 (Thời điểm cấp nguồn điện):</p>
            <p className="mt-0.5">{a.q2Text || 'Chưa điền nội dung'}</p>
          </div>
        </div>
      );
    }

    const a = sub.answers as Worksheet4Answers;
    return (
      <div className="space-y-2.5 text-xs sm:text-sm text-slate-800">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <p className="font-bold text-[#1D436B]">Câu 1 (Tình huống Camera an ninh):</p>
          <p className="mt-0.5">{a.q1Text || 'Chưa điền nội dung'}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <p className="font-bold text-[#1D436B]">Câu 2 (Tình huống Máy in bị lỗi do virus):</p>
          <p className="mt-0.5">{a.q2Text || 'Chưa điền nội dung'}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <p className="font-bold text-[#1D436B]">Câu 3 (Đề xuất quy tắc phòng máy an toàn):</p>
          <p className="mt-0.5 whitespace-pre-line">{a.q3Text || 'Chưa điền nội dung'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header & Summary Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#0284C7]">
              Dành cho Giáo viên • Tin học 7 – Bài 1. Thiết bị vào – ra
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Tổng Hợp & Đối Chiếu Câu Trả Lời Của Các Nhóm
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Theo dõi kết quả nộp bài của các nhóm học sinh theo từng phiếu, trình chiếu đáp án chuẩn và chấm điểm trực tiếp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowStandardKey(!showStandardKey)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                showStandardKey
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {showStandardKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showStandardKey ? 'Ẩn Đáp án chuẩn SGK' : 'Hiện Đáp án chuẩn SGK'}</span>
            </button>

            {submissions.length > 0 && (
              <button
                type="button"
                onClick={onClearAllSubmissions}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                title="Xóa tất cả bài nộp"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa tất cả bài nộp</span>
              </button>
            )}
          </div>
        </div>

        {/* Matrix Overview of All Groups across 4 Worksheets */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <FileSpreadsheet className="w-4 h-4 text-[#2B5B84]" />
            <span>Bảng tổng hợp điểm số các nhóm qua 4 Phiếu học tập</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="py-2.5 px-4">Nhóm / Lớp</th>
                  <th className="py-2.5 px-4">Thành viên</th>
                  <th className="py-2.5 px-3 text-center">Phiếu 1</th>
                  <th className="py-2.5 px-3 text-center">Phiếu 2</th>
                  <th className="py-2.5 px-3 text-center">Phiếu 3</th>
                  <th className="py-2.5 px-3 text-center">Phiếu 4</th>
                  <th className="py-2.5 px-4 text-right">Điểm TB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {groupMatrix.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500">
                      Chưa có nhóm nào nộp bài.
                    </td>
                  </tr>
                ) : (
                  groupMatrix.map((row) => {
                    const completedScores = Object.values(row.scores).filter(
                      (v): v is number => typeof v === 'number'
                    );
                    const avg =
                      completedScores.length > 0
                        ? Math.round(
                            completedScores.reduce((a, b) => a + b, 0) / completedScores.length
                          )
                        : 0;
                    return (
                      <tr key={`${row.groupName}-${row.className}`} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-4 font-bold text-[#1D436B] whitespace-nowrap">
                          {row.groupName} <span className="font-normal text-slate-500">· {row.className}</span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 max-w-xs truncate">
                          {row.members || '—'}
                        </td>
                        {([1, 2, 3, 4] as WorksheetId[]).map((wid) => {
                          const sc = row.scores[wid];
                          return (
                            <td
                              key={wid}
                              className="py-2.5 px-3 text-center font-mono-tabular font-semibold"
                            >
                              {typeof sc === 'number' ? (
                                <button
                                  type="button"
                                  onClick={() => setSelectedWorksheet(wid)}
                                  className="text-emerald-700 hover:underline"
                                >
                                  {sc}đ
                                </button>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="py-2.5 px-4 text-right font-mono-tabular font-bold text-slate-900">
                          {avg}/100 ({completedScores.length}/4 phiếu)
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Filter Bar by Worksheet 1..4 + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
          {WORKSHEETS_META.map((w) => {
            const count = submissions.filter((s) => s.worksheetId === w.id).length;
            const active = selectedWorksheet === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedWorksheet(w.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#2B5B84] text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                Phiếu {w.numberLabel} ({count} nhóm)
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên nhóm, lớp, thành viên..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border border-slate-200 focus:border-[#2B5B84] focus:outline-none"
          />
        </div>
      </div>

      {/* Standard Answer Key Reference Box for Current Worksheet */}
      {showStandardKey && (
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                Đáp án chuẩn đối chiếu – Phiếu học tập {currentMeta.numberLabel}: {currentMeta.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenWorksheet(selectedWorksheet)}
              className="text-xs font-semibold text-[#2B5B84] hover:underline whitespace-nowrap shrink-0"
            >
              Mở giao diện Phiếu {currentMeta.numberLabel} ➔
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-950">
            {Object.entries(STANDARD_ANSWERS[selectedWorksheet]).map(([qKey, ansText], idx) => (
              <div
                key={qKey}
                className="p-3 rounded-lg bg-white/90 border border-emerald-200/80 whitespace-pre-line"
              >
                <span className="font-bold">Câu {idx + 1}: </span>
                <span>{ansText}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Submissions Cards for Selected Worksheet */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Danh sách câu trả lời các nhóm – Phiếu {currentMeta.numberLabel} ({filteredSubmissions.length} bài nộp)
          </h2>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">
              Chưa có nhóm nào nộp Phiếu học tập {currentMeta.numberLabel}
            </p>
            <p className="text-xs text-slate-500">
              Khi học sinh chọn Phiếu {currentMeta.numberLabel}, nhập tên nhóm và nhấn &ldquo;Nộp phiếu của nhóm&rdquo;, câu trả lời sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredSubmissions.map((sub) => {
              const displayScore =
                typeof sub.teacherScore === 'number' ? sub.teacherScore : sub.autoScore;
              const isEditing = editingId === sub.id;
              const minsSpent = Math.floor(sub.timeSpentSeconds / 60);
              const secsSpent = sub.timeSpentSeconds % 60;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    {/* Group Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 text-base font-bold text-[#1D436B]">
                          <span>{sub.group.groupName}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-sm font-semibold text-slate-700">
                            Lớp {sub.group.className}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Thành viên: {sub.group.members || 'Chưa ghi danh sách thành viên'}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono-tabular">
                          Thời gian làm bài: {minsSpent}p {secsSpent}s
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono-tabular text-lg font-extrabold text-emerald-700">
                          {displayScore}/100 điểm
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {typeof sub.teacherScore === 'number' ? 'GV đã chấm' : 'Chấm tự động'}
                        </span>
                      </div>
                    </div>

                    {/* Group Answers Content */}
                    {renderAnswersSummary(sub)}

                    {/* Teacher Comment Display / Editor */}
                    {isEditing ? (
                      <div className="p-3.5 rounded-lg bg-sky-50/70 border border-sky-200 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-xs font-bold text-slate-800">
                            Điểm số của nhóm (0 - 100):
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={draftScore}
                            onChange={(e) => setDraftScore(Number(e.target.value))}
                            className="w-24 px-2.5 py-1 text-xs font-mono-tabular font-bold rounded border border-slate-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Nhận xét của Giáo viên:
                          </label>
                          <textarea
                            rows={2}
                            value={draftComment}
                            onChange={(e) => setDraftComment(e.target.value)}
                            placeholder="Nhập nhận xét cho bài làm của nhóm..."
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 bg-white focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            disabled={savingId === sub.id}
                            onClick={() => handleSaveGrade(sub.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2B5B84] rounded-md hover:bg-[#1E4466]"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>{savingId === sub.id ? 'Đang lưu...' : 'Lưu điểm & nhận xét'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      sub.teacherComment && (
                        <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                          <span className="font-bold">Nhận xét của GV: </span>
                          <span>{sub.teacherComment}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => startEdit(sub)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#2B5B84] hover:underline whitespace-nowrap shrink-0"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Chấm điểm & Nhận xét</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteSubmission(sub.id)}
                      className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa bài nộp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
