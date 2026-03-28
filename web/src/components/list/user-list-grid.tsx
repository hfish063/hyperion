"use client";

import { UserList as UList } from "@/app/api/user-list";
import UserListCard from "./user-list-card";
import { useState } from "react";

type UserListGridProps = {
  userLists: UList[];
};

export default function UserListGrid({ userLists }: UserListGridProps) {
  const [lists, setLists] = useState<UList[]>(userLists);

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {lists.map((list) => (
        <UserListCard
          userList={list}
          setUserLists={setLists}
          key={list.id}
        />
      ))}
    </div>
  );
}
