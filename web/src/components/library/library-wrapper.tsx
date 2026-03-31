"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, ChevronDown, Check, ArrowUpDown } from "lucide-react";

import LibraryList from "./library-list";
import LibraryGrid from "./library-grid";
import ViewToggle, { ViewMode } from "../view-toggle";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui";
import ErrorAlert from "../error-alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  findAllBooksForUser,
  ReadingStatus,
  LibraryBook,
} from "@/app/api/library-book";
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
  const [library, setLibrary] = useState<LibraryBook[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [view, setView] = useState<ViewMode>("grid");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"title" | "dateAdded" | "pages">("dateAdded");

  useEffect(() => {
    async function fetchLibrary() {
      try {
        setLoading(true);
        setError(undefined);

        const data = await findAllBooksForUser();

        if (!data) {
          setError("Error fetching library.");
        } else {
          setLibrary(data);
        }
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

    let result = active?.status
      ? library.filter((book) => book.readingStatus === active.status)
      : library;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((book) =>
        book.edition.title.toLowerCase().includes(q),
      );
    }

    if (sortBy === "title") {
      result = [...result].sort((a, b) =>
        a.edition.title.localeCompare(b.edition.title),
      );
    } else if (sortBy === "pages") {
      result = [...result].sort(
        (a, b) => (a.edition.pages ?? 0) - (b.edition.pages ?? 0),
      );
    } else {
      result = [...result].sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      );
    }

    return result;
  }, [library, activeTab, searchQuery, sortBy]);

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

          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {view === "grid" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0 w-min">
                  <ArrowUpDown /> {sortBy === "title" ? "Title" : sortBy === "pages" ? "Pages" : "Date Added"}
                  <ChevronDown className="ml-1 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setSortBy("dateAdded")}>
                  <Check
                    className={`mr-2 size-4 ${sortBy === "dateAdded" ? "opacity-100" : "opacity-0"}`}
                  />
                  Date Added
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy("title")}>
                  <Check
                    className={`mr-2 size-4 ${sortBy === "title" ? "opacity-100" : "opacity-0"}`}
                  />
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy("pages")}>
                  <Check
                    className={`mr-2 size-4 ${sortBy === "pages" ? "opacity-100" : "opacity-0"}`}
                  />
                  Pages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {STATUS_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {view === "grid" ? (
                <LibraryGrid
                  library={filteredLibrary}
                  setLibraryBooks={setLibrary}
                />
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
