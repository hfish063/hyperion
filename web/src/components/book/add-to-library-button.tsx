import { saveBookForUser, ReadingStatus, UserBook } from "@/app/api/user-book";
import { useState } from "react";
import { Spinner } from "../ui";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Book } from "@/app/api/book";
import { searchForEditionById } from "@/app/api/edition";

export default function AddBookToLibraryButton({
  data,
  bookExistsInLibrary,
}: AddBookToLibraryButtonProps) {
  const [loading, setLoading] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(bookExistsInLibrary);

  async function addBookToLibrary() {
    setLoading(true);

    try {
      const coverEdition = await searchForEditionById(data.coverEditionId);
      const result = await saveBookForUser({
        edition: coverEdition,
        readingStatus: ReadingStatus.WANT_TO_READ,
      } as UserBook);

      // verify that the save request was successful
      if (result) {
        setAlreadyAdded(true);
        toast.success("Book has been added to your library.");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Failed to add book.");
      }
    } finally {
      setLoading(false);
    }
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
      <Button onClick={addBookToLibrary} className="w-32">
        {!loading ? (
          <div className="flex flex-row items-center space-x-1">
            <Plus />
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
  data: Book;
  bookExistsInLibrary: boolean;
};
