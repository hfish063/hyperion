"use client";

import { deleteReadingListById, ReadingList } from "@/app/api/reading-list";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ListManagementMenuProps = {
  readingList: ReadingList;
  setReadingLists: Dispatch<SetStateAction<ReadingList[]>>;
  children: ReactNode;
};

export default function ListManagementMenu({
  readingList,
  setReadingLists,
  children,
}: ListManagementMenuProps) {
  const handleDelete = async () => {
    const isSuccessful = await deleteReadingListById(readingList.id);

    if (isSuccessful) {
      setReadingLists((prev) => prev.filter((list) => list.id !== readingList.id));
      toast.success("List deleted.");
    } else {
      toast.error("Failed to delete list.");
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
