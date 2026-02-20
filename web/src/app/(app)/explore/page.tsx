import BookSearchWrapper from "@/components/book/book-search-wrapper";

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const requestedParams = await searchParams;
  const title = requestedParams.title ?? "";
  return <BookSearchWrapper initialQuery={title} />;
}

type ExplorePageProps = {
  searchParams: { title: string };
};
