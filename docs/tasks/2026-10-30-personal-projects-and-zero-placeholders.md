# Task Archive: Cập nhật & Thêm mới các dự án Cá nhân (Personal Projects - Stuff & Linh) và Xóa sạch 100% Placeholder còn lại

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/data/projects.ts`
  - `src/data/profile.ts`

---

## 1. Objective & Requirements

- Thêm mới case study **Fooday Project** (`D:\work\Stuff\Fooday_Project`): Ứng dụng khám phá ẩm thực tích hợp AI (Next.js 16 + React 19 + FastAPI + Supabase Auth + LLM Food Discovery Chatbot).
- Cập nhật case study **Badminton Scheduler (BSCHE)** (`D:\work\Stuff\badminton-schedualer`) theo đúng thông tin và số liệu từ CV (thời gian Jun 2026 - Jul 2026, demoUrl `https://bscheduler.xyz`, tích hợp VietQR dynamic payment, realtime bill splitting, giảm thời gian tổ chức từ 15+ phút xuống dưới 30 giây).
- Chuẩn hóa 2 dự án cá nhân **CarMS Fleet Dispatch** (`D:\work\Linh\CarMS`) và **Classchedule Room Rental** (`D:\work\Linh\Classchedule`): điền đầy đủ `lessonsLearned` thực tế thay cho placeholder `[Add lesson learned]`.
- Quét sạch toàn bộ các placeholder text dạng `[Add ...]` còn sót lại trong toàn bộ file `src/data/projects.ts` (bao gồm `neuralnews` và `ai-integrated-scoring-system`).
- Cập nhật số liệu `metrics` trong `src/data/profile.ts` cho chính xác với số lượng dự án đã hoàn thiện.

---

## 2. Changes Made

1. **`src/data/projects.ts`**:
   - Thêm case study **Fooday Project** (`fooday-ai-food-discovery`): Đầy đủ 9 phần (Requirements, Solution, Implementation, Technical Decisions, Challenges, Results, Lessons Learned), role "Full-stack AI Developer (Personal Project)", tech stack Next.js 16, React 19, FastAPI, Supabase Auth, Unsplash API, styled-jsx.
   - Cập nhật **BSChe Badminton Group Scheduler** (`bsche-badminton-scheduler`): Live demo URL trỏ về `https://bscheduler.xyz`, dates "Jun 2026 - Jul 2026", tech stack bổ sung VietQR API, thuật toán VietQR dynamic payment generation và số liệu thành tựu từ CV (giảm từ 15+ phút xuống dưới 30s). Thay thế `[Add lesson learned]` bằng bài học kinh nghiệm thực tế về offline-first PWA, RLS policies và realtime bill splitting.
   - Chuẩn hóa **CarMS Fleet Dispatch** (`carms-fleet-dispatch`): Bổ sung `lessonsLearned` thực tế về Next.js Server Actions vs Read Services và Supabase Realtime cache invalidation.
   - Chuẩn hóa **Classchedule Room Rental** (`classchedule-room-rental`): Bổ sung `lessonsLearned` thực tế về thuật toán phát hiện xung đột lịch phòng học định kỳ trên client và database constraints.
   - Dọn sạch 100% placeholder text `[Add ...]` còn lại trong `neuralnews` và `ai-integrated-scoring-system`. Toàn bộ `projects.ts` đạt trạng thái 0 placeholder text.
2. **`src/data/profile.ts`**:
   - Cập nhật metric `Case Studies` thành `10` (phản ánh chính xác 10 case study hoàn chỉnh trong codebase).

---

## 3. Verification Gates Results

- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning không liên quan từ file cache .remember)
- `npm run build`: **PASS** (Next.js 16 App Router build thành công)
- `npm run format:check`: **PASS** (Tất cả file tuân thủ chuẩn Prettier)
