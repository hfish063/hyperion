import BookSearchWrapper from "@/components/book/book-search-results";

export default async function SearchPage({ params }: SearchPageParams) {
  const resolvedParams = await params;
  const title = decodeURIComponent(resolvedParams.title);

  return <BookSearchWrapper initialQuery={title} />;
}

type SearchPageParams = {
  params: {
    title: string;
  };
};
