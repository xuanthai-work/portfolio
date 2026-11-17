# TASK-008 — Nền tảng thiết kế: bảng màu, font, bỏ dark mode

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Bước đầu của đợt làm lại portfolio (trang chủ dạng hỏi đáp "Ask", trang dự án dạng sơ đồ kiến trúc). Task chỉ đặt nền thiết kế cho các task sau:

- Bảng màu theo sitaramoli.com.np: paper `#f8f7f4`, ink `#111111`, mist `#e8e7e3`, accent `#ff5a1f`. Chữ nhỏ và link dùng `--accent-strong` `#c2410c` để đạt tương phản 4.5:1.
- Font Instrument Serif (tiêu đề), Inter Tight (chữ thường), JetBrains Mono (mono).
- Bỏ dark mode, chỉ còn một theme sáng.
- Giữ tên CSS variable cũ, chỉ đổi giá trị, để component cũ vẫn chạy tới khi được thay.

## Thay đổi theo file

- `src/app/globals.css`: đổi giá trị toàn bộ token màu và shadcn bridge theo palette mới; thêm alias `--paper`, `--ink`, `--mist` kèm quy ước dùng accent; xóa khối `.dark`; giữ `@custom-variant dark` (có comment) để `dark:` không tự bật theo `prefers-color-scheme`; body chuyển sang Inter Tight 1rem, bỏ radial wash; tiêu đề Instrument Serif weight 400 với `font-synthesis-weight: none`; `@theme inline` trỏ `--font-heading`, `--font-body`, `--font-sans`, `--font-serif` sang font mới.
- `src/app/layout.tsx`: nạp `Instrument_Serif` (400, normal + italic), `Inter_Tight`, `JetBrains_Mono`; bỏ `themeScript`, thẻ `<head>` script và `suppressHydrationWarning`.
- `src/components/ui/Button.tsx`: hover của `default`/`primary` chuyển nền ink chữ paper (tránh cam đậm + chữ ink chỉ ~3.6:1); `secondary` hover chữ và `link` dùng `--accent-strong`.
- `src/components/ui/ThemeToggle.tsx`: xóa.
- `src/components/navigation/FileTreeSidebar.tsx`, `src/components/navigation/MobileFileTreeNav.tsx`, `src/components/layout/Header.tsx`: bỏ import và chỗ dùng `ThemeToggle`.
- `AGENTS.md`: thay dòng quyết định về màu bằng quy ước theme sáng + palette + accent; thêm dòng về font; bỏ `ThemeToggle` khỏi danh sách.
- `docs/tasks/2026-10-30-filetree-sidebar-layout.md`: QA chạy Prettier để `format:check` sạch (lỗi định dạng có từ trước, không thuộc thay đổi của Dev).

## Kết quả gates

- `npm run type-check`: 0 errors (Dev)
- `npm run lint`: 0 errors, 1 warning có từ trước (Dev)
- `npm run build`: thành công (Dev)
- `npm run format:check`: sạch sau khi QA format file docs cũ
- `grep -rn "ThemeToggle\|themeScript\|Fraunces\|Crimson" src`: không còn kết quả

## Kiểm tra giao diện (QA, headless Chrome trên `next start`)

- Desktop 1440 và mobile 390: nền `rgb(248, 247, 244)`, chữ `rgb(17, 17, 17)`, body Inter Tight 16px, tiêu đề Instrument Serif weight 400, `font-synthesis-weight: none`.
- Giả lập OS `prefers-color-scheme: dark`: trang vẫn sáng, `<html>` không có class `dark`.
- Nút chính nền `#ff5a1f`, chữ ink; không còn nút đổi theme.
- Chấp nhận tạm: chữ cam nhỏ trong component cũ (ví dụ dòng phụ đề Hero) chưa đổi sang `--accent-strong`; sẽ thay ở các task làm lại giao diện.
