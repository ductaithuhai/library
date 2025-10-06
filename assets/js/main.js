const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const addButton = document.getElementById("add");
const inputField = document.querySelector(".inputfield");
const finishInput = document.querySelector(".done");
const bookZone = document.getElementById("bookZone");

addButton.addEventListener("click", () => {
  inputField.style.display = 'flex';
});

finishInput.addEventListener("click", () => {
  inputField.style.display = 'none';

  const title = document.getElementById("bookName").value;
  const author = document.getElementById("authorName").value;
  const pages = document.getElementById("pagesCount").value;
  const status = document.getElementById("yourProcess").value;

  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);

  const card = document.createElement("div");
  card.classList.add("bookCard");
  card.innerHTML = `
    <div class="bookName">${title}</div>
    <div class="authorName">By: ${author}</div>
    <div class="pagesCount">Pages: ${pages}</div>
    <div class="status">${status}</div>
  `;
  bookZone.appendChild(card);
});