import React, { useState } from 'react';
import { Check, Sparkles, Wand2, MousePointerClick } from 'lucide-react';
import {
  Worksheet2Answers,
  HINH_1_2_DEVICES,
  DiagramDeviceHotspot,
  STANDARD_ANSWERS,
} from '../../data/worksheetsData';

interface Worksheet2ViewProps {
  answers: Worksheet2Answers;
  showAnswerKey: boolean;
  onChange: (next: Worksheet2Answers) => void;
}

const INFO_LABELS: { id: 'van_ban' | 'hinh_anh' | 'am_thanh'; label: string }[] = [
  { id: 'van_ban', label: 'Văn bản / Lệnh điều khiển' },
  { id: 'hinh_anh', label: 'Hình ảnh' },
  { id: 'am_thanh', label: 'Âm thanh' },
];

export const Worksheet2View: React.FC<Worksheet2ViewProps> = ({
  answers,
  showAnswerKey,
  onChange,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DiagramDeviceHotspot>(HINH_1_2_DEVICES[0]);

  const toggleDeviceInfoType = (deviceId: string, infoId: 'van_ban' | 'hinh_anh' | 'am_thanh') => {
    const current = answers.q1DeviceMap[deviceId] || [];
    const exists = current.includes(infoId);
    const updated = exists ? current.filter((x) => x !== infoId) : [...current, infoId];
    onChange({
      ...answers,
      q1DeviceMap: {
        ...answers.q1DeviceMap,
        [deviceId]: updated,
      },
    });
  };

  const handleGenerateQ1Summary = () => {
    const summary = `- Thiết bị vào: Chuột (điều khiển), Micro (âm thanh), Camera (hình ảnh), Bàn phím (văn bản, số, kí hiệu), Máy quét (hình ảnh, văn bản), Màn hình/bảng cảm ứng (thao tác chạm, chữ viết).
- Thiết bị ra: Màn hình (hình ảnh, văn bản), Tai nghe (âm thanh), Máy in (văn bản, hình ảnh), Loa (âm thanh), Màn hình/bảng cảm ứng (hiển thị hình ảnh, văn bản).
- Thiết bị có cả hai chức năng vào và ra: Màn hình cảm ứng / Bảng viết cảm ứng (xuất hiện ở cả khung Thiết bị vào và Thiết bị ra).`;

    onChange({
      ...answers,
      q1DualFunctionDevice: 'man_hinh_cam_ung',
      q1Text: summary,
    });
  };

  const handleSelectQ2Role = (role: 'vao' | 'ra' | 'ca_hai') => {
    const nextText =
      role === 'ra'
        ? 'Máy chiếu là thiết bị ra. Máy chiếu làm việc với thông tin dạng hình ảnh (và văn bản) để chiếu từ máy tính lên màn chiếu.'
        : answers.q2Text;
    onChange({
      ...answers,
      q2Role: role,
      q2InfoTypes: role === 'ra' ? ['hinh_anh'] : answers.q2InfoTypes,
      q2Text: nextText,
    });
  };

  const handleSelectQ3Role = (role: 'vao' | 'ra') => {
    const nextText =
      role === 'vao'
        ? 'Bộ điều khiển game là thiết bị vào vì nó tiếp nhận thao tác bấm nút điều khiển của người chơi và truyền vào máy tính.'
        : 'Bộ điều khiển game là thiết bị ra.';
    onChange({
      ...answers,
      q3Role: role,
      q3Text: nextText,
    });
  };

  const handleSelectQ4Role = (role: 'vao' | 'ra' | 'ca_hai') => {
    const nextText =
      role === 'ca_hai'
        ? 'Màn hình cảm ứng có cả hai chức năng vào và ra (vừa hiển thị hình ảnh/văn bản từ máy tính ra ngoài, vừa nhận thao tác chạm tay đưa vào máy tính).'
        : answers.q4Text;
    onChange({
      ...answers,
      q4Role: role,
      q4Text: nextText,
    });
  };

  return (
    <div className="space-y-8 pt-4">
      {/* Hình 1.2. Thiết bị vào – ra (Gốc từ PDF kèm điểm chạm tương tác) */}
      <div className="space-y-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="relative max-w-3xl mx-auto">
            <img
              src="/assets/worksheets/phieu2_hinh1_2_thiet_bi_vao_ra.jpg"
              alt="Hình 1.2. Thiết bị vào – ra"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-lg select-none"
            />

            {/* Hotspots over each device in Hình 1.2 */}
            {HINH_1_2_DEVICES.map((dev, idx) => {
              const isSelected = selectedDevice.id === dev.id;
              const isClassified = (answers.q1DeviceMap[dev.id] || []).length > 0;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => setSelectedDevice(dev)}
                  style={{ left: `${dev.xPercent}%`, top: `${dev.yPercent}%` }}
                  className={`no-print absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full font-mono-tabular text-xs font-bold flex items-center justify-center transition-transform shadow-sm border-2 ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-white scale-115 z-20 ring-2 ring-[#0284C7]'
                      : isClassified
                      ? 'bg-emerald-600 text-white border-white z-10'
                      : 'bg-white/95 text-[#1D436B] border-[#2B5B84] hover:scale-110 z-10'
                  }`}
                  title={`Nhấp để phân loại: ${dev.name}`}
                >
                  {isClassified ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>

          {/* Interactive Inspector Deck for Hình 1.2 */}
          <div className="no-print mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MousePointerClick className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Nhấp các số 1–10 trên Hình 1.2 để khám phá và gắn dạng thông tin:</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#1D436B]">
                    Thiết bị đang chọn: {selectedDevice.name}
                  </span>
                  <span className="text-xs font-medium text-slate-600">
                    Nhóm:{' '}
                    <strong>
                      {selectedDevice.zone === 'vao'
                        ? 'Thiết bị vào'
                        : selectedDevice.zone === 'ra'
                        ? 'Thiết bị ra'
                        : 'Cả hai chức năng vào và ra'}
                    </strong>
                  </span>
                </div>
                <p className="text-xs text-slate-600">{selectedDevice.description}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-700">Dạng thông tin:</span>
                  {INFO_LABELS.map((info) => {
                    const active = (answers.q1DeviceMap[selectedDevice.id] || []).includes(info.id);
                    return (
                      <button
                        key={info.id}
                        type="button"
                        onClick={() => toggleDeviceInfoType(selectedDevice.id, info.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                        <span>{info.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#EBF2FA] p-3.5 rounded-lg border border-sky-200 space-y-2.5">
              <p className="text-xs font-semibold text-[#1D436B]">
                Thiết bị nào xuất hiện ở cả khung Thiết bị vào và Thiết bị ra trong Hình 1.2?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'man_hinh_cam_ung', label: 'Màn hình / Bảng cảm ứng' },
                  { id: 'may_quet', label: 'Máy quét' },
                  { id: 'may_in', label: 'Máy in' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange({ ...answers, q1DualFunctionDevice: opt.id })}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                      answers.q1DualFunctionDevice === opt.id
                        ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleGenerateQ1Summary}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#2B5B84] hover:bg-[#1E4466] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Tổng hợp nhanh vào dòng trả lời Câu 1</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Câu 1 */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
          <span className="font-bold text-[#1D436B]">Câu 1.</span> Mỗi thiết bị vào – ra trong hình trên làm việc với dạng thông tin nào? Thiết bị nào có cả hai chức năng vào và ra?
        </h2>

        <textarea
          rows={5}
          value={answers.q1Text}
          onChange={(e) => onChange({ ...answers, q1Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 1 cho từng thiết bị trong Hình 1.2 và chỉ ra thiết bị có cả hai chức năng vào và ra..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 whitespace-pre-line">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 1: </span>
              <div className="mt-1">{STANDARD_ANSWERS[2].q1}</div>
            </div>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
            <span className="font-bold text-[#1D436B]">Câu 2.</span> Máy chiếu là thiết bị vào hay thiết bị ra? Máy chiếu làm việc với dạng thông tin nào?
          </h2>
          <div className="no-print flex flex-wrap items-center gap-1.5">
            {[
              { id: 'vao', label: 'Thiết bị vào' },
              { id: 'ra', label: 'Thiết bị ra' },
              { id: 'ca_hai', label: 'Cả vào và ra' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectQ2Role(r.id as 'vao' | 'ra' | 'ca_hai')}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q2Role === r.id
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={2}
          value={answers.q2Text}
          onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 2 về máy chiếu..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 2: </span>
              <span>{STANDARD_ANSWERS[2].q2}</span>
            </div>
          </div>
        )}
      </section>

      {/* Trang 3/6 của PDF: Câu 3 và Câu 4 bố cục 2 cột song song */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
        {/* Câu 3 */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
            <span className="font-bold text-[#1D436B]">Câu 3.</span> Bộ điều khiển game là thiết bị vào hay thiết bị ra?
          </h2>

          <div className="flex flex-col items-center bg-white p-4 rounded-xl border border-slate-200">
            <img
              src="/assets/worksheets/phieu2_bo_dieu_khien_game.jpg"
              alt="a) Bộ điều khiển game"
              referrerPolicy="no-referrer"
              className="h-36 w-auto object-contain"
            />
            <div className="no-print flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => handleSelectQ3Role('vao')}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q3Role === 'vao'
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Thiết bị vào
              </button>
              <button
                type="button"
                onClick={() => handleSelectQ3Role('ra')}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q3Role === 'ra'
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Thiết bị ra
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={answers.q3Text}
            onChange={(e) => onChange({ ...answers, q3Text: e.target.value })}
            placeholder="Nhập câu trả lời Câu 3..."
            className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
          />

          {showAnswerKey && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Đáp án chuẩn Câu 3: </span>
                <span>{STANDARD_ANSWERS[2].q3}</span>
              </div>
            </div>
          )}
        </section>

        {/* Câu 4 */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
            <span className="font-bold text-[#1D436B]">Câu 4.</span> Màn hình cảm ứng là thiết bị vào, thiết bị ra hay có cả hai chức năng vào và ra?
          </h2>

          <div className="flex flex-col items-center bg-white p-4 rounded-xl border border-slate-200">
            <img
              src="/assets/worksheets/phieu2_man_hinh_cam_ung.jpg"
              alt="b) Màn hình cảm ứng"
              referrerPolicy="no-referrer"
              className="h-36 w-auto object-contain"
            />
            <div className="no-print flex flex-wrap items-center justify-center gap-1.5 mt-3">
              <button
                type="button"
                onClick={() => handleSelectQ4Role('vao')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q4Role === 'vao'
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Thiết bị vào
              </button>
              <button
                type="button"
                onClick={() => handleSelectQ4Role('ra')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q4Role === 'ra'
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Thiết bị ra
              </button>
              <button
                type="button"
                onClick={() => handleSelectQ4Role('ca_hai')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  answers.q4Role === 'ca_hai'
                    ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Cả hai chức năng vào và ra
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={answers.q4Text}
            onChange={(e) => onChange({ ...answers, q4Text: e.target.value })}
            placeholder="Nhập câu trả lời Câu 4..."
            className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
          />

          {showAnswerKey && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Đáp án chuẩn Câu 4: </span>
                <span>{STANDARD_ANSWERS[2].q4}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
