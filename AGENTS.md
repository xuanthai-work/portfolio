# AGENTS.md — ai-solution-engineer-portfolio

> Bản nháp do `/setup-dev` soạn từ khảo sát code ngày 2026-11-17. Cần User duyệt.

Portfolio cá nhân (AI Solution Engineer) dựng bằng Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS v4 + Base UI / shadcn (`base-lyra`) + Framer Motion. Không có database, không có API route; deploy lên Vercel.

## Cấu trúc thư mục

- `src/app/` — App Router: `page.tsx` (trang chủ one-page ghép các section), `projects/` + `projects/[slug]/`, `layout.tsx` (font, metadata, sidebar FileTree), `globals.css` (CSS variables / theme tokens), `robots.ts`, `sitemap.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`.
- `src/components/sections/` — các section trang chủ (Hero, About, Experience, Education, Projects, Workflow, Skills, Contact).
- `src/components/{layout,navigation,projects,bookshelf,about}/` — khung trang, điều hướng FileTree, hiển thị dự án, kệ sách Projects.
- `src/components/ui/` — primitive dùng chung (Button/ButtonLink, Card, Badge, Container, SectionHeading, Reveal, SafeImage, ExternalAction, EmptyState, ThemeToggle).
- `src/data/` — toàn bộ nội dung tĩnh (profile, projects, experience, skills, workflows, education, certifications, socialLinks, navigation, content).
- `src/lib/` — `portfolio-repository.ts` (truy cập dữ liệu), `site.ts` (site config/SEO), `icons.ts`, `events.ts`, `utils.ts`.
- `src/types/index.ts` — interface dùng chung cho dữ liệu.
- `public/` — ảnh, `resume.pdf` (giữ nguyên tên để link tải không hỏng).

## Architecture decisions

<!--
Mỗi quyết định kiến trúc một dòng gạch đầu dòng, nêu cả "cái gì" lẫn "vì sao".
Quy tắc: task nào tạo quyết định kiến trúc mới thì Dev thêm một dòng vào đây.
-->

- Nội dung hiển thị nằm trong `src/data/*.ts`, không hard-code trong JSX, để sửa nội dung không phải đụng component (theo README).
- Component và page chỉ đọc dữ liệu qua các hàm `cache()` trong `src/lib/portfolio-repository.ts`; không import `@/data/*` trực tiếp ở nơi khác. Hàm giữ chữ ký async để có thể đổi nguồn dữ liệu mà không sửa nơi gọi (đã bỏ Neon Postgres, đọc file tĩnh nhưng giữ nguyên chữ ký).
- Kiểu dữ liệu dùng chung khai báo trong `src/types/index.ts`; dữ liệu mới thêm interface ở đây.
- Mặc định là Server Component (section gọi repository bằng `async`); chỉ thêm `"use client"` cho phần tương tác (menu, FileTree, Bookshelf, ThemeToggle, Reveal, SafeImage).
- Link demo/GitHub chưa có giá trị thật được lọc bằng `isPlaceholder()` (`src/lib/utils.ts`) và ẩn khỏi UI thay vì hiện link hỏng.
- Ảnh hiển thị qua `SafeImage` (`src/components/ui/SafeImage.tsx`) thay vì `next/image` trực tiếp, vì nó tự đổi sang ảnh fallback `/images/hero/ai-system-architecture.png` khi ảnh lỗi.
- Icon kỹ năng/dự án khai trong dữ liệu bằng tên chuỗi và resolve qua `getIcon(name)` (`src/lib/icons.ts`), fallback `Code2`; thêm icon mới phải đăng ký trong map này.
- Màu sắc chủ yếu dùng CSS variables trong `globals.css` qua `var(--token)` (light/dark); còn một số mã hex cứng trong component cũ.
- Class name gộp bằng `cn()` từ `@/lib/utils`; biến thể component dùng `class-variance-authority` (xem `Button.tsx`).
- Animation xuất hiện dùng `Reveal` (Framer Motion) và tôn trọng `useReducedMotion`.
- Link ngoài (`https://`) mở tab mới với `rel="noreferrer"` (xử lý sẵn trong `ButtonLink`).
- Import alias `@/*` → `src/*`; Prettier với `prettier-plugin-tailwindcss` (double quote, semicolon, trailing comma).

## Chuẩn UI

- TODO: chuẩn thiết kế (typography, màu, layout, motion) sẽ nằm trong `PRODUCT.md` / `DESIGN.md` do skill impeccable sinh. Chưa có thì bám style hiện có trong `globals.css` và `src/components/ui/`.
