import { Book } from "@/app/api/book-details";
import BookCard from "./book-card";

export default function BookCardList({
  books,
  bookExistsInLibrary,
}: BookCardListProps) {
  if (books[0]) {
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

export type BookCardListProps = {
  books: Book[];
  bookExistsInLibrary: (bookId: number) => boolean;
};
