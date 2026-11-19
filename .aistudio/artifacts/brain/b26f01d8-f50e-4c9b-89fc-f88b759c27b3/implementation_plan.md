# Ứng Dụng Phiếu Học Tập Tương Tác: Tin Học 7 – Bài 1. Thiết Bị Vào – Ra

Ứng dụng web giáo dục tương tác cao số hóa trọn vẹn 4 Phiếu Học Tập môn Tin học 7 (Bài 1: Thiết bị vào – ra) từ tài liệu PDF đính kèm. Hệ thống kết hợp làm bài tương tác theo nhóm (kèm modal khai báo thông tin nhóm, đồng hồ đếm ngược, trích xuất hình ảnh gốc từ PDF, in/xuất phiếu) với trang Tổng hợp kết quả dành cho Giáo viên để theo dõi, so sánh câu trả lời của các nhóm và trình chiếu đáp án chuẩn trên lớp.

## User Review & Critical Decisions

> [!IMPORTANT]
> Dưới đây là các quyết định thiết kế đã được xác nhận từ phản hồi của bạn, cùng phương án xử lý hình ảnh và tương tác cho từng phiếu học tập:

- **Quy trình chọn phiếu & Modal thông tin nhóm (Confirmed)**: Khi học sinh nhấp chọn một trong 4 thẻ Phiếu học tập ở màn hình chính, hệ thống sẽ bật **Modal Thông Tin Nhóm** (nhập Tên nhóm, Lớp, Danh sách thành viên). Nếu nhóm đã khai báo trước đó, hệ thống tự động điền sẵn và cho phép vào thẳng phiếu hoặc đổi nhóm.
- **Giao diện Giáo viên tổng hợp câu trả lời các nhóm (Confirmed)**: Bổ sung chế độ **Tổng hợp & So sánh Nhóm (Dành cho Giáo viên)** đồng bộ qua máy chủ (Backend API), giúp giáo viên xem danh sách tất cả các nhóm đã nộp bài theo từng phiếu (Phiếu 1 → 4), đặt câu trả lời của nhiều nhóm cạnh nhau để nhận xét, chấm điểm và bật/tắt **Đáp án chuẩn** khi chữa bài.
- **Bộ tiện ích lớp học đầy đủ (Confirmed)**:
  - **Đồng hồ đếm ngược** khớp chính xác thời lượng từng phiếu trong PDF (Phiếu 1: `15 phút`, Phiếu 2: `20 phút`, Phiếu 3: `10 phút`, Phiếu 4: `15 phút`).
  - **Bảng tổng hợp tiến độ & điểm số** của cả 4 phiếu học tập.
  - **Lưu & Xuất / In phiếu kết quả** theo bố cục chuẩn phiếu học tập trên giấy.
- **Trích xuất chính xác hình ảnh gốc từ PDF**: Toàn bộ hình minh họa trong file PDF (hình Micro & Loa ở Phiếu 1; Sơ đồ Hình 1.2 Thiết bị vào – ra, Bộ điều khiển game, Màn hình cảm ứng ở Phiếu 2; Sơ đồ 8 cổng thân máy và 6 đầu dây/thiết bị `a..f` ở Phiếu 3) sẽ được trích xuất trực tiếp từ tệp PDF đính kèm với độ phân giải cao và tích hợp điểm chạm tương tác (hotspots & nối cổng trực quan).

---

## 1. Overview & Core Concept

- **What It Does**:
  - **Màn hình chính (Dashboard 4 Phiếu Học Tập)**: Hiển thị 4 component thẻ lớn đại diện cho **Phiếu học tập số 1, 2, 3, 4** với tiêu đề hoạt động, thời lượng, trạng thái hoàn thành, điểm số của nhóm hiện tại và số lượng nhóm đã nộp bài.
  - **Không gian làm bài tương tác theo từng phiếu**: Giữ nguyên vẹn cấu trúc câu hỏi, gợi ý và hình ảnh minh họa của phiếu PDF gốc, đồng thời nâng cấp thành các vùng tương tác trực quan (chọn thiết bị trên sơ đồ, kéo-thả hoặc nhấp nối thiết bị vào cổng trên thân máy, phân loại chiều thông tin kết hợp nhập giải thích tự luận).
  - **Bảng Tổng Hợp Giáo Viên (Teacher Group Aggregation View)**: Thu thập toàn bộ bài làm của các nhóm theo thời gian thực để giáo viên lọc theo phiếu, theo lớp, xem thống kê điểm số, so sánh chi tiết từng câu trả lời giữa các nhóm và trình chiếu lời giải mẫu.
