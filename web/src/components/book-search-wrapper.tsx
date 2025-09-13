"use client";

import { BookDetails } from "@/app/api/book-details";
import { Dispatch, SetStateAction, useState } from "react";
import BookCardGrid from "./book-card-grid";
import BookSearchBar from "./book-search-bar";
import BookSearchPagination from "./book-search-pagination";

export default function BookSearchWrapper({
  setLoading,
  setError,
}: BookSearchWrapperProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<BookDetails[]>([]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
        <BookSearchBar
          setCurrentPage={setCurrentPage}
          setResults={setResults}
          setQuery={setQuery}
          setLoading={setLoading}
          setError={setError}
        />
      </div>
      <div className="flex flex-col justify-between h-full space-y-4">
        <BookCardGrid books={results} />
        <div className="flex w-full justify-center">
          {results.length > 0 && (
            <BookSearchPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setResults={setResults}
              query={query}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type BookSearchWrapperProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | undefined>>;
};
