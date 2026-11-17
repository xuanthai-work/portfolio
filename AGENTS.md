# AGENTS.md — ai-solution-engineer-portfolio

> Bản nháp do `/setup-dev` soạn từ khảo sát code ngày 2026-11-17. Cần User duyệt.

Portfolio cá nhân (AI Solution Engineer) dựng bằng Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS v4 + Base UI / shadcn (`base-lyra`) + Framer Motion. Không có database, không có API route; deploy lên Vercel.

## Cấu trúc thư mục

- `src/app/` — App Router: `page.tsx` (trang chủ Ask), `about/` (trang CV), `projects/` + `projects/[slug]/`, `layout.tsx` (font, metadata, Header + Footer dùng chung), `globals.css` (CSS variables / theme tokens), `robots.ts`, `sitemap.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`.
- `src/components/sections/` — các section trang chủ (Hero, About, Experience, Education, Projects, Workflow, Skills, Contact).
- `src/components/ask/` — trang chủ Ask: `AskConversation` (client), `AskAttachment`, `AskRail`.
- `src/components/{layout,projects,bookshelf,about}/` — Header/Footer/MobileMenu, hiển thị dự án, kệ sách Projects.
- `src/components/ui/` — primitive dùng chung (Button/ButtonLink, Card, Badge, Container, SectionHeading, Reveal, SafeImage, ExternalAction, EmptyState, PageSection).
- `src/data/` — toàn bộ nội dung tĩnh (profile, projects, experience, skills, workflows, education, certifications, socialLinks, navigation, content, ask).
- `src/lib/` — `portfolio-repository.ts` (truy cập dữ liệu), `ask.ts` (resolve prompt + khớp từ khóa), `site.ts` (site config/SEO), `icons.ts`, `events.ts`, `utils.ts`.
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
- Mặc định là Server Component (section gọi repository bằng `async`); chỉ thêm `"use client"` cho phần tương tác (menu, Bookshelf, Reveal, SafeImage).
- Link demo/GitHub chưa có giá trị thật được lọc bằng `isPlaceholder()` (`src/lib/utils.ts`) và ẩn khỏi UI thay vì hiện link hỏng.
- Ảnh hiển thị qua `SafeImage` (`src/components/ui/SafeImage.tsx`) thay vì `next/image` trực tiếp, vì nó tự đổi sang ảnh fallback `/images/hero/ai-system-architecture.png` khi ảnh lỗi.
- Icon kỹ năng/dự án khai trong dữ liệu bằng tên chuỗi và resolve qua `getIcon(name)` (`src/lib/icons.ts`), fallback `Code2`; thêm icon mới phải đăng ký trong map này.
- Một theme sáng duy nhất (không dark mode). Bảng màu paper #f8f7f4 / ink #111111 / mist #e8e7e3 / accent #ff5a1f khai báo bằng CSS variables trong globals.css; --accent chỉ dùng cho nền, viền, icon, chữ lớn, còn chữ nhỏ và link dùng --accent-strong #c2410c để đạt tương phản 4.5:1.
- Font: Instrument Serif cho tiêu đề (chỉ weight 400, tắt font-synthesis-weight), Inter Tight cho chữ thường, JetBrains Mono cho mono; nạp qua next/font/google trong layout.tsx.
- Layout gốc chỉ bọc nội dung bằng `<div id="main-content">`; mỗi page tự render đúng một `<main>`, để không có landmark main lồng nhau.
- Trang Ask trả lời theo kịch bản: câu hỏi, câu trả lời, từ khóa và phần đính kèm khai trong src/data/ask.ts; phần đính kèm trỏ tới dữ liệu có sẵn (dự án theo slug, kinh nghiệm, kỹ năng) chứ không chép nội dung. Số liệu trên thẻ dự án lấy từ Project.metrics, mỗi số phải có trong results.
- Prompt Ask được resolve thành dữ liệu hiển thị phía server (src/lib/ask.ts, resolveAskPrompts) rồi mới truyền xuống client component, nên client không import repository/@/data; prompt trỏ tới slug không tồn tại thì bị bỏ.
- Sơ đồ kiến trúc dự án khai trong Project.architecture theo lưới cột/hàng (col 0–3, row 0–4), không theo pixel, để giao diện tự co giãn; decision của mỗi node chỉ diễn đạt lại thông tin đã có trong technicalDecisions/implementation/solution/lessonsLearned của chính dự án.
- Trang dự án không hiển thị coverImage/architectureImage/screenshots (đang toàn placeholder); dự án có Project.architecture thì hiện SystemMap (client, nhận đúng object architecture). Sơ đồ dùng SVG viewBox 0–100 cho cạnh và vị trí node theo % từ col/row; dưới md thay bằng danh sách nút.
- Class name gộp bằng `cn()` từ `@/lib/utils`; biến thể component dùng `class-variance-authority` (xem `Button.tsx`).
- Animation xuất hiện dùng `Reveal` (Framer Motion) và tôn trọng `useReducedMotion`.
- Link ngoài (`https://`) mở tab mới với `rel="noreferrer"` (xử lý sẵn trong `ButtonLink`).
- Import alias `@/*` → `src/*`; Prettier với `prettier-plugin-tailwindcss` (double quote, semicolon, trailing comma).
- Trang nội dung dài (dự án, About) dùng chung PageSection (tiêu đề trái 14rem, nội dung phải; prop wide cho khối trải ngang; id + scroll-mt-24 cho anchor).

## Chuẩn UI

- TODO: chuẩn thiết kế (typography, màu, layout, motion) sẽ nằm trong `PRODUCT.md` / `DESIGN.md` do skill impeccable sinh. Chưa có thì bám style hiện có trong `globals.css` và `src/components/ui/`.
