import { ids } from "./ids.js";

export default function getIncludedIds() {
  const includedBooks = JSON.parse(localStorage.bookOptions);
  let includedIds = [];
  includedBooks.forEach(book => {
    book = book.toLowerCase();
    includedIds.push(ids[book]);
  });

  return includedIds.flat();
}
