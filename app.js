// app.js

// 1. KHỞI TẠO DỮ LIỆU CỐT LÕI: Thêm trường mô tả chi tiết phục vụ hiển thị Modal mới
const INITIAL_DOCUMENTS = [
  {
    id: "MI1111",
    title: "Giáo trình Giải tích I (Nhóm ngành 1)",
    author: "Khoa Toán - Tin",
    tags: ["Đại cương", "Toán học", "Giáo trình"],
    downloadUrl: "https://drive.google.com/file/d/demo-giaitich1",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&auto=format&fit=crop&q=60",
    description:
      "Tài liệu hệ thống hóa toàn bộ kiến thức về hàm một biến, phép tính vi phân và tích phân, chuỗi số và chuỗi hàm. Đây là học liệu bắt buộc đối với sinh viên kỹ thuật năm thứ nhất tại Bách khoa Hà Nội.",
  },
  {
    id: "ET2050",
    title: "Bài giảng Lý thuyết mạch (Giảng viên: Đào Lê Thu Thảo)",
    author: "Trường Điện - Điện tử",
    tags: ["Cơ sở ngành", "Điện - Điện tử", "Bài giảng"],
    downloadUrl: "https://drive.google.com/file/d/demo-lythuyetmach",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=120&auto=format&fit=crop&q=60",
    description:
      "Nội dung tập trung phân tích mạch điện tuyến tính ở trạng thái xác lập hình sin, các phương pháp biến đổi mạch, mạch ba pha và các quá trình quá độ trong mạch cơ sở.",
  },
  {
    id: "IT3020",
    title: "Bài giảng Toán rời rạc (Giảng viên: Ban Hà Băng)",
    author: "Trường Công nghệ thông tin & Truyền thông",
    tags: ["Cơ sở ngành", "CNTT", "Bài giảng", "Toán học"],
    downloadUrl: "https://drive.google.com/file/d/demo-ctdlgt",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120&auto=format&fit=crop&q=60",
    description:
      "Cung cấp nền tảng lý thuyết tập hợp, logic toán, đại số Boole, lý thuyết đồ thị và bài toán đếm phục vụ trực tiếp cho tư duy lập trình và tối ưu thuật toán.",
  },
  {
    id: "PH1111",
    title: "Sách bài tập Vật lý đại cương I",
    author: "Khoa Vật lý kỹ thuật",
    tags: ["Đại cương", "Vật lý", "Sách bài tập"],
    downloadUrl: "https://drive.google.com/file/d/demo-vatly1",
    image:
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=120&auto=format&fit=crop&q=60",
    description:
      "Hệ thống bài tập Cơ học và Nhiệt học từ cơ bản đến nâng cao, đi kèm hướng dẫn giải chi tiết giúp sinh viên ôn tập phục vụ cho kỳ thi giữa kỳ và cuối kỳ.",
  },
  {
    id: "SSH1111",
    title: "Giáo trình Triết học Mác - Lênin",
    author: "Khoa Lý luận chính trị",
    tags: ["Lý luận chính trị", "Giáo trình"],
    downloadUrl: "https://drive.google.com/file/d/demo-triethoc",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=120&auto=format&fit=crop&q=60",
    description:
      "Giáo trình chuẩn của Bộ Giáo dục và Đào tạo, trang bị cho sinh viên thế giới quan duy vật biện chứng và phương pháp luận khoa học để phân tích các hiện tượng kinh tế - xã hội.",
  },
  {
    id: "FL3153",
    title:
      "Bài giảng Tiếng Anh Cơ khí và Khoa học Vật liệu (Giảng viên: Lương Trung Kiên)",
    author: "Khoa Ngoại ngữ",
    tags: ["Chuyên ngành", "Ngoại ngữ", "Bài giảng"],
    downloadUrl: "https://drive.google.com/file/d/demo-tienganh",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=60",
    description:
      "Phát triển vốn từ vựng chuyên ngành cơ khí, đọc hiểu bản vẽ kỹ thuật, tài liệu thông số vật liệu và rèn luyện kỹ năng viết báo cáo kỹ thuật bằng Tiếng Anh.",
  },
  {
    id: "ET3262",
    title:
      "Bài giảng Tư duy công nghệ và thiết kế kỹ thuật (Giảng viên: Nguyễn Tiến Dũng)",
    author: "Trường Điện - Điện tử",
    tags: ["Bổ trợ", "Bài giảng"],
    downloadUrl: "https://drive.google.com/file/d/demo-tienganh",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&auto=format&fit=crop&q=60",
    description:
      "Môn học kỹ năng mềm cốt lõi, hướng dẫn quy trình tư duy thiết kế, làm việc nhóm, hiện thực hóa ý tưởng kỹ thuật giải quyết các bài toán thực tiễn.",
  },
  {
    id: "MI1141",
    title: "Bài giảng Đại số (Nhóm ngành 1) (Giảng viên: Lê Quang Thủy)",
    author: "Khoa Toán - Tin",
    tags: ["Đại cương", "Toán học", "Bài giảng"],
    downloadUrl: "https://drive.google.com/file/d/demo-tienganh",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&auto=format&fit=crop&q=60",
    description:
      "Nghiên cứu về hệ phương trình đại số tuyến tính, không gian vectơ, ánh xạ tuyến tính, ma trận, định thức và dạng toàn phương.",
  },
];

