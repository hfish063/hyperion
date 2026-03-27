import { UserListBook } from "@/app/api/user-list-book";
import ListBooksGrid from "./list-books-grid";
import PageHeader from "../page-header";
import BackButton from "../back-button";

const SAMPLE_LIST_BOOKS: UserListBook[] = [
  {
    id: 1,
    userList: { id: 1, name: "Sample List", description: "", isOrdered: true },
    edition: {
      id: 101,
      sourceId: 9780743273565,
      title: "The Great Gatsby",
      description: "",
      editionFormat: "Hardcover",
      isbn10: 743273565,
      isbn13: 9780743273565,
      pages: 180,
      coverImageUrl:
        "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
      collaborators: [],
    },
    ordinal: 1,
    dateAdded: new Date(),
  },
  {
    id: 2,
    userList: { id: 1, name: "Sample List", description: "", isOrdered: true },
    edition: {
      id: 102,
      sourceId: 9780061965487,
      title: "To Kill a Mockingbird",
      description: "",
      editionFormat: "Paperback",
      isbn10: 61965480,
      isbn13: 9780061965487,
      pages: 336,
      coverImageUrl:
        "https://covers.openlibrary.org/b/isbn/9780061965487-L.jpg",
      collaborators: [],
    },
    ordinal: 2,
    dateAdded: new Date(),
  },
  {
    id: 3,
    userList: { id: 1, name: "Sample List", description: "", isOrdered: true },
    edition: {
      id: 103,
      sourceId: 9780451524935,
      title: "1984",
      description: "",
      editionFormat: "Paperback",
      isbn10: 451524934,
      isbn13: 9780451524935,
      pages: 328,
      coverImageUrl:
        "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
      collaborators: [],
    },
    ordinal: 3,
    dateAdded: new Date(),
  },
  {
    id: 4,
    userList: { id: 1, name: "Sample List", description: "", isOrdered: true },
    edition: {
      id: 104,
      sourceId: 9780618640157,
      title: "The Lord of the Rings",
      description: "",
      editionFormat: "Hardcover",
      isbn10: 618640150,
      isbn13: 9780618640157,
      pages: 1178,
      coverImageUrl:
        "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg",
      collaborators: [],
    },
    ordinal: 4,
    dateAdded: new Date(),
  },
  {
    id: 5,
    userList: { id: 1, name: "Sample List", description: "", isOrdered: true },
    edition: {
      id: 105,
      sourceId: 9780316769174,
      title: "The Catcher in the Rye",
      description: "",
      editionFormat: "Paperback",
      isbn10: 316769177,
      isbn13: 9780316769174,
      pages: 277,
      coverImageUrl:
        "https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg",
      collaborators: [],
    },
    ordinal: 5,
    dateAdded: new Date(),
  },
];

export default async function ListBooksWrapper({ id }: ListBooksWrapperProps) {
  const listId = Number(id);

  // TODO: replace with real fetch once backend data is available
  // const listBooks = await findAllBooksByListId(listId);
  void listId;
  const listBooks = SAMPLE_LIST_BOOKS;
  const listName = listBooks[0]?.userList.name ?? "List Books";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between gap-4">
        <PageHeader text={listName} />
        <BackButton href="/lists" label="Back to Lists" />
      </div>
      <hr />
      <ListBooksGrid listBooks={listBooks} />
    </div>
  );
}

type ListBooksWrapperProps = {
  id: string;
};
