"use client";

import LibraryList from "./library-list";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
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

export default function LibraryWrapper() {
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

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
      }
    }

    getLibrary();

    setLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner variant="circle" />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <UserProfileHeader completedBooksCount={getCompletedBooksCount()} />
      <h2 className="text-2xl font-semibold">Books</h2>
      <hr />

      <Tabs defaultValue="all">
        <div className="flex flex-col space-y-4 w-fit">
          <LibrarySearchBar setLibrary={setLibrary} />
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="want to read">Want to Read</TabsTrigger>
            <TabsTrigger value="currently reading">
              Currently Reading
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="dropped">Dropped</TabsTrigger>
          </TabsList>
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
    </div>
  );
}

function UserProfileHeader({ completedBooksCount }: UserProfileHeaderProps) {
  const { user } = useUser();

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
