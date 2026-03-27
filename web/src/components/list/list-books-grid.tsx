import { UserListBook } from "@/app/api/user-list-book";
import Link from "next/link";
import CoverImage from "../book/cover-image";

export default function ListBooksGrid({ listBooks }: ListBooksGridProps) {
  const isOrdered = listBooks[0]?.userList.isOrdered ?? false;

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {listBooks.map((listBook) => (
        <div key={listBook.id} className="flex flex-col h-full">
          <Link
            href={`/explore/${listBook.edition.sourceId}`}
            className="flex flex-col flex-1 items-center transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col gap-1 w-[120px]">
                <div className="relative">
                  <CoverImage
                    width={120}
                    height={180}
                    title={listBook.edition.title}
                    coverImageUrl={listBook.edition.coverImageUrl}
                  />
                  {isOrdered && (
                    <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-xs font-semibold leading-none rounded px-1.5 py-1">
                      {listBook.ordinal}
                    </span>
                  )}
                </div>
                <p className="text-sm line-clamp-2">
                  {listBook.edition.title}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

type ListBooksGridProps = {
  listBooks: UserListBook[];
};
