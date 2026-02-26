"use client";

import {
  findAllBooksForUserByReadingStatus,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import ErrorAlert from "./error-alert";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Badge } from "./ui/badge";

export default function ReadingOverview() {
  const [currentlyReading, setCurrentlyReading] = useState<UserBook[]>([]);
  const [planningToRead, setPlanningToRead] = useState<UserBook[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchCurrentReads() {
      setLoading(true);

      try {
        const currentlyReadingResults =
          await findAllBooksForUserByReadingStatus(
            ReadingStatus.CURRENTLY_READING,
          );
        setCurrentlyReading(currentlyReadingResults);

        const planningToReadResults = await findAllBooksForUserByReadingStatus(
          ReadingStatus.WANT_TO_READ,
        );
        setPlanningToRead(planningToReadResults);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentReads();
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex flex-col space-y-4">
          <ReadingStatusHeader
            label="Currently Reading"
            readingListLength={currentlyReading.length}
          />
          {isLoading ? (
            <ReadingStatusPreviewSkeleton />
          ) : (
            <ReadingStatusPreview readingList={currentlyReading} />
          )}
          <ReadingStatusHeader
            label="Planning to Read"
            readingListLength={planningToRead.length}
          />
          {isLoading ? (
            <ReadingStatusPreviewSkeleton />
          ) : (
            <ReadingStatusPreview readingList={planningToRead} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ReadingStatusHeader({
  label,
  readingListLength,
}: ReadingStatusHeaderProps) {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <h3 className="text-xl">{label}</h3>
      {readingListLength > 0 && <Badge>{readingListLength}</Badge>}
    </div>
  );
}

type ReadingStatusHeaderProps = {
  label: string;
  readingListLength: number;
};

function ReadingStatusPreview({ readingList }: ReadingStatusPreviewProps) {
  if (readingList.length === 0) {
    return <p>No current reads</p>;
  }

  const booksToShow = readingList.slice(0, 3);

  return (
    <div className="flex gap-4">
      {booksToShow.map((book) => {
        const { edition } = book;

        return (
          <div key={book.id} className="flex flex-col items-center">
            {edition.coverImageUrl ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    className="rounded"
                    src={edition.coverImageUrl}
                    width={100}
                    height={150}
                    alt={edition.title}
                  />
                </TooltipTrigger>
                <TooltipContent>{book.edition.title}</TooltipContent>
              </Tooltip>
            ) : (
              <p className="text-sm text-center w-[100px]">{edition.title}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

type ReadingStatusPreviewProps = {
  readingList: UserBook[];
};

function ReadingStatusPreviewSkeleton() {
  return (
    <div className="flex flex-row space-x-4">
      <Skeleton className="h-32 w-24" />
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
