"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LibraryList from "./library-list";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { ReadingStatus } from "@/app/api/user-book";
import LibrarySearchBar from "./library-search-bar";

export default function LibraryWrapper() {
  return (
    <div className="flex flex-col space-y-4">
      <UserProfileHeader />
      <h2 className="text-2xl font-semibold">Books</h2>
      <hr />
      <LibrarySearchBar />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="want to read">Want to Read</TabsTrigger>
          <TabsTrigger value="currently reading">Currently Reading</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="dropped">Dropped</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <LibraryList />
        </TabsContent>
        <TabsContent value="want to read">
          <LibraryList status={ReadingStatus.WANT_TO_READ} />
        </TabsContent>
        <TabsContent value="currently reading">
          <LibraryList status={ReadingStatus.CURRENTLY_READING} />
        </TabsContent>
        <TabsContent value="read">
          <LibraryList status={ReadingStatus.READ} />
        </TabsContent>
        <TabsContent value="dropped">
          <LibraryList status={ReadingStatus.DROPPED} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserProfileHeader() {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <Avatar className="size-12">
        <AvatarImage src={""} alt="" />
        <AvatarFallback>{/* Username */}</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold">User</h1>
    </div>
  );
}