let DATA_DOCUMENTS = INITIAL_DOCUMENTS;

// Dữ liệu giả lập sinh viên
const MOCK_STUDENTS_DB = {
  "trung.hq233678@sis.hust.edu.vn": {
    name: "Hoàng Quốc Trung",
    mssv: "20233678",
    cohort: "K68",
    school: "Trường Điện - Điện tử",
    major: "Kỹ thuật Điện tử - Viễn thông",
    currentYear: 3,
    avatarColor: "bg-amber-500",
    recommendTags: ["Điện - Điện tử", "Chuyên ngành", "Cơ sở ngành"],
  },
  default_student: {
    name: "Nguyễn Văn A",
    mssv: "20241234",
    cohort: "K69",
    school: "Trường CNTT & Truyền thông",
    major: "Khoa học Máy tính",
    currentYear: 2,
    avatarColor: "bg-blue-500",
    recommendTags: ["CNTT", "Cơ sở ngành"],
  },
};

let currentUserInfo = null;
let savedIds = []; // Mảng lưu danh sách ID tài liệu đã đánh dấu

const recommendSection = document.getElementById("recommendation-section");
const recommendContainer = document.getElementById("recommend-container");
const searchInput = document.getElementById("search-input");
const suggestionBox = document.getElementById("suggestion-box");
const resultContainer = document.getElementById("result-container");
const resultCount = document.getElementById("result-count");
const bookmarkContainer = document.getElementById("bookmark-container");
const historyContainer = document.getElementById("history-container");
const welcomeScreen = document.getElementById("welcome-screen");
const mainApp = document.getElementById("main-app");

// ---- CHỨC NĂNG 1: CHUYỂN GIAO DIỆN SÁNG / TỐI (DARK MODE) ----
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      themeIcon.classList.replace("fa-sun", "fa-moon");
      themeText.innerText = "Chế độ tối";
    } else {
      document.documentElement.classList.add("dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
      themeText.innerText = "Chế độ sáng";
    }
  });
}

