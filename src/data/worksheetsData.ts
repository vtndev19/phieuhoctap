export interface GroupProfile {
  groupName: string;
  className: string;
  members: string;
}

export interface Worksheet1Answers {
  q1Text: string;
  q2Text: string;
  q3Text: string;
  // Backward compatibility fields
  q1SelectedTypes?: string[];
  q2SelectedDevice?: string;
  q3SelectedDevice?: string;
}

export interface Worksheet2Answers {
  q1Text: string;
  q2Text: string;
  q3Text: string;
  q4Text: string;
  // Backward compatibility fields
  q1DeviceMap?: Record<string, string[]>;
  q1DualFunctionDevice?: string;
  q2Role?: string;
  q2InfoTypes?: string[];
  q3Role?: string;
  q4Role?: string;
}

export interface Worksheet3Answers {
  ports: {
    a: string; // Bàn phím -> 7
    b: string; // Dây mạng -> 6
    c: string; // Chuột -> 7
    d: string; // Dây màn hình -> 3
    e: string; // Tai nghe -> 4 (hoặc 2)
    f: string; // Dây nguồn -> 8
  };
  q2Text: string;
  // Backward compatibility fields
  q2Timing?: string;
}

export interface Worksheet4Answers {
  q1Text: string;
  q2Text: string;
  q3Text: string;
  // Backward compatibility fields
  q1Choice?: string;
  q2Choice?: string;
  q3SelectedRules?: string[];
}

export type WorksheetId = 1 | 2 | 3 | 4;

export interface WorksheetMeta {
  id: WorksheetId;
  lessonSection: string; // "TIẾT 1" hoặc "TIẾT 2"
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
    lessonSection: 'TIẾT 1  –  Phiếu học tập số 1 và số 2',
    numberLabel: 'SỐ 1',
    title: 'Phân biệt thiết bị vào, thiết bị ra',
    activityCode: 'Hoạt động 2.1.1 • 15 phút',
    durationMinutes: 15,
    pageLabel: 'Tiết 1 • Phiếu 1',
    shortDesc: 'Quan sát các thiết bị trong hình (Micro và Loa), xác định dạng thông tin và chiều đi của thông tin vào hoặc ra máy tính.',
    thumbnailImg: '/assets/worksheets/phieu1_micro_loa.jpg',
    questionCount: 3,
  },
  {
    id: 2,
    lessonSection: 'TIẾT 1  –  Phiếu học tập số 1 và số 2',
    numberLabel: 'SỐ 2',
    title: 'Sự đa dạng của thiết bị vào – ra',
    activityCode: 'Hoạt động 2.1.2 • 20 phút',
    durationMinutes: 20,
    pageLabel: 'Tiết 1 • Phiếu 2',
    shortDesc: 'Tìm hiểu sơ đồ Hình 1.2 về sự đa dạng của các thiết bị vào – ra, máy chiếu, bộ điều khiển game và màn hình cảm ứng.',
    thumbnailImg: '/assets/worksheets/phieu2_hinh1_2_thiet_bi_vao_ra.jpg',
    questionCount: 4,
  },
  {
    id: 3,
    lessonSection: 'TIẾT 2  –  Phiếu học tập số 3 và số 4',
    numberLabel: 'SỐ 3',
    title: 'Kết nối thiết bị vào – ra',
    activityCode: 'Hoạt động 2.2.1 • 10 phút',
    durationMinutes: 10,
    pageLabel: 'Tiết 2 • Phiếu 3',
    shortDesc: 'Quan sát sơ đồ các cổng trên thân máy tính và xác định số cổng tương ứng để cắm bàn phím, chuột, dây mạng, màn hình, tai nghe, dây nguồn.',
    thumbnailImg: '/assets/worksheets/phieu3_ket_noi_cong_thiet_bi.jpg',
    questionCount: 2,
  },
  {
    id: 4,
    lessonSection: 'TIẾT 2  –  Phiếu học tập số 3 và số 4',
    numberLabel: 'SỐ 4',
    title: 'Vận dụng',
    activityCode: 'Hoạt động 4 • 15 phút',
    durationMinutes: 15,
    pageLabel: 'Tiết 2 • Phiếu 4',
    shortDesc: 'Vận dụng kiến thức giải quyết tình huống thực tế về camera an ninh, lỗi máy in do virus và đề xuất quy tắc sử dụng phòng máy tính an toàn.',
    thumbnailImg: '/assets/worksheets/phieu2_man_hinh_cam_ung.jpg',
    questionCount: 3,
  },
];

