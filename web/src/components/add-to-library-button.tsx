import { Book } from "@/app/api/edition";
import { saveBookForUser, ReadingStatus, UserBook } from "@/app/api/user-book";
import { useState } from "react";
import { Spinner } from "./ui";
import { Button } from "./ui/button";
import { BookmarkIcon } from "lucide-react";
import { toast } from "sonner";

export default function AddBookToLibraryButton({
  metadata,
  bookExistsInLibrary,
}: AddBookToLibraryButtonProps) {
  const [loading, setLoading] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(bookExistsInLibrary);

  async function AddBookToLibrary() {
    setLoading(true);

    try {
      const result = await saveBookForUser({
        edition: metadata,
        readingStatus: ReadingStatus.WANT_TO_READ,
      } as UserBook);

      // verify that the save request was successful
      if (result) {
        setAlreadyAdded(true);
        toast.success("Book has been added to your library.");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    setLoading(false);
  }

  if (alreadyAdded) {
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
