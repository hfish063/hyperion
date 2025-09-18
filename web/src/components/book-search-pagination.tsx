import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Book, searchForTitle } from "@/app/api/book-details";

export default function BookSearchPagination({
  currentPage,
  setCurrentPage,
  setResults,
  query,
}: BookSearchPaginationProps) {
  async function fetchNextPage() {
    if (query) {
      const results = await searchForTitle(query, currentPage + 1);

      if (results.length > 0) {
        incrementPage();
        setResults(results);
      }
    }
  }

  async function fetchPreviousPage() {
    if (query) {
      if (currentPage > 1) {
        const results = await searchForTitle(query, currentPage - 1);

        setResults(results);

        decrementPage();
      }
    }
  }

  async function incrementPage() {
    setCurrentPage(currentPage + 1);
  }

  function decrementPage() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="flex flex-row space-x-4 items-center">
      <Button onClick={fetchPreviousPage} variant="outline">
        <div className="flex flex-row space-x-4 items-center">
          <ArrowLeft />
          <p>Previous</p>
        </div>
      </Button>
      <p>{currentPage}</p>
      <Button onClick={fetchNextPage} variant="outline">
        <div className="flex flex-row space-x-4 items-center">
          <p>Next Page</p>
          <ArrowRight />
        </div>
      </Button>
    </div>
  );
}

type BookSearchPaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setResults: Dispatch<SetStateAction<Book[]>>;
  query: string | undefined;
};
