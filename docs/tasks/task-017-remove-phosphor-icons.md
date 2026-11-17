# TASK-017 — Gỡ gói @phosphor-icons/react

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

`@phosphor-icons/react` không còn được import ở đâu trong `src/` (toàn bộ icon dùng `lucide-react`). Gỡ gói và đổi cấu hình shadcn sang `lucide`.

## Thay đổi theo file

- `package.json`: bỏ `@phosphor-icons/react` (qua `npm uninstall`).
- `package-lock.json`: chỉ xóa 14 dòng của `@phosphor-icons/react`; không gói nào khác đổi phiên bản.
- `components.json`: `"iconLibrary": "phosphor"` → `"lucide"`.

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 0 warnings
- `npm run build`: thành công
- `npm run format:check`: sạch

## QA

- Diff `package.json`, `package-lock.json`, `components.json` đúng đặc tả; `node_modules/@phosphor-icons` không còn; `grep phosphor` trong `src`, `components.json`, `package.json`, `package-lock.json` không còn kết quả.
- Không có file nào bị stage (Dev tuân thủ quy tắc git lần này).
- Gói không được dùng nên giao diện không đổi; không chụp lại ảnh.
- Ghi chú quy trình: Dev ghi kết quả vào mục 5 của đặc tả thay vì chỉ thêm ở cuối slot (DEV.md quy tắc 7); không ảnh hưởng kết quả.
