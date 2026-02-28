"use client";

import BookDetailsWrapper from "@/components/book/book-details-wrapper";
import ErrorAlert from "@/components/error-alert";
import { useParams } from "next/navigation";

export default function BookDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return (
      <ErrorAlert message="Error fetching book details. Please try again." />
    );
  }

  return <BookDetailsWrapper sourceId={id} />;
}
