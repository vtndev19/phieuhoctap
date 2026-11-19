export interface GroupProfile {
  groupName: string;
  className: string;
  members: string;
}

export interface Worksheet1Answers {
  q1SelectedTypes: string[];
  q1Text: string;
  q2SelectedDevice: string;
  q2Text: string;
  q3SelectedDevice: string;
  q3Text: string;
}

export interface Worksheet2Answers {
  q1DeviceMap: Record<string, string[]>; // deviceId -> info types ('van_ban' | 'hinh_anh' | 'am_thanh')
  q1DualFunctionDevice: string;
  q1Text: string;
  q2Role: string; // 'vao' | 'ra' | 'ca_hai'
  q2InfoTypes: string[];
  q2Text: string;
  q3Role: string; // 'vao' | 'ra' | 'ca_hai'
  q3Text: string;
  q4Role: string; // 'vao' | 'ra' | 'ca_hai'
  q4Text: string;
}

export interface Worksheet3Answers {
  ports: {
    a: string; // Bàn phím -> 7
    b: string; // Dây mạng -> 6
    c: string; // Chuột -> 7
    d: string; // Dây màn hình -> 3
    e: string; // Tai nghe -> 4
    f: string; // Dây nguồn -> 8
  };
  q2Timing: string; // 'truoc' | 'sau'
  q2Text: string;
}

export interface Worksheet4Answers {
  q1Choice: string; // 'khong_biet' | 'co_biet'
  q1Text: string;
  q2Choice: string; // 'may_tinh' | 'may_in'
  q2Text: string;
  q3SelectedRules: string[];
  q3Text: string;
}

export type WorksheetId = 1 | 2 | 3 | 4;

export interface WorksheetMeta {
  id: WorksheetId;
  numberLabel: string;
  title: string;
  activityCode: string;
  durationMinutes: number;
  pageLabel: string;
  shortDesc: string;
  thumbnailImg: string;
  questionCount: number;
}

export interface WorksheetSubmission {
  id: string;
  worksheetId: WorksheetId;
  group: GroupProfile;
  answers: Worksheet1Answers | Worksheet2Answers | Worksheet3Answers | Worksheet4Answers;
  autoScore: number; // 0 - 100
  teacherScore?: number; // 0 - 100
  teacherComment?: string;
  timeSpentSeconds: number;
  submittedAt: string;
}

export const WORKSHEETS_META: WorksheetMeta[] = [
  {
    id: 1,
    numberLabel: 'SỐ 1',
    title: 'Phân biệt thiết bị vào, thiết bị ra',
    activityCode: 'Hoạt động 2.1.1',
    durationMinutes: 15,
    pageLabel: 'Trang 1 / 6',
    shortDesc: 'Quan sát micro và loa, xác định dạng thông tin làm việc và chiều thông tin đi vào hay đi ra khỏi máy tính.',
    thumbnailImg: '/assets/worksheets/phieu1_micro_loa.jpg',
    questionCount: 3,
  },
  {
    id: 2,
    numberLabel: 'SỐ 2',
    title: 'Sự đa dạng của thiết bị vào – ra',
    activityCode: 'Hoạt động 2.1.2',
    durationMinutes: 20,
    pageLabel: 'Trang 2 - 3 / 6',
    shortDesc: 'Tìm hiểu sơ đồ Hình 1.2 về các thiết bị vào – ra, máy chiếu, bộ điều khiển game và màn hình cảm ứng.',
    thumbnailImg: '/assets/worksheets/phieu2_hinh1_2_thiet_bi_vao_ra.jpg',
    questionCount: 4,
  },
  {
    id: 3,
    numberLabel: 'SỐ 3',
    title: 'Kết nối thiết bị vào – ra',
    activityCode: 'Hoạt động 2.2.1',
    durationMinutes: 10,
    pageLabel: 'Trang 4 / 6',
    shortDesc: 'Thực hành lắp bàn phím, dây mạng, chuột, dây màn hình, tai nghe, dây nguồn vào đúng cổng 1–8 trên thân máy.',
    thumbnailImg: '/assets/worksheets/phieu3_ket_noi_cong_thiet_bi.jpg',
    questionCount: 2,
  },
  {
    id: 4,
    numberLabel: 'SỐ 4',
    title: 'Vận dụng',
    activityCode: 'Hoạt động 4',
    durationMinutes: 15,
    pageLabel: 'Trang 5 - 6 / 6',
    shortDesc: 'Giải quyết tình huống thực tế về camera an ninh, xử lý lỗi máy in nhiễm virus và đề xuất quy tắc phòng máy an toàn.',
    thumbnailImg: '/assets/worksheets/phieu2_man_hinh_cam_ung.jpg',
    questionCount: 3,
  },
];

