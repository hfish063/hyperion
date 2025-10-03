import apiFetch from "./api";
import { Book } from "./book-details";

export async function findAllBooksForUser() {
  const query = `/books/all`;

  const results = await apiFetch(query);
  const data = (await results.json()) as UserBook[];

  return data;
}

export async function saveBookForUser(newUserBook: UserBook) {
  const query = `/books/save`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(newUserBook),
  };

  const result = await apiFetch(query, options);
  const data = (await result.json()) as UserBook;

  return data;
}

export type UserBook = {
  id: number;
  edition: Book;
  readingStatus: ReadingStatus;
};

export enum ReadingStatus {
  WANT_TO_READ,
  CURRENTLY_READING,
  READ,
  DROPPED,
}
