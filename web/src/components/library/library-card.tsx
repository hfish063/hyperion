import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  deleteBookForUser,
  ReadingStatus,
  updateUserBookReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { CheckIcon, ChevronDown, Delete, Info } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Edition } from "@/app/api/edition";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import CoverImage from "../book/cover-image";

export default function LibraryCard({
  userBook,
  setLibrary,
}: LibraryCardProps) {
  return (
    <Card className="w-full min-w-0">
      <CardContent className="flex flex-row space-x-4">
        <div className="flex-1 min-w-0">
          <LibraryCardDetails bookDetails={userBook.edition} />
        </div>

        <BookManagementMenu
          status={userBook.readingStatus}
          userBookId={userBook.id}
          setLibrary={setLibrary}
        />
      </CardContent>
    </Card>
  );
}

function LibraryCardDetails({ bookDetails }: LibraryCardDetailsProps) {
  const author = bookDetails.collaborators[0]?.author;

  return (
    <div className="flex flex-row space-x-4 items-center">
      <div className="flex-shrink-0 relative group">
        <Link href={`/explore/${bookDetails.sourceId}`}>
          <CoverImage
            title={bookDetails.title}
            coverImageUrl={bookDetails.coverImageUrl}
            width={60}
            height={90}
          />
        </Link>
        <Info className="absolute top-2 right-2 h-5 w-5 text-white opacity-0 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col w-72 min-w-0">
        <h3 className="text-xl font-semibold line-clamp-2">
          {bookDetails.title}
        </h3>
        <p className="italic">{author?.name}</p>
      </div>

      {bookDetails.pages && bookDetails.pages > 0 && (
        <p className="hidden sm:block">{bookDetails.pages} pages</p>
      )}
    </div>
  );
}

function BookManagementMenu({
  status,
  userBookId,
  setLibrary,
}: BookManagementMenuProps) {
  async function handleReadingStatusChange(newStatus: ReadingStatus) {
    if (newStatus === status) return;

    try {
      const result = await updateUserBookReadingStatus(userBookId, newStatus);
      if (!result) return;

      setLibrary((prev) =>
        prev.map((book) =>
          book.id === userBookId ? { ...book, readingStatus: newStatus } : book,
        ),
      );

      toast.success("Reading status updated");
    } catch (e: unknown) {
      toast.error("Failed to update reading status");
    }
  }

  async function handleDelete() {
    try {
      const success = await deleteBookForUser(userBookId);
      if (!success) return;

      setLibrary((prev) => prev.filter((book) => book.id !== userBookId));
      toast.success("Book has been successfully deleted.");
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-1">
            <ChevronDown />
            <p>Manage</p>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {Object.values(ReadingStatus).map((value) => (
            <DropdownMenuItem
              key={value}
              onClick={() => handleReadingStatusChange(value)}
            >
              <CurrentReadingStatus
                currentStatus={status}
                expectedStatus={value}
              />
            </DropdownMenuItem>
          ))}

          <hr />

          <DropdownMenuItem onClick={handleDelete}>
            <Delete />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function CurrentReadingStatus({
  currentStatus,
  expectedStatus,
}: CurrentReadingStatusProps) {
  const statusMessages: Record<ReadingStatus, string> = {
    [ReadingStatus.WANT_TO_READ]: "Want to Read",
    [ReadingStatus.CURRENTLY_READING]: "Currently Reading",
    [ReadingStatus.READ]: "Read",
    [ReadingStatus.DROPPED]: "Dropped",
  };

  return currentStatus === expectedStatus ? (
    <div className="flex items-center space-x-2 font-semibold">
      <CheckIcon />
      <p>{statusMessages[expectedStatus]}</p>
    </div>
  ) : (
    <p>{statusMessages[expectedStatus]}</p>
  );
}

type LibraryCardDetailsProps = { bookDetails: Edition };
type LibraryCardProps = {
  userBook: UserBook;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};
type BookManagementMenuProps = {
  status: ReadingStatus;
  userBookId: number;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};
type CurrentReadingStatusProps = {
  currentStatus: ReadingStatus;
  expectedStatus: ReadingStatus;
};