export const DEFAULT_W1_ANSWERS: Worksheet1Answers = {
  q1SelectedTypes: [],
  q1Text: '',
  q2SelectedDevice: '',
  q2Text: '',
  q3SelectedDevice: '',
  q3Text: '',
};

export const DEFAULT_W2_ANSWERS: Worksheet2Answers = {
  q1DeviceMap: {},
  q1DualFunctionDevice: '',
  q1Text: '',
  q2Role: '',
  q2InfoTypes: [],
  q2Text: '',
  q3Role: '',
  q3Text: '',
  q4Role: '',
  q4Text: '',
};

export const DEFAULT_W3_ANSWERS: Worksheet3Answers = {
  ports: { a: '', b: '', c: '', d: '', e: '', f: '' },
  q2Timing: '',
  q2Text: '',
};

export const DEFAULT_W4_ANSWERS: Worksheet4Answers = {
  q1Choice: '',
  q1Text: '',
  q2Choice: '',
  q2Text: '',
  q3SelectedRules: [],
  q3Text: '',
};

// Devices in Hình 1.2 for interactive hotspot mapping
export interface DiagramDeviceHotspot {
  id: string;
  name: string;
  zone: 'vao' | 'ra' | 'ca_hai';
  expectedInfo: ('van_ban' | 'hinh_anh' | 'am_thanh')[];
  description: string;
  // Percentage coordinates on phieu2_hinh1_2_thiet_bi_vao_ra.jpg (703x333)
  xPercent: number;
  yPercent: number;
}

export const HINH_1_2_DEVICES: DiagramDeviceHotspot[] = [
  {
    id: 'chuot',
    name: 'Chuột máy tính',
    zone: 'vao',
    expectedInfo: ['van_ban'],
    description: 'Tiếp nhận thao tác điều khiển, tọa độ trỏ chuột đưa vào máy tính.',
    xPercent: 9,
    yPercent: 24,
  },
  {
    id: 'micro',
    name: 'Micro',
    zone: 'vao',
    expectedInfo: ['am_thanh'],
    description: 'Tiếp nhận thông tin dạng âm thanh chuyển vào máy tính.',
    xPercent: 19,
    yPercent: 18,
  },
  {
    id: 'camera',
    name: 'Camera an ninh / Webcam',
    zone: 'vao',
    expectedInfo: ['hinh_anh'],
    description: 'Thu nhận thông tin dạng hình ảnh (và video) đưa vào máy tính.',
    xPercent: 31,
    yPercent: 22,
  },
  {
    id: 'ban_phim',
    name: 'Bàn phím',
    zone: 'vao',
    expectedInfo: ['van_ban'],
    description: 'Tiếp nhận chữ, số, kí hiệu và lệnh điều khiển vào máy tính.',
    xPercent: 20,
    yPercent: 45,
  },
  {
    id: 'may_quet',
    name: 'Máy quét (Scanner)',
    zone: 'vao',
    expectedInfo: ['hinh_anh', 'van_ban'],
    description: 'Chuyển hình ảnh, văn bản trên giấy thành dữ liệu số đưa vào máy tính.',
    xPercent: 10,
    yPercent: 66,
  },
  {
    id: 'man_hinh_cam_ung',
    name: 'Màn hình cảm ứng / Bảng viết cảm ứng',
    zone: 'ca_hai',
    expectedInfo: ['hinh_anh', 'van_ban'],
    description: 'Vừa hiển thị hình ảnh/văn bản (thiết bị ra), vừa nhận thao tác chạm/bút viết (thiết bị vào).',
    xPercent: 29,
    yPercent: 66,
  },
  {
    id: 'man_hinh',
    name: 'Màn hình máy tính',
    zone: 'ra',
    expectedInfo: ['hinh_anh', 'van_ban'],
    description: 'Hiển thị thông tin dạng hình ảnh, văn bản từ máy tính ra ngoài.',
    xPercent: 74,
    yPercent: 24,
  },
  {
    id: 'tai_nghe',
    name: 'Tai nghe',
    zone: 'ra',
    expectedInfo: ['am_thanh'],
    description: 'Đưa thông tin dạng âm thanh từ máy tính ra cho người nghe.',
    xPercent: 81,
    yPercent: 48,
  },
  {
    id: 'may_in',
    name: 'Máy in',
    zone: 'ra',
    expectedInfo: ['van_ban', 'hinh_anh'],
    description: 'Xuất thông tin dạng văn bản, hình ảnh từ máy tính ra giấy.',
    xPercent: 71,
    yPercent: 66,
  },
  {
    id: 'loa',
    name: 'Loa máy tính',
    zone: 'ra',
    expectedInfo: ['am_thanh'],
    description: 'Phát thông tin dạng âm thanh từ máy tính ra môi trường bên ngoài.',
    xPercent: 91,
    yPercent: 63,
  },
];

