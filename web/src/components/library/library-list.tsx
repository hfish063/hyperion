import {
  deleteAllLibraryBooksByIds,
  ReadingStatus,
  LibraryBook,
} from "@/app/api/library-book";
import { Dispatch, SetStateAction } from "react";
import DataTable from "./data-table";
import { toast } from "sonner";
import { getLibraryColumns } from "./columns";

export default function LibraryList({
  status,
  library,
  setLibrary,
}: LibraryListProps) {
  const handleDelete = async (ids: number[]) => {
    const isSuccessful = await deleteAllLibraryBooksByIds(ids);

    if (isSuccessful) {
      setLibrary(
        library.filter((libraryBook) => {
          return !ids.includes(libraryBook.edition.id);
        }),
      );

      toast.success("Successfully deleted books.");
    } else {
      toast.error("Error deleting books.");
    }
  };
  // filter the library items if status is specified
  if (status) {
    return (
      <FilteredList
        library={library}
        status={status}
        setLibrary={setLibrary}
        handleDelete={handleDelete}
      />
    );
  }

  // return list of all items in library
  return (
    <div className="flex flex-col space-y-4">
      <DataTable
        columns={getLibraryColumns(setLibrary)}
        data={library}
        handleDelete={handleDelete}
      />
    </div>
  );
}

type LibraryListProps = {
  status?: ReadingStatus;
  library: LibraryBook[];
  setLibrary: Dispatch<SetStateAction<LibraryBook[]>>;
};

function FilteredList({
  library,
  status,
  setLibrary,
  handleDelete,
}: FilteredListProps) {
  const filtered = library.filter((book) => {
    return book.readingStatus === status;
  });

  return (
    <div className="flex flex-col space-y-4">
      <DataTable
        columns={getLibraryColumns(setLibrary)}
        data={filtered}
        handleDelete={handleDelete}
      />
    </div>
  );
}

type FilteredListProps = {
  library: LibraryBook[];
  status: ReadingStatus;
  setLibrary: Dispatch<SetStateAction<LibraryBook[]>>;
  handleDelete: (ids: number[]) => void;
};
