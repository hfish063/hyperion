import { Edition } from "@/app/api/edition";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<Edition>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ChevronsUpDown />
        </Button>
      );
    },
  },
  { accessorKey: "isbn10", header: "ISBN 10" },
  { accessorKey: "isbn13", header: "ISBN 13" },
  {
    accessorKey: "pages",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pages <ChevronsUpDown />
        </Button>
      );
    },
  },
  { accessorKey: "editionFormat", header: "Format" },
  {
    id: "actions",
    cell: ({ row }) => {
      const edition = row.original;

      return (
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      );
    },
    header: "Manage",
  },
];
