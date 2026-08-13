# AI Solution Engineer Portfolio

Khung portfolio chuyên nghiệp dành cho vị trí AI Solution Engineer. Dự án tập trung vào cấu trúc nội dung, case study, solution architecture và workflow. Thông tin hồ sơ hiện được lấy từ CV của Bui Xuan Thai; những dữ liệu CV chưa cung cấp vẫn dùng placeholder rõ ràng.

Ứng dụng đọc nội dung portfolio từ Neon Postgres phía server. `src/data` được giữ làm nguồn seed ban đầu và không được import bởi runtime.

## Tech stack

- Next.js 16 với App Router
- React 19
- TypeScript strict
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Neon Postgres với `pg`
- ESLint
- Prettier

## Cấu trúc thư mục

```text
src/
  app/
    projects/
      [slug]/
      page.tsx
    layout.tsx
    page.tsx
    sitemap.ts
    robots.ts
  components/
    layout/
    projects/
    sections/
    ui/
  data/
  lib/
  types/
public/
  images/
  resume.pdf
```

Nguyên tắc chính:

- `src/data`: dữ liệu nguồn dùng bởi script seed.
- `src/lib/portfolio-repository.ts`: toàn bộ truy vấn nội dung runtime.
- `db/migrations`: schema PostgreSQL có thể chạy lại an toàn.
- `scripts`: migration và seed database.
- `src/types`: schema TypeScript dùng chung.
- `src/components`: giao diện và logic tương tác.
- `src/app`: route, metadata và composition cấp trang.
- `public`: CV và image asset.

## Cài đặt

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

Mở `http://localhost:3000`.

## Kết nối Neon Postgres

1. Trong Neon Console, mở project và chọn **Connect**.
2. Sao chép connection string (nên dùng pooled connection string cho ứng dụng serverless).
3. Tạo file `.env.local` từ file mẫu:

```powershell
Copy-Item .env.example .env.local
```

4. Thay giá trị `DATABASE_URL` trong `.env.local` bằng connection string vừa sao chép.
5. Khởi động lại development server, sau đó mở:

```text
http://localhost:3000/api/health/database
```

Kết nối thành công sẽ trả về `database: "connected"`. Module dùng chung nằm ở `src/lib/db.ts`; chỉ import module này từ Server Components, Route Handlers hoặc Server Actions. Ví dụ truy vấn an toàn:

```ts
import { getDb } from "@/lib/db";

const db = getDb();
const project = await db`SELECT * FROM projects WHERE slug = ${slug}`;
```

Khi deploy Vercel, thêm `DATABASE_URL` trong **Project Settings > Environment Variables** cho các môi trường cần dùng rồi redeploy. Không commit `.env.local`; các file `.env*` đã được ignore, ngoại trừ `.env.example`.

### Migration và seed

Khởi tạo schema và migrate toàn bộ dữ liệu từ `src/data`:

```powershell
npm run db:setup
```

Có thể chạy riêng từng bước:

```powershell
npm run db:migrate
npm run db:seed
```

Migration dùng `CREATE TABLE/INDEX IF NOT EXISTS`; seed dùng upsert nên có thể chạy lại. Website đọc dữ liệu qua `src/lib/portfolio-repository.ts` và không import trực tiếp `src/data`.

## Build production

```bash
npm run type-check
npm run lint
npm run build
npm run start
```

Các script khác:

```bash
npm run format
npm run format:check
```

## Chỉnh sửa thông tin cá nhân

Chỉnh nội dung nguồn trong `src/data/profile.ts`, sau đó chạy `npm run db:seed`:

- Họ tên
- Vai trò
- Tóm tắt
- Giới thiệu
- Định hướng nghề nghiệp
- Chuyên môn
- Địa điểm
- Email
- URL website
- Các chỉ số

Không đặt thông tin cá nhân trực tiếp trong component JSX.

## Thêm project

Mở `src/data/projects.ts`, thêm một object theo interface `Project` trong `src/types/index.ts`, rồi chạy `npm run db:seed`.

Các trường case study gồm:

- Thông tin tổng quan và mô tả
- Business problem
- Requirements
- Proposed solution
- Role
- Tech stack
- Implementation
- Technical decisions
- Challenges
- Results
- Lessons learned
- Architecture image
- Cover image
- Screenshots
- GitHub, demo và case study URL
- Featured, status và thời gian

`slug` tạo route `/projects/[slug]`. Nên dùng slug duy nhất, chữ thường và phân tách bằng dấu gạch ngang.

## Thêm workflow

Mở `src/data/workflows.ts`, thêm item theo interface `WorkflowItem`, rồi chạy `npm run db:seed`.

Mỗi workflow mô tả:

- Công cụ
- Input
- Process
- Output
- Hình minh họa
- Project liên quan

## Thay CV

Thay file:

```text
public/resume.pdf
```

Giữ nguyên tên file để nút Download CV tiếp tục hoạt động. File hiện tại là CV của Bui Xuan Thai.

## Thay social links

Chỉnh file nguồn sau rồi chạy `npm run db:seed`:

```text
src/data/socialLinks.ts
```

Các URL placeholder như `[GitHub URL]` được render ở trạng thái không tương tác để tránh link hỏng. Thay bằng URL đầy đủ, ví dụ `https://...`, hoặc `mailto:...` cho email.

## Hình ảnh

Đặt asset vào các thư mục:

```text
public/images/projects/
public/images/architectures/
public/images/workflows/
```

Sau đó tham chiếu từ data bằng đường dẫn bắt đầu với `/images/`.

Website có image fallback để tránh lỗi giao diện khi asset không tải được. Visual hero hiện tại là asset trừu tượng được tạo riêng, không chứa người thật, thương hiệu hoặc dữ liệu giả.

## SEO

Metadata mặc định nằm trong `src/app/layout.tsx`. Cấu hình tên, mô tả, canonical URL và OG image được lấy từ:

```text
src/data/profile.ts
src/lib/site.ts
```

Project tạo metadata theo slug từ database. Sitemap và robots được tạo bằng App Router metadata routes.

Trước khi deploy, thay `https://your-domain.example` bằng domain thật.

## Deploy lên Vercel

1. Push repository lên GitHub, GitLab hoặc Bitbucket.
2. Tạo project mới trên Vercel.
3. Import repository.
4. Giữ framework preset là Next.js.
5. Thêm environment variable `DATABASE_URL` bằng Neon connection string.
6. Deploy.
7. Cập nhật domain thật trong `src/data/profile.ts` và chạy `npm run db:seed`.
8. Build lại để canonical URL và sitemap dùng đúng domain.

Có thể deploy bằng Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Checklist trước khi xuất bản

- Rà soát các placeholder còn lại trong `src/data`, rồi chạy `npm run db:seed`.
- Thay `public/resume.pdf` khi có phiên bản CV mới.
- Thêm ảnh project, architecture và workflow thật.
- Xác minh toàn bộ GitHub, LinkedIn, email, demo và credential URL.
- Chỉ thêm số liệu thành tích có thể kiểm chứng.
- Chạy `npm run format:check`.
- Chạy `npm run lint`.
- Chạy `npm run type-check`.
- Chạy `npm run build`.
