# Task Archive: FileTree Sidebar Navigation & Painterly Layout (Chuẩn xác 100% Danny Montoya Aesthetic)

- **Date**: 2026-10-30
- **Status**: QA AUDIT PASS
- **Scope**:
  - `src/components/navigation/FileTree.tsx` (mới)
  - `src/components/navigation/FileTreeSidebar.tsx` (mới)
  - `src/components/navigation/MobileFileTreeNav.tsx` (mới)
  - `src/components/navigation/nav-tree.ts` (mới)
  - `src/components/about/StudioIllustration.tsx` (mới)
  - `src/lib/events.ts` (mới)
  - `src/app/layout.tsx`
  - `src/components/sections/AboutSection.tsx`
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/WorkflowSection.tsx`
  - `src/components/sections/EducationSection.tsx`
  - `src/components/bookshelf/Bookshelf.tsx`
  - `PLACEHOLDERS.md`

---

## 1. Objective & Requirements
Chuyển đổi triệt để bố cục toàn trang sang mô hình **FileTree Sidebar Navigation** chuẩn xác theo repo `dfmontoya02/danny-portfolio` và ảnh chụp màn hình do người dùng cung cấp:
- **Desktop Layout**: Sidebar cố định 22rem bên trái (`fixed top-0 left-0 w-[22rem] h-screen`) chứa Cây thư mục VSCode / MacOS Finder, nội dung chính cuộn bên phải (`lg:pl-[22rem]`).
- **FileTree Navigation**: Profile header (avatar viền gradient, tên, `PORTFOLIO`), 3 nút chấm MacOS (đỏ, vàng, xanh), nhãn `explorer`, cây thư mục đóng/mở được, icon theo đuôi tệp, cuộn mượt đến section và phát sự kiện mở đúng gáy sách trong Bookshelf khi bấm file dự án.
- **Mobile Experience**: Top bar dính kèm avatar + drawer toàn màn hình chứa FileTree.
- **Section ABOUT ("A FEW WORDS")**: Tiêu đề lớn in hoa đậm `A FEW WORDS`, nhãn `ABOUT`, cột trái tự sự có highlight từ khóa, cột phải là khung tranh minh họa nghệ thuật kỹ sư bên bàn làm việc công nghệ.

---

## 2. Changes Made
1. **`src/components/navigation/FileTree.tsx` & `nav-tree.ts`**:
   - Xây dựng cây thư mục đầy đủ phản ánh 10 dự án (`gslide.jsx`, `ai-meeting-note.jsx`, `fooday.jsx`, `carms.jsx`, `classchedule.jsx`, `bsche.jsx`, `techter.jsx`, `techvify-recruitment.jsx`, `neuralnews.jsx`, `ai-scoring.py`) cùng các section `home.jsx`, `about.md`, `skills/toolkit.jsx`, `experience.md`, `workflows/...`, `education/...`, `contact.jsx`.
   - Trạng thái đóng/mở thư mục mượt mà, đường kẻ dọc thụt lề chuẩn phong cách IDE, highlight theo dõi section khi người dùng cuộn trang (`IntersectionObserver`).
2. **`src/components/navigation/FileTreeSidebar.tsx`**:
   - Sidebar cố định 22rem phong cách macOS Finder với 3 chấm màu, thanh trạng thái ca se studies, tích hợp nút ThemeToggle và Tải CV ở chân sidebar.
3. **`src/components/navigation/MobileFileTreeNav.tsx`**:
   - Header mobile gọn gàng và Drawer mở cây thư mục với thao tác chạm mượt mà.
4. **`src/app/layout.tsx`**:
   - Bỏ thanh header cố định cũ, tích hợp `FileTreeSidebar` và `MobileFileTreeNav`, bọc nội dung trong khung `min-h-screen lg:pl-[22rem]`.
5. **`src/components/sections/AboutSection.tsx` & `StudioIllustration.tsx`**:
   - Tái thiết kế bố cục đúng 100% ảnh chụp màn hình: Tiêu đề `A FEW WORDS`, cột tự sự nổi bật từ khóa, cột phải đóng khung tranh minh họa nghệ thuật (`Fig. 02 — Studio workspace`).
6. **`src/lib/events.ts` & `Bookshelf.tsx`**:
   - Đồng bộ tương tác: click vào file dự án trong sidebar tự động cuộn đến Bookshelf và mở bung cuốn sách tương ứng.

---

## 3. Verification Gates Results
- `npm run type-check`: **PASS** (0 errors)
- `npm run lint`: **PASS** (0 errors, 1 warning không liên quan từ cache)
- `npm run build`: **PASS** (Next.js 16 App Router build thành công)
- `npm run format:check`: **PASS** (Tất cả file tuân thủ chuẩn Prettier)
