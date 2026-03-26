import { UserList as UList } from "@/app/api/user-list";
import UserListBookCard from "./user-list-book-card";

export default function UserBookList({ userLists }: UserBookListProps) {
  return (
    <div className="flex flex-col space-y-4">
      {userLists.map((list) => (
        <UserListBookCard userList={list} key={list.id} />
      ))}
    </div>
  );
}

type UserBookListProps = {
  userLists: UList[];
};
