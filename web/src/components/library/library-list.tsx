import {
  findAllBooksForUser,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ErrorAlert from "../error-alert";
import { Spinner } from "../ui";
import LibraryCard from "./library-card";

export default function LibraryList({ status }: LibraryListProps) {
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getLibrary() {
      setLoading(true);
      setError(undefined);

      try {
        const library = await findAllBooksForUser();

        setLibrary(library);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }

    getLibrary();

    setLoading(false);
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (loading) {
    return (
      <div className="flex flex-row space-x-4 w-full h-full items-center justify-center">
        <Spinner variant={"circle"} /> <p>Loading...</p>
      </div>
    );
  }

  // filter the library items if status is specified
  if (status) {
    return (
      <FilteredList library={library} status={status} setLibrary={setLibrary} />
    );
  }

  // return list of all items in library
  return (
    <div className="flex flex-col space-y-4">
      {library.map((book, index) => (
        <LibraryCard key={index} userBook={book} setLibrary={setLibrary} />
      ))}
    </div>
  );
}

type LibraryListProps = {
  status?: ReadingStatus;
};

function FilteredList({ library, status, setLibrary }: FilteredListProps) {
  const filtered = library.filter((book) => {
    return book.readingStatus === status;
  });

  return (
    <div className="flex flex-col space-y-4">
      {filtered.map((book, index) => (
        <LibraryCard key={index} userBook={book} setLibrary={setLibrary} />
      ))}
    </div>
  );
}

type FilteredListProps = {
  library: UserBook[];
  status: ReadingStatus;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
};
