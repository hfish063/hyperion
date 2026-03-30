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
import MissingData from "./missing-data";

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

        if (!currentlyReadingResults) {
          setError("Error fetching reading overview.");
          return;
        }

        setCurrentlyReading(currentlyReadingResults);

        const planningToReadResults = await findAllBooksForUserByReadingStatus(
          ReadingStatus.WANT_TO_READ,
        );

        if (!planningToReadResults) {
          setError("Error fetching reading overview.");
          return;
        }

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
        <div className="flex flex-col gap-4">
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
    <div className="flex flex-row gap-2 items-center">
      <h3 className="text-base font-semibold">{label}</h3>
      {readingListLength > 0 && <Badge variant="secondary">{readingListLength}</Badge>}
    </div>
  );
}

type ReadingStatusHeaderProps = {
  label: string;
  readingListLength: number;
};

function ReadingStatusPreview({ readingList }: ReadingStatusPreviewProps) {
  if (readingList.length === 0) {
    return <MissingData />;
  }

  const MAX_PREVIEW_ITEMS = 10;
  const previewList = readingList.slice(0, MAX_PREVIEW_ITEMS);

  return (
    <div className="flex gap-4 overflow-x-auto items-center">
      {previewList.map((book) => {
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
      {previewList.length < readingList.length && (
        <p className="text-sm text-muted-foreground text-center">
          + {readingList.length - previewList.length} more
        </p>
      )}
    </div>
  );
}

type ReadingStatusPreviewProps = {
  readingList: UserBook[];
};

function ReadingStatusPreviewSkeleton() {
  return (
    <div className="flex flex-row gap-4">
      <Skeleton className="h-[150px] w-[100px] rounded" />
      <Skeleton className="h-[150px] w-[100px] rounded" />
      <Skeleton className="h-[150px] w-[100px] rounded" />
    </div>
  );
}
