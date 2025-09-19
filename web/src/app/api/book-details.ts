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

export type Book = {
  id: number;
  hardcoverId: number;
  title: string;
  subtitle: string;
  description: string;
  releaseYear: number;
  isbn10: number;
  isbn13: number;
  pages: number;
  coverImageUrl: string;
};
