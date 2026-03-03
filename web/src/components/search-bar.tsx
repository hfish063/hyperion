import { Search } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

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
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search books by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
    </form>
  );
}
