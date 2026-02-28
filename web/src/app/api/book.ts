import apiFetch from "./api";

export async function searchForBook(title: string) {
  const query = `/books/search/title/${title}`;

  const results = await apiFetch(query);
  const data = (await results.json()) as Book[];

  console.log(data);

  return data;
}

export type Book = {
  title: string;
  key: string;
  cover_edition_key: string;
};
