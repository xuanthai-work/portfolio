# AI Solution Engineer Portfolio

Website portfolio chuyên nghiệp dành cho vị trí **AI Solution Engineer**, tập trung vào cấu trúc nội dung, case study chuyên sâu, kiến trúc hệ thống AI (Solution Architecture) và quy trình làm việc (AI Workflow).

Dữ liệu portfolio được cấu trúc rõ ràng trong `src/data/`, truy vấn qua `src/lib/portfolio-repository.ts` và render tối ưu với Next.js App Router (Server Components & React 19).

---

## Tech Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Base UI](https://base-ui.com/) (`@base-ui/react`), [shadcn](https://ui.shadcn.com/) (`base-lyra` preset)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/)
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
├── scripts/                   # Scripts điều phối và tiện ích
│   └── watch-and-inject.ps1   # Runner điều phối OpenCode Dev Agent
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── projects/          # Danh sách & trang chi tiết dự án ([slug])
│   │   ├── globals.css        # CSS variables, theme tokens, Tailwind v4
│   │   ├── layout.tsx         # Root layout, fonts, SEO metadata
│   │   ├── page.tsx           # Trang chủ (One-page portfolio)
│   │   ├── robots.ts          # SEO robots.txt
│   │   └── sitemap.ts         # Dynamic sitemap
│   ├── components/            # React UI components
│   │   ├── layout/            # Header, Footer, MobileMenu
│   │   ├── projects/          # ProjectCard, ProjectDetails, ProjectGallery
│   │   ├── sections/          # Hero, About, Projects, Experience, Skills, Workflow...
│   │   └── ui/                # Base UI & Custom primitives (Button, Card, Badge...)
│   ├── data/                  # Nguồn dữ liệu nội dung tĩnh (Profile, Projects...)
│   ├── lib/                   # Utilities, repository pattern, site config
│   └── types/                 # TypeScript interfaces và types dùng chung
├── components.json            # Cấu hình shadcn Base UI
├── GEMINI.md                  # Hướng dẫn mô hình BA + QA Auditor
├── justdoit.md                # Task thực thi hiện tại (State Machine)
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

Dự án áp dụng mô hình hai tầng:

1. **Business Analyst & QA Auditor (Gemini)**: Soạn task, xác định acceptance criteria và nghiệm thu code qua [`justdoit.md`](justdoit.md) và [`GEMINI.md`](GEMINI.md).
2. **Developer Agent (OpenCode)**: Viết code tự động theo task được duyệt.

Để kích hoạt runner theo dõi task:

```bash
npm run watch:task
```

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
- **Dự án & Case Studies**: Chỉnh sửa [`src/data/projects.ts`](src/data/projects.ts) (vấn đề nghiệp vụ, giải pháp AI, stack kỹ thuật, kiến trúc, link demo/GitHub).
- **Kinh nghiệm làm việc**: Chỉnh sửa [`src/data/experience.ts`](src/data/experience.ts).
- **Kỹ năng & Chuyên môn AI**: Chỉnh sửa [`src/data/skills.ts`](src/data/skills.ts).
- **Quy trình làm việc (AI Workflow)**: Chỉnh sửa [`src/data/workflows.ts`](src/data/workflows.ts).
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
