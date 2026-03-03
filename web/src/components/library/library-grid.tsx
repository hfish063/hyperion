import { UserBook } from "@/app/api/user-book";
import Link from "next/link";
import CoverImage from "../book/cover-image";

export default function LibraryGrid({ library }: LibraryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {library.map((userBook) => (
        <div key={userBook.id} className="flex flex-col h-full">
          <Link
            href={`/explore/${userBook.edition.sourceId}`}
            className="flex flex-col flex-1 items-center"
          >
            <LibraryGridItem userBook={userBook} />
          </Link>
        </div>
      ))}
    </div>
  );
}

type LibraryGridProps = {
  library: UserBook[];
};

function LibraryGridItem({ userBook }: LibraryCardProps) {
  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
}

type LibraryCardProps = {
  userBook: UserBook;
};