// ---- CHỨC NĂNG 2: RENDER HỌC LIỆU (Đã lược bỏ cụm nút Lưu/Xem trước bên ngoài) ----
function renderDocuments(list) {
  if (!resultContainer) return;
  resultContainer.innerHTML = "";
  if (resultCount) resultCount.innerText = `${list.length} tài liệu`;

  if (list.length === 0) {
    resultContainer.innerHTML = `<p class="text-gray-400 col-span-1 sm:col-span-2 text-center py-6">Không tìm thấy tài liệu phù hợp.</p>`;
    return;
  }

  list.forEach((doc) => {
    const tagsHtml = doc.tags
      .map((tag) => {
        let colorClass =
          "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        if (tag === "Đại cương")
          colorClass =
            "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-100 dark:border-sky-900/30";
        else if (tag === "Toán học")
          colorClass =
            "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400 border border-pink-100 dark:border-pink-900/30";
        else if (tag === "Điện - Điện tử" || tag === "Điện - ĐT")
          colorClass =
            "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30";
        else if (tag === "CNTT")
          colorClass =
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30";
        else if (tag === "Chuyên ngành")
          colorClass =
            "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30";
        else if (tag === "Cơ sở ngành")
          colorClass =
            "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/30";
        else if (tag === "Vật lý")
          colorClass =
            "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30";
        else if (tag === "Lý luận chính trị")
          colorClass =
            "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30";
        else if (tag === "Giáo trình")
          colorClass =
            "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30";
        else if (tag === "Bổ trợ")
          colorClass =
            "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-100 dark:border-slate-700/40";
        else if (tag === "Bài giảng")
          colorClass =
            "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 border border-fuchsia-100 dark:border-fuchsia-900/30";
        else if (tag === "Sách bài tập")
          colorClass =
            "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30";
        else if (tag === "Ngoại ngữ")
          colorClass =
            "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-100 dark:border-teal-900/30";

        return `<span class="px-2 py-0.5 text-[10px] font-bold rounded ${colorClass}">${tag}</span>`;
      })
      .join("");

    // Toàn bộ thẻ card giờ đóng vai trò là một nút nhấn để kích hoạt Modal Chi Tiết
    resultContainer.innerHTML += `
      <div onclick="openDocumentDetailModal('${doc.id}')" class="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex gap-3 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-red-200 dark:hover:border-red-900 transition duration-200 cursor-pointer group">
          <img src="${doc.image}" class="w-16 h-22 object-cover rounded bg-gray-200 flex-shrink-0 shadow-sm group-hover:scale-[1.02] transition">
          <div class="flex flex-col justify-between flex-1 min-w-0">
              <div>
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider bg-red-600 text-white dark:bg-red-700 rounded uppercase shadow-sm">
                      ${doc.id}
                    </span>
                  </div>

                  <h4 class="font-bold text-xs sm:text-sm line-clamp-2 text-gray-800 dark:text-gray-100 leading-tight group-hover:text-red-700 dark:group-hover:text-red-400 transition">${doc.title}</h4>
                  
                  <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-1 flex items-center gap-1">
                    <i class="fa-solid fa-building-columns text-[10px] text-red-600/70 dark:text-red-400/80"></i> 
                    <span>${doc.author}</span>
                  </p>
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                  ${tagsHtml}
              </div>
          </div>
      </div>
    `;
  });
}

// ---- CHỨC NĂNG 3: GỢI Ý KHI GÕ TỪ KHÓA ----
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();

    if (!val) {
      if (suggestionBox) suggestionBox.classList.add("hidden");
      applyFilters();
      return;
    }

    const matched = DATA_DOCUMENTS.filter(
      (doc) =>
        doc.title.toLowerCase().includes(val) ||
        doc.id.toLowerCase().includes(val),
    );

    if (suggestionBox) {
      if (matched.length > 0) {
        suggestionBox.classList.remove("hidden");
        suggestionBox.innerHTML = matched
          .map(
            (doc) => `
            <div class="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 transition" onclick="selectSuggestion('${doc.title.replace(/'/g, "\\'")}', '${doc.id}')">
                <img src="${doc.image}" class="w-7 h-9 object-cover rounded">
                <div class="min-w-0 flex-1">
                    <p class="font-medium text-xs text-gray-800 dark:text-gray-200 truncate">${doc.title}</p>
                    <span class="text-[10px] text-gray-400">${doc.id}</span>
                </div>
            </div>
          `,
          )
          .join("");
      } else {
        suggestionBox.innerHTML = `<p class="p-3 text-xs text-gray-400 text-center">Không có gợi ý phù hợp</p>`;
        suggestionBox.classList.remove("hidden");
      }
    }
  });
}

