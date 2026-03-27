"use client";

import findAllUserLists, { UserList } from "@/app/api/user-list";
import ErrorAlert from "@/components/error-alert";
import UserBookList from "@/components/list/user-book-list";
import PageHeader from "@/components/page-header";
import { Spinner } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListsWrapper() {
  const [userLists, setUserLists] = useState<UserList[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    const fetchUserLists = async () => {
      try {
        const results = await findAllUserLists();
        setUserLists(results);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserLists();
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col space-y-4">
      <PageHeader text="Lists" />
      <Link className="w-min" href={"/lists/create"}>
        <Button>
          <PlusIcon /> New List
        </Button>
      </Link>
      <hr />
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spinner variant="circle" />
        </div>
      ) : (
        <UserBookList userLists={userLists} />
      )}
    </div>
  );
}
