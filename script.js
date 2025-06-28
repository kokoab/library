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

Book.prototype.addBookToLibrary = function() {
  const isDuplicate = myLibrary.some(
    (book) => book.title === this.title && book.author === this.author
  );
  if (isDuplicate) {
    return "Book is already in Library";
  } else {
    myLibrary.push(this);
    return "Book added to Library";
  }
};

Book.prototype.displayBook = function() {
  return `ID: ${this.id}, Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.read ? "Yes" : "No"}\n`;
};

function displayLibrary() {
  let output = "";
  for (let book of myLibrary) {
    output += `${book.displayBook()}`;
  }
  return output || "Library is Empty";
}

function displayBooks() {
  const libraryContainer = document.querySelector('.library-container');
  libraryContainer.innerHTML = ''; // Clear existing content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    libraryContainer.appendChild(bookCard);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });
}

// Modal handling
const modal = document.getElementById('add-book-modal');
const addBookBtn = document.querySelector('.add-book-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const addBookForm = document.getElementById('add-book-form');

// Open modal
addBookBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Close modal
cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  addBookForm.reset();
});

// Handle form submission
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  const result = newBook.addBookToLibrary();
  if (result === "Book added to Library") {
    displayBooks();
  } else {
    alert(result); // Notify user of duplicate
  }

  modal.style.display = 'none';
  addBookForm.reset();
});


displayBooks();
console.log(displayLibrary());