function selectSuggestion(title, id) {
  if (searchInput) searchInput.value = title;
  if (suggestionBox) suggestionBox.classList.add("hidden");
  addHistory(title);
  openDocumentDetailModal(id);
}

document.addEventListener("click", (e) => {
  if (
    searchInput &&
    suggestionBox &&
    !searchInput.contains(e.target) &&
    !suggestionBox.contains(e.target)
  ) {
    suggestionBox.classList.add("hidden");
  }
});

// ---- CHỨC NĂNG 4: KHỞI TẠO BỘ LỌC ĐA ĐIỀU KIỆN ----
function initDropdownFilters() {
  const filterContainer = document.getElementById("tag-container");
  if (!filterContainer) return;

  filterContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-2">
      <div class="flex flex-col gap-1.5 w-full">
        <label class="text-[11px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
          <i class="fa-solid fa-layer-group text-[10px]"></i> Khối kiến thức
        </label>
        <select id="filter-level" class="w-full text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/70 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition cursor-pointer font-medium shadow-sm h-10">
          <option value="">-- Chọn khối kiến thức --</option>
          <option value="Đại cương">Đại cương</option>
          <option value="Cơ sở ngành">Cơ sở ngành</option>
          <option value="Chuyên ngành">Chuyên ngành</option>
          <option value="Bổ trợ">Bổ trợ</option>
          <option value="Lý luận chính trị">Lý luận chính trị</option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5 w-full">
        <label class="text-[11px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
          <i class="fa-solid fa-graduation-cap text-[10px]"></i> Ngành / Lĩnh vực
        </label>
        <select id="filter-major" class="w-full text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/70 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition cursor-pointer font-medium shadow-sm h-10">
          <option value="">-- Chọn ngành / lĩnh vực --</option>
          <option value="Toán học">Toán học</option>
          <option value="Vật lý">Vật lý</option>
          <option value="Điện - Điện tử">Điện - Điện tử</option>
          <option value="CNTT">Công nghệ thông tin</option>
          <option value="Ngoại ngữ">Ngoại ngữ</option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5 w-full">
        <label class="text-[11px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
          <i class="fa-solid fa-book-open text-[10px]"></i> Loại hình học liệu
        </label>
        <select id="filter-type" class="w-full text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/70 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition cursor-pointer font-medium shadow-sm h-10">
          <option value="">-- Chọn loại học liệu --</option>
          <option value="Giáo trình">Giáo trình</option>
          <option value="Bài giảng">Bài giảng</option>
          <option value="Sách bài tập">Sách bài tập</option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5 w-full">
        <label class="text-[11px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
          <i class="fa-solid fa-user-tie text-[10px]"></i> Giảng viên giảng dạy
        </label>
        <input 
          type="text" 
          id="search-teacher" 
          placeholder="Nhập tên giảng viên..." 
          class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition shadow-sm h-10"
        />
      </div>
    </div>
  `;

  document
    .getElementById("filter-level")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filter-major")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filter-type")
    .addEventListener("change", applyFilters);
  document
    .getElementById("search-teacher")
    .addEventListener("input", applyFilters);
}

function applyFilters() {
  const searchKeyword = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";
  const filterLevel = document.getElementById("filter-level")
    ? document.getElementById("filter-level").value
    : "";
  const filterMajor = document.getElementById("filter-major")
    ? document.getElementById("filter-major").value
    : "";
  const filterType = document.getElementById("filter-type")
    ? document.getElementById("filter-type").value
    : "";
  const searchTeacher = document.getElementById("search-teacher")
    ? document.getElementById("search-teacher").value.toLowerCase().trim()
    : "";

  const filteredList = INITIAL_DOCUMENTS.filter((doc) => {
    const matchesSearch =
      !searchKeyword ||
      doc.title.toLowerCase().includes(searchKeyword) ||
      doc.id.toLowerCase().includes(searchKeyword);
    const matchesLevel = !filterLevel || doc.tags.includes(filterLevel);
    const matchesMajor = !filterMajor || doc.tags.includes(filterMajor);
    const matchesType =
      !filterType ||
      doc.tags.some((tag) => tag.toLowerCase() === filterType.toLowerCase());
    const matchesTeacher =
      !searchTeacher || doc.title.toLowerCase().includes(searchTeacher);

    return (
      matchesSearch &&
      matchesLevel &&
      matchesMajor &&
      matchesType &&
      matchesTeacher
    );
  });

  DATA_DOCUMENTS = filteredList;
  renderDocuments(DATA_DOCUMENTS);
}

// ---- CHỨC NĂNG 5: MODAL CHI TIẾT TÀI LIỆU & PREVIEW SPLIT-SCREEN (MỚI) ----
function openDocumentDetailModal(docId) {
  const previewModal = document.getElementById("preview-modal");
  if (!previewModal) return;

  // Lấy thông tin tài liệu từ Database theo ID
  const doc = INITIAL_DOCUMENTS.find((d) => d.id === docId);
  if (!doc) return;

  // Cấu hình lại kiểm tra trạng thái đã Đánh dấu chưa
  const isMarked = savedIds.includes(docId);
  const bookmarkBtnHtml = isMarked
    ? `<button disabled class="py-2.5 bg-green-50 dark:bg-green-950/30 text-green-600 font-bold rounded-xl border border-green-200 flex items-center justify-center gap-1.5 cursor-not-allowed">
        <i class="fa-solid fa-bookmark"></i> Đã đánh dấu
       </button>`
    : `<button onclick="handleSaveToBookmarks('${doc.id}', this)" class="py-2.5 border border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm">
        <i class="fa-regular fa-bookmark"></i> Đánh dấu
       </button>`;

  // Đổ khuôn HTML cấu trúc 2 cột mới vào bên trong thẻ cha modal
  previewModal.classList.remove("hidden");
  previewModal.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-4" onclick="closeDocumentModal()">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden transform transition-all duration-300 flex flex-col md:flex-row max-h-[85vh]" onclick="event.stopPropagation()">
        
        <div id="modal-info-col" class="w-full md:w-1/2 p-5 flex flex-col justify-between border-r border-gray-100 dark:border-gray-700 max-h-[85vh] overflow-y-auto">
          <div>
            <div class="flex justify-between items-start gap-4 mb-3">
              <h3 class="font-bold text-sm md:text-base text-gray-900 dark:text-white leading-snug">${doc.title}</h3>
              <button onclick="closeDocumentModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-4 text-[10px]">
              <span class="bg-red-600 text-white px-2 py-0.5 rounded font-extrabold uppercase">${doc.id}</span>
              <span class="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-medium">${doc.author}</span>
            </div>

            <div class="space-y-3.5 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60">
              <div>
                <h4 class="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Giới thiệu tóm tắt:</h4>
                <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">${doc.description || "Tài liệu học tập nội bộ chuẩn hóa, cung cấp hệ thống kiến thức nền tảng và bài tập thực hành chuyên ngành cho sinh viên Đại học Bách khoa Hà Nội."}</p>
              </div>
              
              <div class="pt-2 border-t border-gray-200/60 dark:border-gray-700/60 text-[10px] text-amber-600 dark:text-amber-400 flex gap-1.5 items-start">
                <i class="fa-solid fa-triangle-exclamation mt-0.5 shrink-0 text-amber-500"></i>
                <p class="leading-normal font-medium">Lưu ý: Tài liệu này thuộc bản quyền học liệu số HUST. Nghiêm cấm mọi hành vi sao chép, sao lưu hoặc phát tán ra ngoài hệ thống Thư viện nội bộ dưới mọi hình thức.</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs font-bold">
            <button onclick="closeDocumentModal()" class="py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-xl transition text-center">
              Đóng
            </button>
            
            ${bookmarkBtnHtml}
            
            <button onclick="triggerRightPreview('${doc.id}')" class="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm">
              <i class="fa-solid fa-eye"></i> Xem trước
            </button>
            
            <a href="${doc.downloadUrl}" target="_blank" class="py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm text-center">
              <i class="fa-solid fa-download"></i> Tải bản đầy đủ
            </a>
          </div>
        </div>

        <div id="modal-preview-col" class="w-0 opacity-0 hidden md:flex bg-gray-50 dark:bg-gray-900/60 flex-col items-center justify-center border-l border-gray-100 dark:border-gray-700 transition-all duration-300 max-h-[85vh]">
        </div>

      </div>
    </div>
  `;
}

