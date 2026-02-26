import { UserBook } from "@/app/api/user-book";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { CircleArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function LibrarySearchBar({
  setLibrary,
}: LibrarySearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    setLibrary((prevLibrary) =>
      prevLibrary.filter(
        (book) =>
          book.edition.title.toLowerCase().includes(query.toLowerCase()) ||
          book.edition.collaborators[0].author.name
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <form className="flex flex-row space-x-4" onSubmit={handleSearch}>
      <Input
        placeholder="Search your library"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <Button type="submit">
        <CircleArrowRight />
      </Button>
    </form>
  );
}

type LibrarySearchBarProps = {
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};