export const DEFAULT_W1_ANSWERS: Worksheet1Answers = {
  q1Text: '',
  q2Text: '',
  q3Text: '',
};

export const DEFAULT_W2_ANSWERS: Worksheet2Answers = {
  q1Text: '',
  q2Text: '',
  q3Text: '',
  q4Text: '',
};

export const DEFAULT_W3_ANSWERS: Worksheet3Answers = {
  ports: { a: '', b: '', c: '', d: '', e: '', f: '' },
  q2Text: '',
};

export const DEFAULT_W4_ANSWERS: Worksheet4Answers = {
  q1Text: '',
  q2Text: '',
  q3Text: '',
};

// Cổng kết nối thân máy cho Phiếu học tập số 3
export interface PortItem {
  portNumber: string;
  name: string;
  colorHint?: string;
}

export const PORT_OPTIONS: PortItem[] = [
  { portNumber: '1', name: 'Cổng âm thanh vào (Line In - Xanh lam)' },
  { portNumber: '2', name: 'Cổng âm thanh ra (Line Out - Đen)' },
  { portNumber: '3', name: 'Cổng truyền hình ảnh HDMI' },
  { portNumber: '4', name: 'Cổng tai nghe / loa (Headphone - Xanh lá)' },
  { portNumber: '5', name: 'Cổng cắm Micro (Mic In - Hồng)' },
  { portNumber: '6', name: 'Cổng cáp mạng LAN' },
  { portNumber: '7', name: 'Cổng USB (khe cắm USB)' },
  { portNumber: '8', name: 'Ổ cắm dây nguồn điện' },
];

export const CONNECTABLE_DEVICES = [
  { key: 'a' as const, label: 'a) Bàn phím', hint: 'Đầu cắm USB chữ nhật phẳng' },
  { key: 'b' as const, label: 'b) Dây mạng', hint: 'Đầu bấm mạng RJ45 có lẫy cài' },
  { key: 'c' as const, label: 'c) Chuột', hint: 'Đầu cắm USB chữ nhật phẳng' },
  { key: 'd' as const, label: 'd) Dây màn hình', hint: 'Đầu cáp HDMI hình thang' },
  { key: 'e' as const, label: 'e) Tai nghe', hint: 'Giắc cắm tròn 3.5mm hoặc cổng USB' },
  { key: 'f' as const, label: 'f) Dây nguồn', hint: 'Đầu cắm nguồn 3 lỗ lớn' },
];

