# TASK-012 — Dữ liệu sơ đồ kiến trúc cho trang dự án

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 1)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Trang chi tiết dự án sẽ đổi sang dạng System Map (bản phác "B · System Map"): sơ đồ kiến trúc tương tác, bấm node để xem quyết định thiết kế. Task này chỉ làm dữ liệu; giao diện là TASK-013. Vị trí node theo lưới cột/hàng để giao diện tự co giãn; nội dung `decision` chỉ diễn đạt lại thông tin đã có trong dự án.

## Thay đổi theo file

- `src/types/index.ts`: thêm `ArchitectureNode` (id, label, sub, col, row, decision), `ArchitectureEdge` (from, to), `ArchitectureMap` (start, nodes, edges); thêm `architecture?: ArchitectureMap` vào `Project` sau `technicalDecisions`.
- `src/data/projects.ts`: thêm `architecture` (đặt sau `technicalDecisions`) cho 3 dự án:
  - `techter-chatbot`: 8 node / 7 cạnh — Teams → FastAPI core → Semantic cache, RAG chain, MCP server → Citation scoring, LLM, SharePoint; mở sẵn node FastAPI core.
  - `ai-meeting-note-assistant`: 8 node / 7 cạnh — Google Calendar → Scheduler → Meet bot → Webhook listeners → Session states và Summarizer agent → REST API → GapoWork; mở sẵn Session states.
  - `gslide-enterprise-presentation`: 8 node / 8 cạnh — Brief → Generation API → LLM, Bilingual errors, Asset store; Editor app → Generation API, Canvas engine; Asset store → Streaming cache → Canvas engine; mở sẵn Canvas engine.
- `AGENTS.md`: thêm quyết định "sơ đồ khai theo lưới col 0–3 / row 0–4, decision chỉ diễn đạt lại thông tin có sẵn của dự án".

## Kết quả gates (Dev)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước ở file ngoài phạm vi
- `npm run build`: thành công
- `npm run format:check`: sạch

## QA

- Script so sánh (nạp `projects.ts` bằng Node `--experimental-strip-types`, đối chiếu với các khối trong đặc tả): cả 3 sơ đồ khớp sâu từng node và cạnh.
- Toàn vẹn: id node không trùng; `start` và mọi đầu cạnh là id có thật; không hai node cùng ô; mọi `col` 0–3, `row` 0–4, số nguyên.
- Chỉ đúng 3 dự án có `architecture`; không có giao diện thay đổi.
