import apiFetch from "./api";
import { Edition } from "./edition";
import { UserList } from "./user-list";

export type UserListBook = {
  id: number;
  userList: UserList;
  edition: Edition;
  ordinal: number;
  dateAdded: Date;
};


export default async function findAllBooksByListId(listId: number) {
  const query = `/list-books/list/${listId}`;

  const results = await apiFetch(query);

  if (!results.ok) return undefined;

  const data = (await results.json()) as UserListBook[];

  return data;
}

export async function saveBookToList(newUserListBook: UserListBook) {
  const query = `/list-books/save`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(newUserListBook),
  };

  const results = await apiFetch(query, options);

  if (!results.ok) return undefined;

  const data = (await results.json()) as UserListBook;

  return data;
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

  const data = (await results.json()) as UserListBook;

  return data;
}
