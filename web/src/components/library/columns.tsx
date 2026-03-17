import { Edition } from "@/app/api/edition";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Ellipsis, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  deleteAllUserBooksByIds,
  ReadingStatus,
  UserBook,
} from "@/app/api/user-book";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export const getLibraryColumns = (
  setUserBooks: Dispatch<SetStateAction<UserBook[]>>,
): ColumnDef<Edition>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ChevronsUpDown />
      </Button>
    ),
  },
  { accessorKey: "isbn10", header: "ISBN 10" },
  { accessorKey: "isbn13", header: "ISBN 13" },
  {
    accessorKey: "pages",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pages <ChevronsUpDown />
      </Button>
    ),
  },
  { accessorKey: "editionFormat", header: "Format" },
  {
    id: "actions",
    cell: ({ row }) => {
      const edition = row.original;

      const handleDelete = async (editionId: number) => {
        const isSuccessful = await deleteAllUserBooksByIds([editionId]);

        if (isSuccessful) {
          setUserBooks((prev) =>
            prev.filter((userBook) => userBook.edition.id !== editionId),
          );
          toast.success("Successfully deleted book.");
        } else {
          toast.error("Failed to delete book.");
        }
      };

      const statuses = Object.values(ReadingStatus);
      const statusLabels = {
        WANT_TO_READ: "Want to Read",
        CURRENTLY_READING: "Currently Reading",
        READ: "Read",
        DROPPED: "Dropped",
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            {statuses.map((readingStatus) => (
              <Button key={readingStatus} variant={"ghost"}>
                {statusLabels[readingStatus]}
              </Button>
            ))}

            <hr />

            <Button
              className="w-full"
              variant={"ghost"}
              onClick={() => handleDelete(edition.id)}
            >
              <Trash /> Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    header: "Manage",
  },
];
