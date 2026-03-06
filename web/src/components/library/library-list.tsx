import {
  deleteAllUserBooksByIds,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { Dispatch, SetStateAction } from "react";
import { Edition } from "@/app/api/edition";
import DataTable from "./data-table";
import { columns } from "./columns";
import { toast } from "sonner";

export default function LibraryList({
  status,
  library,
  setLibrary,
}: LibraryListProps) {
  const handleDelete = async (ids: number[]) => {
    const isSuccessful = await deleteAllUserBooksByIds(ids);

    if (isSuccessful) {
      setLibrary(
        library.filter((userBook) => {
          return !ids.includes(userBook.edition.id);
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

  const editions: Edition[] = [];
  library.forEach((value) => {
    editions.push(value.edition);
  });

  // return list of all items in library
  return (
    <div className="flex flex-col space-y-4">
      <DataTable
        columns={columns}
        data={editions}
        handleDelete={handleDelete}
      />
    </div>
  );
}

type LibraryListProps = {
  status?: ReadingStatus;
  library: UserBook[];
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
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

  const editions: Edition[] = [];
  filtered.forEach((value) => editions.push(value.edition));

  return (
    <div className="flex flex-col space-y-4">
      <DataTable
        columns={columns}
        data={editions}
        handleDelete={handleDelete}
      />
    </div>
  );
}

type FilteredListProps = {
  library: UserBook[];
  status: ReadingStatus;
  setLibrary: Dispatch<SetStateAction<UserBook[]>>;
  handleDelete: (ids: number[]) => void;
};
