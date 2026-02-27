import { UserBook } from "@/app/api/user-book";
import Image from "next/image";
import Link from "next/link";
import CoverImage from "../cover-image";

export default function LibraryGrid({ library }: LibraryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {library.map((userBook) => (
        <div key={userBook.id} className="flex flex-col h-full">
          <Link
            href={`/explore/${userBook.edition.sourceId}`}
            className="flex flex-col flex-1 items-center"
          >
            <CoverImage
              width={120}
              height={180}
              title={userBook.edition.title}
              coverImageUrl={userBook.edition.coverImageUrl}
            />

            <p className="text-sm mt-2 text-center line-clamp-2 min-h-[2.5rem]">
              {userBook.edition.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

type LibraryGridProps = {
  library: UserBook[];
};