// Đáp án chuẩn đối chiếu dành cho Giáo viên (Khớp 100% Phiếu học tập bài 1 Tin 7)
export const STANDARD_ANSWERS = {
  1: {
    q1: 'Các thiết bị trong hình (Micro và Loa) làm việc với thông tin dạng âm thanh.',
    q2: 'Thiết bị tiếp nhận thông tin và chuyển vào máy tính là Micro (Thiết bị vào: thu âm thanh từ bên ngoài đưa vào máy tính).',
    q3: 'Thiết bị nhận thông tin từ máy tính đưa ra bên ngoài là Loa (Thiết bị ra: phát âm thanh từ máy tính ra bên ngoài).',
  },
  2: {
    q1: `- Dạng thông tin làm việc của các thiết bị trong Hình 1.2:
  + Chuột: thông tin điều khiển/tọa độ (vào).
  + Bàn phím: chữ, số, kí hiệu (văn bản) (vào).
  + Micro: âm thanh (vào).
  + Camera: hình ảnh (vào).
  + Máy quét: hình ảnh, văn bản (vào).
  + Màn hình: hình ảnh, văn bản (ra).
  + Loa, Tai nghe: âm thanh (ra).
  + Máy in: văn bản, hình ảnh in ra giấy (ra).
- Thiết bị có cả hai chức năng vào và ra: Màn hình cảm ứng (hoặc bảng viết cảm ứng).`,
    q2: 'Máy chiếu là thiết bị ra. Máy chiếu làm việc với thông tin dạng hình ảnh (và văn bản), nhận tín hiệu từ máy tính để chiếu lên màn chắn rộng.',
    q3: 'Bộ điều khiển game là thiết bị vào vì nó tiếp nhận các thao tác bấm nút, gạt cần điều khiển của người chơi để chuyển vào máy tính.',
    q4: 'Màn hình cảm ứng có cả hai chức năng vào và ra: vừa hiển thị thông tin hình ảnh, văn bản từ máy tính ra cho người dùng (chức năng ra), vừa tiếp nhận thao tác chạm ngón tay hoặc bút cảm ứng đưa vào máy tính (chức năng vào).',
  },
  3: {
    q1: 'a) Bàn phím: cổng số 7\nb) Dây mạng: cổng số 6\nc) Chuột: cổng số 7\nd) Dây màn hình: cổng số 3\ne) Tai nghe: cổng số 4 (hoặc cổng số 2)\nf) Dây nguồn: cổng số 8',
    q2: 'Việc cấp nguồn điện cho máy tính cần được thực hiện SAU các kết nối trên.\nVì: Nếu cắm điện trước khi cắm dây kết nối thiết bị, có thể xảy ra hiện tượng chập điện, phóng tia lửa điện làm hỏng các cổng cắm, thiết bị và gây mất an toàn điện cho học sinh.',
  },
  4: {
    q1: 'Người đó KHÔNG biết em đang theo dõi.\nVì: Camera an ninh là thiết bị vào (chỉ có chức năng thu hình ảnh người đó rồi gửi vào máy tính), còn màn hình theo dõi là thiết bị ra (chỉ hiển thị hình ảnh từ máy tính cho em xem, không truyền ngược lại hình ảnh của em đến camera).',
    q2: 'Em cần phải diệt virus ở MÁY TÍNH.\nVì: Máy in chỉ là thiết bị ra (nhận lệnh và dữ liệu từ máy tính để in ra giấy). Virus là phần mềm độc hại hoạt động trong bộ nhớ của máy tính làm máy tính gửi lệnh in sai lệch sang máy in.',
    q3: `Một số quy tắc sử dụng phòng máy tính an toàn:
1. Không tự ý cắm, rút dây nguồn hoặc dây kết nối khi máy tính đang có điện.
2. Không mang đồ ăn, nước uống vào phòng máy để tránh làm ướt gây chập điện, hỏng thiết bị.
3. Giữ bàn tay khô ráo, sạch sẽ khi thao tác với bàn phím và chuột.
4. Tắt máy tính đúng cách (Shut down) và thông báo ngay cho thầy cô khi thấy thiết bị có dấu hiệu bất thường.`,
  },
};

