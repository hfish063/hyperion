"use client";

import { ReadingList } from "@/app/api/reading-list";
import ReadingListCard from "./reading-list-card";
import { useState } from "react";

type ReadingListGridProps = {
  readingLists: ReadingList[];
};

export default function ReadingListGrid({ readingLists }: ReadingListGridProps) {
  const [lists, setLists] = useState<ReadingList[]>(readingLists);

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {lists.map((list) => (
        <ReadingListCard
          readingList={list}
          setReadingLists={setLists}
          key={list.id}
        />
      ))}
    </div>
  );
}
