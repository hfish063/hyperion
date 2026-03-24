import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { UserBook } from "@/app/api/user-book";
import { Dispatch, SetStateAction } from "react";
import ManagementMenu from "./management-menu";

export const getLibraryColumns = (
  setUserBooks: Dispatch<SetStateAction<UserBook[]>>,
): ColumnDef<UserBook>[] => [
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
    id: "title",
    accessorFn: (row) => row.edition.title,
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ChevronsUpDown />
      </Button>
    ),
  },
  { id: "isbn10", accessorFn: (row) => row.edition.isbn10, header: "ISBN 10" },
  { id: "isbn13", accessorFn: (row) => row.edition.isbn13, header: "ISBN 13" },
  {
    id: "pages",
    accessorFn: (row) => row.edition.pages,
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pages <ChevronsUpDown />
      </Button>
    ),
  },
  {
    id: "editionFormat",
    accessorFn: (row) => row.edition.editionFormat,
    header: "Format",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userBook = row.original;

      return (
        <ManagementMenu userBook={userBook} setUserBooks={setUserBooks}>
          <Button variant={"ghost"} size={"icon"}>
            <Ellipsis />
          </Button>
        </ManagementMenu>
      );
    },
    header: "Manage",
  },
];
