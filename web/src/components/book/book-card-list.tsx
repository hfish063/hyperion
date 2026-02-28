import { Book } from "@/app/api/edition";
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

function validBookList(books: Book[]) {
  return books[0] ? true : false;
}

export type BookCardListProps = {
  books: Book[];
  bookExistsInLibrary: (bookId: number) => boolean;
};
