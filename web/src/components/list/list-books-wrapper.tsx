"use client";

import findAllBooksByListId, {
  ReadingListBook,
} from "@/app/api/reading-list-book";
import { findAllBooksForUser, LibraryBook } from "@/app/api/library-book";
import ListBooksGrid from "./list-books-grid";
import AddBooksToListDialog from "./add-books-to-list-dialog";
import PageHeader from "../page-header";
import BackButton from "../back-button";
import ErrorAlert from "../error-alert";
import { findReadingListById, ReadingList } from "@/app/api/reading-list";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui";

export default function ListBooksWrapper({ id }: ListBooksWrapperProps) {
  const listId = Number(id);

  const [list, setList] = useState<ReadingList | undefined>(undefined);
  const [listBooks, setListBooks] = useState<ReadingListBook[]>([]);
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(undefined);

        const [listResult, listBooksResult, libraryBooksResult] =
          await Promise.all([
            findReadingListById(listId),
            findAllBooksByListId(listId),
            findAllBooksForUser(),
          ]);

        if (!listResult || !listBooksResult || !libraryBooksResult) {
          setError("Error fetching this reading list.");
          return;
        }

        setList(listResult);
        setListBooks(listBooksResult);
        setLibraryBooks(libraryBooksResult);
      } catch {
        setError("Error fetching this reading list.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [listId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <Skeleton className="h-9 w-48" />
          <BackButton href="/lists" label="Back to Lists" />
        </div>
        <Skeleton className="h-9 w-28" />
        <hr />
        <div className="flex justify-center items-center p-12 w-full">
          <Spinner variant={"circle"} />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between gap-4">
        <PageHeader text={list!.name} />
        <BackButton href="/lists" label="Back to Lists" />
      </div>
      <div>
        <AddBooksToListDialog
          library={libraryBooks}
          listId={listId}
          onBooksAdded={(added) => setListBooks((prev) => [...prev, ...added])}
        />
      </div>
      <hr />
      <ListBooksGrid listBooks={listBooks} setListBooks={setListBooks} />
    </div>
  );
}

type ListBooksWrapperProps = {
  id: string;
};
