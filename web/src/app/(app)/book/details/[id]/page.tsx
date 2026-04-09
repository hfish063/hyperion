import { searchForEditionById } from "@/app/api/edition";
import BookDetailsWrapper from "@/components/book/book-details-wrapper";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;

  const edition = await searchForEditionById(Number(id));

  return <BookDetailsWrapper edition={edition} />;
}