"use client";

import { ReadingListBook } from "@/app/api/reading-list-book";
import Link from "next/link";
import CoverImage from "../book/cover-image";
import ListBookManagementMenu from "./list-book-management-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

export default function ListBookCard({
  listBook,
  setListBooks,
}: ListBookCardProps) {
  const isOrdered = listBook.ordinal !== undefined;

  return (
    <div className="group relative flex flex-col h-full items-center">
      <Link href={`/book/details/${listBook.edition.id}`}>
        <div className="flex flex-col items-center transition-transform duration-300 hover:-translate-y-1">
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
            <div className="flex flex-row items-start justify-between gap-1">
              <p className="text-sm line-clamp-2 flex-1 min-w-0">
                {listBook.edition.title}
              </p>
              <ListBookManagementMenu
                listBook={listBook}
                setListBooks={setListBooks}
              >
                <Button variant="ghost" size="icon" className="size-6">
                  <EllipsisVertical className="size-3.5" />
                </Button>
              </ListBookManagementMenu>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

type ListBookCardProps = {
  listBook: ReadingListBook;
  setListBooks: Dispatch<SetStateAction<ReadingListBook[]>>;
};
