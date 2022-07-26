import { ids } from "./ids.js";

export default function getIncludedIds() {
  //   console.log(ids);
  const includedBooks = JSON.parse(localStorage.bookOptions);
  //   console.log(includedBooks);
  let includedIds = [];
  includedBooks.forEach(book => {
    book = book.toLowerCase();
    // console.log(ids[book]);
    includedIds.push(...ids[book]);
  });

  return includedIds;
}