// Ports 1..8 and Devices a..f for Worksheet 3 interactive matching
export interface PortHotspot {
  portNumber: string;
  label: string;
  technicalName: string;
  xPercent: number;
  yPercent: number;
}

export const WORKSHEET3_PORTS: PortHotspot[] = [
  { portNumber: '1', label: 'Cổng số 1', technicalName: 'Cổng âm thanh vào (Line In - Xanh dương)', xPercent: 3.7, yPercent: 8.5 },
  { portNumber: '2', label: 'Cổng số 2', technicalName: 'Cổng loa ngoài (Line Out - Đen)', xPercent: 9.1, yPercent: 8.5 },
  { portNumber: '3', label: 'Cổng số 3', technicalName: 'Cổng truyền hình ảnh HDMI', xPercent: 20.6, yPercent: 8.5 },
  { portNumber: '4', label: 'Cổng số 4', technicalName: 'Cổng tai nghe (Headphone - Xanh lá)', xPercent: 3.7, yPercent: 54.0 },
  { portNumber: '5', label: 'Cổng số 5', technicalName: 'Cổng Micro (Mic In - Hồng)', xPercent: 9.1, yPercent: 54.0 },
  { portNumber: '6', label: 'Cổng số 6', technicalName: 'Cổng mạng LAN (RJ45)', xPercent: 20.6, yPercent: 54.0 },
  { portNumber: '7', label: 'Cổng số 7', technicalName: 'Cổng USB (2 khe cắm USB-A)', xPercent: 31.6, yPercent: 54.0 },
  { portNumber: '8', label: 'Cổng số 8', technicalName: 'Ổ cắm dây nguồn điện (3 chấu)', xPercent: 44.5, yPercent: 54.0 },
];

export interface ConnectableDevice {
  key: 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
  label: string;
  correctPort: string;
  acceptedPorts: string[];
  connectorHint: string;
  xPercent: number;
  yPercent: number;
}

