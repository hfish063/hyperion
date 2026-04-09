import findAllBooksByListId from "@/app/api/reading-list-book";
import { findAllBooksForUser } from "@/app/api/library-book";
import ListBooksGrid from "./list-books-grid";
import AddBooksToListDialog from "./add-books-to-list-dialog";
import PageHeader from "../page-header";
import BackButton from "../back-button";
import ErrorAlert from "../error-alert";
import { findReadingListById } from "@/app/api/reading-list";

export default async function ListBooksWrapper({ id }: ListBooksWrapperProps) {
  const listId = Number(id);

  const [list, listBooks, library] = await Promise.all([
    findReadingListById(listId),
    findAllBooksByListId(listId),
    findAllBooksForUser(),
  ]);

  if (!list || !listBooks || !library) {
    return <ErrorAlert message="Error fetching this reading list." />;
  }

  const listName = list.name;

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
