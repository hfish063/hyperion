import apiFetch from "./api";

export async function searchForTitle(
  title: string,
  limit: number | undefined = undefined
) {
  let query = `/meta/search/title/${title}`;

  if (limit) {
    query += `?limit=${limit}`;
  }

  const results = await apiFetch(query);
  const data = (await results.json()) as Book[];

  return data;
}

export async function searchById(id: number) {
  const query = `/meta/search/id/${id}`;

  const results = await apiFetch(query);
  const data = (await results.json()) as Book;

  return data;
}

export type Book = {
  id: number;
  hardcoverId: number;
  title: string;
  subtitle: string;
  description: string;
  releaseYear: number;
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
