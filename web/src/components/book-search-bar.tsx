import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { BookDetails, searchForTitle } from "@/app/api/book-details";
import { Button } from "./ui/button";
import { CircleArrowRight } from "lucide-react";

export default function BookSearchBar({
  setCurrentPage,
  setQuery,
  setResults,
  setLoading,
  setError,
}: BookSearchBarProps) {
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await searchForTitle(input, 1);

      setResults(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    setPageParams();
  }

  function setPageParams() {
    setCurrentPage(1);
    setQuery(input);
    setLoading(false);
  }

  return (
    <div className="flex flex-row space-x-4">
      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="Search for books"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          required
        />
      </form>
      <Button>
        <CircleArrowRight />
      </Button>
    </div>
  );
}

export type BookSearchBarProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string | undefined>>;
  setResults: Dispatch<SetStateAction<BookDetails[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | undefined>>;
};