// Logic kích hoạt mở rộng hiển thị File Preview bên phải
function triggerRightPreview(docId) {
  const previewCol = document.getElementById("modal-preview-col");
  if (!previewCol) return;

  // Cấu hình bung rộng không gian cột
  previewCol.classList.remove("w-0", "opacity-0", "hidden");
  previewCol.classList.add("w-full", "md:w-1/2", "opacity-100", "p-5");

  // Giả lập giao diện PDF Viewer nội bộ cực kỳ trực quan
  previewCol.innerHTML = `
    <div class="w-full h-full border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 shadow-inner overflow-y-auto">
        <i class="fa-solid fa-file-pdf text-red-600 text-4xl mb-2.5 animate-pulse"></i>
        <p class="font-bold text-xs text-gray-800 dark:text-white mb-0.5">Chế độ xem trước tài liệu (Preview Mode)</p>
        <p class="text-[10px] text-gray-400 mb-4">Trang 1 / 45 — Bách khoa Hà Nội Học liệu số</p>
        
        <div class="w-full space-y-2 px-2 text-left opacity-75">
          <div class="h-3.5 bg-gray-100 dark:bg-gray-700 rounded w-2/3 font-bold text-[10px] text-gray-600 dark:text-gray-300 p-1 flex items-center">CHƯƠNG I: ĐẶT VẤN ĐỀ & CƠ SỞ LÝ THUYẾT</div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded w-11/12"></div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/5"></div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
        </div>
    </div>
  `;
}

