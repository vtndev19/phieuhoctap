import React from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';
import { Worksheet1Answers, STANDARD_ANSWERS } from '../../data/worksheetsData';

interface Worksheet1ViewProps {
  answers: Worksheet1Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet1Answers) => void;
}

export const Worksheet1View: React.FC<Worksheet1ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  return (
    <div className="space-y-6 pt-4">
      {/* Hình minh họa trích từ SGK */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <span>Hình minh họa trong phiếu học tập:</span>
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center max-w-xs">
            <img
              src="/assets/worksheets/phieu1_micro_loa.jpg"
              alt="Hình minh họa Micro và Loa"
              className="max-h-48 w-auto mx-auto object-contain rounded"
            />
            <p className="text-xs text-slate-600 mt-2 font-medium">
              Thiết bị 1: Micro | Thiết bị 2: Loa máy tính
            </p>
          </div>

          {/* Gợi ý trong phiếu học tập */}
          <div className="flex-1 bg-amber-50/80 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">Gợi ý cho học sinh:</p>
                <p className="mt-1 leading-relaxed">
                  Hãy xem <strong>thông tin đi theo chiều nào</strong> so với máy tính – đi vào máy tính hay từ máy tính đi ra.
                </p>
                <div className="mt-2 text-xs text-amber-800 space-y-1">
                  <p>• <strong>Thiết bị vào:</strong> Tiếp nhận thông tin từ bên ngoài chuyển vào máy tính.</p>
                  <p>• <strong>Thiết bị ra:</strong> Đưa thông tin từ máy tính ra bên ngoài.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Câu 1 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 1.</span> Các thiết bị trong hình làm việc với dạng thông tin nào?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q1Text}
            onChange={(e) => onChange({ ...answers, q1Text: e.target.value })}
            placeholder="Nhập câu trả lời của em tại đây (ví dụ: Các thiết bị trong hình làm việc với dạng thông tin...)"
            rows={3}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên:</span>
            </div>
            <p>{STANDARD_ANSWERS[1].q1}</p>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 2.</span> Thiết bị nào tiếp nhận thông tin và chuyển vào máy tính?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q2Text}
            onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
            placeholder="Nhập tên thiết bị và giải thích ngắn gọn..."
            rows={3}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên:</span>
            </div>
            <p>{STANDARD_ANSWERS[1].q2}</p>
          </div>
        )}
      </section>

      {/* Câu 3 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 3.</span> Thiết bị nào nhận thông tin từ máy tính đưa ra bên ngoài?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q3Text}
            onChange={(e) => onChange({ ...answers, q3Text: e.target.value })}
            placeholder="Nhập tên thiết bị và giải thích ngắn gọn..."
            rows={3}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên:</span>
            </div>
            <p>{STANDARD_ANSWERS[1].q3}</p>
          </div>
        )}
      </section>
    </div>
  );
};
