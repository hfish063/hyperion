import { UserBook } from "@/app/api/user-book";
import Link from "next/link";
import CoverImage from "../book/cover-image";
import ManagementMenu from "./management-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

export default function LibraryGrid({
  library,
  setUserBooks,
}: LibraryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {library.map((userBook) => (
        <div key={userBook.id} className="flex flex-col h-full">
          <Link
            href={`/explore/${userBook.edition.sourceId}`}
            className="flex flex-col flex-1 items-center transition-transform duration-200 hover:-translate-y-1"
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
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-1 w-[120px]">
        <CoverImage
          width={120}
          height={180}
          title={userBook.edition.title}
          coverImageUrl={userBook.edition.coverImageUrl}
        />

        <div className="flex flex-row items-start justify-between gap-1">
          <p className="text-sm line-clamp-2 flex-1 min-w-0">
            {userBook.edition.title}
          </p>
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <ManagementMenu userBook={userBook} setUserBooks={setUserBooks}>
              <Button variant="ghost" size="icon" className="size-6">
                <EllipsisVertical className="size-3.5" />
              </Button>
            </ManagementMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

type LibraryCardProps = {
  userBook: UserBook;
  setUserBooks: Dispatch<SetStateAction<UserBook[]>>;
};