export const WORKSHEET3_DEVICES: ConnectableDevice[] = [
  {
    key: 'a',
    label: 'a) Bàn phím',
    correctPort: '7',
    acceptedPorts: ['7'],
    connectorHint: 'Đầu cắm USB chữ nhật phẳng -> lắp vào cổng USB số 7',
    xPercent: 75,
    yPercent: 31,
  },
  {
    key: 'b',
    label: 'b) Dây mạng',
    correctPort: '6',
    acceptedPorts: ['6'],
    connectorHint: 'Đầu bấm mạng RJ45 có lẫy cài -> lắp vào cổng mạng số 6',
    xPercent: 14,
    yPercent: 81,
  },
  {
    key: 'c',
    label: 'c) Chuột',
    correctPort: '7',
    acceptedPorts: ['7'],
    connectorHint: 'Đầu cắm USB chữ nhật phẳng -> lắp vào cổng USB số 7',
    xPercent: 36,
    yPercent: 81,
  },
  {
    key: 'd',
    label: 'd) Dây màn hình',
    correctPort: '3',
    acceptedPorts: ['3'],
    connectorHint: 'Đầu cáp HDMI hình thang vát 2 góc -> lắp vào cổng HDMI số 3',
    xPercent: 54,
    yPercent: 81,
  },
  {
    key: 'e',
    label: 'e) Tai nghe',
    correctPort: '4',
    acceptedPorts: ['4', '2'],
    connectorHint: 'Giắc âm thanh tròn 3.5mm -> lắp vào cổng số 4 (có biểu tượng tai nghe)',
    xPercent: 71,
    yPercent: 81,
  },
  {
    key: 'f',
    label: 'f) Dây nguồn',
    correctPort: '8',
    acceptedPorts: ['8'],
    connectorHint: 'Đầu cắm nguồn 3 lỗ lớn -> lắp vào ổ nguồn số 8',
    xPercent: 88,
    yPercent: 81,
  },
];

// Standard Answer Keys for Teacher & Student Review
export const STANDARD_ANSWERS = {
  1: {
    q1: 'Các thiết bị trong hình (Micro và Loa) đều làm việc với thông tin dạng âm thanh.',
    q2: 'Micro là thiết bị tiếp nhận thông tin (âm thanh từ người nói/môi trường) và chuyển vào máy tính (Thiết bị vào).',
    q3: 'Loa là thiết bị nhận thông tin từ máy tính và đưa ra bên ngoài dưới dạng âm thanh (Thiết bị ra).',
  },
  2: {
    q1: `- Thiết bị vào: Chuột (tọa độ/điều khiển), Micro (âm thanh), Camera (hình ảnh), Bàn phím (văn bản/số/kí hiệu), Máy quét (hình ảnh/văn bản), Tấm/Màn hình cảm ứng (chạm/văn bản/hình ảnh).
- Thiết bị ra: Màn hình (hình ảnh/văn bản), Tai nghe (âm thanh), Máy in (văn bản/hinh ảnh ra giấy), Loa (âm thanh), Màn hình cảm ứng (hiển thị hình ảnh/văn bản).
- Thiết bị có cả hai chức năng vào và ra: Màn hình cảm ứng (hoặc bảng viết cảm ứng xuất hiện ở cả hai khung Thiết bị vào và Thiết bị ra).`,
    q2: 'Máy chiếu là thiết bị ra. Máy chiếu nhận dữ liệu từ máy tính và chiếu ra màn chắn dưới dạng thông tin hình ảnh (và văn bản).',
    q3: 'Bộ điều khiển game (tay cầm chơi game) là thiết bị vào vì nó tiếp nhận các thao tác bấm nút, điều hướng của người chơi gửi vào máy tính.',
    q4: 'Màn hình cảm ứng có cả hai chức năng vào và ra: vừa hiển thị thông tin hình ảnh, văn bản từ máy tính ra ngoài (chức năng ra), vừa tiếp nhận thao tác chạm tay hoặc bút cảm ứng đưa vào máy tính (chức năng vào).',
  },
  3: {
    q1: 'a) Bàn phím: cổng số 7 | b) Dây mạng: cổng số 6 | c) Chuột: cổng số 7 | d) Dây màn hình: cổng số 3 | e) Tai nghe: cổng số 4 | f) Dây nguồn: cổng số 8',
    q2: 'Việc cấp nguồn điện cho máy tính cần được thực hiện SAU các kết nối trên. Vì nếu cắm nguồn điện trước khi lắp các cáp thiết bị, có thể xảy ra chập điện, phóng tia lửa điện gây hư hỏng cổng kết nối của thiết bị và mất an toàn điện cho người sử dụng.',
  },
  4: {
    q1: 'Người đó KHÔNG biết em đang theo dõi. Vì camera an ninh là thiết bị vào (chỉ thu nhận hình ảnh tại vị trí lắp camera rồi truyền một chiều về máy tính), còn màn hình theo dõi là thiết bị ra (chỉ hiển thị hình ảnh từ máy tính cho em xem, không truyền hình ảnh của em ngược lại camera).',
    q2: 'Em cần phải diệt virus ở MÁY TÍNH. Vì máy in chỉ là thiết bị ra (nhận dữ liệu từ máy tính để in ra giấy), còn virus máy tính là đoạn mã độc nằm trong thiết bị lưu trữ và hoạt động tại bộ xử lí của máy tính khiến máy tính gửi dữ liệu sai lệch sang máy in.',
    q3: `Một số quy tắc sử dụng phòng máy tính an toàn:
1. Không tự ý cắm, rút hoặc thay đổi dây nguồn, dây kết nối thiết bị khi máy tính đang bật điện.
2. Giữ tay khô ráo, không mang đồ ăn, nước uống vào phòng máy để tránh đổ nước gây chập điện, hỏng bàn phím/chuột.
3. Tắt máy tính đúng quy trình (Shut down) trước khi ngắt nguồn điện.
4. Không truy cập các đường dẫn lạ hoặc cắm USB chưa kiểm tra để phòng tránh virus máy tính.`,
  },
};

