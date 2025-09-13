import { BookDetails } from "@/app/api/book-details";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import Link from "next/link";

export default function BookCard({ metadata }: BookCardProps) {
  return (
    <Link href={`explore/${metadata.isbn_13}`}>
      <div className="flex flex-col space-y-4 items-center justify-end">
        {metadata.image ? (
          <Image
            src={metadata.image.url}
            alt="Book cover image"
            width={100}
            height={100}
            className="object-contain"
          />
        ) : (
          <CoverImagePlaceholder />
        )}

        <div className="text-center font-semibold line-clamp-1">
          {metadata.title}
        </div>
      </div>
    </Link>
  );
}

function CoverImagePlaceholder() {
  return (
    <div className="flex items-center justify-center w-28 h-[150px] border p-2 text-sm text-center">
      <ImageOff />
    </div>
  );
}

export type BookCardProps = {
  metadata: BookDetails;
};
