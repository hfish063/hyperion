"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";

import LibraryList from "./library-list";
import LibraryGrid from "./library-grid";
import ViewToggle, { ViewMode } from "../view-toggle";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Spinner } from "../ui";
import ErrorAlert from "../error-alert";

import {
  findAllBooksForUser,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const STATUS_TABS: {
  label: string;
  value: string;
  status?: ReadingStatus;
}[] = [
  { label: "All", value: "all" },
  { label: "Want to Read", value: "want", status: ReadingStatus.WANT_TO_READ },
  {
    label: "Currently Reading",
    value: "current",
    status: ReadingStatus.CURRENTLY_READING,
  },
  { label: "Read", value: "read", status: ReadingStatus.READ },
  { label: "Dropped", value: "dropped", status: ReadingStatus.DROPPED },
];

export default function LibraryWrapper() {
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [view, setView] = useState<ViewMode>("grid");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    async function fetchLibrary() {
      try {
        setLoading(true);
        setError(undefined);

        const data = await findAllBooksForUser();

        setLibrary(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLibrary();
  }, []);

  const completedCount = useMemo(() => {
    return library.filter((book) => book.readingStatus === ReadingStatus.READ)
      .length;
  }, [library]);

  const filteredLibrary = useMemo(() => {
    const active = STATUS_TABS.find((tab) => tab.value === activeTab);

    if (!active?.status) return library;

    return library.filter((book) => book.readingStatus === active.status);
  }, [library, activeTab]);

  const handleViewChange = useCallback((newValue: ViewMode | null) => {
    if (newValue) setView(newValue);
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Link href={"/library/add"}>
          <Button>
            <Plus />
            Add Books
          </Button>
        </Link>

        {isLoading ? (
          <Skeleton className="h-5 w-15" />
        ) : (
          <Badge variant="outline">{completedCount} Read</Badge>
        )}
      </div>

      <hr />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spinner variant="circle" />
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="overflow-x-auto">
              <TabsList className="flex flex-row space-x-2">
                {STATUS_TABS.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <ViewToggle value={view} onChange={handleViewChange} />
          </div>

          {STATUS_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {view === "grid" ? (
                <LibraryGrid library={filteredLibrary} />
              ) : (
                <LibraryList
                  library={filteredLibrary}
                  setLibrary={setLibrary}
                  status={tab.status}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