- **Target Audience / Persona**: Giáo viên và các nhóm học sinh lớp 7 trong tiết học môn Tin học (*Bài 1: Thiết bị vào – ra*), sử dụng trên máy tính phòng máy, bảng tương tác thông minh hoặc máy chiếu lớp học.
- **Key Value**: Chuyển đổi phiếu bài tập giấy tĩnh thành hoạt động nhóm sôi nổi, có kiểm soát thời gian, trực quan hóa thao tác lắp ráp phần cứng máy tính và giúp giáo viên tổng hợp kết quả của cả lớp ngay tức thì.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Bước 1 – Màn hình tổng quan 4 Phiếu Học Tập**:
   - Hiển thị 4 thẻ lớn tương ứng 4 phiếu:
     - **Phiếu học tập số 1**: *Phân biệt thiết bị vào, thiết bị ra* (`Hoạt động 2.1.1 • 15 phút`)
     - **Phiếu học tập số 2**: *Sự đa dạng của thiết bị vào – ra* (`Hoạt động 2.1.2 • 20 phút`)
     - **Phiếu học tập số 3**: *Kết nối thiết bị vào – ra* (`Hoạt động 2.2.1 • 10 phút`)
     - **Phiếu học tập số 4**: *Vận dụng* (`Hoạt động 4 • 15 phút`)
   - Phía dưới là **Bảng tổng hợp tiến độ & điểm số 4 phiếu** của nhóm đang hoạt động.
2. **Bước 2 – Chọn Phiếu & Modal Khai Báo Nhóm**:
   - Khi nhấn vào bất kỳ phiếu nào, một **Modal Nhập Thông Tin Nhóm** xuất hiện yêu cầu xác nhận: `Nhóm` (VD: Nhóm 1), `Lớp` (VD: 7A1), và `Thành viên`.
   - Sau khi xác nhận, học sinh bước vào giao diện chi tiết của phiếu đó và đồng hồ đếm ngược sẵn sàng kích hoạt.
