import {
  deleteAllLibraryBooksByIds,
  ReadingStatus,
  updateLibraryBookReadingStatus,
  LibraryBook,
} from "@/app/api/library-book";
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
  libraryBook: LibraryBook;
  setLibraryBooks: Dispatch<SetStateAction<LibraryBook[]>>;
  children: ReactNode;
};

export default function ManagementMenu({
  libraryBook,
  setLibraryBooks,
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
      const updated = await updateLibraryBookReadingStatus(libraryBook.id, newStatus);

      if (!updated) {
        toast.error("Failed to update reading status.");
        return;
      }

      setLibraryBooks((prev) =>
        prev.map((book) => (book.id === libraryBook.id ? updated : book)),
      );
      toast.success("Reading status updated.");
    } catch {
      toast.error("Failed to update reading status.");
    }
  };

  const handleDelete = async (editionId: number) => {
    try {
      const isSuccessful = await deleteAllLibraryBooksByIds([editionId]);

      if (isSuccessful) {
        setLibraryBooks((prev) =>
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
              className={`mr-2 size-4 ${readingStatus === libraryBook.readingStatus ? "opacity-100" : "opacity-0"}`}
            />
            {statusLabels[readingStatus]}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={() => handleDelete(libraryBook.edition.id)}
        >
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
