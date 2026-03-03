import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    router.push(`/explore/search/${encodeURIComponent(query)}`);
  };

  return (
    <form
      className="flex flex-row space-x-4 items-center"
      onSubmit={handleSearch}
    >
      <Input
        placeholder="Search books by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button>
        <Search />
      </Button>
    </form>
  );
}
