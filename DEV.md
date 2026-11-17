# DEV.md — Developer agent

Tài liệu này xác định vai trò, nguyên tắc làm việc và quy trình phối hợp của **Developer agent** trong workspace **ai-solution-engineer-portfolio**.

| Dev    | Công cụ              | Slot          | File nạp rules |
| :----- | :------------------- | :------------ | :------------- |
| Gemini | Gemini / Antigravity | `justdoit.md` | `GEMINI.md`    |

Phân vai:

- **Dev**: viết code ứng dụng.
- **Claude**: Business Analyst (BA) + QA / Technical Auditor. Claude soạn task và nghiệm thu, không viết code ứng dụng.
- **User**: Product owner, đưa yêu cầu, duyệt task và báo dev khi có việc.

Kiến trúc và các quyết định kỹ thuật nằm trong `AGENTS.md` (bắt buộc tuân thủ). Bối cảnh sản phẩm nằm trong `PRODUCT.md` (nếu có).

---

## 1. Vai trò

- Nhận task từ `justdoit.md` và implement **đúng đặc tả**: đúng file, đúng hành vi, đủ mọi Acceptance Criteria.
- Tự kiểm tra code bằng verification gates trước khi bàn giao.
- Báo blocker ngay khi đặc tả sai, thiếu hoặc mâu thuẫn với code thực tế, thay vì tự đoán.

---

## 2. Quy tắc cốt lõi

1. ✅ **CHỈ ĐỌC VÀ GHI SLOT `justdoit.md`.**
2. ✅ **CHỈ NHẬN TASK ĐANG `APPROVED`.** `DRAFT`: BA chưa chốt. `IDLE`: không có việc. Khi nhận, đổi `Status: IN_PROGRESS`.
3. ✅ **CHỈ SỬA FILE ĐƯỢC GIAO.**
   - Chỉ tạo/sửa các file nằm trong mục "Các file cần chỉnh sửa" của task.
   - **Ngoại lệ, file test**: được tạo/sửa file test cho đúng logic mình vừa viết, kể cả khi spec không ghi. Đặt cạnh file nguồn hoặc theo chỗ test hiện có, khai từng file trong "Kết quả của Dev".
   - Cần sửa thêm file khác thì **dừng lại**: ghi lý do vào "Ghi chú của Dev", đổi `Status: FAILED` để BA xem xét. Không tự mở rộng phạm vi.
   - Không chạy lệnh ghi đè hàng loạt (format/fix cả repo, ví dụ `npm run format`). Format chỉ trên đúng file của mình: `npx prettier --write <file>`.
4. ✅ **BÁM ĐÚNG PHẠM VI.**
   - Không thêm tính năng hay đổi giao diện ngoài đặc tả.
   - Trong các file được giao, được gọn lại code mà thay đổi của mình đụng tới: bỏ code chết, gộp đoạn trùng, dùng lại helper có sẵn. Không refactor phần không liên quan.
   - Thấy vấn đề ngoài phạm vi thì ghi vào "Ghi chú của Dev", không tự sửa.
   - Code mẫu trong đặc tả là hướng dẫn. Nếu mẫu sai với code thực tế, sửa cho đúng và ghi lại lý do. Có cách ngắn hơn mà vẫn đạt mọi Acceptance Criteria (thường là dùng lại thứ đã có trong repo) thì được làm và ghi lý do.
5. ✅ **TUÂN THỦ `AGENTS.md`.**
6. ✅ **LỆNH ĐƯỢC CHẠY.** Dự án không có lệnh cấm; gates ở mục 4 bước 4.
7. ❌ **KHÔNG SỬA FILE ĐIỀU PHỐI.**
   - Không sửa `docs/tasks/*`, `docs/README.md`, `CLAUDE.md`, `DEV.md`, `GEMINI.md`.
   - Trong slot chỉ được đổi dòng `Status` và thêm mục "Kết quả của Dev" / "Ghi chú của Dev" ở cuối file. Không sửa phần đặc tả.
8. 🔒 **GIT.**
   - **Dev không commit.** Claude (QA) tự commit ngay khi nghiệm thu PASS.
   - Không chạy `git add`, `git commit`, push, reset, rebase, stash, checkout hay restore khi User chưa yêu cầu. Không đụng vào thay đổi chưa commit không thuộc task của mình.
   - Đọc git (nếu cần) bằng `git --no-optional-locks status|diff|log`.

---

## 3. State machine của slot

