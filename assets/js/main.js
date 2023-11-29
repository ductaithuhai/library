const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
};

var addButton = document.getElementById("add");
var inputField = document.getElementsByClassName('inputfield');
var finishInput = document.getElementsByClassName('done');
var bookZone = document.getElementById('bookZone');
var i = 0;
// function addBookToLibrary() {
//   newBook = new Book('Tai', 'Tai', '460', 'readed');
// };

addButton.addEventListener("click", function () {
  inputField[0].style.display = 'flex';
});

finishInput[0].addEventListener("click", function () {
  inputField[0].style.display = 'none';
  let bookTitle = document.getElementById("bookName").value;
  let author = document.getElementById("authorName").value;
  let pages = document.getElementById("pagesCount").value;
  let stat = document.getElementById("yourProcess").value;
  var bookCard = document.createElement('div');
  bookCard.classList.add("bookCard" + i)
  bookCard.style.width = '300px';
  bookCard.style.height = '200px';
  bookCard.style.border = 'none';
  bookCard.style.borderRadius = '10px';
  bookCard.style.backgroundColor = '#FFAC81';
  bookCard.style.textAlign = 'left';
  bookCard.style.margin = 'auto';

  var bookName = document.createElement("div");
  bookName.classList.add("bookName");
  bookName.innerHTML = bookTitle;
  bookName.style.fontSize = '40px';
  var authorName = document.createElement("div");
  authorName.classList.add("authorName");
  authorName.innerHTML = 'By: ' + author;
  authorName.style.fontSize = '24px';
  var pagesCount = document.createElement("div");
  pagesCount.classList.add("pagesCount");
  pagesCount.innerHTML = 'Number of pages: ' + pages;
  pagesCount.style.fontSize = '24px';
  var status = document.createElement("div");
  status.classList.add("pagesCount");
  status.innerHTML = stat;
  status.style.fontSize = '24px';
  bookCard.appendChild(bookName);
  bookCard.appendChild(authorName);
  bookCard.appendChild(pagesCount);
  bookCard.appendChild(status);
  document.body.appendChild(bookCard);
  i++;
});