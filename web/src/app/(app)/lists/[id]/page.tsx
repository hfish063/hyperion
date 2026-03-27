import ListBooksWrapper from "@/components/list/list-books-wrapper";

export default async function ListDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ListBooksWrapper id={id} />;
}
