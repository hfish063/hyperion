import apiFetch from "./api";

export type ReadingList = {
  id: number;
  name: string;
  description: string | undefined;
  isOrdered: boolean;
};

export default async function findAllReadingLists() {
  const query = `/lists/all`;

  const results = await apiFetch(query);

  if (!results.ok) return undefined;

  const data = (await results.json()) as ReadingList[];

  return data;
}

export async function findReadingListById(id: number) {
  const query = `/lists/${id}`;

  const results = await apiFetch(query);

  if (!results.ok) return undefined;

  const data = (await results.json()) as ReadingList;

  return data;
}

export async function saveReadingList(newReadingList: ReadingList) {
  const query = `/lists/save`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(newReadingList),
  };

  const results = await apiFetch(query, options);

  if (!results.ok) return undefined;

  const data = (await results.json()) as ReadingList;

  return data;
}

export async function deleteReadingListById(id: number) {
  const query = `/lists/delete/${id}`;

  const options: RequestInit = {
    method: "DELETE",
  };

  const results = await apiFetch(query, options);
  return results.ok;
}
