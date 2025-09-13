import { BookDetails } from "@/app/api/book-details";
import BookCard from "./book-card";
import ErrorAlert from "./error-alert";

export default function BookCardGrid({ books }: BookCardGridProps) {
  if (!books) {
    return (
      <ErrorAlert message="Unable to find any results for this query.  Please update your search parameters and try again." />
    );
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {books.map((book) => (
        <BookCard key={book.id} metadata={book} />
      ))}
    </div>
  );
}

export type BookCardGridProps = {
  books: BookDetails[];
};
