"use client";

import { deleteReadingListBookById, ReadingListBook } from "@/app/api/reading-list-book";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ListBookManagementMenuProps = {
  listBook: ReadingListBook;
  setListBooks: Dispatch<SetStateAction<ReadingListBook[]>>;
  children: ReactNode;
};

export default function ListBookManagementMenu({
  listBook,
  setListBooks,
  children,
}: ListBookManagementMenuProps) {
  const handleDelete = async () => {
    const isSuccessful = await deleteReadingListBookById(listBook.id);

    if (isSuccessful) {
      setListBooks((prev) => prev.filter((book) => book.id !== listBook.id));
      toast.success("Book removed from list.");
    } else {
      toast.error("Failed to remove book from list.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
