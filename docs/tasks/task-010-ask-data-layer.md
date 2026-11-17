# TASK-010 — Tầng dữ liệu cho trang Ask

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Trang chủ mới là trang Ask: chọn câu hỏi gợi ý (hoặc gõ câu hỏi) để nhận câu trả lời kèm phần đính kèm (thẻ dự án, kinh nghiệm, kỹ năng). Bản đầu trả lời theo kịch bản, chưa gọi LLM. Task này chỉ làm tầng dữ liệu; giao diện là TASK-011. Phần đính kèm trỏ tới dữ liệu có sẵn, không chép nội dung.

## Thay đổi theo file

- `src/types/index.ts`: thêm `AskAttachment` (`none` | `project` | `projects` | `experience` | `skills`), `AskPrompt`, `AskContent`; thêm `metrics?: Metric[]` vào `Project`.
- `src/data/ask.ts` (mới): `askContent` (tiêu đề, phụ đề, placeholder, câu trả lời mặc định, ghi chú rail) và 4 `askPrompts`: RAG → `techter-chatbot`; dự án nổi bật → GSlide, AI Meeting Note, Techter; kinh nghiệm; kỹ năng. Mỗi prompt có danh sách từ khóa cho câu hỏi tự gõ.
- `src/lib/portfolio-repository.ts`: thêm `getAskContent`, `getAskPrompts` bọc `cache()`.
- `src/data/projects.ts`: thêm `metrics` cho GSlide (Company-wide), AI Meeting Note (80%+), Techter (<1.5s, ~35%); mỗi giá trị có sẵn trong `results`.
- `AGENTS.md`: thêm quyết định "Ask trả lời theo kịch bản, đính kèm trỏ tới dữ liệu có sẵn; số trên thẻ dự án lấy từ `Project.metrics`"; thêm `ask` vào danh sách `src/data/`.

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước ở file ngoài phạm vi
- `npm run build`: thành công
- `npm run format:check`: sạch

## QA

- Diff khớp đặc tả nguyên văn; không có file ngoài phạm vi.
- 4 slug trong `askPrompts` đều tồn tại trong `projects.ts`.
- Không có giao diện nào thay đổi nên không kiểm bằng trình duyệt.
