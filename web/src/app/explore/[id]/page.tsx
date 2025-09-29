"use client";

import BookDetailsWrapper from "@/components/book-details-wrapper";
import ErrorAlert from "@/components/error-alert";
import { useParams } from "next/navigation";

export default function BookDetails() {
  const params = useParams();
  const paramId = params.id;

  if (!paramId) {
    return (
      <ErrorAlert message="Error fetching book details.  Please try again." />
    );
  }

  const id = Number(paramId);

  if (isNaN(id)) {
    <ErrorAlert message="Error fetching book details.  Please try again." />;
  }

  return <BookDetailsWrapper id={id} />;
}
