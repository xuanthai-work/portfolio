# Task Archive: Cập nhật & Thêm mới các dự án Doanh nghiệp (Company Projects - Gapo & Techvify) và làm sạch Content Sections

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/data/projects.ts`
  - `src/data/workflows.ts`
  - `src/data/content.ts`
  - `src/components/projects/ProjectCard.tsx`
  - `src/components/projects/ProjectDetails.tsx`
  - `src/components/projects/ProjectGallery.tsx`
  - `src/app/projects/page.tsx`

---

## 1. Objective & Requirements

- Bổ sung 2 case study dự án doanh nghiệp quan trọng nhất tại **GAPO** vào danh mục dự án:
  1. **GSlide – Enterprise Generative AI Presentation Platform** (`gslide-enterprise-presentation`)
  2. **AI Meeting Note – Autonomous Google Meet Assistant** (`ai-meeting-note-assistant`)
- Nâng cấp và chuẩn hóa toàn diện case study **Techter Chatbot** tại **Techvify** (thay thế bản nháp placeholder `teams-rag-mcp-assistant`), phản ánh chính xác kiến trúc Hexagonal Architecture, SSE streaming, pgvector citation pipeline, MCP Server, Microsoft Graph OBO và Redis Stack semantic caching.
- Loại bỏ toàn bộ các placeholder text dạng `[Add ...]` trong các dự án doanh nghiệp (`techter-chatbot`, `techvify-ai-recruitment`).
- Cập nhật `src/data/workflows.ts` để liên kết chính xác các workflow liên quan (`techter-chatbot`, thêm workflow `gslide-enterprise-presentation`).
- Viết lại toàn bộ mô tả trong `src/data/content.ts` loại bỏ các câu văn bản hướng dẫn mẫu template.

---

## 2. Changes Made

1. **`src/data/projects.ts`**:
   - Thêm case study **GSlide** (`gslide-enterprise-presentation`): Đầy đủ 9 phần (Requirements, Solution, Implementation, Technical Decisions, Challenges, Results, Lessons Learned), role "Product Architect & Core AI Engineer", tech stack Python/FastAPI, Next.js 16, React 19, Konva.js, S3/MinIO, Docker.
   - Thêm case study **AI Meeting Note** (`ai-meeting-note-assistant`): Đầy đủ 9 phần, role "AI Engineer", tech stack Python, FastAPI, Deepagents (LangGraph), OpenAI Compatible API, PostgreSQL, APScheduler, Docker.
   - Chuẩn hóa case study **Techter Chatbot** (`techter-chatbot`): Đổi từ slug cũ `teams-rag-mcp-assistant`, cập nhật kiến trúc Hexagonal, SSE streaming chat, pgvector citation pipeline, MCP Server, Microsoft Graph OBO, Redis Stack semantic cache (TTFT < 1.5s, −35% token cost).
   - Làm sạch toàn bộ placeholder trong `techvify-ai-recruitment`.
2. **`src/data/workflows.ts`**:
   - Bổ sung workflow `GenAI Slide Generation and Canvas Layout` trỏ về `gslide-enterprise-presentation`.
   - Cập nhật workflow `Techter Chatbot RAG and MCP Workflow` trỏ về `techter-chatbot`.
3. **`src/data/content.ts`**:
   - Viết lại toàn bộ section descriptions (`about`, `skills`, `projects`, `workflow`, `experience`, `education`, `contact`) sang văn phong kỹ sư AI chuyên nghiệp, dứt điểm xóa bỏ các câu template.
4. **UI Components & UX**:
   - `ProjectCard.tsx` & `ProjectDetails.tsx`: Ẩn các nút link khi URL rỗng, hiển thị thông báo rõ ràng đối với các dự án nội bộ bảo mật (`Internal enterprise project — source code and demo are not publicly available`).
   - `ProjectGallery.tsx`: Hiển thị empty state thân thiện khi dự án không có ảnh chụp màn hình công khai.
   - `src/app/projects/page.tsx`: Cập nhật thẻ SEO description chuẩn chỉ.

---

## 3. Verification Gates Results

- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning không liên quan từ file cache .remember)
- `npm run build`: **PASS** (Next.js 16 App Router build thành công)
- `npm run format:check`: **PASS** (Tất cả file tuân thủ chuẩn Prettier)
