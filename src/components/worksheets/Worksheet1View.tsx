import React, { useState } from 'react';
import { Volume2, Mic, ArrowRight, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Worksheet1Answers, STANDARD_ANSWERS } from '../../data/worksheetsData';

interface Worksheet1ViewProps {
  answers: Worksheet1Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet1Answers) => void;
}

const INFO_TYPES = [
  { id: 'am_thanh', label: 'Dạng âm thanh' },
  { id: 'hinh_anh', label: 'Dạng hình ảnh' },
  { id: 'van_ban', label: 'Dạng văn bản (chữ, số)' },
];

export const Worksheet1View: React.FC<Worksheet1ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  const [activeDeviceInspect, setActiveDeviceInspect] = useState<'micro' | 'loa' | null>('micro');

  const toggleInfoType = (typeId: string) => {
    const exists = answers.q1SelectedTypes.includes(typeId);
    const nextTypes = exists
      ? answers.q1SelectedTypes.filter((t) => t !== typeId)
      : [...answers.q1SelectedTypes, typeId];

    let autoText = answers.q1Text;
    if (!autoText.trim() && typeId === 'am_thanh' && !exists) {
      autoText = 'Các thiết bị trong hình (Micro và Loa) làm việc với thông tin dạng âm thanh.';
    }
    onChange({ ...answers, q1SelectedTypes: nextTypes, q1Text: autoText });
  };

  const selectQ2Device = (dev: 'micro' | 'loa') => {
    let autoText = answers.q2Text;
    if (!autoText.trim() || autoText.includes('Micro') || autoText.includes('Loa')) {
      autoText =
        dev === 'micro'
          ? 'Thiết bị Micro tiếp nhận thông tin (âm thanh) từ bên ngoài và chuyển vào máy tính.'
          : 'Thiết bị Loa tiếp nhận thông tin và chuyển vào máy tính.';
    }
    onChange({ ...answers, q2SelectedDevice: dev, q2Text: autoText });
  };

  const selectQ3Device = (dev: 'micro' | 'loa') => {
    let autoText = answers.q3Text;
    if (!autoText.trim() || autoText.includes('Micro') || autoText.includes('Loa')) {
      autoText =
        dev === 'loa'
          ? 'Thiết bị Loa nhận thông tin từ máy tính và đưa ra bên ngoài dưới dạng âm thanh.'
          : 'Thiết bị Micro nhận thông tin từ máy tính đưa ra bên ngoài.';
    }
    onChange({ ...answers, q3SelectedDevice: dev, q3Text: autoText });
  };

  return (
    <div className="space-y-8 pt-4">
      {/* Câu 1 + Hình minh họa Micro và Loa trích xuất từ PDF */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-medium text-slate-900">
          <span className="font-bold text-[#1D436B]">Câu 1.</span> Các thiết bị trong hình làm việc với dạng thông tin nào?
        </h2>

        {/* Interactive Image + Signal Flow Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/80 p-5 rounded-xl border border-slate-200">
          {/* Original PDF Image with Interactive Click Zones */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <img
                src="/assets/worksheets/phieu1_micro_loa.jpg"
                alt="Hình minh họa Micro và Loa trong Phiếu học tập số 1"
                referrerPolicy="no-referrer"
                className="w-56 h-auto mx-auto object-contain select-none"
              />
              {/* Interactive hotspots over Micro (left) and Loa (right) */}
              <button
                type="button"
                onClick={() => setActiveDeviceInspect('micro')}
                className={`no-print absolute left-3 top-3 bottom-3 w-[38%] rounded-lg border-2 transition-all flex items-end justify-center pb-1.5 ${
                  activeDeviceInspect === 'micro'
                    ? 'border-[#0284C7] bg-sky-500/10'
                    : 'border-transparent hover:border-sky-400/60 hover:bg-sky-500/5'
                }`}
                title="Nhấp để khám phá Micro"
              >
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-white/95 text-[#1D436B] rounded shadow-2xs border border-slate-200 whitespace-nowrap shrink-0">
                  1. Micro
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDeviceInspect('loa')}
                className={`no-print absolute right-3 top-3 bottom-3 w-[52%] rounded-lg border-2 transition-all flex items-end justify-center pb-1.5 ${
                  activeDeviceInspect === 'loa'
                    ? 'border-[#0284C7] bg-sky-500/10'
                    : 'border-transparent hover:border-sky-400/60 hover:bg-sky-500/5'
                }`}
                title="Nhấp để khám phá Loa"
              >
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-white/95 text-[#1D436B] rounded shadow-2xs border border-slate-200 whitespace-nowrap shrink-0">
                  2. Loa máy tính
                </span>
              </button>
            </div>
            <p className="no-print text-xs text-slate-500 mt-2 text-center">
              Nhấp vào <strong>Micro</strong> hoặc <strong>Loa</strong> trên hình để mô phỏng chiều truyền thông tin
            </p>
          </div>

          {/* Interactive Flow Simulator & Quick Selector */}
          <div className="no-print lg:col-span-7 space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D436B]">
                  Mô phỏng đường đi của thông tin:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveDeviceInspect('micro')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeDeviceInspect === 'micro'
                        ? 'bg-[#2B5B84] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Thử Micro
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeviceInspect('loa')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeDeviceInspect === 'loa'
                        ? 'bg-[#2B5B84] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Thử Loa
                  </button>
                </div>
              </div>

              {activeDeviceInspect === 'micro' ? (
                <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-sky-900">
                    <Mic className="w-4 h-4 text-[#0284C7]" />
                    <span>Giọng nói / Âm thanh ngoài</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0284C7]" />
                  <span className="font-bold text-[#0284C7]">Micro thu nhận</span>
                  <ArrowRight className="w-4 h-4 text-[#0284C7]" />
                  <span className="font-semibold text-slate-900">Chuyển VÀO Máy tính</span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-800">
                  <span className="font-semibold text-slate-900">Dữ liệu từ Máy tính</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-700">Loa phát âm thanh</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <div className="flex items-center gap-2 font-semibold text-emerald-900">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Đưa RA bên ngoài</span>
                  </div>
                </div>
              )}

              {/* Quick selection buttons for Question 1 */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700 mb-2">
                  Chọn nhanh dạng thông tin mà cả 2 thiết bị trên xử lý:
                </p>
                <div className="flex flex-wrap gap-2">
                  {INFO_TYPES.map((item) => {
                    const selected = answers.q1SelectedTypes.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleInfoType(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                          selected
                            ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dotted lines textarea matching 3 dotted lines in PDF */}
        <div>
          <textarea
            rows={3}
            value={answers.q1Text}
            onChange={(e) => onChange({ ...answers, q1Text: e.target.value })}
            placeholder="Nhập câu trả lời Câu 1 của nhóm vào dòng kẻ chấm..."
            className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
          />
          {showAnswerKey && (
            <div className="mt-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Đáp án chuẩn Câu 1: </span>
                <span>{STANDARD_ANSWERS[1].q1}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Câu 2 */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-medium text-slate-900">
            <span className="font-bold text-[#1D436B]">Câu 2.</span> Thiết bị nào tiếp nhận thông tin và chuyển vào máy tính?
          </h2>
          <div className="no-print flex items-center gap-2">
            <span className="text-xs text-slate-500">Chọn thiết bị:</span>
            <button
              type="button"
              onClick={() => selectQ2Device('micro')}
              className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                answers.q2SelectedDevice === 'micro'
                  ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Micro
            </button>
            <button
              type="button"
              onClick={() => selectQ2Device('loa')}
              className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                answers.q2SelectedDevice === 'loa'
                  ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Loa
            </button>
          </div>
        </div>

        <textarea
          rows={2}
          value={answers.q2Text}
          onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 2 (Thiết bị nào đưa thông tin vào máy tính?)..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 2: </span>
              <span>{STANDARD_ANSWERS[1].q2}</span>
            </div>
          </div>
        )}
      </section>

      {/* Câu 3 */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-medium text-slate-900">
            <span className="font-bold text-[#1D436B]">Câu 3.</span> Thiết bị nào nhận thông tin từ máy tính đưa ra bên ngoài?
          </h2>
          <div className="no-print flex items-center gap-2">
            <span className="text-xs text-slate-500">Chọn thiết bị:</span>
            <button
              type="button"
              onClick={() => selectQ3Device('micro')}
              className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                answers.q3SelectedDevice === 'micro'
                  ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Micro
            </button>
            <button
              type="button"
              onClick={() => selectQ3Device('loa')}
              className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                answers.q3SelectedDevice === 'loa'
                  ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Loa
            </button>
          </div>
        </div>

        <textarea
          rows={2}
          value={answers.q3Text}
          onChange={(e) => onChange({ ...answers, q3Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 3 (Thiết bị nào nhận thông tin từ máy tính đưa ra ngoài?)..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 3: </span>
              <span>{STANDARD_ANSWERS[1].q3}</span>
            </div>
          </div>
        )}
      </section>

      {/* Hộp Gợi ý giống hệt cuối Trang 1/6 của PDF */}
      <div className="p-4 rounded-lg bg-[#EBF2FA] border border-sky-200 text-sm italic text-[#1D436B] flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#2B5B84] shrink-0 mt-0.5" />
        <p>
          <strong>Gợi ý:</strong> hãy xem thông tin đi theo chiều nào so với máy tính – đi vào máy tính hay từ máy tính đi ra.
        </p>
      </div>
    </div>
  );
};
