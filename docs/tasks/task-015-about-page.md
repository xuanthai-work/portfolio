# TASK-015 — Trang /about kiểu CV + PageSection dùng chung

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Sau khi trang chủ thành trang Ask, phần giới thiệu, kinh nghiệm chi tiết, học vấn, chứng chỉ, kỹ năng, liên hệ không còn chỗ hiển thị đầy đủ. Tạo trang `/about` kiểu CV từ dữ liệu có sẵn, đưa link About vào header, footer, rail trang chủ, sitemap; tách bố cục "tiêu đề trái, nội dung phải" thành component dùng chung.

## Thay đổi theo file

- `src/components/ui/PageSection.tsx` (mới): tách từ `Section` của ProjectDetails; thêm `id` + `scroll-mt-24` cho anchor; giữ prop `wide`.
- `src/components/projects/ProjectDetails.tsx`: bỏ `Section` nội bộ, dùng `PageSection`; giao diện không đổi.
- `src/app/about/page.tsx` (mới): metadata từ `sectionContent.about`; phần đầu (nhãn, `h1`, about, career direction) + khung "Quick facts" (Now, Based in, Languages, tải résumé); 6 mục Focus, Experience (`#experience`: achievements chấm cam, responsibilities, technologies; bỏ `description` vì trùng), Education, Certifications (link "View credential" chỉ khi URL không phải placeholder), Skills, Contact (`#contact`: social links + điện thoại).
- `src/data/navigation.ts`: header và footer thêm About (Home / Projects / About).
- `src/app/sitemap.ts`: thêm `/about`.
- `src/components/ask/AskRail.tsx`: thêm "About & experience" sau "All projects".
- `AGENTS.md`: thêm `about/` và `PageSection` vào cấu trúc; thêm quyết định về `PageSection`.

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước (`.remember/tmp/last-ndc.ts`, file của plugin bộ nhớ, ngoài code dự án)
- `npm run build`: thành công, có route `/about`
- `npm run format:check`: sạch

## Kiểm tra giao diện (QA, headless Chrome trên `next start`)

- `/about` desktop 1440: nhãn "About · Bui Xuan Thai", `h1` Instrument Serif; Quick facts bên phải (Now: AI Engineer at GAPO, Based in, Languages, résumé `download`); 6 mục đúng thứ tự; 1 `<main>`, 1 `<h1>`, 0 ảnh, không tràn ngang.
- Experience: GAPO (2 achievements, 3 responsibilities, 11 tech), Techvify (2/4/14), VNPT Media (0/2/6), Hexogon (0/2/5).
- Certifications: IBM, NVIDIA không link; University of Minnesota, LearnQuest có link Coursera `target=_blank`.
- Contact: GitHub, LinkedIn (tab mới), Email `mailto:`, Phone `tel:+84988820103`; mỗi dòng cao 56px.
- `/about#experience`: tiêu đề mục ở 137px (header kết thúc 65px); `/about#contact` cuộn tới cuối trang, tiêu đề không bị che.
- Header và footer: Home / Projects / About; rail trang chủ: All projects → About & experience → Résumé.
- `/sitemap.xml` có `/about`.
- `/projects/techter-chatbot` giữ nguyên 11 mục, sơ đồ trải ngang 760px.
- Mobile 390: Quick facts nằm dưới phần giới thiệu, không tràn ngang. Không lỗi console.

## Ghi chú cho task sau

- `profile.siteUrl` vẫn là placeholder `https://your-domain.example`, nên sitemap và `metadataBase` đang trỏ sai domain; cần domain thật trước khi deploy.
- Warning lint có từ trước đến từ `.remember/tmp/`; nên thêm `.remember/**` vào `globalIgnores` của ESLint.
