"use client";

import { Book, searchForTitle } from "@/app/api/book";
import { useEffect, useState } from "react";
import BookCardList from "./book-card-list";
import BookSearchBar from "./book-search-bar";
import { findAllBooksForUser, UserBook } from "@/app/api/user-book";
import ErrorAlert from "../error-alert";
import LoadMoreButton from "../load-more-button";
import { Spinner } from "../ui";
import { useRouter } from "next/navigation";

export default function BookSearchWrapper({
  initialQuery,
}: BookSearchWrapperProps) {
  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!initialQuery) {
      return;
    }

    async function runSearch() {
      setLoading(true);
      setError(undefined);

      try {
        const books = await searchForTitle(initialQuery, 25);
        const library = await findAllBooksForUser();

        setBooks(books);
        setLibrary(library);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }

      setLoading(false);
      setHasMore(true);
    }

    runSearch();
  }, [initialQuery]);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) return;

    router.push(`/explore/search/${encodeURIComponent(query)}`);
  }

  // display all search results
  async function loadAll() {
    setLoading(true);

    try {
      const data = await searchForTitle(query);
      setBooks(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    setLoading(false);
    setHasMore(false);
  }

  // check if specific book has already been saved to user's library
  function bookExistsInLibrary(bookId: number) {
    return library.some((book) => book.edition.id === bookId);
  }

  return (
    <div className="flex flex-col h-full space-y-4 items-center justify-center">
      {/* Search bar */}
      <div className="w-full 2xl:w-1/2">
        <BookSearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </div>

      {/* Error message when applicable */}
      {error && <ErrorAlert message={error} />}

      {/* Result list */}
      {!loading ? (
        <div className="flex flex-col justify-between h-full w-full space-y-4 2xl:w-1/2 mx-auto">
          <BookCardList
            books={books}
            bookExistsInLibrary={bookExistsInLibrary}
          />

          {books.length > 0 && hasMore && (
            <div className="flex w-full justify-center">
              <LoadMoreButton onClick={loadAll} />
            </div>
          )}
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
