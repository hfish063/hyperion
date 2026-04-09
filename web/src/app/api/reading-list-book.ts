import apiFetch from "./api";
import { Edition } from "./edition";
import { ReadingList } from "./reading-list";

export type ReadingListBook = {
  id: number;
  readingList: ReadingList;
  edition: Edition;
  ordinal: number;
  dateAdded: Date;
};

export default async function findAllBooksByListId(listId: number) {
  const query = `/list-books/list/${listId}`;

  const results = await apiFetch(query);

  if (!results.ok) return undefined;

  const data = (await results.json()) as ReadingListBook[];

  return data;
}

export async function saveBookToList(newReadingListBook: ReadingListBook) {
  const query = `/list-books/save`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(newReadingListBook),
  };

  const results = await apiFetch(query, options);

  if (!results.ok) return undefined;

  const data = (await results.json()) as ReadingListBook;

  return data;
}

export async function deleteReadingListBookById(id: number) {
  const query = `/list-books/delete/${id}`;

  const options: RequestInit = {
    method: "DELETE",
  };

  const results = await apiFetch(query, options);

  return results.ok;
}

export async function addBookToList(listId: number, edition: Edition) {
  const query = `/list-books/add/${listId}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(edition),
  };

  const results = await apiFetch(query, options);

  if (!results.ok) return undefined;

  const data = (await results.json()) as ReadingListBook;

  return data;
}
