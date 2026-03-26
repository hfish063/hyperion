import { UserList } from "@/app/api/user-list";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, List, ListOrdered } from "lucide-react";

export default function UserListBookCard({ userList }: UserListBookCardProps) {
  return (
    <Card className="group flex flex-col justify-between transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 items-center gap-2">
            {userList.isOrdered ? (
              <ListOrdered className="size-4 shrink-0 text-muted-foreground" />
            ) : (
              <List className="size-4 shrink-0 text-muted-foreground" />
            )}
            <CardTitle className="truncate text-base">
              {userList.name}
            </CardTitle>
          </div>
          {userList.isOrdered && (
            <Badge variant="secondary" className="shrink-0">
              Ranked
            </Badge>
          )}
        </div>
        {userList.description && (
          <CardDescription className="mt-1 line-clamp-2">
            {userList.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="border-t pt-4">
        <Button
          variant="link"
          size="sm"
          className="ml-auto gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground"
        >
          View list
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}

type UserListBookCardProps = {
  userList: UserList;
};
