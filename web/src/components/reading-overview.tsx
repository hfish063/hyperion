"use client";

import {
  findAllBooksForUserByReadingStatus,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import ErrorAlert from "./error-alert";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import CoverImage from "./book/cover-image";

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
    return <p className="line-clamp-1">No Data</p>;
  }

  return (
    <div className="flex gap-4 overflow-hidden">
      {readingList.map((book) => {
        const { edition } = book;

        return (
          <div
            key={book.id}
            className="flex flex-col items-center flex-shrink-0"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CoverImage
                    width={100}
                    height={150}
                    title={edition.title}
                    coverImageUrl={edition.coverImageUrl}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>{edition.title}</TooltipContent>
            </Tooltip>
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
