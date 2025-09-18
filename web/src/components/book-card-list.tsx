import { Book } from "@/app/api/book-details";
import BookCard from "./book-card";

export default function BookCardList({ books }: BookCardListProps) {
  if (books[0]) {
    return (
      <div className="flex flex-col space-y-4">
        {books.map((book, index) => (
          <BookCard key={index} metadata={book} />
        ))}
      </div>
    );
  }
}

export type BookCardListProps = {
  books: Book[];
};
