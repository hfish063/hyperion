import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { LibraryBook } from "@/app/api/library-book";
import { Dispatch, SetStateAction } from "react";
import ManagementMenu from "./library-management-menu";

export const getLibraryColumns = (
  setLibraryBooks: Dispatch<SetStateAction<LibraryBook[]>>,
): ColumnDef<LibraryBook>[] => [
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
      const libraryBook = row.original;

      return (
        <ManagementMenu libraryBook={libraryBook} setLibraryBooks={setLibraryBooks}>
          <Button variant={"ghost"} size={"icon"}>
            <Ellipsis />
          </Button>
        </ManagementMenu>
      );
    },
    header: "Manage",
  },
];
