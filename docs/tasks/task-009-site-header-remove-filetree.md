# TASK-009 — Header gọn dùng chung, gỡ điều hướng FileTree

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 2)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Đợt làm lại portfolio bỏ điều hướng FileTree (sidebar cố định 22rem trên desktop, thanh FileTree trên mobile). Thay bằng một header sticky ở trên cùng cho mọi trang: tên + chức danh bên trái, link Home / Projects và nút tải résumé bên phải; trên mobile là nút menu mở danh sách link toàn màn hình. Nội dung các trang chưa đổi.

## Thay đổi theo file

- `src/app/layout.tsx`: bỏ `FileTreeSidebar`, `MobileFileTreeNav` và việc lấy `projects`/`profile`; render `Header` + nội dung + `Footer`; bỏ `lg:pl-[22rem]`; đổi `<main id="main-content">` thành `<div id="main-content">` để mỗi trang chỉ có một `<main>` (trước đó lồng hai `<main>`); `RootLayout` không còn `async`.
- `src/components/layout/Header.tsx`: viết lại. Tên bằng Instrument Serif + chức danh mono; nav desktop từ `md`; nút `Résumé` dạng `default` size `sm`; sửa class nền sai cú pháp thành `bg-[var(--background)]/90`.
- `src/components/layout/MobileMenu.tsx`: breakpoint `md:hidden`; thêm prop `resumeUrl` và nút "Download résumé" ở đáy; link chữ lớn Instrument Serif; khóa cuộn trang khi mở; nút 44×44; dialog render qua `createPortal` ra `document.body`.
- `src/data/navigation.ts`: primary và footer còn Home (`/`) và Projects (`/projects`).
- `src/components/navigation/` (FileTree.tsx, FileTreeSidebar.tsx, MobileFileTreeNav.tsx, nav-tree.ts): xóa cả thư mục. `src/lib/events.ts` giữ lại vì Bookshelf còn dùng.
- `AGENTS.md`: cập nhật mô tả cấu trúc thư mục; thêm quyết định "layout bọc bằng `<div id="main-content">`, mỗi page tự render đúng một `<main>`".

## QA lần 1 → FAIL

Menu mobile bị trong suốt và không phủ toàn màn hình. Nguyên nhân: dialog `fixed inset-0` nằm trong `<header>` có `backdrop-blur-md`; `backdrop-filter` biến header thành containing block cho phần tử fixed con, nên dialog chỉ phủ 64px của header. Sửa bằng `createPortal` ra `document.body`, giữ hiệu ứng blur của header.

## Kết quả gates (Dev, lần 2)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước ở file ngoài phạm vi
- `npm run build`: thành công
- `npm run format:check`: sạch

## Kiểm tra giao diện (QA, headless Chrome trên `next start`)

- Desktop 1440 các trang `/`, `/projects`, `/projects/techter-chatbot`, trang 404: header sticky nền paper 90%, nav Home / Projects, nút Résumé nền `#ff5a1f` tải `/resume.pdf`, nội dung bắt đầu từ mép trái (không còn khoảng 22rem), mỗi trang đúng 1 `<main>`, không tràn ngang.
- Mobile 390: chỉ thấy tên + nút menu 44×44; mở menu thì phủ kín màn hình nền paper, focus vào nút đóng, body bị khóa cuộn, nút "Download résumé" sát đáy; Escape đóng menu và trả lại cuộn.
- Footer hiển thị Home / Projects.
