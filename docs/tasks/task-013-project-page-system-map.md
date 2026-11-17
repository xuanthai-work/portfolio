# TASK-013 — Trang dự án mới với System Map tương tác

- **Ngày nghiệm thu**: 2026-11-17
- **Kết quả**: PASS (QA lần 2)
- **Dev**: Gemini

## Bối cảnh & yêu cầu

Trang `/projects/[slug]` còn phong cách cũ, toàn ảnh placeholder 3D nền tối, khối screenshot trống. Task này viết lại trang theo phong cách paper/ink, bỏ ảnh placeholder, và thêm `SystemMap` (bản phác "B · System Map") cho dự án có `Project.architecture` (dữ liệu TASK-012): bấm node để xem quyết định thiết kế, cạnh nối với node đang chọn tô cam.

## Thay đổi theo file

- `src/components/projects/SystemMap.tsx` (mới, client): nhận đúng object `architecture`. Từ `md`: khung sơ đồ cao `rows × 96px`, nền chấm; cạnh vẽ bằng SVG `viewBox 0 0 100 100` + `vector-effect: non-scaling-stroke`, node định vị theo % từ col/row, thứ tự DOM theo cột rồi hàng; node đang chọn nền ink, `aria-pressed`. Dưới `md`: danh sách nút thay cho sơ đồ. Khung quyết định `aria-live`, sticky trên `lg`, có "Connected to" để nhảy sang node kề. Chữ trong node có `[overflow-wrap:anywhere]`.
- `src/components/projects/ProjectDetails.tsx` (viết lại): link "All projects"; phần đầu meta mono, tiêu đề Instrument Serif, mô tả ngắn, ô metrics; 11 mục (Overview, The problem, Requirements, How it's built, What I did, Key decisions, Challenges, Outcome, Lessons learned, Stack, Source & demo) dạng tiêu đề trái / nội dung phải, mục rỗng ẩn; `Section` có prop `wide` để sơ đồ trải hết chiều ngang dưới đoạn `solution`. Không còn render `coverImage`, `architectureImage`, `screenshots`.
- `AGENTS.md`: thêm quyết định "trang dự án không hiển thị ảnh placeholder; có `architecture` thì hiện SystemMap (client, nhận đúng object architecture); SVG viewBox 0–100 + % từ col/row; dưới md là danh sách nút".

## QA lần 1 → FAIL

Sơ đồ chỉ rộng 496px ở 1440 (node 100px), tên node gãy 2–3 dòng, "Conversational" tràn khỏi node "Brief". Nguyên nhân ở đặc tả: sơ đồ nằm trong cột phải của `Section` rồi lại tự chia cột cho khung quyết định. Sửa: thêm prop `wide` cho `Section` để sơ đồ trải hết chiều ngang; thêm `[overflow-wrap:anywhere]`. (Tiêu chí "3 cạnh cam" trong đặc tả đếm sai; FastAPI core có 4 cạnh.)

## Kết quả gates (Dev, lần 2)

- `npm run type-check`: 0 errors
- `npm run lint`: 0 errors, 1 warning có từ trước ở file ngoài phạm vi
- `npm run build`: thành công
- `npm run format:check`: sạch

## Kiểm tra giao diện (QA, headless Chrome trên `next start`)

- Techter / AI Meeting Note / GSlide ở 1440: khung sơ đồ 760px, node 166px; mở sẵn đúng node (FastAPI core / Session states / Canvas engine); số cạnh cam đúng số cạnh nối với node chọn; bấm node và "Connected to" đổi khung quyết định đúng.
- Quét 1440 / 1024 / 768: không node đè nhau, không chữ tràn khỏi node, không tràn ngang.
- Bàn phím: Tab đi qua node theo cột rồi hàng, có focus ring cam; Enter chọn node.
- Mobile 390: không có SVG, danh sách 8 nút (cao ≥ 53px), bấm đổi khung quyết định.
- Fooday (không có `architecture`): đủ 11 mục, không sơ đồ. Mọi trang: 0 ảnh, 1 `<main>`, không lỗi console.