function closeDocumentModal() {
  const previewModal = document.getElementById("preview-modal");
  if (previewModal) previewModal.classList.add("hidden");
}

// ---- CHỨC NĂNG 6: ĐÁNH DẤU HỌC LIỆU ----
function handleSaveToBookmarks(docId, buttonElement) {
  if (savedIds.includes(docId)) return;

  savedIds.push(docId);

  // Thay đổi trạng thái nút ngay trong Modal để phản hồi trực quan cho người dùng
  if (buttonElement) {
    buttonElement.innerHTML = `<i class="fa-solid fa-bookmark text-green-600"></i> <span class="text-green-600">Đã đánh dấu</span>`;
    buttonElement.classList.add(
      "bg-green-50",
      "dark:bg-green-950/20",
      "border-green-200",
    );
    buttonElement.disabled = true;
  }

  updateBookmarkUI();
}

function removeBookmark(id) {
  savedIds = savedIds.filter((item) => item !== id);
  updateBookmarkUI();
}

// ---- CHỨC NĂNG RE-RENDER BOOKMARK UI (Đổi tên hiển thị thành Đánh dấu) ----
function updateBookmarkUI() {
  if (!bookmarkContainer) return;
  if (savedIds.length === 0) {
    bookmarkContainer.innerHTML = `<p class="text-xs text-gray-400 py-2">Chưa có tài liệu nào được đánh dấu.</p>`;
    return;
  }
  bookmarkContainer.innerHTML = savedIds
    .map((id) => {
      const doc = INITIAL_DOCUMENTS.find((d) => d.id === id);
      if (!doc) return "";
      return `
        <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center border border-gray-100 dark:border-gray-600">
            <div class="min-w-0 flex-1 pr-2">
                <p onclick="openDocumentDetailModal('${doc.id}')" class="font-medium text-xs truncate text-gray-800 dark:text-gray-200 cursor-pointer hover:text-red-700 dark:hover:text-red-400">${doc.title}</p>
                <a href="${doc.downloadUrl}" target="_blank" class="text-[10px] text-red-600 dark:text-red-400 underline flex items-center gap-1 mt-0.5"><i class="fa-solid fa-link"></i> Link Drive học liệu</a>
            </div>
            <button onclick="removeBookmark('${id}')" class="text-gray-400 hover:text-red-500 text-xs px-1">&times;</button>
        </div>
      `;
    })
    .join("");
}

