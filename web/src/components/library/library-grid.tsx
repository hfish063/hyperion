import { LibraryBook } from "@/app/api/library-book";
import CoverImage from "../book/cover-image";
import ManagementMenu from "./library-management-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

export default function LibraryGrid({
  library,
  setLibraryBooks,
}: LibraryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {library.map((libraryBook) => (
        <div key={libraryBook.id} className="flex flex-col h-full items-center">
          <LibraryGridItem
            libraryBook={libraryBook}
            setLibraryBooks={setLibraryBooks}
          />
        </div>
      ))}
    </div>
  );
}

type LibraryGridProps = {
  library: LibraryBook[];
  setLibraryBooks: Dispatch<SetStateAction<LibraryBook[]>>;
};

function LibraryGridItem({
  libraryBook,
  setLibraryBooks,
}: LibraryGridItemProps) {
  return (
    <Link href={`/book/details/${libraryBook.edition.id}`}>
      <div className="flex flex-col items-center w-full transition-transform duration-300 hover:-translate-y-1">
        <div className="flex flex-col gap-1 w-[120px]">
          <CoverImage
            width={120}
            height={180}
            title={libraryBook.edition.title}
            coverImageUrl={libraryBook.edition.coverImageUrl}
          />

          <div className="flex flex-row items-start justify-between gap-1">
            <p className="text-sm line-clamp-2 flex-1 min-w-0">
              {libraryBook.edition.title}
            </p>
            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
              <ManagementMenu
                libraryBook={libraryBook}
                setLibraryBooks={setLibraryBooks}
              >
                <Button variant="ghost" size="icon" className="size-6">
                  <EllipsisVertical className="size-3.5" />
                </Button>
              </ManagementMenu>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

type LibraryGridItemProps = {
  libraryBook: LibraryBook;
  setLibraryBooks: Dispatch<SetStateAction<LibraryBook[]>>;
};
