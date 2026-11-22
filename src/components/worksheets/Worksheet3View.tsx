import React from 'react';
import { CheckCircle } from 'lucide-react';
import {
  Worksheet3Answers,
  CONNECTABLE_DEVICES,
  PORT_OPTIONS,
  STANDARD_ANSWERS,
} from '../../data/worksheetsData';

interface Worksheet3ViewProps {
  answers: Worksheet3Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet3Answers) => void;
}

export const Worksheet3View: React.FC<Worksheet3ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  const ports = answers.ports || { a: '', b: '', c: '', d: '', e: '', f: '' };

  const handlePortChange = (key: 'a' | 'b' | 'c' | 'd' | 'e' | 'f', val: string) => {
    onChange({
      ...answers,
      ports: {
        ...ports,
        [key]: val,
      },
    });
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Sơ đồ các cổng kết nối trên thân máy tính */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Hình minh họa: Các cổng cắm phía sau thân máy tính (Cổng số 1 đến số 8):
        </h3>
        <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2 flex justify-center">
          <img
            src="/assets/worksheets/phieu3_ket_noi_cong_thiet_bi.jpg"
            alt="Sơ đồ các cổng kết nối trên thân máy tính"
            className="w-full max-w-3xl h-auto object-contain rounded"
          />
        </div>
        {/* Chú giải các cổng rõ ràng cho học sinh THCS quan sát */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>• <strong>Cổng 1:</strong> Nghe âm thanh vào</div>
          <div>• <strong>Cổng 2:</strong> Cắm loa ngoài</div>
          <div>• <strong>Cổng 3:</strong> Cắm HDMI (màn hình)</div>
          <div>• <strong>Cổng 4:</strong> Cắm tai nghe (xanh lá)</div>
          <div>• <strong>Cổng 5:</strong> Cắm Micro (hồng)</div>
          <div>• <strong>Cổng 6:</strong> Cắm cáp mạng LAN</div>
          <div>• <strong>Cổng 7:</strong> Cổng cắm USB</div>
          <div>• <strong>Cổng 8:</strong> Cắm dây nguồn điện</div>
        </div>
      </div>

      {/* Câu 1 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 1.</span> Em hãy lắp các thiết bị sau vào đúng cổng của nó (ghi số của cổng tương ứng trên thân máy).
        </h2>

        {/* Danh sách các thiết bị với ô chọn số cổng đơn giản, dễ thao tác */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {CONNECTABLE_DEVICES.map((item) => {
            const currentVal = ports[item.key] || '';
            return (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <span className="text-sm font-bold text-slate-900">{item.label}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{item.hint}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-600 font-medium whitespace-nowrap">
                    cổng số:
                  </span>
                  <select
                    value={currentVal}
                    onChange={(e) => handlePortChange(item.key, e.target.value)}
                    className="text-sm font-bold px-3 py-1.5 rounded-md border border-slate-300 bg-white text-[#1D436B] focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none cursor-pointer"
                  >
                    <option value="">Chọn cổng...</option>
                    {PORT_OPTIONS.map((p) => (
                      <option key={p.portNumber} value={p.portNumber}>
                        Cổng số {p.portNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên (Câu 1):</span>
            </div>
            <p className="whitespace-pre-line">{STANDARD_ANSWERS[3].q1}</p>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          <span className="text-[#1D436B]">Câu 2.</span> Việc cấp nguồn điện cho máy tính cần được thực hiện trước hay sau các kết nối trên? Vì sao?
        </h2>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Câu trả lời của nhóm/học sinh (ghi rõ trước hay sau và giải thích vì sao):
          </label>
          <textarea
            value={answers.q2Text}
            onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
            placeholder="Việc cấp nguồn điện cần được thực hiện... vì..."
            rows={4}
            className="w-full text-sm sm:text-base p-3 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        {showAnswerKey && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Đáp án gợi ý của giáo viên (Câu 2):</span>
            </div>
            <p className="whitespace-pre-line">{STANDARD_ANSWERS[3].q2}</p>
          </div>
        )}
      </section>
    </div>
  );
};
