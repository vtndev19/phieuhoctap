import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Clock, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { GroupProfile, WorksheetMeta } from '../data/worksheetsData';

interface GroupInfoModalProps {
  isOpen: boolean;
  targetWorksheet: WorksheetMeta | null;
  initialGroup: GroupProfile;
  onClose: () => void;
  onConfirm: (group: GroupProfile, worksheetId?: 1 | 2 | 3 | 4) => void;
}

const QUICK_GROUPS = ['Nhóm 1', 'Nhóm 2', 'Nhóm 3', 'Nhóm 4', 'Nhóm 5', 'Nhóm 6'];
const QUICK_CLASSES = ['7A1', '7A2', '7A3', '7A4'];

export const GroupInfoModal: React.FC<GroupInfoModalProps> = ({
  isOpen,
  targetWorksheet,
  initialGroup,
  onClose,
  onConfirm,
}) => {
  const [groupName, setGroupName] = useState(initialGroup.groupName || '');
  const [className, setClassName] = useState(initialGroup.className || '7A1');
  const [members, setMembers] = useState(initialGroup.members || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setGroupName(initialGroup.groupName || 'Nhóm 1');
      setClassName(initialGroup.className || '7A1');
      setMembers(initialGroup.members || '');
      setError('');
    }
  }, [isOpen, initialGroup]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError('Vui lòng nhập hoặc chọn tên nhóm của bạn.');
      return;
    }
    if (!className.trim()) {
      setError('Vui lòng nhập tên lớp (ví dụ: 7A1).');
      return;
    }
    onConfirm(
      {
        groupName: groupName.trim(),
        className: className.trim(),
        members: members.trim(),
      },
      targetWorksheet?.id
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        {/* Top textbook-styled banner */}
        <div className="bg-[#2B5B84] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-sky-200 tracking-wide">
              Tin học 7 – Bài 1. Thiết bị vào – ra
            </p>
            <h3 className="text-lg font-bold mt-0.5">
              {targetWorksheet
                ? `Vào làm Phiếu học tập ${targetWorksheet.numberLabel}`
                : 'Thông tin Nhóm học tập'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-sky-100 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {targetWorksheet && (
          <div className="bg-[#D9E6F2] px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-[#1E3A5F]">
            <div className="flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4 text-[#2B5B84] shrink-0" />
              <span>{targetWorksheet.title}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono-tabular font-medium">
              <Clock className="w-3.5 h-3.5 text-[#2B5B84]" />
              <span>{targetWorksheet.activityCode} • {targetWorksheet.durationMinutes} phút</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Group Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Tên nhóm <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {QUICK_GROUPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroupName(g)}
                  className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                    groupName === g
                      ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nhập tên nhóm (VD: Nhóm 1)..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#2B5B84] focus:outline-none"
            />
          </div>

          {/* Class Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Lớp <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="VD: 7A1"
                className="w-36 px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#2B5B84] focus:outline-none"
              />
              <div className="flex items-center gap-1.5 flex-wrap">
                {QUICK_CLASSES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setClassName(c)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                      className === c
                        ? 'bg-sky-50 text-[#2B5B84] border-[#2B5B84]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Thành viên trong nhóm
            </label>
            <textarea
              rows={2}
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Nhập họ tên các thành viên (cách nhau bởi dấu phẩy)..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#2B5B84] focus:outline-none resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              Thông tin nhóm sẽ được ghi vào phiếu học tập và gửi lên bảng tổng hợp của Giáo viên.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2B5B84] rounded-lg hover:bg-[#1E4466] transition-colors whitespace-nowrap shrink-0"
            >
              {targetWorksheet ? (
                <>
                  <span>Mở Phiếu học tập {targetWorksheet.numberLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lưu thông tin nhóm</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