3. **Bước 3 – Tương tác chuyên biệt trên từng Phiếu**:
   - **Phiếu số 1 (Phân biệt thiết bị vào, thiết bị ra)**:
     - Hiển thị hình ảnh gốc Micro và Loa từ PDF kèm hiệu ứng mô phỏng luồng thông tin (Âm thanh $\to$ Micro $\to$ Máy tính $\to$ Loa).
     - *Câu 1, 2, 3*: Học sinh tương tác chọn nhanh dạng thông tin / thiết bị tương ứng trên hình và điền câu trả lời chi tiết vào dòng kẻ chấm giống phiếu gốc, kèm hộp *Gợi ý* chuẩn thiết kế SGK.
   - **Phiếu số 2 (Sự đa dạng của thiết bị vào – ra)**:
     - Hiển thị *Hình 1.2. Thiết bị vào – ra* (Khối Thiết bị vào, Bộ xử lí, Thiết bị lưu trữ, Thiết bị ra) cùng hình *a) Bộ điều khiển game* và *b) Màn hình cảm ứng* trích xuất từ trang 2 & 3 của PDF.
     - *Câu 1*: Học sinh nhấp trực tiếp vào từng thiết bị trên *Hình 1.2* (Chuột, Micro, Camera, Bàn phím, Máy quét, Tấm cảm ứng, Màn hình, Tai nghe, Máy in, Loa) để gắn nhãn dạng thông tin (Văn bản, Hình ảnh, Âm thanh) và xác định thiết bị có cả hai chức năng, kèm vùng tổng hợp câu trả lời tự luận.
     - *Câu 2, 3, 4*: Kết hợp nút chọn phân loại nhanh (Thiết bị vào / Thiết bị ra / Cả hai chức năng) và ô ghi giải thích cho Máy chiếu, Bộ điều khiển game, Màn hình cảm ứng.
   - **Phiếu số 3 (Kết nối thiết bị vào – ra)**:
     - Hiển thị hình chụp mặt sau thân máy đánh số cổng `1` đến `8` và các thiết bị `a) Bàn phím`, `b) Dây mạng`, `c) Chuột`, `d) Dây màn hình`, `e) Tai nghe`, `f) Dây nguồn` từ trang 4 PDF.
     - *Câu 1 (Tương tác lắp cổng)*: Học sinh có thể nhấp chọn thiết bị `a..f` rồi nhấp trực tiếp vào cổng `1..8` trên hình thân máy (hoặc nhập số cổng vào bảng 6 ô `a..f`). Khi nối đúng, đường dây kết nối/cổng sáng lên trực quan và tự động điền số cổng vào bảng.
     - *Câu 2*: Chọn phương án (*Trước* hay *Sau* khi kết nối) và viết giải thích an toàn điện.
   - **Phiếu số 4 (Vận dụng)**:
     - *Câu 1 (Camera an ninh)*, *Câu 2 (Diệt virus ở máy in hay máy tính)*, *Câu 3 (Đề xuất quy tắc sử dụng phòng máy an toàn)*: Giao diện tình huống thực tế có gợi ý tư duy theo luồng *Thu nhận $\to$ Xử lí $\to$ Xuất thông tin*, trình soạn thảo dòng kẻ chấm rõ ràng và thẻ thêm nhanh các quy tắc an toàn phòng máy.
4. **Bước 4 – Nộp phiếu, Chấm điểm, In phiếu & Tổng hợp Giáo viên**:
   - Khi nhấn **Nộp phiếu**, hệ thống chấm điểm tự động các phần định lượng, hiển thị đáp án chuẩn đối chiếu, lưu vào bảng tiến độ 4 phiếu và gửi bài làm của nhóm lên hệ thống tổng hợp.
   - Học sinh hoặc giáo viên có thể nhấn **In / Xuất Phiếu** để mở bản dàn trang chuẩn A4 giống hệt phiếu PDF gốc kèm chữ viết trả lời của nhóm.
   - Giáo viên mở tab **Tổng hợp Nhóm (GV)** để xem bảng tổng hợp tất cả các nhóm, lọc theo phiếu 1–4, xem chi tiết bài làm từng nhóm hoặc bật chế độ **Đáp án chuẩn** trên máy chiếu.

### Visual Identity & Theme

- **Aesthetic Direction**: Phong cách **Sách Giáo Khoa Điện Tử Hiện Đại (Clean Educational Sandbox)** — mô phỏng sắc nét màu xanh lam đặc trưng của tiêu đề *Phiếu Học Tập* trong file PDF gốc (`#2B5B84` và `#D9E6F2`), kết hợp bố cục hai vùng (Two-Zone Sandbox Layout) rõ ràng, thoáng đãng trên màn hình desktop 1440px.
- **Color Palette & Mood (60-30-10 Discipline)**:
  - **60% Dominant Canvas (`#F8FAFC`)**: Nền trang trắng xám dịu mắt, kết hợp bề mặt tờ phiếu trắng tinh (`#FFFFFF`) có đường viền mảnh `#E2E8F0`.
  - **30% Structural Surfaces (`#D9E6F2` / `#1E3A5F`)**: Dải băng tiêu đề phiếu màu xanh lam đậm (`#2A5C8A`) phối nền xanh nhạt (`#DCE8F5`) đúng chuẩn thiết kế file PDF đính kèm.
  - **10% Semantic Focal Accents**:
    - Xanh dương tương tác (`#0284C7`) cho các điểm chạm thiết bị và cổng kết nối đang chọn.
    - Xanh lá xác nhận (`#059669`) kèm nhãn văn bản `✓ Chính xác` khi kiểm tra đáp án.
    - Cam/Đỏ cảnh báo (`#D97706` / `#DC2626`) kèm nhãn khi đồng hồ sắp hết giờ hoặc cổng kết nối chưa khớp.
