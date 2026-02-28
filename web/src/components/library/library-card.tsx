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
import { CheckIcon, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Edition } from "@/app/api/edition";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Card, CardContent } from "../ui/card";
import CoverImage from "../cover-image";

export default function LibraryCard({
  userBook,
  setLibrary,
}: LibraryCardProps) {
  return (
    <Card className="w-full min-w-0">
      <CardContent className="flex flex-row space-x-4">
        <Link
          className="flex-1 min-w-0"
          href={`/explore/${userBook.edition.sourceId}`}
        >
          <LibraryCardDetails bookDetails={userBook.edition} />
        </Link>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 items-center justify-center">
          <ReadingStatusMenu
            status={userBook.readingStatus}
            userBookId={userBook.id}
            setLibrary={setLibrary}
          />
          <DeleteLibraryCardButton
            setLibrary={setLibrary}
            userBook={userBook}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function LibraryCardDetails({ bookDetails }: LibraryCardDetailsProps) {
  const author = bookDetails.collaborators[0]?.author;

  return (
    <div className="flex flex-row space-x-4 items-center">
      <CoverImage
        title={bookDetails.title}
        coverImageUrl={bookDetails.coverImageUrl}
        width={120}
        height={180}
      />
      <div className="flex flex-col w-72">
        <h3 className="text-xl font-semibold line-clamp-2">
          {bookDetails.title}
        </h3>
        <p className="italic">{author && author.name}</p>
      </div>
      {bookDetails.pages !== undefined && bookDetails.pages > 0 && (
        <p className="hidden sm:block">{bookDetails.pages} pages</p>
      )}
    </div>
  );
}

type LibraryCardDetailsProps = {
  bookDetails: Edition;
};

type LibraryCardProps = {
  userBook: UserBook;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};

function ReadingStatusMenu({
  status,
  userBookId,
  setLibrary,
}: ReadingStatusMenuProps) {
  async function handleReadingStatusChange(newStatus: ReadingStatus) {
    if (newStatus === status) {
      return;
    }

    try {
      const result = await updateUserBookReadingStatus(userBookId, newStatus);

      if (!result) {
        return;
      }

      setLibrary((prev) =>
        prev.map((book) =>
          book.id === userBookId ? { ...book, readingStatus: newStatus } : book,
        ),
      );

      toast.success("Reading status updated");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Failed to update reading status");
      }
    }
  }

  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Object.values(ReadingStatus).map((value) => (
            <DropdownMenuItem
              key={value}
              onClick={() => handleReadingStatusChange(value)}
            >
              <CurrentStatus currentStatus={status} expectedStatus={value} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type ReadingStatusMenuProps = {
  status: ReadingStatus;
  userBookId: number;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};

function CurrentStatus({ currentStatus, expectedStatus }: CurrentStatusProps) {
  const statusMessages: Record<ReadingStatus, string> = {
    [ReadingStatus.WANT_TO_READ]: "Want to Read",
    [ReadingStatus.CURRENTLY_READING]: "Currently Reading",
    [ReadingStatus.READ]: "Read",
    [ReadingStatus.DROPPED]: "Dropped",
  };

  if (currentStatus === expectedStatus) {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <CheckIcon />
        <p className="font-semibold">{statusMessages[expectedStatus]}</p>
      </div>
    );
  } else {
    return <p>{statusMessages[expectedStatus]}</p>;
  }
}

type CurrentStatusProps = {
  currentStatus: ReadingStatus;
  expectedStatus: ReadingStatus;
};

function DeleteLibraryCardButton({
  setLibrary,
  userBook,
}: DeleteLibraryCardButtonProps) {
  async function handleDelete() {
    try {
      const success = await deleteBookForUser(userBook.id);

      if (!success) return;

      setLibrary((prev) => prev.filter((book) => book.id !== userBook.id));

      toast.success("Book has been successfully deleted.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row space-x-4 justify-end">
          <DialogClose>Cancel</DialogClose>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type DeleteLibraryCardButtonProps = {
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
  userBook: UserBook;
};
