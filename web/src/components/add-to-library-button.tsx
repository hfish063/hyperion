import { Book } from "@/app/api/book-details";
import { saveBookForUser, ReadingStatus, UserBook } from "@/app/api/user-book";
import { useState } from "react";
import { Spinner } from "./ui";
import { Button } from "./ui/button";
import { BookmarkIcon } from "lucide-react";

export default function AddBookToLibraryButton({
  metadata,
  bookExistsInLibrary,
}: AddBookToLibraryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function AddBookToLibrary() {
    setLoading(true);

    try {
      await saveBookForUser({
        edition: metadata,
        readingStatus: ReadingStatus.WANT_TO_READ,
      } as UserBook);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    setLoading(false);
  }

  if (bookExistsInLibrary) {
    return (
      <Button variant="secondary" className="w-32">
        Already Added
      </Button>
    );
  }

  return (
    <div className="flex items-center">
      <Button onClick={AddBookToLibrary} className="w-32">
        {!loading ? (
          <div className="flex flex-row items-center space-x-1">
            <BookmarkIcon />
            <p>Add to Library</p>
          </div>
        ) : (
          <Spinner variant="circle" />
        )}
      </Button>
    </div>
  );
}

type AddBookToLibraryButtonProps = {
  metadata: Book;
  bookExistsInLibrary: boolean;
};
