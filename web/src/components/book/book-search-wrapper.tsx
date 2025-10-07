"use client";

import { Book, searchForTitle } from "@/app/api/book-details";
import { useState } from "react";
import BookCardList from "./book-card-list";
import BookSearchBar from "./book-search-bar";
import { findAllBooksForUser, UserBook } from "@/app/api/user-book";
import ErrorAlert from "../error-alert";
import LoadMoreButton from "../load-more-button";
import { Spinner } from "../ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function BookSearchWrapper() {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    if (!query) {
      return;
    }

    try {
      const books = await searchForTitle(query, 25);
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

  // display all search results
  async function loadAll() {
    setLoading(true);

    if (!query) {
      return;
    }

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

  // check if specific book has already been saved to user library
  function bookExistsInLibrary(bookId: number) {
    if (library.some((book) => book.edition.id === bookId)) {
      return true;
    }

    return false;
  }

  if (error) {
    return <ErrorAlert message={error} />;
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
            <BookCardList
              books={books}
              bookExistsInLibrary={bookExistsInLibrary}
            />
          </div>
          {books.length > 0 && (
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

function SearchOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Search By</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Title</DropdownMenuItem>
        <DropdownMenuItem>Author</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
