const cards = document.querySelector(".cards");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#form");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addElements(element) {
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("span");
  const pages = document.createElement("span");
  const read = document.createElement("span");

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  read.classList.add("read");

  title.textContent = element.title;
  author.textContent = element.author;
  pages.textContent = element.pages;
  read.textContent = element.read;

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);

  cards.appendChild(card);
}

function displayBooks() {
  myLibrary.forEach((element) => addElements(element));
}

const book1 = new Book("HP", "JK Rowling", 345, true);
const book2 = new Book("LOTR", "I don't know", 1545, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = form.elements["title"].value;
  const author = form.elements["author"].value;
  const pages = form.elements["pages"].value;
  const read = form.elements["read"].checked;

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  addElements(book);

  // clear the form
  form.reset();
});
