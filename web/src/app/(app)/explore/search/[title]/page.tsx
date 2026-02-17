import BookSearchWrapper from "@/components/book/book-search-wrapper";

export default async function SearchPage({ params }: SearchPageParams) {
  const title = decodeURIComponent(params.title);

  return <BookSearchWrapper initialQuery={title} />;
}

type SearchPageParams = {
  params: {
    title: string;
  };
};
