import apiFetch from "./api";

export async function searchForTitle(title: string, offset: number = 0) {
  const results = await apiFetch(`/meta/search/${title}?offset=${offset}`);
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
