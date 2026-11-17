# TASK-014 — Trang /projects dạng danh mục đánh số

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

`/projects` còn là lưới thẻ cũ (`ProjectCard`, ảnh placeholder). Đổi thành danh mục dạng danh sách đánh số theo phong cách paper/ink, kiểu "Selected work"; tiêu đề và mô tả lấy từ `sectionContent.projects`.

## Thay đổi theo file

- `src/components/projects/ProjectIndex.tsx` (mới, Server Component): `<ol>` mỗi dự án một dòng là một `Link` phủ cả dòng, 3 cột (số 01–10 | tên `spineTitle ?? title` + mũi tên, mô tả, nhãn "System map" cho dự án có `architecture` + 4 công nghệ đầu | vai trò, kỳ hạn, metric đầu tiên). Kỳ hạn trùng năm hiện một giá trị. Dưới `md` xếp dọc.
- `src/app/projects/page.tsx`: viết lại thân trang: nhãn "Index · N case studies", `h1` từ `sectionContent.projects.title`, mô tả, `ProjectIndex`; bỏ `ProjectCard`, `Container`, `EmptyState`. Giữ nguyên metadata.

`ProjectCard.tsx` chưa xóa (để TASK-016).

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước ở file ngoài phạm vi
- `npm run build`: thành công
- `npm run format:check`: sạch

## Kiểm tra giao diện (QA, headless Chrome trên `next start`)

- Desktop 1440: nhãn "Index · 10 case studies", `h1` "Selected case studies" (Instrument Serif); 0 ảnh, 1 `<main>`, 1 `<h1>`, 10 `<h2>`.
- 10 dòng đánh số 01–10 theo thứ tự dữ liệu, mỗi dòng đúng 1 link tới `/projects/<slug>`; nhãn "System map" chỉ ở GSlide, AI Meeting Note, Techter Chatbot; metric cam đậm ở 3 dự án đó; NeuralNews hiện `2024`, AI Scoring `2025`, Classchedule `Jul 2026`.
- Hover dòng: nền trắng, mũi tên dịch `2px -2px`; Tab tới dòng đầu có focus ring cam; bấm vào phần mô tả của dòng 08 chuyển tới `/projects/techter-chatbot`.
- Mobile 390: 3 khối xếp dọc, không tràn ngang. Không lỗi console.
