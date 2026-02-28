import apiFetch from "./api";

export async function searchForTitle(title: string) {
  const query = `/books/search/title/${title}`;

  const results = await apiFetch(query);
  const data = (await results.json()) as Book[];

  return data;
}

export type Book = {
  title: string;
  key: string;
};
