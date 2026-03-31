"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LibraryBook } from "@/app/api/library-book";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import CoverImage from "../book/cover-image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { addBookToList } from "@/app/api/reading-list-book";
import { toast } from "sonner";

export default function AddBooksToListDialog({
  listId,
  library,
}: AddBooksToListDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggle(libraryBookId: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(libraryBookId)) {
        next.delete(libraryBookId);
      } else {
        next.add(libraryBookId);
      }

      return next;
    });
  }

  async function handleAdd() {
    try {
      for (const libraryBookId of selected) {
        const libraryBook = library.find((b) => b.id === libraryBookId)!;
        const result = await addBookToList(listId, libraryBook.edition);

        if (result) {
          toast.success("Book added successfully.");
        } else {
          toast.error("Failed to add book.");
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Error saving book.");
      }
    } finally {
      setOpen(false);
      setSelected(new Set());
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Books
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Books to List</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-96">
          <div className="flex flex-col gap-2 pr-4">
            {library.map((libraryBook) => (
              <label
                key={libraryBook.id}
                className="flex items-center gap-3 rounded-md p-2 cursor-pointer hover:bg-muted"
              >
                <Checkbox
                  checked={selected.has(libraryBook.id)}
                  onCheckedChange={() => toggle(libraryBook.id)}
                />
                <CoverImage
                  width={40}
                  height={60}
                  title={libraryBook.edition.title}
                  coverImageUrl={libraryBook.edition.coverImageUrl}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium line-clamp-2">
                    {libraryBook.edition.title}
                  </span>
                  {libraryBook.edition.collaborators[0] && (
                    <span className="text-xs text-muted-foreground">
                      {libraryBook.edition.collaborators[0].author.name}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleAdd} disabled={selected.size === 0}>
            Add {selected.size > 0 ? `(${selected.size})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type AddBooksToListDialogProps = {
  listId: number;
  library: LibraryBook[];
};
