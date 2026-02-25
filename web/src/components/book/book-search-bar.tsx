import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CircleArrowRight,
  CommandIcon,
  PlusIcon,
  SlashIcon,
} from "lucide-react"; // You can import multiple icons
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

export default function BookSearchBar({
  query,
  setQuery,
  handleSearch,
}: BookSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-row space-x-2">
      <form className="w-full" onSubmit={handleSearch}>
        <div className="relative w-full">
          <Input
            ref={inputRef}
            value={query}
            placeholder="Search for books"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
          />
          {!isFocused && (
            <Badge
              className="flex flex-row absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden sm:flex"
              variant={"secondary"}
            >
              <CommandIcon />
              <PlusIcon />
              <SlashIcon />
            </Badge>
          )}
        </div>
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
