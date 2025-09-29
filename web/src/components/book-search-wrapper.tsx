"use client";

import { Book, searchForTitle } from "@/app/api/book-details";
import { Dispatch, SetStateAction, useState } from "react";
import BookCardList from "./book-card-list";
import BookSearchBar from "./book-search-bar";
import { Spinner } from "./ui";
import LoadMoreButton from "./load-more-button";

export default function BookSearchWrapper({
  setError,
}: BookSearchWrapperProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!query) {
      return;
    }

    try {
      const data = await searchForTitle(query, 25);

      setResults(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    setLoading(false);
    setHasMore(true);
  }

  async function loadAll() {
    setLoading(true);

    if (!query) {
      return;
    }

    try {
      const data = await searchForTitle(query);

      setResults(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    setLoading(false);
    setHasMore(false);
  }

  return (
    <div className="flex flex-col h-full space-y-4 items-center justify-center">
      <div className="w-full 2xl:w-1/2">
        <BookSearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </div>
      {!loading ? (
        <div className="flex flex-col justify-between h-full w-full space-y-4 2xl:w-1/2 mx-auto">
          <div className="w-full">
            <BookCardList books={results} />
          </div>
          {results.length > 0 && (
            <div className="flex w-full justify-center">
              {hasMore && <LoadMoreButton onClick={loadAll} />}
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
  setError: Dispatch<SetStateAction<string | undefined>>;
};
