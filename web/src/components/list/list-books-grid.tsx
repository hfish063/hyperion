import { ReadingListBook } from "@/app/api/reading-list-book";
import ListBookCard from "./list-book-card";

export default function ListBooksGrid({ listBooks }: ListBooksGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {listBooks.map((listBook) => (
        <ListBookCard key={listBook.id} listBook={listBook} />
      ))}
    </div>
  );
}

type ListBooksGridProps = {
  listBooks: ReadingListBook[];
};
