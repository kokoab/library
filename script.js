const myLibrary = [];

function Book(title, author, pages, read = false) {
  if (!new.target) {
    throw new Error("Book constructor must be called with 'new'");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.addBookToLibrary = function () {
  const isDuplicate = myLibrary.some((book) => book.title === this.title && book.author === this.author);
  if (isDuplicate) {
    return "Book is already in Library";
  }
  else {
    myLibrary.push(this);
    return "Book added to Library";
  }
};

Book.prototype.displayBook = function () {
  return `ID: ${this.id}, Title: ${this.title}, Author ${this.author}, Pages ${
    this.pages
  }, Read: ${this.read ? "Yes" : "No"} \n`;
};

function displayLibrary() {
  let output = "";
  for (let book of myLibrary) {
    output += `${book.displayBook()}\n`;
  }
  return output || "Library is Empty";
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
book1.addBookToLibrary();

const book2 = new Book("1984", "George Orwell", 328, false);
book2.addBookToLibrary();

const book3 = new Book("1984", "George Orwell", 328, false);
book3.addBookToLibrary();

console.log(displayLibrary());

// Book.prototype.displayBooks = function() {
//     const libraryContainer = document.querySelector('.library-container');
//     libraryContainer.innerHTML = ''; // Clear existing content

//     myLibrary.forEach((book, index) => {
//         const bookCard = document.createElement('div');
//         bookCard.classList.add('book-card');
//         bookCard.innerHTML = `
//             <h3>${book.title}</h3>
//             <p>Author: ${book.author}</p>
//             <p>Pages: ${book.pages}</p>
//             <p>Read: ${book.read ? 'Yes' : 'No'}</p>
//             <button class="delete-btn" data-index="${index}">Delete</button>
//         `;
//         libraryContainer.appendChild(bookCard);
//     });
// }
