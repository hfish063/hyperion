"use client";

import findAllReadingLists, { ReadingList } from "@/app/api/reading-list";
import ErrorAlert from "@/components/error-alert";
import ReadingListGrid from "@/components/list/reading-list-grid";
import PageHeader from "@/components/page-header";
import { Spinner } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReadingListsWrapper() {
  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    const fetchReadingLists = async () => {
      try {
        const results = await findAllReadingLists();

        if (!results) {
          setError("Error fetching lists.");
        } else {
          setReadingLists(results);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReadingLists();
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <PageHeader text="Lists" />
      <Link className="w-min" href={"/lists/create"}>
        <Button>
          <PlusIcon /> New List
        </Button>
      </Link>
      <hr />
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spinner variant="circle" />
        </div>
      ) : (
        <ReadingListGrid readingLists={readingLists} />
      )}
    </div>
  );
}
