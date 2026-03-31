import { ReadingList } from "@/app/api/reading-list";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, EllipsisVertical, List, ListOrdered } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ListManagementMenu from "./list-management-menu";
import Link from "next/link";

type ReadingListCardProps = {
  readingList: ReadingList;
  setReadingLists: Dispatch<SetStateAction<ReadingList[]>>;
};

export default function ReadingListCard({
  readingList,
  setReadingLists,
}: ReadingListCardProps) {
  return (
    <Card className="group flex flex-col justify-between transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-2">
            {readingList.isOrdered ? (
              <ListOrdered className="size-4 shrink-0 text-muted-foreground" />
            ) : (
              <List className="size-4 shrink-0 text-muted-foreground" />
            )}
            <CardTitle className="truncate text-base">
              {readingList.name}
            </CardTitle>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {readingList.isOrdered && <Badge variant="secondary">Ranked</Badge>}
            <div onClick={(e) => e.stopPropagation()}>
              <ListManagementMenu
                readingList={readingList}
                setReadingLists={setReadingLists}
              >
                <Button variant="ghost" size="icon" className="size-7">
                  <EllipsisVertical className="size-3.5" />
                </Button>
              </ListManagementMenu>
            </div>
          </div>
        </div>
        {readingList.description && (
          <CardDescription className="mt-1 line-clamp-2">
            {readingList.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="border-t pt-4">
        <Link href={`/lists/${readingList.id}`} className="ml-auto">
          <Button
            variant="link"
            size="sm"
            className="gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground"
          >
            View list
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
