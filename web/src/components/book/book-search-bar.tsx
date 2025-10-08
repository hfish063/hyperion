import { Dispatch, FormEvent, SetStateAction } from "react";
import { CircleArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function BookSearchBar({
  query,
  setQuery,
  handleSearch,
}: BookSearchBarProps) {
  return (
    <div className="flex flex-row space-x-2">
      <form className="w-full" onSubmit={handleSearch}>
        <Input
          value={query}
          placeholder="Search for books"
          onChange={(e) => {
            setQuery(e.target.value);
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
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
};
