const cards = document.querySelector(".main-cards");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#form");
const finishedBooks = document.querySelector("#finished");
const leftBooks = document.querySelector("#left");
const totalBooks = document.querySelector("#total");

let myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 305,
    read: true,
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    pages: 893,
    read: false,
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    pages: 722,
    read: true,
  },
  {
    title: "American Gods",
    author: "Neil Gaiman",
    pages: 635,
    read: false,
  },
  {
    title: "The Princess Bride",
    author: "William Goldman",
    pages: 456,
    read: false,
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = Math.floor(Math.random() * 1000);
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
  const btnRemove = document.createElement("button");
  const btnRead = document.createElement("button");

  card.classList.add("card");
  card.setAttribute("data-id", element.id);
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  read.classList.add("read");
  btnRemove.classList.add("btn", "remove");
  btnRead.classList.add("btn", "read");

  title.textContent = element.title;
  author.textContent = element.author;
  pages.textContent = element.pages;
  read.textContent = element.read ? "Read" : "Not Read";
  btnRemove.textContent = "Remove";
  btnRemove.setAttribute("data-id", element.id);

  btnRemove.addEventListener("click", () => {
    const parent = btnRemove.parentElement;
    const id = Number(btnRemove.getAttribute("data-id"));

    removeBook(id);
    parent.remove();
  });
  btnRead.textContent = `Mark ${element.read ? "not read" : "read"}`;

  btnRead.addEventListener("click", () => {
    element.read = !element.read;
    read.textContent = element.read ? "Read" : "Not Read";
    btnRead.textContent = `Mark ${element.read ? "not read" : "read"}`;
    updateStats();
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(btnRemove);
  card.appendChild(btnRead);

  cards.appendChild(card);
}

function displayBooks() {
  myLibrary.forEach((element) => addElements(element));
  updateStats();
}

const removeBook = (id) => {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  updateStats();
};

updateStats = () => {
  const finished = myLibrary.filter((book) => book.read === true).length;
  const notFinished = myLibrary.filter((book) => book.read !== true).length;
  const total = myLibrary.length;

  finishedBooks.textContent = finished;
  leftBooks.textContent = notFinished;
  totalBooks.textContent = total;
};

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
  updateStats();

  // clear the form
  form.reset();
});
