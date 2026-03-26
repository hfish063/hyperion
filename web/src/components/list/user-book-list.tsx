import { UserList as UList } from "@/app/api/user-list";
import UserListBookCard from "./user-list-book-card";

export default function UserBookList({ userLists }: UserBookListProps) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {userLists.map((list) => (
        <UserListBookCard userList={list} key={list.id} />
      ))}
    </div>
  );
}

type UserBookListProps = {
  userLists: UList[];
};
