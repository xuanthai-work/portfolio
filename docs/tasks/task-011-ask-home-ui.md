# TASK-011 — Giao diện trang chủ Ask

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Thay trang chủ 8 section cuộn dọc bằng trang Ask theo bản phác "A · Ask": câu giới thiệu, 4 câu hỏi gợi ý, ô nhập; câu trả lời theo kịch bản kèm thẻ dự án / kinh nghiệm / kỹ năng. Cột "Skip the chat" cho người muốn đi thẳng tới dự án, CV, GitHub. Dùng dữ liệu từ TASK-010, không gọi API.

## Thay đổi theo file

- `src/app/page.tsx`: viết lại. Lấy song song nội dung Ask, prompt, dự án, kinh nghiệm, kỹ năng, social links, profile; resolve prompt phía server; tìm vị trí hiện tại (`endDate === "Present"`); render `AskConversation` trước, `AskRail` sau (`lg:order-first` đưa rail sang trái trên desktop).
- `src/lib/ask.ts` (mới): kiểu hiển thị `AskProjectCard`, `AskAttachmentView`, `AskPromptView`; `resolveAskPrompts` (bỏ prompt trỏ tới slug không tồn tại); `matchPrompt` khớp từ khóa. Chỉ import type.
- `src/components/ask/AskConversation.tsx` (mới, client): state hội thoại; chip gợi ý ẩn sau khi hỏi; form gõ câu hỏi (khớp từ khóa hoặc câu trả lời mặc định, bỏ qua câu rỗng); nút "Start over"; cuộn câu hỏi mới vào tầm nhìn có `scroll-mt-24`; hiệu ứng xuất hiện bằng framer-motion, tắt khi reduced motion; `role="log" aria-live="polite"`; input có label ẩn.
- `src/components/ask/AskAttachment.tsx` (mới): thẻ dự án chi tiết (metrics, stack, link case study), lưới 3 thẻ dự án, danh sách kinh nghiệm, nhóm kỹ năng.
- `src/components/ask/AskRail.tsx` (mới): trạng thái "Now: … at …", link All projects / Résumé (PDF) / social links (link ngoài mở tab mới, bỏ link placeholder), ghi chú; dính khi cuộn trên desktop.
- `AGENTS.md`: cập nhật cấu trúc thư mục (`page.tsx` là trang Ask, thêm `src/components/ask/`, `src/lib/ask.ts`); thêm quyết định "prompt Ask resolve phía server, client không import repository/@/data".

Section cũ trong `src/components/sections/` chưa xóa (để task dọn code chết).

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước ở file ngoài phạm vi
- `npm run build`: thành công
- `npm run format:check`: sạch

## Kiểm tra giao diện (QA, headless Chrome trên `next start`)

- Desktop 1440: tiêu đề Instrument Serif, 4 chip, không còn section cũ, 1 `<main>`; rail rộng 256px bên trái, dính khi cuộn (top 96px); mọi chip/link/nút cao 44px; không tràn ngang; không lỗi console.
- 4 chip: RAG → thẻ Techter (`<1.5s`, `~35%`, stack, link `/projects/techter-chatbot`); best projects → 3 thẻ GSlide / AI Meeting Note / Techter Chatbot có link; worked → 4 dòng GAPO, Techvify, VNPT Media, Hexogon; stack → 4 nhóm kỹ năng. Chip đã hỏi biến mất; bong bóng câu hỏi nền ink, cuộn xuống dưới header.
- Gõ "tell me about your experience" → trả lời kinh nghiệm; "hello" → câu trả lời mặc định không đính kèm; câu rỗng bị bỏ qua; ô nhập được xóa sau khi gửi; "Start over" trả về 4 chip.
- Rail: "Now: AI Engineer at GAPO"; Résumé có `download`; GitHub/LinkedIn `target=_blank`; Email `mailto:`.
- Mobile 390: rail nằm dưới hội thoại, không tràn ngang, thẻ dự án xếp một cột.
- Reduced motion: entry mới hiện ngay (opacity 1, không transform).

## Ghi chú cho task sau

- `matchPrompt` khớp theo chuỗi con nên "rag" cũng khớp "average", "storage"; nên đổi sang khớp theo từ khi làm bản LLM hoặc chỉnh dữ liệu.
- Trên mobile, chip + ô nhập dính đáy chiếm khoảng 1/4 chiều cao màn hình.
