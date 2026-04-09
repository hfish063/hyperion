import { ReadingListBook } from "@/app/api/reading-list-book";
import Link from "next/link";
import CoverImage from "../book/cover-image";

export default function ListBookCard({ listBook }: ListBookCardProps) {
  const isOrdered = listBook.ordinal !== undefined;

  return (
    <Link key={listBook.id} href={`/book/details/${listBook.edition.id}`}>
      <div className="flex flex-col h-full items-center transition-transform duration-300 hover:-translate-y-1">
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
            <p className="text-sm line-clamp-2">{listBook.edition.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

type ListBookCardProps = {
  listBook: ReadingListBook;
};
