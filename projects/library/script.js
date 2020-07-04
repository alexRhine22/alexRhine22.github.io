const bookFormButton = document.getElementById("form-toggle-button");
const bookForm = document.getElementById("book-form");
const newBookButton = document.getElementById("new-book-button");
const bookTable = document.getElementById("book-table");

let myLibrary = [];

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "310", "No");
const book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "218", "No");

pushBookToLibrary(book1); // adds starting book to library
pushBookToLibrary(book2); // adds starting book to library

/**
 * Book object constructor
 * @param {*} title
 * @param {*} author
 * @param {*} pages
 */
function Book(title, author, pages, read) {
  this.bookTitle = title;
  this.bookAuthor = author;
  this.bookPages = pages;
  this.bookRead = read;
}

/**
 * adds new book object to myLibrary array
 */
function addBookToLibrary() {
  var titleInput = document.getElementById("book-title").value;
  var authorInput = document.getElementById("book-author").value;
  var pagesInput = document.getElementById("book-pages").value;
  var bookRead = document.getElementById("book-read-yes").checked;
  var bookNotRead = document.getElementById("book-read-no").checked;

  if (titleInput == "" || authorInput == "" || pagesInput == "") {
    alert("Please fill out every field to add a book to the database.");
  } else {
    if (bookRead == true) {
      var newBook = new Book(titleInput, authorInput, pagesInput, "Yes");
    } else if (bookNotRead == true) {
      var newBook = new Book(titleInput, authorInput, pagesInput, "No");
    }

    myLibrary.push(newBook);
    render();
  }
}

/**
 *
 */
function render() {
  let tableContent = document.getElementById("table-body");

  while (tableContent.rows.length >= 1) {
    tableContent.deleteRow(0);
  }

  for (var i = 0; i < myLibrary.length; i++) {
    var row = tableContent.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].bookTitle;
    cell2.innerHTML = myLibrary[i].bookAuthor;
    cell3.innerHTML = myLibrary[i].bookPages;

    cell4.innerHTML = myLibrary[i].bookRead;
    cell4.style.cursor = "pointer";
    cell4.setAttribute("onClick", "toggleRead(this)");

    cell5.innerHTML = "Delete";
    cell5.classList.add("cell5");
    cell5.setAttribute("id", i);
    cell5.style.cursor = "pointer";
    cell5.onmouseover = function () {
      cell5.style.color = "red";
    };
    cell5.onmouseout = function () {
      cell5.style.color = "black";
    };
    cell5.setAttribute("onClick", "removeBookFromLibrary(this.id)");

    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-pages").value = "0";
  }
}

function pushBookToLibrary(book) {
  myLibrary.push(book);
  render();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  render();
}

function toggleRead(element) {
  let index = element.parentElement.id.split("")[
    element.parentElement.id.split("").length - 1
  ];

  if (element.innerHTML === "Yes") {
    element.innerHTML = "No";
  } else if (element.innerHTML === "No") {
    element.innerHTML = "Yes";
  }
}

/**
 * eventListener for add new book button
 */
bookFormButton.addEventListener("click", (e) => {
  e.preventDefault();

  bookForm.classList.toggle("active");
});

newBookButton.addEventListener("click", (e) => {
  e.preventDefault();

  addBookToLibrary();
  bookForm.classList.toggle("active");
});
