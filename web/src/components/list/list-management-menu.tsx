"use client";

import { deleteUserListById, UserList } from "@/app/api/user-list";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ListManagementMenuProps = {
  userList: UserList;
  setUserLists: Dispatch<SetStateAction<UserList[]>>;
  children: ReactNode;
};

export default function ListManagementMenu({
  userList,
  setUserLists,
  children,
}: ListManagementMenuProps) {
  const handleDelete = async () => {
    const isSuccessful = await deleteUserListById(userList.id);

    if (isSuccessful) {
      setUserLists((prev) => prev.filter((list) => list.id !== userList.id));
      toast.success("List deleted.");
    } else {
      toast.error("Failed to delete list.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
