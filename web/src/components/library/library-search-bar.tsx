import { UserBook } from "@/app/api/user-book";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { CircleArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function LibrarySearchBar() {
  return (
    <div className="flex flex-row space-x-2">
      <form>
        <Input placeholder="Search your library" required />
      </form>
      <Button>
        <CircleArrowRight />
      </Button>
    </div>
  );
}

type LibrarySearchBarProps = {
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};
