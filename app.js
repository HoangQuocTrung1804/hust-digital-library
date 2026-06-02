// app.js

// 1. KHỞI TẠO DỮ LIỆU CỐT LÕI: Phân loại Bên cung cấp theo mô hình Viện/Trường/Khoa thuộc HUST
const INITIAL_DOCUMENTS = [
  {
    id: "MI1111",
    title: "Giáo trình Giải tích I (Nhóm ngành 1)",
    author: "Khoa Toán - Tin",
    tags: ["Đại cương", "Toán học", "Giáo trình"],
    downloadUrl: "https://drive.google.com/file/d/demo-giaitich1",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&auto=format&fit=crop&q=60",
  },
  {
    id: "ET2050",
    title: "Bài giảng Lý thuyết mạch (Giảng viên: Đào Lê Thu Thảo)",
    author: "Trường Điện - Điện tử",
    tags: ["Cơ sở ngành", "Điện - Điện tử", "Bài giảng"],
    downloadUrl: "https://drive.google.com/file/d/demo-lythuyetmach",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=120&auto=format&fit=crop&q=60",
  },
  {
    id: "IT3020",
    title: "Bài giảng Toán rời rạc (Giảng viên: Ban Hà Băng)",
    author: "Trường Công nghệ thông tin & Truyền thông",
    tags: ["Cơ sở ngành", "CNTT", "Bài giảng", "Toán học"],
    downloadUrl: "https://drive.google.com/file/d/demo-ctdlgt",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120&auto=format&fit=crop&q=60",
  },
  {
    id: "PH1111",
    title: "Sách bài tập Vật lý đại cương I",
    author: "Khoa Vật lý kỹ thuật",
    tags: ["Đại cương", "Vật lý", "Sách bài tập"],
    downloadUrl: "https://drive.google.com/file/d/demo-vatly1",
    image:
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=120&auto=format&fit=crop&q=60",
  },
  {
    id: "SSH1111",
    title: "Giáo trình Triết học Mác - Lênin",
    author: "Khoa Lý luận chính trị",
    tags: ["Lý luận chính trị", "Giáo trình"],
    downloadUrl: "https://drive.google.com/file/d/demo-triethoc",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=120&auto=format&fit=crop&q=60",
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
  },
  {
    id: "MI1141",
    title: "Bài giảng Đại số (Nhóm ngành 1) (Giảng viên: Lê Quang Thủy)",
    author: "Khoa Toán - Tin",
    tags: ["Đại cương", "Toán học", "Bài giảng"],
    downloadUrl: "https://drive.google.com/file/d/demo-tienganh",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&auto=format&fit=crop&q=60",
  },
];

let DATA_DOCUMENTS = INITIAL_DOCUMENTS;

function saveToStorage() {
  localStorage.setItem("hust_lib_docs", JSON.stringify(DATA_DOCUMENTS));
}

// Khởi tạo các biến DOM chính cho Sinh viên
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

// ---- CHỨC NĂNG 2: HIỂN THỊ DANH MỤC HỌC LIỆU UX CHUẨN SINH VIÊN ----
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
        if (tag === "Đại cương") {
          colorClass =
            "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-100 dark:border-sky-900/30";
        } else if (tag === "Toán học") {
          colorClass =
            "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400 border border-pink-100 dark:border-pink-900/30";
        } else if (tag === "Điện - Điện tử" || tag === "Điện - ĐT") {
          colorClass =
            "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30";
        } else if (tag === "CNTT") {
          colorClass =
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30";
        } else if (tag === "Chuyên ngành") {
          colorClass =
            "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30";
        } else if (tag === "Cơ sở ngành") {
          colorClass =
            "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/30";
        } else if (tag === "Vật lý") {
          colorClass =
            "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30";
        } else if (tag === "Lý luận chính trị") {
          colorClass =
            "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30";
        } else if (tag === "Giáo trình") {
          colorClass =
            "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30";
        } else if (tag === "Bổ trợ") {
          colorClass =
            "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-100 dark:border-slate-700/40";
        } else if (tag === "Bài giảng") {
          colorClass =
            "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 border border-fuchsia-100 dark:border-fuchsia-900/30";
        } else if (tag === "Sách bài tập") {
          colorClass =
            "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30";
        } else if (tag === "Ngoại ngữ") {
          colorClass =
            "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-100 dark:border-teal-900/30";
        }
        return `<span class="px-2 py-0.5 text-[10px] font-bold rounded ${colorClass}">${tag}</span>`;
      })
      .join("");

    const bookmarkActionButton = `<button onclick="addBookmark('${doc.id}')" class="text-[11px] bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 hover:bg-red-100 px-2 py-1 rounded font-medium flex items-center gap-1 transition ml-auto"><i class="fa-solid fa-bookmark"></i> Lưu</button>`;

    resultContainer.innerHTML += `
      <div class="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex gap-3 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-red-100 dark:hover:border-red-950 transition duration-200">
          <img src="${doc.image}" class="w-16 h-22 object-cover rounded bg-gray-200 flex-shrink-0 shadow-sm">
          <div class="flex flex-col justify-between flex-1 min-w-0">
              <div>
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider bg-red-600 text-white dark:bg-red-700 rounded uppercase shadow-sm">
                      ${doc.id}
                    </span>
                  </div>

                  <h4 onclick="openPreview('${doc.title.replace(/'/g, "\\'")}', '${doc.downloadUrl}')" class="font-bold text-xs sm:text-sm line-clamp-2 text-gray-800 dark:text-gray-100 leading-tight hover:text-red-700 dark:hover:text-red-400 cursor-pointer">${doc.title}</h4>
                  
                  <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-1 flex items-center gap-1">
                    <i class="fa-solid fa-building-columns text-[10px] text-red-600/70 dark:text-red-400/80"></i> 
                    <span>${doc.author}</span>
                  </p>
                  
                  <div class="flex flex-wrap gap-1 mt-2">
                      ${tagsHtml}
                  </div>
              </div>
              <div class="flex gap-2 mt-2.5 border-t border-gray-50 dark:border-gray-700/50 pt-2 items-center">
                  <button onclick="openPreview('${doc.title.replace(/'/g, "\\'")}', '${doc.downloadUrl}')" class="text-[11px] bg-gray-50 dark:bg-gray-700 hover:bg-200 dark:hover:bg-gray-600 px-2 py-1 rounded font-medium flex items-center gap-1 transition text-gray-600 dark:text-gray-200"><i class="fa-solid fa-eye text-gray-400"></i> Xem trước</button>
                  ${bookmarkActionButton}
              </div>
          </div>
      </div>
    `;
  });
}

