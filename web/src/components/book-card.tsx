import { Book } from "@/app/api/book-details";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function BookCard({ metadata }: BookCardProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <Link
          href={`explore/${metadata.hardcoverId}`}
          className="flex flex-row space-x-4 items-start flex-1 min-h-[80px]"
        >
          {metadata.coverImageUrl ? (
            <Image
              src={metadata.coverImageUrl}
              alt={metadata.title}
              width={50}
              height={100}
              className="object-contain rounded"
            />
          ) : (
            <CoverImagePlaceholder />
          )}

          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-medium">{metadata.title}</h3>
            {metadata.releaseYear > 0 && <p>{metadata.releaseYear}</p>}
          </div>
        </Link>

        <div className="flex items-center">
          <Button>Add to Library</Button>
        </div>
      </div>

      <hr />
    </div>
  );
}

function CoverImagePlaceholder() {
  return (
    <div className="flex items-center justify-center w-14 h-[80px] border p-2 text-sm text-center rounded">
      <ImageOff />
    </div>
  );
}

export type BookCardProps = {
  metadata: Book;
};
