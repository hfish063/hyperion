"use client";

import { BookMetadata } from "@/app/api/book-metadata";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BookDetails() {
  const [bookMetadata, setBookMetadata] = useState<BookMetadata | undefined>(
    undefined
  );
  const params = useParams();
  const id = params.id as string;

  return <></>;
}
