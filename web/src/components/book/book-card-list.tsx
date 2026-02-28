import { Edition } from "@/app/api/edition";
import BookCard from "./book-card";

export default function BookCardList({
  books,
  bookExistsInLibrary,
}: BookCardListProps) {
  if (validBookList(books)) {
    return (
      <div className="flex flex-col space-y-4">
        {books.map((book, index) => (
          <BookCard
            key={index}
            metadata={book}
            bookExistsInLibrary={bookExistsInLibrary(book.id)}
          />
        ))}
      </div>
    );
  }
}

function validBookList(books: Edition[]) {
  return books[0] ? true : false;
}

export type BookCardListProps = {
  books: Edition[];
  bookExistsInLibrary: (bookId: number) => boolean;
};
