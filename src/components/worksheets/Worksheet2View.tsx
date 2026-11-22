import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Worksheet2Answers, STANDARD_ANSWERS } from '../../data/worksheetsData';

interface Worksheet2ViewProps {
  answers: Worksheet2Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet2Answers) => void;
}

export const Worksheet2View: React.FC<Worksheet2ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  return (
    <div className="space-y-6 pt-4">
      {/* Hình 1.2. Thiết bị vào – ra trong SGK */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Hình 1.2. Thiết bị vào – ra (Quan sát để trả lời các câu hỏi bên dưới):
        </h3>
        <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2 flex justify-center">
          <img
            src="/assets/worksheets/phieu2_hinh1_2_thiet_bi_vao_ra.jpg"
            alt="Hình 1.2. Sơ đồ các thiết bị vào – ra"
            className="w-full max-w-3xl h-auto object-contain rounded"
          />
        </div>
        <p className="text-xs text-slate-500 italic text-center">
          Sơ đồ gồm hai nhóm: Thiết bị vào (bên trái) và Thiết bị ra (bên phải)
        </p>
      </div>

      {/* Câu 1 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 1.</span> Mỗi thiết bị vào – ra trong hình trên làm việc với dạng thông tin nào? Thiết bị nào có cả hai chức năng vào và ra?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q1Text}
            onChange={(e) => onChange({ ...answers, q1Text: e.target.value })}
            placeholder="Nêu dạng thông tin của các thiết bị (chuột, bàn phím, micro, camera, máy quét, màn hình, tai nghe, máy in, loa...) và chỉ ra thiết bị có cả 2 chức năng..."
            rows={5}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên:</span>
            </div>
            <p className="whitespace-pre-line">{STANDARD_ANSWERS[2].q1}</p>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 2.</span> Máy chiếu là thiết bị vào hay thiết bị ra? Máy chiếu làm việc với dạng thông tin nào?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q2Text}
            onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
            placeholder="Nhập câu trả lời của em tại đây..."
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
            <p>{STANDARD_ANSWERS[2].q2}</p>
          </div>
        )}
      </section>

      {/* Câu 3 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            <span className="text-[#1D436B]">Câu 3.</span> Bộ điều khiển game là thiết bị vào hay thiết bị ra?
          </h2>
          <img
            src="/assets/worksheets/phieu2_bo_dieu_khien_game.jpg"
            alt="Bộ điều khiển game"
            className="h-16 w-auto object-contain rounded border border-slate-200 bg-slate-50 p-1 self-start sm:self-auto"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q3Text}
            onChange={(e) => onChange({ ...answers, q3Text: e.target.value })}
            placeholder="Nhập câu trả lời của em và giải thích vì sao..."
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
            <p>{STANDARD_ANSWERS[2].q3}</p>
          </div>
        )}
      </section>

      {/* Câu 4 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            <span className="text-[#1D436B]">Câu 4.</span> Màn hình cảm ứng là thiết bị vào, thiết bị ra hay có cả hai chức năng vào và ra?
          </h2>
          <img
            src="/assets/worksheets/phieu2_man_hinh_cam_ung.jpg"
            alt="Màn hình cảm ứng"
            className="h-16 w-auto object-contain rounded border border-slate-200 bg-slate-50 p-1 self-start sm:self-auto"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh:
          </label>
          <textarea
            value={answers.q4Text}
            onChange={(e) => onChange({ ...answers, q4Text: e.target.value })}
            placeholder="Nhập câu trả lời của em và giải thích chức năng..."
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
            <p>{STANDARD_ANSWERS[2].q4}</p>
          </div>
        )}
      </section>
    </div>
  );
};
