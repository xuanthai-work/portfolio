# Task Archive: Tái thiết kế toàn diện Portfolio theo phong cách Editorial & Storytelling (Fraunces + Crimson Pro, Warm Parchment)

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/app/layout.tsx`
  - `src/app/globals.css`
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/AboutSection.tsx`
  - `src/components/projects/ProjectCard.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/ui/Button.tsx`
  - `src/components/ui/Badge.tsx`

---

## 1. Objective & Requirements

Chuyển ngôn ngữ thiết kế từ "SaaS Tech Minimalist" sang **Editorial & Storytelling** (tham chiếu Danny Montoya):

- Typography: **Fraunces** (`--font-heading`) cho tiêu đề, **Crimson Pro** (`--font-body`) cho nội dung, **JetBrains Mono** (`--font-mono`) cho nhãn kỹ thuật/metrics.
- Bảng màu giấy ngà & nâu gỗ ấm: Light `#FDF7EA` / ink `#221A15` / terracotta `#B8532D`; Dark `#1F1916` / cream `#F5EEE3` / `#E07A4F`.
- Hero kể chuyện với khung ảnh kiểu tranh đóng khung (mat + double rule) và book-tag status badge.
- Card/component: viền hairline mực, bóng đổ ấm, bỏ hoàn toàn ánh neon/cyber lạnh.

## 2. Changes Made

1. **`src/app/layout.tsx`**
   - Nạp `Fraunces` (normal + italic), `Crimson_Pro`, `JetBrains_Mono` qua `next/font/google`.
   - Biến CSS: `--font-fraunces`, `--font-crimson`, `--font-jetbrains` (đặt tên tách khỏi token Tailwind để tránh xung đột `:root` vs `html` — xem Ruling 1). Geist/Geist Mono không còn dùng nên đã gỡ.
2. **`src/app/globals.css`**
   - Thay toàn bộ token `:root`/`.dark` sang bảng màu parchment/coffee/terracotta, đồng bộ cả token cầu nối shadcn (`--card`, `--primary`, `--muted`, `--input`, `--ring`, `--chart-*`, `--sidebar-*`).
   - Thêm token phụ trợ cho giao diện ấm: `--button-shadow`, `--frame-shadow`, `--page-wash`, `--status-live`, `--surface-glass`; retune `--grid-line`, `--hero-glow`, `--card-hover-shadow`, `--accent-border`.
   - `body`/`html`: Crimson Pro 17px, line-height 1.6, wash radial ấm ở đỉnh trang; `h1–h6`: Fraunces 600, `text-wrap: balance`; `::selection` dùng accent.
   - Sửa luôn token `--font-mono: var(--font-mono)` (tự tham chiếu, hỏng utility `font-mono`) thành `var(--font-jetbrains)`.
   - `--radius` 0.625rem → 0.75rem cho bo góc mềm hơn.
3. **`src/components/sections/HeroSection.tsx`**
   - `h1` Fraunces 5rem; deck italic màu terracotta kể chuyện; body Crimson.
   - Ảnh Hero chuyển thành khung tranh: mat kem + viền kép (`border-strong` ngoài, hairline trong), bóng `--frame-shadow` ấm, caption `Fig. 01 — …` bằng mono; bỏ `bg-zinc-950` và `ring-white/10`.
   - Status badge kiểu book-tag (mono uppercase, letter-spacing rộng), chấm "available" đổi sang `--status-live` (olive ấm) thay emerald lạnh.
   - Lưới nền 36px + halo terracotta (`--hero-glow`).
4. **`src/components/projects/ProjectCard.tsx`**
   - Tiêu đề Fraunces 1.4rem, tóm tắt Crimson 0.95rem/1.7, meta role dạng mono uppercase.
   - Ảnh bìa `saturate-[0.88]` (hover về 100%) + overlay gradient nâu ấm thay navy; badge Featured dạng nhãn giấy.
   - Đường kẻ hairline phân cách hàng link; hover viền `--accent-border` + bóng `--card-hover-shadow`; giữ dải gradient hairline cho `featured`.
