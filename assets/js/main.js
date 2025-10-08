function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let myLibrary = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, status: "Read" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, status: "Not Read" },
  { title: "1984", author: "George Orwell", pages: 328, status: "Read" },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: 279, status: "Not Read" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 214, status: "Read" }
];

const bookZone = document.getElementById("bookZone");
const addButton = document.getElementById("add");
const inputField = document.querySelector(".inputfield");
const finishInput = document.querySelector(".done");
const bookCount = document.getElementById("bookCount");

// ===================== AUTO SAVE SYSTEM =====================

// Hàm tự động lưu
function autoSave() {
  const saveType = localStorage.getItem("saveType");
  if (!saveType) return; // Nếu chưa chọn nơi lưu → bỏ qua

  if (saveType === "local") {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    console.log("💾 Đã tự động lưu trên máy!");
  } else if (saveType === "google") {
    if (typeof saveToFirebase === "function") {
      saveToFirebase(myLibrary);
      console.log("☁️ Đã tự động lưu lên Firebase!");
    } else {
      console.warn("⚠️ Firebase chưa được khởi tạo.");
    }
  }
}

// Chỉ hiện chọn nơi lưu 1 lần duy nhất
window.addEventListener("load", () => {
  const saveType = localStorage.getItem("saveType");
  const saveOptions = document.querySelector(".saveOptions");

  if (!saveType) {
    // Hiện lựa chọn nếu chưa từng chọn
    saveOptions.style.display = "flex";
    document.getElementById("saveLibrary").style.display = "flex";

    document.getElementById("saveLibrary").addEventListener("click", () => {
      const selected = document.querySelector('input[name="saveType"]:checked').value;
      localStorage.setItem("saveType", selected);
      alert(`✅ Đã chọn: ${selected === "local" ? "Lưu trên máy" : "Lưu lên Google"}`);
      saveOptions.style.display = "none";
      document.getElementById("saveLibrary").style.display = "none";
      autoSave();
    });
  } else {
    // Nếu đã chọn, ẩn luôn phần chọn
    saveOptions.style.display = "none";
    document.getElementById("saveLibrary").style.display = "none";
  }
});

// ===================== CẬP NHẬT SỐ LƯỢNG =====================

function updateCounts() {
  const countReaded = myLibrary.filter(b => b.status === "Read").length;
  const countNotReaded = myLibrary.filter(b => b.status === "Not Read").length;

  document.querySelector(".readed").textContent = `Readed: ${countReaded}`;
  document.querySelector(".notReaded").textContent = `Not Readed: ${countNotReaded}`;

  autoSave(); // Gọi autoSave mỗi khi có thay đổi
}
updateCounts();

// ===================== HIỂN THỊ BOOK CARD =====================

function createBookCard(book) {
  const { title, author, pages, status } = book;
  const card = document.createElement("div");
  card.classList.add("bookCard");
  card.innerHTML = `
    <div class="content">
      <div class="bookName">${title}</div>
      <div class="authorName">By: ${author}</div>
      <div class="pagesCount">Pages: ${pages}</div>
      <div class="status">${status}</div>
    </div>
    <div class="feature">
      <div class="deleteBtn"><i class="fa-solid fa-trash"></i></div>
      <label class="switch">
        <input type="checkbox" class="statusToggle" ${status === "Read" ? "checked" : ""}>
        <span class="slider round"></span>
      </label>
    </div>
  `;

  // Toggle trạng thái đọc
  const toggle = card.querySelector(".statusToggle");
  toggle.addEventListener("change", () => {
    const statusDiv = card.querySelector(".status");
    const newStatus = toggle.checked ? "Read" : "Not Read";
    statusDiv.textContent = newStatus;
    book.status = newStatus;
    updateCounts();
  });

  // Nút xóa
  const deleteBtn = card.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    card.remove();
    const index = myLibrary.indexOf(book);
    if (index > -1) myLibrary.splice(index, 1);
    updateCounts();
  });

  bookZone.appendChild(card);
}

// Hiển thị toàn bộ sách ban đầu
myLibrary.forEach(createBookCard);

// ===================== THÊM SÁCH MỚI =====================

addButton.addEventListener("click", () => {
  inputField.style.display = "flex";
});

finishInput.addEventListener("click", () => {
  inputField.style.display = "none";

  const title = document.getElementById("bookName").value.trim();
  const author = document.getElementById("authorName").value.trim();
  const pages = document.getElementById("pagesCount").value.trim();
  const status = "Not Read";

  if (!title || !author || !pages) {
    alert("Please fill all fields before adding a book!");
    return;
  }

  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  createBookCard(newBook);
  updateCounts();

  // Reset form
  document.getElementById("bookName").value = "";
  document.getElementById("authorName").value = "";
  document.getElementById("pagesCount").value = "";
});