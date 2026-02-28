import apiFetch from "./api";

export async function searchForBook(title: string) {
  const query = `/books/search/title/${title}`;

  const results = await apiFetch(query);
  const data = (await results.json()) as Book[];

  return data;
}

export type Book = {
  id: number;
  sourceId: string;
  title: string;
  cover_edition_url: string;
};
