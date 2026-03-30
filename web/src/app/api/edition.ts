import apiFetch, { getHardcoverHeaders } from "./api";

export type Edition = {
  id: number;
  sourceId: number;
  title: string;
  description: string;
  editionFormat: string;
  isbn10: number;
  isbn13: number;
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

export async function searchForTitle(
  title: string,
  limit: number | undefined = undefined,
) {
  let query = `/editions/search/title/${title}`;

  if (limit) {
    query += `?limit=${limit}`;
  }

  const results = await apiFetch(query, { headers: getHardcoverHeaders() });

  if (!results.ok) return undefined;

  const data = (await results.json()) as Edition[];

  return data;
}

export async function searchForEditionById(id: string) {
  const query = `/editions/search/id/${id}`;

  const results = await apiFetch(query, { headers: getHardcoverHeaders() });

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