5. **`src/components/layout/Header.tsx` / `Footer.tsx`**
   - Header: blur giấy `bg-[color:var(--background)/0.85] backdrop-blur-md`, tên thương hiệu Fraunces, nav mono uppercase tracking 0.14em.
   - Footer: nền `--surface-muted`/50, tên Fraunces, padding thoáng hơn.
6. **`src/components/ui/Button.tsx` / `Badge.tsx`**
   - Bỏ bóng xanh cứng `rgba(37,99,235,0.16)` → `--button-shadow` ấm; chữ trên nền accent đổi `text-white` → `--accent-foreground` (kem).
   - Badge thành "book tag": mono 10px uppercase tracking 0.08em, bo `rounded-md`.
7. **`src/components/sections/AboutSection.tsx`**
   - Số liệu metrics dùng Fraunces; nhãn metrics mono uppercase.

## 3. Rulings

1. **Tên biến font**: plan yêu cầu `--font-heading` / `--font-body` cho `next/font`, nhưng `globals.css` đã dùng chính các tên đó trong `@theme inline` — trùng tên trên cùng phần tử `html` sẽ khiến token Tailwind đè hoặc tự tham chiếu. Đặt biến `next/font` là `--font-fraunces` / `--font-crimson` rồi map `--font-heading: var(--font-fraunces)` trong `@theme inline`. Kết quả cuối vẫn đúng yêu cầu (heading = Fraunces, body = Crimson Pro).
2. **Câu dẫn nhập Hero**: giữ nguyên tinh thần câu trong plan nhưng bỏ cụm mở đầu "AI Engineer," vì `h1` đã là "AI Engineer" — lặp lại nguyên cụm ngay dưới tiêu đề đọc rất vụng. Câu còn: _"System architect and software builder, turning complex intelligence into dependable products."_
3. **Mở rộng phạm vi nhỏ ngoài danh sách file của plan**: `Button.tsx`, `Badge.tsx`, `AboutSection.tsx` chứa màu xanh cứng / số liệu dùng font body, sẽ phá vỡ ngôn ngữ thị giác mới nếu để nguyên.

## 4. Verification

- **Typography (đo bằng computed style trong Chrome headless)**: `h1` → `Fraunces, "Fraunces Fallback", …`; `body` → `"Crimson Pro", …`, `font-size: 17px`.
- **Theme toggle**: click nút toggle → `documentElement.classList` đổi dark/light, `localStorage.theme` được ghi, `body background` đổi `rgb(31,25,22)` ⇄ `rgb(253,247,234)`, reload giữ nguyên trạng thái.
- **Tương phản (tính từ giá trị token)**: body text `#6D6054` trên `#FDF7EA` ≈ 5.7:1; `#B5A799` trên `#1F1916` ≈ 7.4:1; accent `#B8532D` trên `#FDF7EA` ≈ 4.6:1; `#E07A4F` trên `#1F1916` ≈ 5.9:1 — đạt WCAG AA cho chữ thường.
- **Dữ liệu**: không sửa file nào trong `src/data/` — 10 case study, thông tin CV và metrics giữ nguyên.
- **Runtime**: `next start` port 3117/3118 — `/`, `/projects`, `/projects/gslide-enterprise-presentation` trả 200; chụp ảnh light/dark, desktop/mobile và từng section (`#about`, `#skills`, `#workflows`, `#contact`, `#education`) để kiểm tra thị giác.

## 5. Verification Gates Results

- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning từ cache `.remember/tmp/last-ndc.ts`, không liên quan)
- `npm run build`: **PASS** (Next.js 16.2.12 / Turbopack, 3/3 static pages)
- `npm run format:check`: **PASS** (All matched files use Prettier code style)
