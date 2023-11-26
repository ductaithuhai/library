const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
};

var addButton = document.getElementById("add");

// function addBookToLibrary() {
//   newBook = new Book('Tai', 'Tai', '460', 'readed');
// };

addButton.addEventListener("click", function () {
  let newBook = new Book('Tai', 'Tai', '460', 'readed');
  alert("Button clicked!");
  console.log(newBook);
});
