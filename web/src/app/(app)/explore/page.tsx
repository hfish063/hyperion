import BookSearchWrapper from "@/components/book/book-search-wrapper";

export default function ExplorePage({ searchParams }: ExplorePageProps) {
  const title = searchParams.title ?? "";
  return <BookSearchWrapper initialQuery={title} />;
}

type ExplorePageProps = {
  searchParams: { title: string };
};
