import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ReadingStatus, UserBook } from "@/app/api/user-book";
import { CheckIcon, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Book } from "@/app/api/book-details";
import Link from "next/link";

export default function LibraryCard({
  userBook,
  setLibrary,
}: LibraryCardProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4 justify-between">
        <Link
          className="flex flex-1"
          href={`/explore/${userBook.edition.hardcoverId}`}
        >
          <LibraryCardDetails bookDetails={userBook.edition} />
        </Link>
        <div className="flex flex-row space-x-2 items-center">
          <ReadingStatusMenu status={userBook.readingStatus} />
          <DeleteLibraryCardButton
            setLibrary={setLibrary}
            userBook={userBook}
          />
        </div>
      </div>
      <hr />
    </div>
  );
}

function LibraryCardDetails({ bookDetails }: LibraryCardDetailsProps) {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-xl font-medium">{bookDetails.title}</h3>
      {bookDetails.releaseYear > 0 && <p>{bookDetails.releaseYear}</p>}
      {bookDetails.collaborators.length > 0 && (
        <p className="italic">{bookDetails.collaborators[0].author.name}</p>
      )}
    </div>
  );
}

type LibraryCardDetailsProps = {
  bookDetails: Book;
};

type LibraryCardProps = {
  userBook: UserBook;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};

function ReadingStatusMenu({ status }: ReadingStatusMenuProps) {
  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <CurrentStatus
              currentStatus={status}
              expectedStatus={ReadingStatus.WANT_TO_READ}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CurrentStatus
              currentStatus={status}
              expectedStatus={ReadingStatus.CURRENTLY_READING}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CurrentStatus
              currentStatus={status}
              expectedStatus={ReadingStatus.READ}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CurrentStatus
              currentStatus={status}
              expectedStatus={ReadingStatus.DROPPED}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type ReadingStatusMenuProps = {
  status: ReadingStatus;
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
        <p>{statusMessages[expectedStatus]}</p>
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
  function handleDelete() {
    setLibrary((prevLibrary) =>
      prevLibrary.filter((currentBook) => {
        return currentBook.id !== userBook.id;
      })
    );
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <TrashIcon />
    </Button>
  );
}

type DeleteLibraryCardButtonProps = {
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
  userBook: UserBook;
};