- **Typography & Hierarchy**:
  - **Display / Tiêu đề phiếu**: `Be Vietnam Pro` / `Plus Jakarta Sans` (SemiBold/Bold) hỗ trợ tiếng Việt sắc nét.
  - **Body / Nội dung câu hỏi**: `Plus Jakarta Sans` (15px–16px, line-height 1.6) kết hợp kiểu dòng kẻ chấm cổ điển của phiếu học tập cho phần tự luận.
  - **Số liệu, Thời gian & Cổng kết nối**: `JetBrains Mono` với `tabular-nums` cho đồng hồ đếm ngược (`15:00`), điểm số và số thứ tự cổng (`1`–`8`).
- **Top Bar Contract**:
  - Tuân thủ thanh điều hướng 1 hàng, 3 vùng tách biệt:
    1. **Brand Wordmark**: `Tin Học 7 · Phiếu Học Tập`
    2. **Navigation Links**: `Danh sách 4 phiếu`, `Tiến độ học tập`, `Tổng hợp nhóm (GV)`, `Tài liệu PDF gốc`
    3. **Primary Action**: Nút `Đổi nhóm / Nhập nhóm` (hiển thị tên nhóm hiện tại hoặc mở modal chọn nhóm).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Trích xuất hình ảnh gốc từ PDF kết hợp lớp phủ tương tác (Interactive SVG/Hotspot Overlay)**
  - *Chosen Approach*: Cắt (crop) chính xác các hình minh họa từ file PDF đính kèm ở độ phân giải cao và đặt lớp điểm chạm tương tác (clickable ports `1..8`, clickable devices `a..f`, interactive diagram blocks) lên trên hình gốc.
  - *Why*: Đảm bảo 100% yêu cầu "nội dung và hình ảnh chính xác từ tệp đính kèm" mà vẫn mang lại trải nghiệm tương tác kéo-thả/nhấp chọn sống động thay vì chỉ nhìn ảnh tĩnh.
  - *Alternatives Considered*: Vẽ lại hoàn toàn bằng icon vector (bị loại vì sẽ làm sai lệch hình ảnh gốc trong SGK của người dùng).
- **Decision 2: Đồng bộ bài nộp của các nhóm qua Express Backend + LocalStorage**
  - *Chosen Approach*: Lưu trạng thái làm bài tức thời ở `localStorage` của trình duyệt học sinh (tránh mất bài khi tải lại trang) đồng thời gửi bài nộp lên Express server (`/api/submissions`) lưu trữ bền vững.
  - *Why*: Giúp giao diện **Tổng hợp câu trả lời của các nhóm cho giáo viên** thu thập và hiển thị được danh sách bài làm của nhiều nhóm học sinh khác nhau, kèm dữ liệu mẫu phong phú để giáo viên trải nghiệm ngay.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TOP NAVIGATION BAR (3-Zone)                          │
│  [Tin Học 7 · Phiếu Học Tập]   [4 Phiếu | Tiến độ | Tổng hợp GV | PDF gốc]  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  1. HOME DASHBOARD  │     │ 2. WORKSHEET STUDIO │     │ 3. TEACHER SUMMARY  │
│  (4 Worksheet Cards │────▶│  (Phiếu Số 1 -> 4)  │────▶│    DASHBOARD (GV)   │
│   + Progress Table) │     │                     │     │                     │
└────────┬────────────┘     └──────────┬──────────┘     └──────────┬──────────┘
         │                             │                           │
         ▼                             ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  GROUP INFO MODAL   │     │ INTERACTIVE ENGINES │     │ GROUP COMPARISON &  │
