import Link from "next/link";
import AddBookToLibraryButton from "../add-to-library-button";
import { Card, CardContent } from "../ui/card";
import CoverImage from "../cover-image";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { Book } from "@/app/api/book";

export default function BookCard({
  metadata,
  bookExistsInLibrary,
}: BookCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row space-x-4 items-start flex-1 min-h-[80px]">
              <CoverImage
                coverImageUrl={metadata.coverEditionImageUrl}
                title={metadata.title}
                width={70}
                height={100}
              />
              <BookCardContent metadata={metadata} />
            </div>

            <div className="flex flex-col space-y-4 items-start justify-center">
              <AddBookToLibraryButton
                data={metadata}
                bookExistsInLibrary={bookExistsInLibrary}
              />
              <Link href={`/explore/${metadata.coverEditionId}`}>
                <Button variant={"outline"}>
                  <Info />
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type BookCardProps = {
  metadata: Book;
  bookExistsInLibrary: boolean;
};

function BookCardContent({ metadata }: BookCardContentProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-medium">{metadata.title}</h3>
    </div>
  );
}

export type BookCardContentProps = {
  metadata: Book;
};
