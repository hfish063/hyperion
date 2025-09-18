"use client";

import { useState } from "react";
import BookSearchWrapper from "@/components/book-search-wrapper";

export default function Explore() {
  const [error, setError] = useState<string | undefined>(undefined);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return <BookSearchWrapper setError={setError} />;
}