│  - Tên nhóm / Lớp   │     │ - Countdown Timer   │     │ ANSWER KEY OVERLAY  │
│  - Thành viên       │     │ - PDF Diagram Map   │     │ - Lọc Phiếu 1..4    │
│  - Xác nhận vào bài │     │ - Port Matcher (P3) │     │ - So sánh các nhóm  │
└─────────────────────┘     │ - Auto-Grade & Print│     │ - Chấm điểm & Xuất  │
                            └──────────┬──────────┘     └──────────┬──────────┘
                                       │                           │
                                       └─────────────┬─────────────┘
                                                     ▼
                            ┌─────────────────────────────────────────────────┐
                            │   EXPRESS BACKEND (/api/submissions) & STORAGE  │
                            │   - Lưu & đồng bộ bài nộp của tất cả các nhóm   │
                            │   - Phục vụ hình ảnh trích xuất chuẩn từ PDF    │
                            └─────────────────────────────────────────────────┘
```

### Data Model & State

- **`GroupProfile`**: `{ groupName: string, className: string, members: string }` — Thông tin nhóm học sinh hiện tại.
- **`WorksheetSubmission`**:
  - `id`: Mã bài nộp duy nhất
  - `worksheetId`: `1 | 2 | 3 | 4`
  - `group`: `GroupProfile`
  - `answers`: Cấu trúc câu trả lời chi tiết của từng phiếu (bao gồm cả lựa chọn tương tác và nội dung tự luận)
  - `score`: Điểm tự động (thang điểm 100 hoặc số câu đúng) + Nhận xét của giáo viên
  - `timeSpentSeconds`: Thời gian hoàn thành thực tế so với thời gian quy định (`15p`, `20p`, `10p`, `15p`)
  - `submittedAt`: Thời điểm nộp bài

### Interactive Component & State Mapping

- **4 Component Thẻ Phiếu Học Tập (Home View)**: Nhấp vào thẻ phiếu `1..4` $\to$ kiểm tra `GroupProfile` hoặc mở `GroupInfoModal` $\to$ xác nhận thông tin nhóm $\to$ chuyển sang `WorksheetStudio` của phiếu tương ứng và khởi tạo đồng hồ đếm ngược.
- **Bộ đếm ngược (Countdown Timer)**: Tự động nạp số phút quy định của phiếu (`15:00`, `20:00`, `10:00`, `15:00`), hỗ trợ `Bắt đầu / Tạm dừng / Làm mới`, đổi màu cảnh báo khi còn dưới 2 phút.
- **Bộ tương tác Sơ đồ & Nối cổng (Phiếu 1, 2, 3, 4)**:
  - *Phiếu 1*: Nhấp vào Micro hoặc Loa trên hình để xem luồng tín hiệu và điền câu trả lời Câu 1, 2, 3.
  - *Phiếu 2*: Nhấp vào từng thiết bị trong *Hình 1.2* để phân loại dạng thông tin (Văn bản, Hình ảnh, Âm thanh, Cả vào & ra) và trả lời Câu 1–4.
  - *Phiếu 3*: Nhấp chọn thiết bị `a..f` và nhấp vào cổng `1..8` trên hình mặt sau thân máy (Bàn phím/Chuột $\to$ cổng USB `4, 7`; Dây mạng $\to$ cổng LAN `6`; Dây màn hình HDMI $\to$ cổng `3`; Tai nghe $\to$ cổng âm thanh `2`; Dây nguồn $\to$ ổ nguồn `8`).
  - *Phiếu 4*: Phân tích 2 tình huống thực tế (Camera an ninh, Virus máy in/máy tính) và xây dựng danh sách quy tắc an toàn phòng máy.
- **Giao diện Tổng hợp Giáo viên (`TeacherDashboard`)**: Tải danh sách tất cả bài nộp từ `/api/submissions`, lọc theo Phiếu 1–4, tìm kiếm theo tên nhóm/lớp, bật chế độ so sánh câu trả lời của các nhóm trên cùng một câu hỏi, cho phép giáo viên cập nhật điểm/nhận xét hoặc xóa/làm mới danh sách.
