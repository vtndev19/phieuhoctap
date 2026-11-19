# Ứng Dụng Phiếu Học Tập Số - Tin Học 7

Hệ thống phiếu học tập tương tác số môn Tin học 7 - Bài 1: Thiết bị vào - ra.

---

## 🚀 Hướng Dẫn Triển Khai Lên Vercel

Dự án đã được cấu hình sẵn để triển khai trực tiếp lên **Vercel** cả phần Frontend (Vite React SPA) và Backend API (Vercel Serverless Function).

### Cách 1: Triển khai qua Vercel Dashboard (Khuyên dùng)

1. Đẩy code lên GitHub/GitLab/Bitbucket.
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập.
3. Chọn **Add New...** > **Project**.
4. Import repository của bạn.
5. Vercel sẽ tự động phát hiện cấu hình từ file `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Nhấn **Deploy**.

### Cách 2: Triển khai bằng Vercel CLI

1. Cài đặt Vercel CLI (nếu chưa có):
   ```bash
   npm i -g vercel
   ```
2. Đăng nhập và deploy:
   ```bash
   vercel
   ```
3. Deploy bản Production:
   ```bash
   vercel --prod
   ```

---

## 💻 Chạy Tại Máy Cục Bộ (Local Development)

1. Cài đặt các thư viện:
   ```bash
   npm install
   ```
2. Chạy môi trường phát triển:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt tại: `http://localhost:3000`

---

## 📁 Cấu Trúc Dự Án Sau Khi Cấu Trúc Lại

```text
phieuhoctap/
├── api/                       # Vercel Serverless Functions
│   └── index.ts               # Xử lý tất cả endpoint /api/submissions
├── public/                    # Thư mục tài nguyên tĩnh
├── src/                       # Mã nguồn Frontend React
│   ├── components/            # Giao diện phiếu học tập & bảng điều khiển GV
│   ├── data/                  # Dữ liệu câu hỏi & phiếu học tập
│   ├── App.tsx                # Giao diện chính & điều hướng
│   └── main.tsx
├── vercel.json                # Cấu hình routing & build cho Vercel
├── server.ts                  # Server Express hỗ trợ chạy dev local
├── vite.config.ts             # Cấu hình Vite & Tailwind CSS
├── tsconfig.json              # Cấu hình TypeScript
└── package.json
```
