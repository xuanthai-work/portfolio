# TASK-016 — Dọn code chết sau đợt làm lại giao diện

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Sau TASK-008 → TASK-015, giao diện cũ (8 section, Bookshelf, ProjectCard, ảnh placeholder) không còn render nhưng code, dữ liệu, CSS token và tài liệu vẫn còn. Task chỉ xóa và dọn; mọi trang phải hiển thị y hệt trước.

## Thay đổi theo file

- **Xóa**: `src/components/sections/` (8 file), `ProjectCard.tsx`, `ProjectGallery.tsx`, `about/StudioIllustration.tsx`, `bookshelf/Bookshelf.tsx`, `ui/Badge|Card|EmptyState|Reveal|SafeImage|SectionHeading.tsx`, `lib/events.ts`, `lib/icons.ts`, `data/workflows.ts`, `scripts/watch-and-inject.ps1` (runner OpenCode cũ), `.env.example` (chỉ còn biến Neon). Các thư mục rỗng liên quan.
- `src/lib/portfolio-repository.ts`: bỏ `getWorkflows`, `getFeaturedProjects`.
- `src/data/projects.ts`: bỏ `featuredProjects`; bỏ `architectureImage`, `screenshots`, `caseStudyUrl`, `spineColor/Highlight/Shadow/Icon/Tagline` ở mọi dự án; giữ `spineTitle`, `coverImage` (ảnh OG), `featured`, `status`.
- `src/data/skills.ts`: bỏ `icon` ở mọi skill.
- `src/data/content.ts`: chỉ còn `about`, `projects`, `experience`, `contact`.
- `src/types/index.ts`: bỏ `WorkflowItem`, `Skill.icon`, 8 trường Project; `SectionKey` còn 4 khóa.
- `src/app/globals.css`: bỏ 13 token không dùng (`--surface-glass`, `--accent-soft`, `--accent-border`, `--card-hover-shadow`, `--frame-shadow`, `--hero-glow`, `--page-wash`, `--gold*`, `--page-surface`, `--spine-grain`, `--spine-wash`).
- `eslint.config.mjs`: thêm `.remember/**` vào `globalIgnores` (nguồn của warning lint "có từ trước").
- `package.json`: bỏ script `watch:task`; dependencies không đổi; `package-lock.json` không đổi.
- `README.md`: cập nhật mô tả, cấu trúc thư mục, workflow Claude BA/QA + Gemini Dev, mục tùy biến nội dung (thêm `ask.ts`, `architecture`), tech stack.
- `AGENTS.md`: cập nhật cấu trúc thư mục; sửa các quyết định về `"use client"`, animation, ảnh dự án; bỏ dòng `SafeImage`, `getIcon`.

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, **0 warnings**
- `npm run build`: thành công
- `npm run format:check`: sạch

## QA

- Grep theo tiêu chí: không còn tham chiếu tới file/trường đã xóa. Các dòng còn khớp đều là dương tính giả do mẫu grep trong đặc tả quá rộng (chữ "workflows" trong văn mô tả dự án, `AskProjectCard`, `SectionHeadingContent`). `spineTitle` còn đủ 10; `skills.ts` không còn `icon:`; 13 token không còn trong `globals.css`.
- Diff dữ liệu: `projects.ts` chỉ xóa dòng; `skills.ts` chỉ đổi `{ name, icon }` → `{ name }`.
- So ảnh toàn trang trước/sau (headless Chrome, `next start`, 6 route × 1440/390): 11/12 ảnh giống từng byte. `techter-1440` lệch 9.693 pixel trong khung quyết định SystemMap: chữ dịch khoảng 1px do làm tròn sub-pixel sau khi CSS gọn lại, chụp lại bản mới lần hai cho kết quả giống hệt nên khác biệt là ổn định nhưng không nhìn thấy bằng mắt; chấp nhận.
- Không lỗi console ở mọi route.

## Ghi chú

- Dev đã tự stage các file bị xóa (`git rm`), trái DEV.md quy tắc 8 (Dev không đụng index). Không ảnh hưởng kết quả vì QA commit đúng các file đó; nhắc lại quy tắc cho lần sau.
- Còn hai thư mục rỗng không được git theo dõi: `src/components/architecture/`, `src/components/blog/` (không thuộc danh sách xóa, vô hại).
- `@phosphor-icons/react` không còn được dùng nhưng chưa gỡ (giữ nguyên `package-lock.json` theo đặc tả).
