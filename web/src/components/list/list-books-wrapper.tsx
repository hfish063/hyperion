import findAllBooksByListId from "@/app/api/reading-list-book";
import { findAllBooksForUser } from "@/app/api/library-book";
import ListBooksGrid from "./list-books-grid";
import AddBooksToListDialog from "./add-books-to-list-dialog";
import PageHeader from "../page-header";
import BackButton from "../back-button";
import ErrorAlert from "../error-alert";

export default async function ListBooksWrapper({ id }: ListBooksWrapperProps) {
  const listId = Number(id);

  const [listBooks, library] = await Promise.all([
    findAllBooksByListId(listId),
    findAllBooksForUser(),
  ]);

  if (!listBooks || !library) {
    return <ErrorAlert message="Error fetching list books." />;
  }

  const listName = listBooks[0]?.readingList.name ?? "List Books";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between gap-4">
        <PageHeader text={listName} />
        <BackButton href="/lists" label="Back to Lists" />
      </div>
      <div>
        <AddBooksToListDialog library={library} listId={listId} />
      </div>
      <hr />
      <ListBooksGrid listBooks={listBooks} />
    </div>
  );
}

type ListBooksWrapperProps = {
  id: string;
};
