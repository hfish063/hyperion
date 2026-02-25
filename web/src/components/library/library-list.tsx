import { ReadingStatus, UserBook } from "@/app/api/user-book";
import { Dispatch, SetStateAction } from "react";
import LibraryCard from "./library-card";

export default function LibraryList({
  status,
  library,
  setLibrary,
}: LibraryListProps) {
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
  library: UserBook[];
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
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
