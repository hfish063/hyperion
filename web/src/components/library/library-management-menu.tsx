import {
  deleteAllUserBooksByIds,
  ReadingStatus,
  updateUserBookReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { Check, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
    try {
      const updated = await updateUserBookReadingStatus(userBook.id, newStatus);

      if (!updated) {
        toast.error("Failed to update reading status.");
        return;
      }

      setUserBooks((prev) =>
        prev.map((book) => (book.id === userBook.id ? updated : book)),
      );
      toast.success("Reading status updated.");
    } catch {
      toast.error("Failed to update reading status.");
    }
  };

  const handleDelete = async (editionId: number) => {
    try {
      const isSuccessful = await deleteAllUserBooksByIds([editionId]);

      if (isSuccessful) {
        setUserBooks((prev) =>
          prev.filter((book) => book.edition.id !== editionId),
        );
        toast.success("Successfully deleted book.");
      } else {
        toast.error("Failed to delete book.");
      }
    } catch {
      toast.error("Failed to delete book.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses.map((readingStatus) => (
          <DropdownMenuItem
            key={readingStatus}
            onSelect={() => handleStatusChange(readingStatus)}
          >
            <Check
              className={`mr-2 size-4 ${readingStatus === userBook.readingStatus ? "opacity-100" : "opacity-0"}`}
            />
            {statusLabels[readingStatus]}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={() => handleDelete(userBook.edition.id)}
        >
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
