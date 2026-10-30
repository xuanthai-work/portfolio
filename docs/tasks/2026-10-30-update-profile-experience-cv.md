# Task Archive: Cập nhật Thông tin cá nhân, Kinh nghiệm (Experience), Kỹ năng (Skills) và Học vấn/Chứng chỉ theo CV mới

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/data/profile.ts`
  - `src/data/experience.ts`
  - `src/data/skills.ts`
  - `src/data/education.ts`
  - `src/data/certifications.ts`
  - `src/data/socialLinks.ts`
  - `src/lib/icons.ts`
  - `src/components/sections/ExperienceSection.tsx`
  - `public/resume.pdf`

---

## 1. Objective & Requirements

Đồng bộ dữ liệu hồ sơ cá nhân của Bùi Xuân Thái từ CV mới (`Bùi Xuân Thái Resume.pdf`):

- Định vị vai trò: **AI Engineer** (chuyên sâu Production GenAI, Agentic AI, RAG, MCP, LangChain, FastAPI, Next.js, Docker, PyTorch, OpenCV).
- Bổ sung kinh nghiệm làm việc tại **GAPO** (AI Engineer, Jul 2026 - Present) đứng đầu danh sách; chuẩn hóa Techvify, VNPT Media, Hexogon.
- Tái cấu trúc danh mục kỹ năng theo 4 nhóm Expertise trong CV: AI & ML, GenAI & Automation, Software Development, DevOps & Tools.
- Cập nhật đúng 4 chứng chỉ trong CV và học vấn Đại học FPT.

---

## 2. Changes Made

1. **`src/data/profile.ts`**:
   - `role`: "AI Engineer".
   - `summary` & `about`: Diễn đạt bám sát CV về hệ thống Production GenAI, kiến trúc Agentic và triển khai full-stack web.
   - `phone`: `098-882-0103`.
   - `metrics`: Đổi thành các số liệu uy tín (3 Years in Tech, 4 AI Roles, 3+ Production AI Systems, ~35% LLM Cost Reduction).
2. **`src/data/experience.ts`**:
   - Thêm `GAPO – AI Engineer` (Jul 2026 - Present) với 3 bullet points từ CV (GSlide, AI Meeting Note, FastAPI webhook pipelines, cloud asset pipeline).
   - Chuẩn hóa `Techvify` (Dec 2025 - Jun 2026): RAG-based AI assistant, MCP server, Microsoft Teams, n8n recruitment pipeline.
   - Chuẩn hóa `VNPT Media` (Sep 2024 - Dec 2024) và `Hexogon` (Oct 2023 - Jul 2024).
3. **`src/data/skills.ts`**:
   - Tái cấu trúc thành 4 nhóm theo đúng CV: AI & Machine Learning, GenAI & Automation, Software Development, DevOps & Tools.
4. **`src/data/education.ts`** & **`src/data/certifications.ts`**:
   - Học vấn: Đại học FPT (Oct 2022 - Dec 2025), BA in Artificial Intelligence, Grade: Good.
   - Chứng chỉ: Thu gọn về đúng 4 chứng chỉ xác thực trong CV (Nvidia, LearnQuest, Univ of Minnesota, IBM).
5. **`src/data/socialLinks.ts`**:
   - Cập nhật URL LinkedIn chuẩn `https://www.linkedin.com/in/xuanthai-bxt/`.
6. **`src/lib/icons.ts`**:
   - Đăng ký thêm 12 icon Lucide mới (Eye, ScanEye, Rabbit, DatabaseZap, PenTool, Terminal, Sparkles, v.v.) đảm bảo 100% kỹ năng có icon chuẩn, không fallback.
7. **`src/components/sections/ExperienceSection.tsx`**:
   - Xử lý điều kiện ẩn tiêu đề `Achievements` khi danh sách rỗng (VNPT Media và Hexogon), loại bỏ triệt để placeholder text.
8. **`public/resume.pdf`**:
   - Cập nhật bản PDF mới nhất từ CV ứng viên.

---

## 3. Verification Gates Results

- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning không liên quan từ file cache .remember)
- `npm run build`: **PASS** (Next.js 16 App Router build thành công)
- `npm run format:check`: **PASS** (Tất cả file tuân thủ chuẩn Prettier)
