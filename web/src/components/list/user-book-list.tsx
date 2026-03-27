"use client";

import { UserList as UList } from "@/app/api/user-list";
import UserListBookCard from "./user-list-book-card";
import { useState } from "react";

type UserBookListProps = {
  userLists: UList[];
};

export default function UserBookList({ userLists }: UserBookListProps) {
  const [lists, setLists] = useState<UList[]>(userLists);

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {lists.map((list) => (
        <UserListBookCard userList={list} setUserLists={setLists} key={list.id} />
      ))}
    </div>
  );
}