// ---- CHỨC NĂNG 7: LỊCH SỬ TRA CỨU CÁ NHÂN ----
let historyList = [];
function addHistory(keyword) {
  if (!keyword || historyList.includes(keyword)) return;
  historyList.unshift(keyword);
  if (historyList.length > 4) historyList.pop();
  updateHistoryUI();
}

function updateHistoryUI() {
  if (!historyContainer) return;
  historyContainer.innerHTML = historyList
    .map(
      (kw) => `
      <span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600" onclick="searchFromHistory('${kw.replace(/'/g, "\\'")}')">
          <i class="fa-solid fa-magnifying-glass text-[10px] opacity-60 mr-1"></i>${kw}
      </span>
    `,
    )
    .join("");
}

function searchFromHistory(keyword) {
  if (searchInput) searchInput.value = keyword;
  applyFilters();
}

// ---- CHỨC NĂNG 8: GIẢ LẬP ĐĂNG NHẬP ĐỊNH DANH HUST OFFICE 365 ----
const loginModal = document.getElementById("login-modal");
const authArea = document.getElementById("auth-area");
const loginEmail = document.getElementById("login-email");

function openLoginModal() {
  if (loginModal) loginModal.classList.remove("hidden");
}

function closeLoginModal() {
  if (loginModal) loginModal.classList.add("hidden");
}

function handleLoginMock() {
  if (!loginEmail) return;
  const emailValue = loginEmail.value.trim().toLowerCase();
  if (!emailValue)
    return alert("Vui lòng nhập tài khoản Microsoft Office 365!");

  if (!emailValue.includes("@")) {
    alert("Email không đúng định dạng trường cấp!");
    return;
  }

  let domain = emailValue.split("@")[1];

  if (domain === "sis.hust.edu.vn") {
    currentUserInfo =
      MOCK_STUDENTS_DB[emailValue] || MOCK_STUDENTS_DB["default_student"];

    if (authArea) {
      authArea.classList.remove("hidden");
      authArea.innerHTML = `
        <button onclick="toggleProfileDropdown(event)" class="flex items-center gap-2 bg-red-800 bg-opacity-40 p-1.5 pr-3 rounded-full border border-red-500 border-opacity-30 hover:bg-opacity-60 transition focus:outline-none h-9">
            <div class="w-6 h-6 ${currentUserInfo.avatarColor} text-white font-bold rounded-full flex items-center justify-center text-[11px] uppercase shadow-inner">
                ${currentUserInfo.name.charAt(0)}
            </div>
            <div class="text-left hidden sm:block">
                <p class="text-[10px] font-bold leading-tight truncate max-w-[90px]">${currentUserInfo.name}</p>
                <p class="text-[8px] text-yellow-300 leading-none">${currentUserInfo.cohort}</p>
            </div>
            <i class="fa-solid fa-chevron-down text-[8px] text-red-200 ml-0.5"></i>
        </button>

        <div id="profile-dropdown" class="absolute right-0 top-11 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 hidden z-50 p-4 space-y-3">
            <div class="border-b dark:border-gray-700 pb-2">
                <p class="text-xs font-bold text-gray-800 dark:text-white">${currentUserInfo.name}</p>
                <p class="text-[10px] text-gray-400 truncate">${emailValue}</p>
            </div>
            
            <div class="space-y-2 text-[11px] text-gray-600 dark:text-gray-300">
                <div class="grid grid-cols-3 gap-x-2">
                    <span class="text-gray-400">MSSV/CB:</span>
                    <span class="col-span-2 font-medium text-right text-gray-800 dark:text-white">${currentUserInfo.mssv}</span>
                </div>
                
                <div class="grid grid-cols-3 gap-x-2 items-start">
                    <span class="text-gray-400">Đơn vị:</span>
                    <span class="col-span-2 font-medium text-right text-gray-800 dark:text-white break-words whitespace-normal">
                        ${currentUserInfo.school}
                    </span>
                </div>
                
                <div class="grid grid-cols-3 gap-x-2 items-start">
                    <span class="text-gray-400">Ngành:</span>
                    <span class="col-span-2 font-medium text-right text-gray-800 dark:text-white break-words whitespace-normal">
                        ${currentUserInfo.major}
                    </span>
                </div>
            </div>
            
            <button onclick="handleLogoutMock()" class="w-full mt-2 py-1.5 bg-gray-50 dark:bg-gray-700/60 hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition border border-gray-100 dark:border-gray-600">
                <i class="fa-solid fa-right-from-bracket text-[9px]"></i> Đăng xuất
            </button>
        </div>
      `;
    }

    if (welcomeScreen) welcomeScreen.classList.add("hidden");
    if (mainApp) mainApp.classList.remove("hidden");
    if (recommendSection) recommendSection.classList.remove("hidden");

    generateRecommendations();
    renderDocuments(DATA_DOCUMENTS);
  } else {
    alert(
      "Hệ thống chỉ chấp nhận tài khoản Office 365 định danh cấp bởi Bách Khoa Hà Nội!",
    );
    return;
  }
  closeLoginModal();
}

