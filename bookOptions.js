import getFullBookName from "./getFullBookName.js";
export default function bookOptions() {
  const books = ["DN", "MN", "SN", "AN", "Kp", "Dhp", "Ud", "Iti", "Snp", "Thag", "Thig"];

  const bookOptionsArea = document.getElementById("book-buttons-area");

  if (!localStorage.bookOptions) {
    localStorage.bookOptions = JSON.stringify(books);
  }

  // Create Book Buttons
  let bookHtml = "";

  books.forEach(book => {
    let cssClass = "";
    if (JSON.parse(localStorage.bookOptions).includes(book)) {
      cssClass = `class="selected"`;
    }
    bookHtml += `<button ${cssClass} id="${book}" title="Include/Exclude ${getFullBookName(book)}">${book}</button>`;
  });
  bookOptionsArea.innerHTML = bookHtml;

  const bookButtons = document.querySelectorAll("#book-buttons-area button");

  bookButtons.forEach(bookButton => {
    bookButton.addEventListener("click", e => {
      const book = e.target.id;
      if (e.target.classList.contains("selected")) {
        localStorage.bookOptions = JSON.stringify(JSON.parse(localStorage.bookOptions).filter(item => item !== book));
      } else {
        localStorage.bookOptions = JSON.stringify([...JSON.parse(localStorage.bookOptions), book]);
      }
      e.target.classList.toggle("selected");
      if (JSON.parse(localStorage.bookOptions).length === 0) {
        // all books have been de-selected
        localStorage.bookOptions = JSON.stringify(books);
        bookButtons.forEach(bookButton => {
          bookButton.classList.add("selected");
        });
      }
    });
  });
}
