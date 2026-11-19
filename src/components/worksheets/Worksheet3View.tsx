import React, { useState } from 'react';
import {
  Cable,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  Worksheet3Answers,
  WORKSHEET3_PORTS,
  WORKSHEET3_DEVICES,
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
  const [activeDeviceKey, setActiveDeviceKey] = useState<'a' | 'b' | 'c' | 'd' | 'e' | 'f' | null>('a');
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);
  const [checkFeedback, setCheckFeedback] = useState<boolean>(false);

  const handleAssignPort = (deviceKey: 'a' | 'b' | 'c' | 'd' | 'e' | 'f', portNum: string) => {
    const nextPorts = {
      ...answers.ports,
      [deviceKey]: portNum,
    };
    onChange({
      ...answers,
      ports: nextPorts,
    });

    // Advance to next unassigned device automatically
    const order: ('a' | 'b' | 'c' | 'd' | 'e' | 'f')[] = ['a', 'b', 'c', 'd', 'e', 'f'];
    const nextUnassigned = order.find((k) => k !== deviceKey && !nextPorts[k]);
    if (nextUnassigned) {
      setActiveDeviceKey(nextUnassigned);
    }
  };

  const handleClearPorts = () => {
    onChange({
      ...answers,
      ports: { a: '', b: '', c: '', d: '', e: '', f: '' },
    });
    setActiveDeviceKey('a');
    setCheckFeedback(false);
  };

  const handleSelectTiming = (timing: 'truoc' | 'sau') => {
    let nextText = answers.q2Text;
    if (timing === 'sau' && !nextText.trim()) {
      nextText =
        'Việc cấp nguồn điện cho máy tính cần được thực hiện SAU các kết nối trên. Vì nếu cấp nguồn điện trước khi cắm dây kết nối có thể gây chập điện, hỏng các cổng thiết bị và mất an toàn điện cho người sử dụng.';
    } else if (timing === 'truoc' && !nextText.trim()) {
      nextText = 'Việc cấp nguồn điện cho máy tính được thực hiện trước các kết nối trên.';
    }
    onChange({
      ...answers,
      q2Timing: timing,
      q2Text: nextText,
    });
  };

  const activeDeviceObj = WORKSHEET3_DEVICES.find((d) => d.key === activeDeviceKey);
  const activePortInfo = WORKSHEET3_PORTS.find((p) => p.portNumber === hoveredPort);

  return (
    <div className="space-y-8 pt-4">
      {/* Câu 1 */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
            <span className="font-bold text-[#1D436B]">Câu 1.</span> Em hãy lắp các thiết bị sau vào đúng cổng của nó (ghi số của cổng tương ứng trên thân máy).
          </h2>
          <div className="no-print flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCheckFeedback(!checkFeedback)}
              className="px-3 py-1.5 text-xs font-semibold text-[#1D436B] bg-[#D9E6F2] hover:bg-sky-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {checkFeedback ? 'Ẩn kiểm tra cổng' : 'Kiểm tra lắp cổng'}
            </button>
            <button
              type="button"
              onClick={handleClearPorts}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>
          </div>
        </div>

        {/* Interactive Image Box with Clickable Ports 1..8 and Devices a..f */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          {/* Interactive status bar */}
          <div className="no-print flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Cable className="w-4 h-4 text-[#0284C7] shrink-0" />
              {activeDeviceObj ? (
                <span>
                  Đang cầm đầu dây: <strong className="text-[#0284C7]">{activeDeviceObj.label}</strong> — Hãy nhấp vào ô số cổng <strong>1..8</strong> trên hình để cắm!
                </span>
              ) : (
                <span>Nhấp chọn một thiết bị (a–f) rồi nhấp vào cổng số (1–8) trên hình.</span>
              )}
            </div>
            {activePortInfo && (
              <span className="font-medium text-slate-700">
                Đang trỏ: <strong>{activePortInfo.label}</strong> ({activePortInfo.technicalName})
              </span>
            )}
          </div>

          {/* Exact PDF Image with Interactive SVG Cable Overlay & Clickable Badges */}
          <div className="relative max-w-3xl mx-auto">
            <img
              src="/assets/worksheets/phieu3_ket_noi_cong_thiet_bi.jpg"
              alt="Sơ đồ các cổng 1 đến 8 trên thân máy và các thiết bị a đến f"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-lg select-none"
            />

            {/* SVG Connecting Lines between assigned devices and ports */}
            <svg
              className="no-print absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {WORKSHEET3_DEVICES.map((dev) => {
                const assignedPortNum = answers.ports[dev.key];
                const portObj = WORKSHEET3_PORTS.find((p) => p.portNumber === assignedPortNum);
                if (!portObj) return null;
                const isCorrect = dev.acceptedPorts.includes(assignedPortNum);
                const strokeColor =
                  checkFeedback || showAnswerKey
                    ? isCorrect
                      ? '#059669'
                      : '#DC2626'
                    : '#0284C7';
                return (
                  <g key={`line-${dev.key}`}>
                    <line
                      x1={dev.xPercent}
                      y1={dev.yPercent}
                      x2={portObj.xPercent}
                      y2={portObj.yPercent}
                      stroke={strokeColor}
                      strokeWidth="0.6"
                      strokeDasharray="1.5 1"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Clickable Port Number Hotspots 1..8 */}
            {WORKSHEET3_PORTS.map((port) => {
              const connectedDevices = WORKSHEET3_DEVICES.filter(
                (d) => answers.ports[d.key] === port.portNumber
              );
              return (
                <button
                  key={port.portNumber}
                  type="button"
                  onMouseEnter={() => setHoveredPort(port.portNumber)}
                  onMouseLeave={() => setHoveredPort(null)}
                  onClick={() => {
                    if (activeDeviceKey) {
                      handleAssignPort(activeDeviceKey, port.portNumber);
                    }
                  }}
                  style={{ left: `${port.xPercent}%`, top: `${port.yPercent}%` }}
                  className={`no-print absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-md font-mono-tabular text-xs font-bold border-2 transition-transform shadow-sm ${
                    connectedDevices.length > 0
                      ? 'bg-[#2B5B84] text-white border-white scale-105'
                      : 'bg-white/95 text-red-600 border-red-500 hover:bg-sky-50 hover:border-[#0284C7] hover:scale-110'
                  }`}
                  title={`${port.label}: ${port.technicalName}`}
                >
                  <span>{port.portNumber}</span>
                  {connectedDevices.length > 0 && (
                    <span className="ml-1 text-[10px] text-sky-200">
                      ({connectedDevices.map((d) => d.key).join(',')})
                    </span>
                  )}
                </button>
              );
            })}

            {/* Clickable Device Hotspots a..f */}
            {WORKSHEET3_DEVICES.map((dev) => {
              const isSelected = activeDeviceKey === dev.key;
              const assignedPort = answers.ports[dev.key];
              const isCorrect = dev.acceptedPorts.includes(assignedPort);
              return (
                <button
                  key={dev.key}
                  type="button"
                  onClick={() => setActiveDeviceKey(dev.key)}
                  style={{ left: `${dev.xPercent}%`, top: `${dev.yPercent}%` }}
                  className={`no-print absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-transform shadow-sm whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-white scale-110 ring-2 ring-[#0284C7]'
                      : assignedPort
                      ? checkFeedback || showAnswerKey
                        ? isCorrect
                          ? 'bg-emerald-600 text-white border-white'
                          : 'bg-red-600 text-white border-white'
                        : 'bg-[#2B5B84] text-white border-white'
                      : 'bg-white/95 text-slate-900 border-slate-400 hover:border-[#0284C7]'
                  }`}
                >
                  <span>{dev.label}</span>
                  {assignedPort && (
                    <span className="ml-1.5 font-mono-tabular bg-black/20 px-1.5 py-0.5 rounded text-[11px]">
                      ➔ Cổng {assignedPort}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Exact 2-column Table from Page 4 of the PDF */}
        <div className="overflow-hidden rounded-lg border border-sky-200 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-sky-200">
            {[
              WORKSHEET3_DEVICES[0], // a) Bàn phím
              WORKSHEET3_DEVICES[1], // b) Dây mạng
              WORKSHEET3_DEVICES[2], // c) Chuột
              WORKSHEET3_DEVICES[3], // d) Dây màn hình
              WORKSHEET3_DEVICES[4], // e) Tai nghe
              WORKSHEET3_DEVICES[5], // f) Dây nguồn
            ].map((dev) => {
              const val = answers.ports[dev.key];
              const isCorrect = dev.acceptedPorts.includes(val.trim());
              return (
                <div
                  key={dev.key}
                  onClick={() => setActiveDeviceKey(dev.key)}
                  className={`p-3.5 flex items-center justify-between gap-3 border-b border-sky-100 cursor-pointer transition-colors ${
                    activeDeviceKey === dev.key ? 'bg-sky-50/70' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-baseline gap-1.5 text-sm sm:text-base">
                    <span className="font-bold text-slate-900">{dev.label}:</span>
                    <span className="text-slate-700">cổng số</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick dropdown / direct input */}
                    <select
                      value={val}
                      onChange={(e) => handleAssignPort(dev.key, e.target.value)}
                      className="font-mono-tabular font-bold text-sm px-2.5 py-1.5 rounded-md border border-slate-300 bg-white text-[#1D436B] focus:border-[#2B5B84] focus:outline-none"
                    >
                      <option value="">.......</option>
                      {['1', '2', '3', '4', '5', '6', '7', '8'].map((n) => (
                        <option key={n} value={n}>
                          Cổng {n}
                        </option>
                      ))}
                    </select>

                    {(checkFeedback || showAnswerKey) && val && (
                      <span
                        className={`text-xs font-semibold flex items-center gap-1 whitespace-nowrap shrink-0 ${
                          isCorrect ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Đúng</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4" />
                            <span>Đáp án: {dev.correctPort}</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showAnswerKey && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 1: </span>
              <span>{STANDARD_ANSWERS[3].q1}</span>
            </div>
          </div>
        )}
      </section>

      {/* Câu 2 */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
            <span className="font-bold text-[#1D436B]">Câu 2.</span> Việc cấp nguồn điện cho máy tính cần được thực hiện trước hay sau các kết nối trên? Vì sao?
          </h2>

          <div className="no-print flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectTiming('truoc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                answers.q2Timing === 'truoc'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cấp nguồn TRƯỚC kết nối</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectTiming('sau')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                answers.q2Timing === 'sau'
                  ? 'bg-[#2B5B84] text-white border-[#2B5B84]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cấp nguồn SAU kết nối</span>
            </button>
          </div>
        </div>

        {/* 6 dotted lines matching PDF page 4 */}
        <textarea
          rows={6}
          value={answers.q2Text}
          onChange={(e) => onChange({ ...answers, q2Text: e.target.value })}
          placeholder="Nhập câu trả lời Câu 2 (Cấp nguồn điện trước hay sau khi lắp các dây kết nối? Giải thích vì sao?)..."
          className="w-full px-3 worksheet-dotted-textarea text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/30 rounded-md resize-none"
        />

        {showAnswerKey && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đáp án chuẩn Câu 2: </span>
              <span>{STANDARD_ANSWERS[3].q2}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