// Auto-grading calculator (returns 0 - 100)
export function calculateWorksheetScore(
  worksheetId: WorksheetId,
  answers: Worksheet1Answers | Worksheet2Answers | Worksheet3Answers | Worksheet4Answers
): number {
  if (worksheetId === 1) {
    const a = answers as Worksheet1Answers;
    let pts = 0;
    if (a.q1SelectedTypes.includes('am_thanh') || a.q1Text.toLowerCase().includes('âm thanh')) pts += 34;
    if (a.q2SelectedDevice === 'micro' || a.q2Text.toLowerCase().includes('micro')) pts += 33;
    if (a.q3SelectedDevice === 'loa' || a.q3Text.toLowerCase().includes('loa')) pts += 33;
    return pts;
  }

  if (worksheetId === 2) {
    const a = answers as Worksheet2Answers;
    let pts = 0;
    const mappedCount = Object.keys(a.q1DeviceMap || {}).length;
    if (mappedCount >= 4 || a.q1Text.trim().length > 25) pts += 15;
    if (
      a.q1DualFunctionDevice === 'man_hinh_cam_ung' ||
      a.q1Text.toLowerCase().includes('cảm ứng')
    ) {
      pts += 15;
    }
    if (a.q2Role === 'ra' || a.q2Text.toLowerCase().includes('thiết bị ra')) pts += 15;
    if (
      a.q2InfoTypes.includes('hinh_anh') ||
      a.q2Text.toLowerCase().includes('hình ảnh')
    ) {
      pts += 10;
    }
    if (a.q3Role === 'vao' || a.q3Text.toLowerCase().includes('thiết bị vào')) pts += 20;
    if (a.q4Role === 'ca_hai' || a.q4Text.toLowerCase().includes('cả hai')) pts += 25;
    return Math.min(100, pts);
  }

  if (worksheetId === 3) {
    const a = answers as Worksheet3Answers;
    let pts = 0;
    if (a.ports.a.trim() === '7') pts += 12;
    if (a.ports.b.trim() === '6') pts += 12;
    if (a.ports.c.trim() === '7') pts += 12;
    if (a.ports.d.trim() === '3') pts += 12;
    if (a.ports.e.trim() === '4' || a.ports.e.trim() === '2') pts += 12;
    if (a.ports.f.trim() === '8') pts += 12;
    if (a.q2Timing === 'sau' || a.q2Text.toLowerCase().includes('sau')) pts += 16;
    if (a.q2Text.trim().length >= 15) pts += 12;
    return Math.min(100, pts);
  }

  if (worksheetId === 4) {
    const a = answers as Worksheet4Answers;
    let pts = 0;
    if (a.q1Choice === 'khong_biet' || a.q1Text.toLowerCase().includes('không')) pts += 20;
    if (a.q1Text.trim().length >= 15) pts += 13;
    if (a.q2Choice === 'may_tinh' || a.q2Text.toLowerCase().includes('máy tính')) pts += 20;
    if (a.q2Text.trim().length >= 15) pts += 14;
    if (a.q3SelectedRules.length >= 2 || a.q3Text.trim().length >= 20) pts += 33;
    return Math.min(100, pts);
  }

  return 0;
}


