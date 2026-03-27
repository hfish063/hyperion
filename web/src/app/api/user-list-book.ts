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

export type UserListBookDto = {
  listId: number;
  edition: Edition;
};

export default async function findAllBooksByListId(listId: number) {
  const query = `/list-books/list/${listId}`;

  const results = await apiFetch(query);
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
  const data = (await results.json()) as UserListBook;

  return data;
}

export async function addBookToList(userListBookDto: UserListBookDto) {
  const query = `/list-books/add`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(userListBookDto),
  };

  const results = await apiFetch(query, options);
  const data = (await results.json()) as UserListBook;

  return data;
}
