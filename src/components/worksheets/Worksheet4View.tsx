import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Worksheet4Answers, STANDARD_ANSWERS } from '../../data/worksheetsData';

interface Worksheet4ViewProps {
  answers: Worksheet4Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet4Answers) => void;
}

export const Worksheet4View: React.FC<Worksheet4ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  return (
    <div className="space-y-6 pt-4">
      {/* Câu 1 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 1.</span> Trên màn hình theo dõi, em thấy có một người đứng trước camera an ninh. Người đó có biết em đang theo dõi không? Tại sao?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh (người đó có biết không? Giải thích tại sao):
          </label>
          <textarea
            value={answers.q1Text}
            onChange={(e) => onChange({ ...answers, q1Text: e.target.value })}
            placeholder="Người đó có biết/không biết em đang theo dõi vì..."
            rows={4}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên:</span>
            </div>
            <p className="whitespace-pre-line">{STANDARD_ANSWERS[4].q1}</p>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 2.</span> Máy in của em in ra những kí hiệu không mong muốn và em biết lỗi này là do virus gây ra. Em cần phải diệt virus ở máy in hay máy tính? Tại sao?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh (diệt ở máy in hay máy tính? Giải thích tại sao):
          </label>
          <textarea
            value={answers.q2Text}
            onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
            placeholder="Em cần phải diệt virus ở... vì máy in là thiết bị... còn máy tính..."
            rows={4}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên:</span>
            </div>
            <p className="whitespace-pre-line">{STANDARD_ANSWERS[4].q2}</p>
          </div>
        )}
      </section>

      {/* Câu 3 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 3.</span> Em hãy đề xuất một số quy tắc để giúp các bạn sử dụng phòng máy tính an toàn.
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh (nêu các quy tắc sử dụng phòng máy an toàn):
          </label>
          <textarea
            value={answers.q3Text}
            onChange={(e) => onChange({ ...answers, q3Text: e.target.value })}
            placeholder="Nhập các quy tắc theo từng gạch đầu dòng hoặc số thứ tự:&#10;1. Không tự ý cắm rút dây nguồn...&#10;2. Không mang đồ ăn nước uống...&#10;3. ..."
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
            <p className="whitespace-pre-line">{STANDARD_ANSWERS[4].q3}</p>
          </div>
        )}
      </section>
    </div>
  );
};
