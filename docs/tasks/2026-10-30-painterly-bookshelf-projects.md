# Task Archive: Kệ sách tương tác Painterly Bookshelf cho phần Projects (Studio Ghibli / Danny Montoya Aesthetic)

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/components/bookshelf/Bookshelf.tsx` (mới)
  - `src/components/sections/ProjectsSection.tsx`
  - `src/types/index.ts`
  - `src/data/projects.ts`
  - `src/app/globals.css`

---

## 1. Objective & Requirements

Chuyển đổi toàn bộ trải nghiệm phần Projects sang **Interactive Painterly Bookshelf** (lấy cảm hứng từ Studio Ghibli và danh mục dự án của Danny Montoya):

- Desktop: 10 gáy sách da thuộc màu nước xếp trên bệ kệ gỗ cao cấp, nẹp chỉ kim loại mạ vàng, dập nổi chữ dọc gáy sách; rê chuột/focus mở rộng gáy sách mượt mà hé lộ case study chi tiết.
- Mobile: Thẻ bài nghệ thuật tương tác với dải gáy sách trên đầu.
- Status bar chuẩn studio: `● 10 / 10 systems online` nhấp nháy.
- Giữ nguyên 100% dữ liệu 10 case study và route `/projects/[slug]`.

---

## 2. Changes Made

1. **`src/types/index.ts`**: Bổ sung các thuộc tính mở rộng cho `Project`: `spineTitle`, `spineColor`, `spineHighlight`, `spineShadow`, `spineIcon`, `spineTagline`.
2. **`src/data/projects.ts`**: Cấu hình bộ màu da thuộc và hiệu ứng ánh sáng cho cả 10 dự án (GSlide, AI Meeting Note, Fooday, CarMS, Classchedule, BSChe, AI Recruitment, Techter Chatbot, NeuralNews, AI Scoring).
3. **`src/app/globals.css`**: Thêm các design tokens mạ vàng và chất liệu gân màu nước (`--gold`, `--gold-bright`, `--gold-deep`, `--page-surface`, `--spine-grain`, `--spine-wash`).
4. **`src/components/bookshelf/Bookshelf.tsx`**:
   - Quản lý state mở rộng `activeIndex` linh hoạt cho cả chuột, bàn phím và chạm di động.
   - Hiệu ứng gáy sách nở rộng mượt mà (`duration-500 ease-in-out`), nẹp mạ vàng kép, dập nổi tiêu đề dọc bằng font Fraunces mạ vàng.
   - Panel mở rộng hiển thị ảnh bìa, tagline in nghiêng, tóm tắt, tech stack pills và liên kết Case Study / Demo / Code.
   - Bệ đỡ kệ gỗ đa tầng và thanh trạng thái `10 / 10 systems online`.
5. **`src/components/sections/ProjectsSection.tsx`**: Thay thế hoàn toàn lưới card cũ bằng component `Bookshelf`.

---

## 3. Verification Gates Results

- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning không liên quan từ cache)
- `npm run build`: **PASS** (Next.js 16 App Router build thành công)
- `npm run format:check`: **PASS** (Tất cả file tuân thủ chuẩn Prettier)
