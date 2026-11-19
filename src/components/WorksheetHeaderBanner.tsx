import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Printer,
  Send,
  Eye,
  EyeOff,
  Edit3,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { GroupProfile, WorksheetMeta } from '../data/worksheetsData';

interface WorksheetHeaderBannerProps {
  meta: WorksheetMeta;
  group: GroupProfile;
  remainingSeconds: number;
  isTimerRunning: boolean;
  showAnswerKey: boolean;
  isSubmitted: boolean;
  lastScore: number | null;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onToggleAnswerKey: () => void;
  onOpenGroupModal: () => void;
  onPrint: () => void;
  onSubmitWorksheet: () => void;
  onBackHome: () => void;
}

export const WorksheetHeaderBanner: React.FC<WorksheetHeaderBannerProps> = ({
  meta,
  group,
  remainingSeconds,
  isTimerRunning,
  showAnswerKey,
  isSubmitted,
  lastScore,
  onToggleTimer,
  onResetTimer,
  onToggleAnswerKey,
  onOpenGroupModal,
  onPrint,
  onSubmitWorksheet,
  onBackHome,
}) => {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isLowTime = remainingSeconds > 0 && remainingSeconds <= 120;
  const isTimeUp = remainingSeconds === 0;

  return (
    <div className="space-y-4">
      {/* Control Toolbar (hidden when printing) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>4 Phiếu học tập</span>
          </button>

          {/* Timer control */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
              isTimeUp
                ? 'bg-red-50 border-red-300 text-red-800'
                : isLowTime
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span className="text-slate-500">Thời gian:</span>
            <span className="font-mono-tabular font-bold text-sm">{formattedTime}</span>
            {isTimeUp && <span className="text-red-700 font-semibold">(Hết giờ)</span>}
            <button
              type="button"
              onClick={onToggleTimer}
              className="p-1 rounded hover:bg-slate-200/70 transition-colors"
              title={isTimerRunning ? 'Tạm dừng đếm ngược' : 'Bắt đầu đếm ngược'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onResetTimer}
              className="p-1 rounded hover:bg-slate-200/70 transition-colors"
              title="Đặt lại đồng hồ"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {lastScore !== null && (
            <div className="text-xs font-semibold text-emerald-700 px-2.5 py-1.5">
              ✓ Đã chấm: <span className="font-mono-tabular font-bold">{lastScore}/100 điểm</span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleAnswerKey}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showAnswerKey
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswerKey ? 'Ẩn đáp án gợi ý' : 'Xem đáp án gợi ý'}</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In / Xuất PDF</span>
          </button>

          <button
            type="button"
            onClick={onSubmitWorksheet}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2B5B84] hover:bg-[#1E4466] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {isSubmitted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSubmitted ? 'Cập nhật bài nộp nhóm' : 'Nộp phiếu của nhóm'}</span>
          </button>
        </div>
      </div>

      {/* Exact PDF Header Banner */}
      <div className="grid grid-cols-12 overflow-hidden rounded-t-lg border border-[#2B5B84]/30">
        <div className="col-span-4 sm:col-span-3 bg-[#31628C] text-white py-3.5 px-4 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold tracking-wider uppercase">PHIẾU HỌC TẬP</span>
          <span className="text-2xl sm:text-3xl font-extrabold mt-0.5 tracking-tight">
            {meta.numberLabel}
          </span>
        </div>
        <div className="col-span-8 sm:col-span-9 bg-[#D9E6F2] text-[#1D436B] py-3.5 px-5 flex flex-col justify-center">
          <h1 className="text-lg sm:text-xl font-bold leading-snug">{meta.title}</h1>
          <p className="text-xs sm:text-sm italic text-slate-600 mt-0.5">
            {meta.activityCode} • {meta.durationMinutes} phút
          </p>
        </div>
      </div>

      {/* Nhóm / Lớp / Thành viên lines matching original PDF */}
      <div className="pt-2 pb-3 border-b border-slate-200 space-y-2.5 text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-2 flex-1 min-w-[200px]">
            <span className="font-bold text-slate-900 shrink-0">Nhóm:</span>
            <span className="flex-1 worksheet-dotted-line font-semibold text-[#1D436B] px-2 pb-0.5">
              {group.groupName || 'Chưa chọn nhóm'}
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-1 min-w-[200px]">
            <span className="font-bold text-slate-900 shrink-0">Lớp:</span>
            <span className="flex-1 worksheet-dotted-line font-semibold text-[#1D436B] px-2 pb-0.5">
              {group.className || '7A1'}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenGroupModal}
            className="no-print inline-flex items-center gap-1 text-xs font-medium text-[#2B5B84] hover:underline whitespace-nowrap shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Sửa thông tin nhóm</span>
          </button>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-slate-900 shrink-0">Thành viên:</span>
          <span className="flex-1 worksheet-dotted-line text-slate-800 px-2 pb-0.5">
            {group.members || '..........................................................................................................................'}
          </span>
        </div>
      </div>
    </div>
  );
};
