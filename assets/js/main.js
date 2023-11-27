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
console.log(finishInput);
// function addBookToLibrary() {
//   newBook = new Book('Tai', 'Tai', '460', 'readed');
// };

addButton.addEventListener("click", function () {
  inputField[0].style.display = 'flex';
});

finishInput[0].addEventListener("click", function () {
  let newBook = new Book('Tai', 'Tai', '460', 'readed');
  inputField[0].style.display = 'none';
});
