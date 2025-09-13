"use client";

import { BookMetadata, searchForWork } from "@/app/api/book-metadata";
import BookDetailsWrapper from "@/components/book-details-wrapper";
import ErrorAlert from "@/components/error-alert";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const [bookMetadata, setBookMetadata] = useState<BookMetadata | undefined>(
    undefined
  );
  const params = useParams();
  const workId = params.workId as string;
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await searchForWork(workId);

        setBookMetadata(response);
      } catch (e: unknown) {
        if (e instanceof Error) {
        }
      }
    };

    fetchMetadata();
  });

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (bookMetadata) {
    return <BookDetailsWrapper />;
  }

  return (
    <ErrorAlert message="Unable to retrieve book details, please try again." />
  );
}
