import Link from "next/link";
import AddBookToLibraryButton from "./add-to-library-button";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { Book } from "@/app/api/book";
import CoverImage from "./cover-image";

export default function BookCard({
  metadata,
  bookExistsInLibrary,
}: BookCardProps) {
  const coverImageWidth = 100;
  const coverImageHeight = 140;

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex-shrink-0">
        <CoverImage
          coverImageUrl={metadata.coverEditionImageUrl}
          title={metadata.title}
          width={coverImageWidth}
          height={coverImageHeight}
        />
      </div>
      <Card className="flex-1">
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between items-center">
              <BookCardContent metadata={metadata} />

              <div className="flex flex-col space-y-4 items-start justify-center w-[100]px]">
                <AddBookToLibraryButton
                  data={metadata}
                  bookExistsInLibrary={bookExistsInLibrary}
                />
                <Link
                  href={`/explore/${metadata.coverEditionId}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    <Info />
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type BookCardProps = {
  metadata: Book;
  bookExistsInLibrary: boolean;
};

function BookCardContent({ metadata }: BookCardContentProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-medium line-clamp-3">{metadata.title}</h3>
    </div>
  );
}

export type BookCardContentProps = {
  metadata: Book;
};
