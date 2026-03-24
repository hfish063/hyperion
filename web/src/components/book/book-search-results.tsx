"use client";

import { useEffect, useState } from "react";
import BookCardList from "./book-card-list";
import { findAllBooksForUser, UserBook } from "@/app/api/user-book";
import ErrorAlert from "../error-alert";
import { Spinner } from "../ui";
import { Book, searchForBooks } from "@/app/api/book";

export default function BookSearchWrapper({
  initialQuery,
}: BookSearchWrapperProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!initialQuery) {
      return;
    }

    async function runSearch() {
      setLoading(true);
      setError(undefined);

      try {
        const books = await searchForBooks(initialQuery);
        const library = await findAllBooksForUser();

        setBooks(books);
        setLibrary(library);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }

      setLoading(false);
    }

    runSearch();
  }, [initialQuery]);

  // check if specific book has already been saved to user's library
  function bookExistsInLibrary(bookCoverId: string) {
    return library.some(
      (book) => Number(book.edition.sourceId) === Number(bookCoverId),
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4 items-center">
      {error && <ErrorAlert message={error} />}

      {!loading ? (
        <div className="flex flex-col justify-between space-y-4 w-full">
          <BookCardList
            books={books}
            bookExistsInLibrary={bookExistsInLibrary}
          />
        </div>
      ) : (
        <div className="flex flex-row space-x-4 w-full h-full items-center justify-center">
          <Spinner variant={"circle"} /> <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

type BookSearchWrapperProps = {
  initialQuery: string;
};