// Hàm chấm điểm tự động hỗ trợ tự luận & trắc nghiệm (0 - 100 điểm)
export function calculateWorksheetScore(
  worksheetId: WorksheetId,
  answers: Worksheet1Answers | Worksheet2Answers | Worksheet3Answers | Worksheet4Answers
): number {
  if (worksheetId === 1) {
    const a = answers as Worksheet1Answers;
    let pts = 0;
    const q1 = (a.q1Text || '').toLowerCase();
    const q2 = (a.q2Text || '').toLowerCase();
    const q3 = (a.q3Text || '').toLowerCase();

    if (q1.includes('âm thanh') || (a.q1SelectedTypes && a.q1SelectedTypes.includes('am_thanh'))) {
      pts += 34;
    }
    if (q2.includes('micro') || a.q2SelectedDevice === 'micro') {
      pts += 33;
    }
    if (q3.includes('loa') || a.q3SelectedDevice === 'loa') {
      pts += 33;
    }
    return Math.min(100, pts);
  }

  if (worksheetId === 2) {
    const a = answers as Worksheet2Answers;
    let pts = 0;
    const q1 = (a.q1Text || '').toLowerCase();
    const q2 = (a.q2Text || '').toLowerCase();
    const q3 = (a.q3Text || '').toLowerCase();
    const q4 = (a.q4Text || '').toLowerCase();

    // Câu 1: nhận biết dạng thông tin và thiết bị 2 chức năng (màn hình cảm ứng)
    if (q1.includes('cảm ứng') || q1.length >= 25) {
      pts += 25;
    }
    // Câu 2: Máy chiếu là thiết bị ra & hình ảnh
    if (q2.includes('ra') || q2.includes('hình ảnh') || a.q2Role === 'ra') {
      pts += 25;
    }
    // Câu 3: Bộ điều khiển game là thiết bị vào
    if (q3.includes('vào') || a.q3Role === 'vao') {
      pts += 25;
    }
    // Câu 4: Màn hình cảm ứng có cả hai chức năng vào và ra
    if (q4.includes('cả hai') || (q4.includes('vào') && q4.includes('ra')) || a.q4Role === 'ca_hai') {
      pts += 25;
    }
    return Math.min(100, pts);
  }

  if (worksheetId === 3) {
    const a = answers as Worksheet3Answers;
    let pts = 0;
    const ports = a.ports || { a: '', b: '', c: '', d: '', e: '', f: '' };

    if (ports.a.trim() === '7') pts += 10;
    if (ports.b.trim() === '6') pts += 10;
    if (ports.c.trim() === '7') pts += 10;
    if (ports.d.trim() === '3') pts += 10;
    if (ports.e.trim() === '4' || ports.e.trim() === '2') pts += 10;
    if (ports.f.trim() === '8') pts += 10;

    const q2 = (a.q2Text || '').toLowerCase();
    if (q2.includes('sau') || a.q2Timing === 'sau') {
      pts += 25;
      if (q2.length >= 15 || q2.includes('chập') || q2.includes('điện') || q2.includes('hỏng') || q2.includes('an toàn')) {
        pts += 15;
      }
    } else if (q2.length >= 10) {
      pts += 15;
    }
    return Math.min(100, pts);
  }

  if (worksheetId === 4) {
    const a = answers as Worksheet4Answers;
    let pts = 0;
    const q1 = (a.q1Text || '').toLowerCase();
    const q2 = (a.q2Text || '').toLowerCase();
    const q3 = (a.q3Text || '').toLowerCase();

    // Câu 1: Không biết + giải thích
    if (q1.includes('không') || q1.includes('ko') || a.q1Choice === 'khong_biet') {
      pts += 20;
      if (q1.length >= 15 || q1.includes('camera') || q1.includes('vào') || q1.includes('ra')) {
        pts += 13;
      }
    }

    // Câu 2: Diệt virus ở máy tính + giải thích
    if (q2.includes('máy tính') || a.q2Choice === 'may_tinh') {
      pts += 20;
      if (q2.length >= 15 || q2.includes('máy in') || q2.includes('ra')) {
        pts += 13;
      }
    }

    // Câu 3: Đề xuất quy tắc an toàn
    if (q3.length >= 20 || (a.q3SelectedRules && a.q3SelectedRules.length >= 2)) {
      pts += 34;
    } else if (q3.length >= 8) {
      pts += 15;
    }

    return Math.min(100, pts);
  }

  return 0;
}
