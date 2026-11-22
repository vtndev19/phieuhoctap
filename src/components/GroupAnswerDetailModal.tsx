import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Save,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  WorksheetSubmission,
  WorksheetId,
  WORKSHEETS_META,
  WORKSHEET_QUESTIONS,
  PORT_OPTIONS,
  CONNECTABLE_DEVICES,
  Worksheet1Answers,
  Worksheet2Answers,
  Worksheet3Answers,
  Worksheet4Answers,
} from '../data/worksheetsData';

interface GroupAnswerDetailModalProps {
  submission: WorksheetSubmission;
  initialQuestionIndex?: number;
  onClose: () => void;
  onUpdateGrade?: (id: string, teacherScore: number, teacherComment: string) => Promise<void>;
}

export const GroupAnswerDetailModal: React.FC<GroupAnswerDetailModalProps> = ({
  submission,
  initialQuestionIndex = 0,
  onClose,
  onUpdateGrade,
}) => {
  const currentMeta = WORKSHEETS_META.find((m) => m.id === submission.worksheetId)!;
  const questions = WORKSHEET_QUESTIONS[submission.worksheetId] || [];

  const [activeQIndex, setActiveQIndex] = useState<number>(
    Math.max(0, Math.min(initialQuestionIndex, questions.length - 1))
  );
  const [isZoomed, setIsZoomed] = useState(false);

  // Quick grading state inside modal
  const [draftScore, setDraftScore] = useState<number>(
    typeof submission.teacherScore === 'number' ? submission.teacherScore : submission.autoScore
  );
  const [draftComment, setDraftComment] = useState<string>(submission.teacherComment || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, onClose]);

  const currentQ = questions[activeQIndex];

  // Helper to get group's answer for this specific question
  const renderGroupAnswerContent = () => {
    if (submission.worksheetId === 1) {
      const a = submission.answers as Worksheet1Answers;
      const text =
        activeQIndex === 0 ? a.q1Text : activeQIndex === 1 ? a.q2Text : a.q3Text;
      return (
        <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
          <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed font-medium">
            {text?.trim() ? text : <span className="text-slate-400 italic font-normal">Nhóm chưa điền nội dung câu trả lời.</span>}
          </p>
        </div>
      );
    }

    if (submission.worksheetId === 2) {
      const a = submission.answers as Worksheet2Answers;
      const text =
        activeQIndex === 0
          ? a.q1Text
          : activeQIndex === 1
          ? a.q2Text
          : activeQIndex === 2
          ? a.q3Text
          : a.q4Text;
      return (
        <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
          <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed font-medium">
            {text?.trim() ? text : <span className="text-slate-400 italic font-normal">Nhóm chưa điền nội dung câu trả lời.</span>}
          </p>
        </div>
      );
    }

    if (submission.worksheetId === 3) {
      const a = submission.answers as Worksheet3Answers;
      if (activeQIndex === 0) {
        const ports = a.ports || { a: '', b: '', c: '', d: '', e: '', f: '' };
        const standardPorts: Record<string, string[]> = {
          a: ['7'],
          b: ['6'],
          c: ['7'],
          d: ['3'],
          e: ['4', '2'],
          f: ['8'],
        };

        return (
          <div className="space-y-3 p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Kết quả ghép nối thiết bị với cổng thân máy của nhóm:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CONNECTABLE_DEVICES.map((item) => {
                const chosenPort = ports[item.key];
                const portInfo = PORT_OPTIONS.find((p) => p.portNumber === chosenPort);
                const isCorrect = chosenPort && standardPorts[item.key]?.includes(chosenPort);

                return (
                  <div
                    key={item.key}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm ${
                      !chosenPort
                        ? 'bg-slate-100 border-slate-200 text-slate-500'
                        : isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-amber-50/80 border-amber-300 text-amber-950 font-medium'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{item.label}</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{item.hint}</p>
                    </div>
                    <div className="text-right pl-2 shrink-0">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white border border-slate-300 font-mono-tabular font-bold text-slate-900 shadow-2xs">
                        {chosenPort ? `Cổng ${chosenPort}` : 'Chưa chọn'}
                      </span>
                      {portInfo && (
                        <p className="text-[10px] text-slate-500 mt-1 max-w-[130px] truncate" title={portInfo.name}>
                          {portInfo.name}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // Câu 2 Worksheet 3
      return (
        <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
          <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed font-medium">
            {a.q2Text?.trim() ? a.q2Text : <span className="text-slate-400 italic font-normal">Nhóm chưa điền nội dung câu trả lời.</span>}
          </p>
        </div>
      );
    }

    // Worksheet 4
    const a = submission.answers as Worksheet4Answers;
    const text =
      activeQIndex === 0 ? a.q1Text : activeQIndex === 1 ? a.q2Text : a.q3Text;
    return (
      <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
        <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed font-medium">
          {text?.trim() ? text : <span className="text-slate-400 italic font-normal">Nhóm chưa điền nội dung câu trả lời.</span>}
        </p>
      </div>
    );
  };

  const handleSaveGrade = async () => {
    if (!onUpdateGrade) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onUpdateGrade(submission.id, draftScore, draftComment);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 to-[#1D436B] text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider bg-white/20 text-white uppercase">
                Phiếu {currentMeta.numberLabel}
              </span>
              <span className="text-xs text-sky-200 font-medium">
                {currentMeta.title} ({currentMeta.pageLabel})
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-sky-300" />
              <span>{submission.group.groupName}</span>
              <span className="text-sky-300 text-sm font-normal">
                • Lớp {submission.group.className}
              </span>
            </h2>
            {submission.group.members && (
              <p className="text-xs text-slate-300 max-w-xl truncate">
                Thành viên: {submission.group.members}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="font-mono-tabular text-lg font-extrabold text-emerald-400">
                {draftScore}/100 đ
              </div>
              <span className="text-[10px] text-slate-300">
                {typeof submission.teacherScore === 'number' ? 'Điểm GV' : 'Chấm máy'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Switcher Tabs */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            {questions.map((q, idx) => {
              const active = idx === activeQIndex;
              return (
                <button
                  key={q.questionNumber}
                  type="button"
                  onClick={() => setActiveQIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    active
                      ? 'bg-[#2B5B84] text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  <span>Câu {q.questionNumber}</span>
                  <span className={`text-[11px] font-normal hidden md:inline ${active ? 'text-sky-200' : 'text-slate-500'}`}>
                    ({q.shortLabel})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
            <button
              type="button"
              disabled={activeQIndex === 0}
              onClick={() => setActiveQIndex((prev) => Math.max(0, prev - 1))}
              className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent"
              title="Câu trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono-tabular font-semibold text-slate-700 px-1">
              {activeQIndex + 1}/{questions.length}
            </span>
            <button
              type="button"
              disabled={activeQIndex === questions.length - 1}
              onClick={() => setActiveQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent"
              title="Câu tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {currentQ && (
            <>
              {/* PHẦN 1: ĐỀ BÀI TƯƠNG ỨNG */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#1D436B] text-white text-xs font-bold">
                      {currentQ.questionTitle}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      Đề bài trong Phiếu học tập số {currentMeta.numberLabel}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentQ.prompt}
                  </h3>

                  {currentQ.hint && (
                    <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm text-amber-900">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-950">Gợi ý SGK: </span>
                        <span>{currentQ.hint}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PHẦN 2: HÌNH ẢNH MINH HỌA CỦA ĐỀ BÀI */}
              {currentQ.image && (
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <ImageIcon className="w-4 h-4 text-[#2B5B84]" />
                      <span>Hình ảnh minh họa của đề bài:</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsZoomed(true)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#2B5B84] hover:underline"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Phóng to ảnh</span>
                    </button>
                  </div>

                  <div
                    onClick={() => setIsZoomed(true)}
                    className="relative group cursor-pointer bg-slate-50/80 rounded-xl border border-slate-200 p-2 sm:p-3 flex flex-col items-center justify-center hover:border-sky-300 transition-colors"
                  >
                    <img
                      src={currentQ.image}
                      alt={currentQ.imageAlt || currentQ.prompt}
                      className="max-h-72 w-auto object-contain rounded-lg shadow-2xs"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
                      <span className="bg-slate-900/75 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-md">
                        <ZoomIn className="w-4 h-4" />
                        <span>Bấm để xem ảnh phóng to</span>
                      </span>
                    </div>
                  </div>

                  {currentQ.imageCaption && (
                    <p className="text-xs text-slate-500 italic text-center">
                      {currentQ.imageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* PHẦN 3: CÂU TRẢ LỜI CỦA NHÓM */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="bg-sky-50/80 px-4 py-2.5 border-b border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <h4 className="text-xs sm:text-sm font-bold text-sky-950">
                      Câu trả lời của nhóm: {submission.group.groupName}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-800">
                    Lớp {submission.group.className}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  {renderGroupAnswerContent()}
                </div>
              </div>

              {/* PHẦN 4: ĐỐI CHIẾU ĐÁP ÁN CHUẨN SGK DÀNH CHO GIÁO VIÊN */}
              <div className="bg-emerald-50/90 rounded-xl border border-emerald-200 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đáp án chuẩn đối chiếu (SGK Tin học 7):</span>
                </div>
                <div className="p-3.5 bg-white/90 rounded-lg border border-emerald-200 text-xs sm:text-sm text-emerald-950 whitespace-pre-line leading-relaxed">
                  {currentQ.standardAnswer}
                </div>
              </div>

              {/* PHẦN 5: CHẤM ĐIỂM & NHẬN XÉT CỦA GIÁO VIÊN */}
              {onUpdateGrade && (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Award className="w-4 h-4 text-[#2B5B84]" />
                      <span>Chấm điểm & Nhận xét của Giáo viên:</span>
                    </div>
                    {saveSuccess && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đã lưu thành công!</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-start">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Điểm số (0 - 100):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={draftScore}
                        onChange={(e) => setDraftScore(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm font-mono-tabular font-bold rounded-lg border border-slate-300 bg-white focus:border-[#2B5B84] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Lời nhận xét / góp ý cho nhóm:
                      </label>
                      <div className="flex gap-2">
                        <textarea
                          rows={2}
                          value={draftComment}
                          onChange={(e) => setDraftComment(e.target.value)}
                          placeholder="Nhập nhận xét của thầy/cô cho bài làm này..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:border-[#2B5B84] focus:outline-none"
                        />
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={handleSaveGrade}
                          className="self-end px-3 py-2 text-xs font-semibold text-white bg-[#2B5B84] hover:bg-[#1E4466] rounded-lg transition-colors flex items-center gap-1 shrink-0"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isSaving ? 'Lưu...' : 'Lưu điểm'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeQIndex === 0}
              onClick={() => setActiveQIndex((prev) => Math.max(0, prev - 1))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Câu trước</span>
            </button>

            <button
              type="button"
              disabled={activeQIndex === questions.length - 1}
              onClick={() => setActiveQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-700"
            >
              <span>Câu sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>

      {/* Lightbox zoom in modal for high-res images */}
      {isZoomed && currentQ?.image && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1 text-xs font-bold"
            >
              <X className="w-5 h-5" />
              <span>Đóng phóng to (Esc)</span>
            </button>
            <img
              src={currentQ.image}
              alt={currentQ.imageAlt || currentQ.prompt}
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl bg-white p-2"
              onClick={(e) => e.stopPropagation()}
            />
            {currentQ.imageCaption && (
              <p className="text-xs text-white/90 text-center mt-3 bg-black/60 px-4 py-1.5 rounded-full">
                {currentQ.imageCaption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
