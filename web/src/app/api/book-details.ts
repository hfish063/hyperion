import apiFetch from "./api";

export async function searchForTitle(title: string, pageNumber: number) {
  const resultsLimit = 50;
  const offset = pageNumber * resultsLimit - resultsLimit;
  const results = await apiFetch(`/meta/search/${title}?offset=${offset}`);
  const data = (await results.json()) as BookDetails[];

  return data;
}

export type BookDetails = {
  id: number;
  title: string;
  subtitle: string;
  isbn_10: string;
  isbn_13: string;
  release_year: number;
  edition_format: string;
  asin: string;
  pages: number;
  book: Book;
  image: CoverImage;
};

type Book = {
  id: number;
  description: string;
};

type CoverImage = {
  url: string;
};