// ---- CHỨC NĂNG 3: GỢI Ý KHI GÕ TỪ KHÓA & RESET THÔNG MINH ----
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
            <div class="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 transition" onclick="selectSuggestion('${doc.title.replace(/'/g, "\\'")}')">
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

function selectSuggestion(title) {
  if (searchInput) searchInput.value = title;
  if (suggestionBox) suggestionBox.classList.add("hidden");

  const filtered = DATA_DOCUMENTS.filter((doc) => doc.title === title);
  renderDocuments(filtered);
  addHistory(title);
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

// ---- CHỨC NĂNG 4: KHỞI TẠO BỘ LỌC ĐA ĐIỀU KIỆN 4 CỘT (ĐÃ LỌC BỎ TIÊU ĐỀ TRÙNG) ----
function initDropdownFilters() {
  const filterContainer = document.getElementById("tag-container");
  if (!filterContainer) return;

  // Render lưới 4 cột chuẩn UI scannable, h-10 block rõ ràng
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

  // Gán lại các bộ lắng nghe sự kiện lọc
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

// ---- CHỨC NĂNG HỖ TRỢ: LOGIC LỌC ĐA ĐIỀU KIỆN ĐỒNG BỘ ----
function applyFilters() {
  // 1. Lấy giá trị từ ô tìm kiếm chính (nếu có)
  const searchKeyword = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  // 2. Lấy giá trị từ 4 cột bộ lọc nâng cao vừa khởi tạo
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

  // 3. Tiến hành lọc mảng dữ liệu gốc ban đầu
  const filteredList = INITIAL_DOCUMENTS.filter((doc) => {
    // Kiểm tra ô tìm kiếm chính (Khớp Mã học phần hoặc Tiêu đề)
    const matchesSearch =
      !searchKeyword ||
      doc.title.toLowerCase().includes(searchKeyword) ||
      doc.id.toLowerCase().includes(searchKeyword);

    // Kiểm tra Khối kiến thức (Dựa vào mảng tags)
    const matchesLevel = !filterLevel || doc.tags.includes(filterLevel);

    // Kiểm tra Ngành / Lĩnh vực (Dựa vào mảng tags)
    const matchesMajor = !filterMajor || doc.tags.includes(filterMajor);

    // Kiểm tra Loại hình học liệu (Dựa vào mảng tags - không phân biệt hoa thường)
    const matchesType =
      !filterType ||
      doc.tags.some((tag) => tag.toLowerCase() === filterType.toLowerCase());

    // Kiểm tra tên Giảng viên (Tìm kiếm chuỗi text nằm trong ngoặc tên tiêu đề)
    const matchesTeacher =
      !searchTeacher || doc.title.toLowerCase().includes(searchTeacher);

    // Trả về true nếu tài liệu thỏa mãn đồng thời tất cả các bộ lọc được chọn
    return (
      matchesSearch &&
      matchesLevel &&
      matchesMajor &&
      matchesType &&
      matchesTeacher
    );
  });

  // 4. Cập nhật lại mảng dữ liệu hiển thị hiện tại và render ra màn hình
  DATA_DOCUMENTS = filteredList;
  renderDocuments(DATA_DOCUMENTS);
}

// ---- CHỨC NĂNG 5: XEM TRƯỚC TÀI LIỆU (MODAL) ----
function openPreview(title, link) {
  const modalTitle = document.getElementById("modal-title");
  const modalLink = document.getElementById("modal-download-link");
  const previewModal = document.getElementById("preview-modal");

  if (modalTitle) modalTitle.innerText = title;
  if (modalLink) modalLink.href = link;
  if (previewModal) previewModal.classList.remove("hidden");
}

function closePreview() {
  const previewModal = document.getElementById("preview-modal");
  if (previewModal) previewModal.classList.add("hidden");
}

// ---- CHỨC NĂNG 6: ĐÁNH DẤU / LƯU HỌC LIỆU ----
let savedIds = [];
function addBookmark(id) {
  if (savedIds.includes(id)) return;
  savedIds.push(id);
  updateBookmarkUI();
}

function removeBookmark(id) {
  savedIds = savedIds.filter((item) => item !== id);
  updateBookmarkUI();
}

function updateBookmarkUI() {
  if (!bookmarkContainer) return;
  if (savedIds.length === 0) {
    bookmarkContainer.innerHTML = `<p class="text-xs text-gray-400 py-2">Chưa có tài liệu nào được lưu.</p>`;
    return;
  }
  bookmarkContainer.innerHTML = savedIds
    .map((id) => {
      const doc = DATA_DOCUMENTS.find((d) => d.id === id);
      if (!doc) return "";
      return `
        <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center border border-gray-100 dark:border-gray-600">
            <div class="min-w-0 flex-1 pr-2">
                <p class="font-medium text-xs truncate text-gray-800 dark:text-gray-200">${doc.title}</p>
                <a href="${doc.downloadUrl}" target="_blank" class="text-[10px] text-red-600 dark:text-red-400 underline flex items-center gap-1 mt-0.5"><i class="fa-solid fa-link"></i> Link Drive học liệu</a>
            </div>
            <button onclick="removeBookmark('${id}')" class="text-gray-400 hover:text-red-500 text-xs px-1">&times;</button>
        </div>
      `;
    })
    .join("");
}

// ---- CHỨC NĂNG 7: LỊCH SỬ TRA CỨU CÁ NHÂN ----
let historyList = ["Mạch điện"];
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

  let parts = emailValue.split("@")[0];
  let domain = emailValue.split("@")[1];

  let mssv = parts.match(/\d+/) ? parts.match(/\d+/)[0] : "Sinh viên";
  let rawName = parts.replace(/\d+/, "").split(".");
  let name = rawName
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

  if (authArea) authArea.classList.remove("hidden");

  if (domain === "sis.hust.edu.vn" || domain === "hust.edu.vn") {
    if (authArea) {
      const isTeacher = domain === "hust.edu.vn";
      const avatarColor = isTeacher ? "bg-blue-600" : "bg-yellow-500";
      const roleSubtext = isTeacher ? "Cán bộ giảng dạy" : `MSSV: ${mssv}`;

      authArea.innerHTML = `
          <div class="flex items-center gap-2 bg-red-800 bg-opacity-40 p-1.5 pr-3 rounded-full border border-red-500 border-opacity-30">
              <div class="w-7 h-7 ${avatarColor} text-white font-bold rounded-full flex items-center justify-center text-xs uppercase shadow-inner">
                  ${rawName[0].charAt(0)}
              </div>
              <div class="text-left hidden sm:block">
                  <p class="text-[11px] font-bold leading-tight truncate max-w-[100px]">${name}</p>
                  <p class="text-[9px] text-yellow-300 leading-none">${roleSubtext}</p>
              </div>
              <button onclick="handleLogoutMock()" class="ml-1 text-red-200 hover:text-white text-xs" title="Đăng xuất">
                  <i class="fa-solid fa-right-from-bracket"></i>
              </button>
          </div>
      `;
    }

    if (welcomeScreen) welcomeScreen.classList.add("hidden");
    if (mainApp) mainApp.classList.remove("hidden");

    renderDocuments(DATA_DOCUMENTS);
    alert(`Chào mừng bạn ${name} đến với Không gian Học liệu số HUST!`);
  } else {
    if (authArea) authArea.classList.add("hidden");
    alert(
      "Hệ thống chỉ chấp nhận tài khoản Office 365 định danh cấp bởi Bách Khoa Hà Nội (@hust.edu.vn hoặc @sis.hust.edu.vn)!",
    );
    return;
  }

  closeLoginModal();
}

function handleLogoutMock() {
  if (authArea) {
    authArea.innerHTML = "";
    authArea.classList.add("hidden");
  }
  if (mainApp) mainApp.classList.add("hidden");
  if (welcomeScreen) welcomeScreen.classList.remove("hidden");

  renderDocuments(DATA_DOCUMENTS);
}

// ---- KHỞI CHẠY ĐỒNG BỘ BAN ĐẦU ----
if (authArea) authArea.classList.add("hidden");

initDropdownFilters();
renderDocuments(DATA_DOCUMENTS);
updateBookmarkUI();
updateHistoryUI();