function handleLogoutMock() {
  currentUserInfo = null;
  if (authArea) {
    authArea.innerHTML = "";
    authArea.classList.add("hidden");
  }
  if (mainApp) mainApp.classList.add("hidden");
  if (welcomeScreen) welcomeScreen.classList.remove("hidden");
  if (recommendSection) recommendSection.classList.add("hidden");
  renderDocuments(DATA_DOCUMENTS);
}

function toggleProfileDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("profile-dropdown");
  if (dropdown) dropdown.classList.toggle("hidden");
}

document.addEventListener("click", () => {
  const dropdown = document.getElementById("profile-dropdown");
  if (dropdown && !dropdown.classList.contains("hidden")) {
    dropdown.classList.add("hidden");
  }
});

// ---- CHỨC NĂNG GỢI Ý TÀI LIỆU DỰA TRÊN NGÀNH CỦA USER ----
function generateRecommendations() {
  if (!recommendContainer || !recommendSection || !currentUserInfo) return;

  const userTags = currentUserInfo.recommendTags || [];
  let recommendations = INITIAL_DOCUMENTS.filter((doc) =>
    doc.tags.some((tag) => userTags.includes(tag)),
  );
  recommendations = recommendations.slice(0, 3);

  if (recommendations.length === 0) {
    recommendContainer.innerHTML = `<p class="text-gray-400 py-1 text-[11px]">Chưa có gợi ý phù hợp.</p>`;
    return;
  }

  recommendContainer.innerHTML = recommendations
    .map(
      (doc) => `
    <div onclick="openDocumentDetailModal('${doc.id}')" class="p-2 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg flex gap-2 border border-amber-100/60 dark:border-amber-900/30 cursor-pointer transition">
      <img src="${doc.image}" class="w-7 h-10 object-cover rounded bg-gray-200 flex-shrink-0 shadow-sm">
      <div class="min-w-0 flex-1">
        <p class="font-bold text-[11px] text-gray-800 dark:text-gray-200 truncate leading-tight hover:text-red-700 dark:hover:text-red-400">${doc.title}</p>
        <div class="flex gap-1 mt-1 items-center opacity-80">
          <span class="px-1 bg-red-600 text-white rounded text-[8px] font-extrabold">${doc.id}</span>
          <span class="text-[9px] text-gray-400 truncate">${doc.author}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// ---- KHỞI CHẠY ĐỒNG BỘ BAN ĐẦU ----
if (authArea) authArea.classList.add("hidden");
initDropdownFilters();
renderDocuments(DATA_DOCUMENTS);
updateBookmarkUI();
updateHistoryUI();
