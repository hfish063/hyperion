import apiFetch from "./api";
import { Edition } from "./edition";

export async function findAllBooksForUser() {
  const query = `/books/all`;

  const results = await apiFetch(query);
  const data = (await results.json()) as UserBook[];

  return data;
}

export async function findBookForUserById(id: number) {
  const query = `/books/search/${id}`;

  const result = await apiFetch(query);
  const data = (await result.json()) as UserBook;

  return data;
}

export async function findAllBooksForUserByReadingStatus(
  status: ReadingStatus,
) {
  const query = `/books/all/status/${status}`;

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

  if (!result.ok) {
    throw new Error("Failed to save book.");
  }

  const data = (await result.json()) as UserBook;

  return data;
}

export async function updateUserBookReadingStatus(
  id: number,
  newStatus: ReadingStatus,
) {
  const query = `/books/update/status/${id}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(newStatus),
  };

  const result = await apiFetch(query, options);
  const data = (await result.json()) as UserBook;

  return data;
}

/**
 * Deletes a book from user's library based off of the id field.
 *
 * @param id The id field of UserBook to delete from backend.
 * @returns True for valid request, false otherwise.  False assumes that the backend failed carry out
 * the delete operation.
 */
export async function deleteBookForUser(id: number) {
  const query = `/books/delete/${id}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "DELETE",
  };

  const result = await apiFetch(query, options);
  return result.ok;
}

export type UserBook = {
  id: number;
  edition: Edition;
  readingStatus: ReadingStatus;
};

export enum ReadingStatus {
  WANT_TO_READ = "WANT_TO_READ",
  CURRENTLY_READING = "CURRENTLY_READING",
  READ = "READ",
  DROPPED = "DROPPED",
}
