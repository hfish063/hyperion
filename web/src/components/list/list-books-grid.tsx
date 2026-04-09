"use client";

import { ReadingListBook } from "@/app/api/reading-list-book";
import ListBookCard from "./list-book-card";
import { Dispatch, SetStateAction } from "react";

export default function ListBooksGrid({ listBooks, setListBooks }: ListBooksGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {listBooks.map((listBook) => (
        <ListBookCard key={listBook.id} listBook={listBook} setListBooks={setListBooks} />
      ))}
    </div>
  );
}

type ListBooksGridProps = {
  listBooks: ReadingListBook[];
  setListBooks: Dispatch<SetStateAction<ReadingListBook[]>>;
};
