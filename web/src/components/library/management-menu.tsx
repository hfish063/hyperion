import {
  deleteAllUserBooksByIds,
  ReadingStatus,
  updateUserBookReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ManagementMenuProps = {
  userBook: UserBook;
  setUserBooks: Dispatch<SetStateAction<UserBook[]>>;
  children: ReactNode;
};

export default function ManagementMenu({
  userBook,
  setUserBooks,
  children,
}: ManagementMenuProps) {
  const statuses = Object.values(ReadingStatus);
  const statusLabels = {
    WANT_TO_READ: "Want to Read",
    CURRENTLY_READING: "Currently Reading",
    READ: "Read",
    DROPPED: "Dropped",
  };

  const handleStatusChange = async (newStatus: ReadingStatus) => {
    const updated = await updateUserBookReadingStatus(userBook.id, newStatus);
    setUserBooks((prev) =>
      prev.map((book) => (book.id === userBook.id ? updated : book)),
    );
    toast.success("Reading status updated.");
  };

  const handleDelete = async (editionId: number) => {
    const isSuccessful = await deleteAllUserBooksByIds([editionId]);

    if (isSuccessful) {
      setUserBooks((prev) =>
        prev.filter((book) => book.edition.id !== editionId),
      );
      toast.success("Successfully deleted book.");
    } else {
      toast.error("Failed to delete book.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        {statuses.map((readingStatus) => (
          <Button
            key={readingStatus}
            variant={"ghost"}
            onClick={() => handleStatusChange(readingStatus)}
          >
            {statusLabels[readingStatus]}
          </Button>
        ))}

        <hr className="my-1" />

        <Button
          className="w-full"
          variant={"ghost"}
          onClick={() => handleDelete(userBook.edition.id)}
        >
          <Trash /> Delete
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
