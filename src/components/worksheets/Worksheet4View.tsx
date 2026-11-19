import React from 'react';
import {
  Camera,
  Monitor,
  Printer,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Plus,
  Check,
} from 'lucide-react';
import { Worksheet4Answers, STANDARD_ANSWERS } from '../../data/worksheetsData';

interface Worksheet4ViewProps {
  answers: Worksheet4Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet4Answers) => void;
}

const SUGGESTED_SAFETY_RULES = [
  'Không tự ý cắm, rút hoặc thay đổi dây nguồn, dây kết nối thiết bị khi máy tính đang bật điện.',
  'Giữ tay khô ráo, không mang đồ ăn, nước uống vào phòng máy tính để tránh chập điện, hỏng thiết bị.',
  'Tắt máy tính đúng quy trình (Shut down) trước khi ra về.',
  'Không truy cập trang web lạ hoặc cắm thiết bị lưu trữ lạ chưa diệt virus vào máy tính.',
  'Báo ngay cho giáo viên phụ trách khi phát hiện dây điện bị hở, màn hình hoặc thiết bị có dấu hiệu bất thường.',
];

export const Worksheet4View: React.FC<Worksheet4ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  const handleSelectQ1 = (choice: 'khong_biet' | 'co_biet') => {
    let nextText = answers.q1Text;
    if (choice === 'khong_biet' && !nextText.trim()) {
      nextText =
        'Người đó KHÔNG biết em đang theo dõi. Vì camera an ninh là thiết bị vào (chỉ thu hình ảnh của người đứng trước camera truyền về máy tính), còn màn hình theo dõi là thiết bị ra (chỉ hiển thị hình ảnh từ máy tính ra cho em xem, không truyền hình ảnh ngược lại camera).';
    } else if (choice === 'co_biet' && !nextText.trim()) {
      nextText = 'Người đó có biết em đang theo dõi.';
    }
    onChange({
      ...answers,
      q1Choice: choice,
      q1Text: nextText,
    });
  };

  const handleSelectQ2 = (choice: 'may_tinh' | 'may_in') => {
    let nextText = answers.q2Text;
    if (choice === 'may_tinh' && !nextText.trim()) {
      nextText =
        'Em cần phải diệt virus ở MÁY TÍNH. Vì máy in chỉ là thiết bị ra (nhận thông tin từ máy tính để in ra giấy), còn virus nằm trong bộ nhớ/thiết bị lưu trữ và hoạt động tại bộ xử lí của máy tính làm máy tính gửi dữ liệu bị lỗi sang máy in.';
    } else if (choice === 'may_in' && !nextText.trim()) {
      nextText = 'Em cần phải diệt virus ở máy in.';
    }
    onChange({
      ...answers,
      q2Choice: choice,
      q2Text: nextText,
    });
  };

  const toggleSafetyRule = (rule: string) => {
    const exists = answers.q3SelectedRules.includes(rule);
    const nextRules = exists
      ? answers.q3SelectedRules.filter((r) => r !== rule)
      : [...answers.q3SelectedRules, rule];

    const formattedText = nextRules.map((r, i) => `${i + 1}. ${r}`).join('\n');
    onChange({
      ...answers,
      q3SelectedRules: nextRules,
      q3Text: formattedText,
    });
  };

  return (
    <div className="space-y-8 pt-4">
      {/* Câu 1 */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
          <span className="font-bold text-[#1D436B]">Câu 1.</span> Trên màn hình theo dõi, em thấy có một người đứng trước camera an ninh. Người đó có biết em đang theo dõi không? Tại sao?
        </h2>

        {/* Interactive Signal Flow Diagram for Security Camera Scenario */}
        <div className="no-print bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#1D436B]">
              Sơ đồ phân tích chiều truyền thông tin (Câu 1):
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectQ1('khong_biet')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q1Choice === 'khong_biet'
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Người đó KHÔNG biết
              </button>
              <button
                type="button"
                onClick={() => handleSelectQ1('co_biet')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q1Choice === 'co_biet'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Người đó CÓ biết
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs">
            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-[#0284C7] shrink-0" />
              <div>
                <p className="font-bold text-slate-900">1. Camera an ninh</p>
                <p className="text-slate-600">Thiết bị VÀO (chỉ thu hình ảnh)</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
              <ArrowRight className="w-4 h-4 text-[#0284C7] shrink-0" />
              <div className="text-center">
                <p className="font-bold text-slate-900">2. Máy tính</p>
                <p className="text-slate-500">Truyền dữ liệu 1 chiều</p>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5">
              <Monitor className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">3. Màn hình theo dõi</p>
                <p className="text-slate-600">Thiết bị RA (hiển thị cho em xem)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 dotted lines matching PDF page 5 */}
        <textarea
          rows={5}
          value={answers.q1Text}
          onChange={(e) => onChange({ ...answers, q1Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 1 (Người đó có biết không? Giải thích dựa vào chức năng của thiết bị vào và thiết bị ra)..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 1: </span>
              <span>{STANDARD_ANSWERS[4].q1}</span>
            </div>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
          <span className="font-bold text-[#1D436B]">Câu 2.</span> Máy in của em in ra những kí hiệu không mong muốn và em biết lỗi này là do virus gây ra. Em cần phải diệt virus ở máy in hay máy tính? Tại sao?
        </h2>

        {/* Interactive Selector for Question 2 */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSelectQ2('may_tinh')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
              answers.q2Choice === 'may_tinh'
                ? 'bg-[#EBF2FA] border-[#2B5B84] ring-1 ring-[#2B5B84]'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Cpu className="w-5 h-5 text-[#2B5B84] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-900">
                Phương án A: Diệt virus ở MÁY TÍNH
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Máy tính chứa Bộ xử lí và Thiết bị lưu trữ nơi virus ẩn náu và phát lệnh in.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectQ2('may_in')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
              answers.q2Choice === 'may_in'
                ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Printer className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-900">
                Phương án B: Diệt virus ở MÁY IN
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Máy in là thiết bị ra, chỉ nhận dữ liệu từ máy tính gửi sang để in ra giấy.
              </p>
            </div>
          </button>
        </div>

        {/* 7 dotted lines matching PDF page 5 */}
        <textarea
          rows={7}
          value={answers.q2Text}
          onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 2 (Cần diệt virus ở máy in hay máy tính? Tại sao?)..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 2: </span>
              <span>{STANDARD_ANSWERS[4].q2}</span>
            </div>
          </div>
        )}
      </section>

      {/* Câu 3 */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
          <span className="font-bold text-[#1D436B]">Câu 3.</span> Em hãy đề xuất một số quy tắc để giúp các bạn sử dụng phòng máy tính an toàn.
        </h2>

        {/* Interactive Safety Rule Builder */}
        <div className="no-print bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1D436B]">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <span>Nhấp chọn các quy tắc gợi ý để thêm vào danh sách đề xuất của nhóm:</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {SUGGESTED_SAFETY_RULES.map((rule) => {
              const selected = answers.q3SelectedRules.includes(rule);
              return (
                <button
                  key={rule}
                  type="button"
                  onClick={() => toggleSafetyRule(rule)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between gap-3 ${
                    selected
                      ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{rule}</span>
                  {selected ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 dotted lines matching PDF page 5 + page 6 */}
        <textarea
          rows={8}
          value={answers.q3Text}
          onChange={(e) => onChange({ ...answers, q3Text: e.target.value })}
          placeholder="Nhập các quy tắc đề xuất của nhóm giúp sử dụng phòng máy tính an toàn..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 whitespace-pre-line">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 3: </span>
              <div className="mt-1">{STANDARD_ANSWERS[4].q3}</div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
