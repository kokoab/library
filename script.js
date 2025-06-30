class Book {
  constructor(title, author, pages, read = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }

  addToLibrary(library) {
    const isDuplicate = library.books.some(
      (book) => book.title === this.title && book.author === this.author
    );
    if (isDuplicate) {
      return "Book is already in Library";
    } else {
      library.books.push(this);
      return "Book added to Library";
    }
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  displayBooks() {
    const libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = "";

    if (this.books.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("message");
      emptyMessage.textContent = "Library is Empty";
      libraryContainer.appendChild(emptyMessage);
      return;
    }

    this.books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.setAttribute("data-id", book.id);

      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> <button class="toggle-read-btn">${book.read ? "Yes" : "No"}</button></p>
        <div class="buttons">
          <button class="delete-btn">Delete</button>
        </div>
      `;

      libraryContainer.appendChild(bookCard);
    });
  }

  removeBook(bookId) {
    const bookIndex = this.books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    }
  }
}

// Initialize library and set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  const library = new Library();
  const modal = document.getElementById("add-book-modal");
  const addBookBtn = document.getElementById("add-book-btn");
  const cancelBtn = modal.querySelector(".cancel-btn");
  const addBookForm = document.getElementById("add-book-form");

  // Event delegation for delete and toggle read buttons
  document.querySelector(".library-container").addEventListener("click", (e) => {
    const target = e.target;
    const bookCard = target.closest(".book-card");
    if (!bookCard) return;

    const bookId = bookCard.getAttribute("data-id");
    if (target.classList.contains("delete-btn")) {
      library.removeBook(bookId);
      library.displayBooks();
    } else if (target.classList.contains("toggle-read-btn")) {
      const bookIndex = library.books.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        library.books[bookIndex].toggleRead();
        library.displayBooks();
      }
    }
  });

  // Open modal
  addBookBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    addBookForm.reset();
  });

  // Handle form submission
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    if (title && author && pages > 0) {
      const newBook = new Book(title, author, pages, read);
      const result = newBook.addToLibrary(library);
      if (result === "Book added to Library") {
        library.displayBooks();
      } else {
        alert(result);
      }
    }

    modal.style.display = "none";
    addBookForm.reset();
  });

  // Add initial books
  const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
  book1.addToLibrary(library);
  const book2 = new Book("1984", "George Orwell", 328, false);
  book2.addToLibrary(library);

  library.displayBooks();
});