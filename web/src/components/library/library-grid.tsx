import { UserBook } from "@/app/api/user-book";
import Link from "next/link";
import CoverImage from "../book/cover-image";
import ManagementMenu from "./management-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

export default function LibraryGrid({ library, setUserBooks }: LibraryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {library.map((userBook) => (
        <div key={userBook.id} className="flex flex-col h-full">
          <Link
            href={`/explore/${userBook.edition.sourceId}`}
            className="flex flex-col flex-1 items-center"
          >
            <LibraryGridItem userBook={userBook} setUserBooks={setUserBooks} />
          </Link>
        </div>
      ))}
    </div>
  );
}

type LibraryGridProps = {
  library: UserBook[];
  setUserBooks: Dispatch<SetStateAction<UserBook[]>>;
};

function LibraryGridItem({ userBook, setUserBooks }: LibraryCardProps) {
  return (
    <div className="flex flex-col items-center relative">
      <CoverImage
        width={120}
        height={180}
        title={userBook.edition.title}
        coverImageUrl={userBook.edition.coverImageUrl}
      />

      <div className="flex flex-row space-x-2 justify-between">
        <p className="text-sm text-center line-clamp-2 text-center">
          {userBook.edition.title}
        </p>
      </div>

      <div
        className="absolute top-2 right-2"
        onClick={(e) => e.stopPropagation()}
      >
        <ManagementMenu userBook={userBook} setUserBooks={setUserBooks}>
          <Button variant={"secondary"} size={"icon"}>
            <EllipsisVertical />
          </Button>
        </ManagementMenu>
      </div>
    </div>
  );
}

type LibraryCardProps = {
  userBook: UserBook;
  setUserBooks: Dispatch<SetStateAction<UserBook[]>>;
};
