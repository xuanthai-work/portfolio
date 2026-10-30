# Task Archive: Nâng cấp Giao diện Thị giác chuẩn Modern High-End Developer Portfolio (Hero Tech Aesthetics, Project Cards & Workflow Visualizer)

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/components/sections/HeroSection.tsx`
  - `src/components/projects/ProjectCard.tsx`
  - `src/components/sections/WorkflowSection.tsx`
  - `src/app/globals.css`

---

## 1. Objective & Requirements

Nâng cấp trải nghiệm thị giác và vi tương tác (micro-interactions) của trang portfolio lên chuẩn cao cấp của các developer hàng đầu:

- **Hero Section**: Thêm hiệu ứng nền công nghệ tinh tế (grid mask kết hợp radial glow chìm), bổ sung Status Badge ("Available for AI Engineering roles" với đèn xanh pulsating dot), và tối ưu hóa phân cấp typography.
- **Project Cards**: Nâng cấp `ProjectCard` với hiệu ứng viền sáng/spotlight gradient khi hover, chiều sâu bóng đổ `card-hover-shadow`, và dải gradient hairline trên đỉnh cho các dự án `featured`.
- **Workflow Section**: Tái cấu trúc luồng `Input` $\rightarrow$ `Process` $\rightarrow$ `Output` thành visual pipeline liên kết trực quan với icon và connector `ChevronDown`.

---

## 2. Changes Made

1. **`src/app/globals.css`**:
   - Khai báo các CSS variables phụ trợ cho cả Light & Dark mode: `--accent-border`, `--card-hover-shadow`, `--grid-line`, `--hero-glow`, `--surface-glass`.
2. **`src/components/sections/HeroSection.tsx`**:
   - Thêm lớp nền lưới công nghệ tĩnh `32px x 32px` với radial mask elip mềm mại và quả cầu hào quang xanh chìm `blur-3xl`.
   - Thêm status badge tròn `Available for AI Engineering roles` có đèn xanh nhấp nháy `animate-ping` (tự động ẩn khi người dùng bật `motion-reduce`).
   - Tinh chỉnh phân cấp chữ tiêu đề và social links với hiệu ứng hover viền accent.
3. **`src/components/projects/ProjectCard.tsx`**:
   - Thêm viền hairline gradient cho các dự án `featured: true`.
   - Thêm hiệu ứng phủ gradient chìm khi hover lên ảnh bìa, zoom nhẹ ảnh `group-hover:scale-[1.03]`.
   - Hiệu ứng chuyển viền sang `--accent-border` và đổ bóng `--card-hover-shadow` khi rê chuột.
4. **`src/components/sections/WorkflowSection.tsx`**:
   - Chuyển cấu trúc `<dl><dt><dd>` thành component `WorkflowPipeline` trực quan:
     - Input (Icon Download, viền muted).
     - Process (Icon Zap, viền accent nổi bật).
     - Output (Icon Target, viền muted).
     - Đường trục dọc kết nối kèm mũi tên `ChevronDown` tạo cảm giác chuyển giao dữ liệu tuần tự chuẩn automation workflow.

---

## 3. Verification Gates Results

- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning không liên quan từ file cache .remember)
- `npm run build`: **PASS** (Next.js 16 App Router build thành công)
- `npm run format:check`: **PASS** (Tất cả file tuân thủ chuẩn Prettier)
