import apiFetch, { getHardcoverHeaders } from "./api";

export type Edition = {
  id: number;
  sourceId: number;
  title: string;
  description: string;
  editionFormat: string;
  isbn10: string;
  isbn13: string;
  pages: number;
  coverImageUrl: string;
  collaborators: Collaborator[];
};

export type Collaborator = {
  id: number;
  sourceId: number;
  author: Author;
  contribution: string;
};

export type Author = {
  id: number;
  name: string;
};

export async function searchForEditionById(id: number) {
  const query = `/editions/search/id/${id}`;

  const results = await apiFetch(query);

  if (!results.ok) return undefined;

  const data = (await results.json()) as Edition;

  return data;
}

export async function searchForEditionByIsbn(isbn: string) {
  const query = `/editions/search/isbn/${isbn}`;

  const results = await apiFetch(query, { headers: getHardcoverHeaders() });

  if (!results.ok) return undefined;

  const data = (await results.json()) as Edition;

  return data;
}

export async function deleteAllEditionsByIds(ids: number[]) {
  const result = await apiFetch("/editions/delete/all/ids", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });

  return result.ok;
}
