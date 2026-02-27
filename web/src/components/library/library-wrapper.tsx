"use client";

import LibraryList from "./library-list";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  findAllBooksForUser,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import LibrarySearchBar from "./library-search-bar";
import { UserAvatar, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Spinner } from "../ui";
import ErrorAlert from "../error-alert";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import ViewToggle, { ViewMode } from "../view-toggle";

export default function LibraryWrapper() {
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [view, setView] = useState<ViewMode>("list");

  const getCompletedBooksCount = () => {
    const readCount = library.filter(
      (book) => book.readingStatus === ReadingStatus.READ,
    ).length;
    return readCount;
  };

  useEffect(() => {
    async function getLibrary() {
      setLoading(true);
      setError(undefined);

      try {
        const library = await findAllBooksForUser();

        setLibrary(library);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getLibrary();
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <UserProfileHeader completedBooksCount={getCompletedBooksCount()} />
      <h2 className="text-2xl font-semibold">Books</h2>
      <hr />

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner variant="circle" />
        </div>
      ) : (
        <Tabs className="flex flex-col space-y-2" defaultValue="all">
          <div className="flex flex-col space-y-4 w-full">
            <LibrarySearchBar setLibrary={setLibrary} />
            <div className="flex gap-4 justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="want to read">Want to Read</TabsTrigger>
                <TabsTrigger value="currently reading">
                  Currently Reading
                </TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="dropped">Dropped</TabsTrigger>
              </TabsList>
              <ViewToggle
                value={view}
                onChange={(val) => {
                  setView(val);
                }}
              />
            </div>
          </div>
          <TabsContent value="all">
            <LibraryList library={library} setLibrary={setLibrary} />
          </TabsContent>
          <TabsContent value="want to read">
            <LibraryList
              library={library}
              setLibrary={setLibrary}
              status={ReadingStatus.WANT_TO_READ}
            />
          </TabsContent>
          <TabsContent value="currently reading">
            <LibraryList
              library={library}
              setLibrary={setLibrary}
              status={ReadingStatus.CURRENTLY_READING}
            />
          </TabsContent>
          <TabsContent value="read">
            <LibraryList
              library={library}
              setLibrary={setLibrary}
              status={ReadingStatus.READ}
            />
          </TabsContent>
          <TabsContent value="dropped">
            <LibraryList
              library={library}
              setLibrary={setLibrary}
              status={ReadingStatus.DROPPED}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function UserProfileHeader({ completedBooksCount }: UserProfileHeaderProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-row space-x-4">
        <Skeleton className="rounded-full size-6" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-row space-x-4 items-center">
      <UserAvatar />
      <h1 className="text-4xl font-bold">{user?.username}</h1>
      <Badge>{completedBooksCount} Read</Badge>
    </div>
  );
}

type UserProfileHeaderProps = {
  completedBooksCount: number;
};
