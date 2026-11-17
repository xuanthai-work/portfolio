# AI Solution Engineer Portfolio

Website portfolio chuyên nghiệp dành cho vị trí **AI Solution Engineer**, với trang chủ dạng hỏi đáp (Ask), danh mục case study, trang dự án có sơ đồ kiến trúc tương tác và trang About kiểu CV.

Dữ liệu portfolio được cấu trúc rõ ràng trong `src/data/`, truy vấn qua `src/lib/portfolio-repository.ts` và render tối ưu với Next.js App Router (Server Components & React 19).

---

## Tech Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Base UI](https://base-ui.com/) (`@base-ui/react`), [shadcn](https://ui.shadcn.com/) (`base-lyra` preset)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (hiệu ứng hội thoại trang Ask)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**: ESLint, Prettier, TypeScript Compiler (`tsc`)

---

## Cấu trúc thư mục

```text
├── docs/                      # Tài liệu dự án, logs thực thi và archive task
│   ├── logs/                  # Log chi tiết các lần chạy của Dev Agent
│   └── tasks/                 # Lưu trữ các task sau khi QA Audit PASS
├── public/                    # Tài nguyên tĩnh
│   ├── images/                # Hình ảnh dự án, kiến trúc hệ thống, icon
│   └── resume.pdf             # File CV tải về
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── about/             # Trang giới thiệu / CV chi tiết
│   │   ├── projects/          # Danh sách & trang chi tiết dự án ([slug])
│   │   ├── globals.css        # CSS variables, theme tokens, Tailwind v4
│   │   ├── layout.tsx         # Root layout, fonts, SEO metadata
│   │   ├── page.tsx           # Trang chủ Ask (hội thoại theo kịch bản)
│   │   ├── robots.ts          # SEO robots.txt
│   │   └── sitemap.ts         # Dynamic sitemap
│   ├── components/            # React UI components
│   │   ├── ask/               # AskConversation, AskAttachment, AskRail
│   │   ├── layout/            # Header, Footer, MobileMenu
│   │   ├── projects/          # ProjectIndex, ProjectDetails, SystemMap
│   │   └── ui/                # Base UI & Custom primitives (Button, Container, PageSection...)
│   ├── data/                  # Nguồn dữ liệu nội dung tĩnh (Profile, Projects...)
│   ├── lib/                   # Utilities, repository pattern, site config, ask.ts
│   └── types/                 # TypeScript interfaces và types dùng chung
├── AGENTS.md                  # Kiến trúc hệ thống và quyết định kỹ thuật
├── CLAUDE.md                  # Hướng dẫn vai trò Business Analyst & QA Auditor
├── components.json            # Cấu hình shadcn Base UI
├── DEV.md                     # Quy tắc chung cho Developer Agent
├── package.json
└── tsconfig.json
```

---

## Cài đặt & Khởi chạy

### Yêu cầu môi trường

- Node.js >= 20.9
- npm / pnpm / yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## Workflow Phát triển (BA + Dev Agent)

Dự án áp dụng mô hình phối hợp hai tầng:

1. **Business Analyst & QA Auditor (Claude)**: Soạn task, xác định acceptance criteria và nghiệm thu code (quy tắc trong [`CLAUDE.md`](CLAUDE.md)).
2. **Developer Agent (Gemini)**: Viết code tự động theo task được giao (quy tắc trong [`DEV.md`](DEV.md), nạp qua `GEMINI.md`).
3. **Điều phối & Kiến trúc**: Giao task qua slot `justdoit.md`, tuân thủ kiến trúc và quyết định kỹ thuật trong [`AGENTS.md`](AGENTS.md), lưu trữ lịch sử task trong [`docs/README.md`](docs/README.md).

---

## Verification & Build Commands

Trước khi commit hoặc deploy, luôn kiểm tra với bộ lệnh:

```bash
# Kiểm tra TypeScript
npm run type-check

# Kiểm tra Linter
npm run lint

# Build production Turbopack
npm run build

# Kiểm tra định dạng code
npm run format:check

# Tự động sửa định dạng
npm run format
```

---

## Tùy biến nội dung Portfolio

Toàn bộ nội dung hiển thị được quản lý tập trung trong thư mục `src/data/`, không hard-code trong JSX:

- **Thông tin cá nhân & Giới thiệu**: Chỉnh sửa [`src/data/profile.ts`](src/data/profile.ts) (họ tên, chức danh, câu tóm tắt, số năm kinh nghiệm, định hướng).
- **Hội thoại & Gợi ý trang Ask**: Chỉnh sửa [`src/data/ask.ts`](src/data/ask.ts) (câu hỏi gợi ý và câu trả lời theo kịch bản của trang chủ).
- **Dự án & Case Studies**: Chỉnh sửa [`src/data/projects.ts`](src/data/projects.ts) (vấn đề nghiệp vụ, giải pháp AI, stack kỹ thuật, sơ đồ kiến trúc trong trường `architecture`, link demo/GitHub).
- **Kinh nghiệm làm việc**: Chỉnh sửa [`src/data/experience.ts`](src/data/experience.ts).
- **Kỹ năng & Chuyên môn AI**: Chỉnh sửa [`src/data/skills.ts`](src/data/skills.ts).
- **Liên kết mạng xã hội**: Chỉnh sửa [`src/data/socialLinks.ts`](src/data/socialLinks.ts).
- **Học vấn & Chứng chỉ**: Chỉnh sửa [`src/data/education.ts`](src/data/education.ts) và [`src/data/certifications.ts`](src/data/certifications.ts).
- **Cập nhật CV**: Thay thế file tại [`public/resume.pdf`](public/resume.pdf) (giữ nguyên tên file để link tải không bị hỏng).

---

## Triển khai (Deploy)

Dự án hoàn toàn tương thích và tối ưu khi deploy lên **Vercel**:

1. Đẩy mã nguồn lên repository GitHub / GitLab.
2. Đăng nhập Vercel và chọn **Add New Project**.
3. Import repo, chọn framework preset **Next.js**.
4. Chọn **Deploy** (không cần cấu hình database ngoài).
