import apiFetch from "./api";

export type UserList = {
  id: number;
  name: string;
  description: string | undefined;
  isOrdered: boolean;
};

export default async function findAllUserLists() {
  const query = `/lists/all`;

  const results = await apiFetch(query);
  const data = (await results.json()) as UserList[];

  return data;
}

export async function findUserListById(id: number) {
  const query = `/lists/${id}`;

  const results = await apiFetch(query);
  const data = (await results.json()) as UserList;

  return data;
}

export async function saveUserList(newUserList: UserList) {
  const query = `/lists/save`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(newUserList),
  };

  const results = await apiFetch(query, options);
  const data = (await results.json()) as UserList;

  return data;
}

export async function deleteUserListById(id: number) {
  const query = `/lists/delete/${id}`;

  const options: RequestInit = {
    method: "DELETE",
  };

  const results = await apiFetch(query, options);
  return results.ok;
}