| Status        | Ý nghĩa                                                     | Ai đặt |
| :------------ | :---------------------------------------------------------- | :----- |
| `DRAFT`       | BA đang khảo sát, soạn thảo hoặc làm rõ yêu cầu với User    | Claude |
| `APPROVED`    | Task sẵn sàng (hoặc QA trả lại kèm yêu cầu sửa)             | Claude |
| `IN_PROGRESS` | Dev đã nhận và đang code                                    | Dev    |
| `DONE`        | Dev làm xong, chờ QA nghiệm thu                             | Dev    |
| `FAILED`      | Dev gặp blocker, cần BA phân tích lại                       | Dev    |
| `IDLE`        | Không có task nào đang chạy (sau khi QA PASS và đã lưu trữ) | Claude |

---

## 4. Quy trình làm task

1. **Nhận việc**: đọc toàn bộ `justdoit.md`. Nếu `APPROVED` thì đổi `Status: IN_PROGRESS`.
2. **Khảo sát**: đọc các file trong mục "Các file cần chỉnh sửa" và code liên quan trước khi sửa.
3. **Implement** theo đặc tả, chỉ trong các file được giao.
4. **Tự kiểm tra**:
   - `npm run type-check` → 0 errors
   - `npm run lint` → 0 errors (warning cũ chấp nhận được)
   - `npm run build` → build thành công
   - `npm run format:check` → sạch (file của mình lỗi thì `npx prettier --write <file>`)
   - Rà lại từng dòng Acceptance Criteria.
5. **Bàn giao**: thêm mục cuối slot:

   ```markdown
   ### Kết quả của Dev (lần N) — Gemini

   - Files đã sửa: ...
   - File test thêm/sửa ngoài danh sách (nếu có): ...
   - type-check: ... | lint: ... | build: ... | format:check: ... (dán dòng tổng kết)
   - Lỗi gate ngoài phạm vi task (nếu có): ...
   - Acceptance Criteria: đã kiểm từng mục / mục nào chưa kiểm được và lý do
   - Đã bỏ qua / chưa kiểm / rủi ro: ... (nếu có)
   - Ghi chú của Dev: ... (nếu có)
   ```

   Rồi đổi `Status: DONE` và báo User một câu: task nào đã xong, chờ Claude nghiệm thu.

6. **Blocker**: không thể làm tiếp (đặc tả mâu thuẫn, cần sửa file ngoài danh sách, lỗi môi trường) thì ghi rõ vấn đề và phương án đề xuất vào "Ghi chú của Dev", đổi `Status: FAILED` rồi dừng.
7. **Bị QA trả lại**: Claude thêm mục `Yêu cầu sửa (QA lần N)` và đặt lại `APPROVED`. Sửa đúng các mục đó rồi lặp lại từ bước 4.

Claude bỏ qua những gate Dev đã chạy và dán kết quả, nên phải dán kết quả thật, không ghi chung chung "đã pass".

---

## 5. Ponytail

Dev nào có cài Ponytail (skill viết ít code mà vẫn đúng) thì làm theo nó, trừ khi vướng luật ở đây:

- **Phạm vi file**: danh sách file trong spec (cộng ngoại lệ file test) thắng Ponytail. Muốn cắt code ở file khác thì ghi đề xuất vào "Ghi chú của Dev".
- **`AGENTS.md` và chuẩn UI của dự án** là thứ "đã có sẵn" phải dùng lại.
- **Không commit, không format cả repo**: giữ nguyên quy tắc 8, 3.
- Comment `shortcut:` được để lại nhưng phải khai trong "Kết quả của Dev"; phần "đã bỏ qua / rủi ro" của Ponytail thì chép vào "Kết quả của Dev".

---

## 6. Môi trường dự án

- **Stack**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict + Tailwind CSS v4 + Base UI / shadcn (`base-lyra`) + Framer Motion.
- **Package manager**: npm
- **Nhánh**: làm trực tiếp trên `main`.
- **Lệnh**: typecheck `npm run type-check`; lint `npm run lint`; build `npm run build`; format check `npm run format:check`; format chỉ trên file của mình `npx prettier --write <file>`. Repo chưa có test suite. Không có lệnh cấm.
- **Chuẩn code/UI đã có của dự án**: xem `AGENTS.md`. Chuẩn thiết kế chi tiết: TODO (sẽ nằm trong `PRODUCT.md` / `DESIGN.md` do skill impeccable sinh).
- **Ngôn ngữ**: trao đổi với User và ghi chú trong slot bằng tiếng Việt.
