"use client";

import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Trash } from "lucide-react";
import { deleteReadingGoalById } from "@/app/api/reading-goal";
import { toast } from "sonner";

export default function GoalManagementMenu({
  goalId,
  onDelete,
  children,
}: GoalManagementMenuProps) {
  async function handleDelete() {
    const isSuccessful = await deleteReadingGoalById(goalId);

    if (isSuccessful) {
      onDelete(goalId);
      toast.success("Reading goal deleted.");
    } else {
      toast.error("Failed to delete reading goal.");
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem variant={"destructive"} onSelect={handleDelete}>
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type GoalManagementMenuProps = {
  goalId: number;
  onDelete: (id: number) => void;
  children: ReactNode;
};
