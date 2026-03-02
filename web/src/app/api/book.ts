import apiFetch from "./api";

export async function searchForBooks(title: string) {
  const query = `/meta/search/books/title/${title}`;

  const results = await apiFetch(query);
  const data = (await results.json()) as Book[];

  return data;
}

export type Book = {
  id: number;
  sourceId: string;
  title: string;
  firstPublishYear: string;
  coverEditionId: string;
  coverEditionImageUrl: string;
};
