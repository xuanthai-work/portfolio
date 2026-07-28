# AI Solution Engineer Portfolio

Khung portfolio chuyên nghiệp dành cho vị trí AI Solution Engineer. Dự án tập trung vào cấu trúc nội dung, case study, solution architecture, workflow và technical writing. Thông tin hồ sơ hiện được lấy từ CV của Bui Xuan Thai; những dữ liệu CV chưa cung cấp vẫn dùng placeholder rõ ràng.

Không có backend hoặc database. Form liên hệ chỉ kiểm tra dữ liệu ở trình duyệt và không gửi thông tin đi đâu.

## Tech stack

- Next.js 16 với App Router
- React 19
- TypeScript strict
- Tailwind CSS 4
- Framer Motion
- Lucide React
- ESLint
- Prettier

## Cấu trúc thư mục

```text
src/
  app/
    blog/
      [slug]/
      page.tsx
    projects/
      [slug]/
      page.tsx
    layout.tsx
    page.tsx
    sitemap.ts
    robots.ts
  components/
    architecture/
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

- `src/data`: toàn bộ nội dung có thể chỉnh sửa.
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

Chỉnh nội dung trong `src/data/profile.ts`:

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

Mở `src/data/projects.ts` và thêm một object theo interface `Project` trong `src/types/index.ts`.

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

## Thêm architecture

Mở `src/data/architectures.ts` và thêm item theo interface `ArchitectureItem`.

Mỗi item hỗ trợ:

- Title và description
- Category
- Diagram
- Technologies
- Related project slug

Card architecture mở modal xem sơ đồ lớn. `relatedProjectSlug` cần trùng với một project hiện có.

## Thêm workflow

Mở `src/data/workflows.ts` và thêm item theo interface `WorkflowItem`.

Mỗi workflow mô tả:

- Công cụ
- Input
- Process
- Output
- Hình minh họa
- Project liên quan

## Thêm blog post

Mở `src/data/blog.ts` và thêm object theo interface `BlogPost`.

`slug` tạo route `/blog/[slug]`. Trường `content` hiện là mảng paragraph để dễ thay bằng MDX trong giai đoạn sau mà không thay đổi cấu trúc route.

Nên cập nhật:

- Title và summary
- Published date và updated date
- Tags
- Cover image
- Reading time
- Content

## Thay CV

Thay file:

```text
public/resume.pdf
```

Giữ nguyên tên file để nút Download CV tiếp tục hoạt động. File hiện tại là CV của Bui Xuan Thai.

## Thay social links

Chỉnh:

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
public/images/blog/
```

Sau đó tham chiếu từ data bằng đường dẫn bắt đầu với `/images/`.

Website có image fallback để tránh lỗi giao diện khi asset không tải được. Visual hero hiện tại là asset trừu tượng được tạo riêng, không chứa người thật, thương hiệu hoặc dữ liệu giả.

## SEO

Metadata mặc định nằm trong `src/app/layout.tsx`. Cấu hình tên, mô tả, canonical URL và OG image được lấy từ:

```text
src/data/profile.ts
src/lib/site.ts
```

Project và blog post tạo metadata theo slug. Sitemap và robots được tạo bằng App Router metadata routes.

Trước khi deploy, thay `https://your-domain.example` bằng domain thật.

## Deploy lên Vercel

1. Push repository lên GitHub, GitLab hoặc Bitbucket.
2. Tạo project mới trên Vercel.
3. Import repository.
4. Giữ framework preset là Next.js.
5. Không cần environment variable ở giai đoạn hiện tại.
6. Deploy.
7. Cập nhật domain thật trong `src/data/profile.ts`.
8. Build lại để canonical URL và sitemap dùng đúng domain.

Có thể deploy bằng Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Checklist trước khi xuất bản

- Rà soát các placeholder còn lại trong `src/data`.
- Thay `public/resume.pdf` khi có phiên bản CV mới.
- Thêm ảnh project, architecture, workflow và blog thật.
- Xác minh toàn bộ GitHub, LinkedIn, email, demo và credential URL.
- Chỉ thêm số liệu thành tích có thể kiểm chứng.
- Chạy `npm run format:check`.
- Chạy `npm run lint`.
- Chạy `npm run type-check`.
- Chạy `npm run build`.
