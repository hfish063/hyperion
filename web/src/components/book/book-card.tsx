import { Book } from "@/app/api/book";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import Link from "next/link";
import AddBookToLibraryButton from "../add-to-library-button";

export default function BookCard({
  metadata,
  bookExistsInLibrary,
}: BookCardProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <Link
          href={`/explore/${metadata.hardcoverId}`}
          className="flex flex-row space-x-4 items-start flex-1 min-h-[80px]"
        >
          <CoverImage
            coverImageUrl={metadata.coverImageUrl}
            title={metadata.title}
          />
          <BookCardContent metadata={metadata} />
        </Link>

        <div className="flex items-center">
          <AddBookToLibraryButton
            metadata={metadata}
            bookExistsInLibrary={bookExistsInLibrary}
          />
        </div>
      </div>

      <hr />
    </div>
  );
}

export type BookCardProps = {
  metadata: Book;
  bookExistsInLibrary: boolean;
};

function CoverImage({ coverImageUrl, title }: CoverImageProps) {
  return (
    <>
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={title}
          width={50}
          height={100}
          className="object-contain rounded"
        />
      ) : (
        <CoverImagePlaceholder />
      )}
    </>
  );
}

type CoverImageProps = {
  coverImageUrl: string;
  title: string;
};

function CoverImagePlaceholder() {
  return (
    <div className="flex items-center justify-center w-14 h-[80px] border p-2 text-sm text-center rounded bg-muted">
      <ImageOff />
    </div>
  );
}

function BookCardContent({ metadata }: BookCardContentProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-medium">{metadata.title}</h3>
      {metadata.releaseYear > 0 && <p>{metadata.releaseYear}</p>}
      {metadata.collaborators.length > 0 && (
        <p className="italic">{metadata.collaborators[0].author.name}</p>
      )}
    </div>
  );
}

export type BookCardContentProps = {
  metadata: Book;
};
