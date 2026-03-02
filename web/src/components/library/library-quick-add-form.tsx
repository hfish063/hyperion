"use client";

import { CircleArrowRight, ScanBarcode } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Edition, searchForEditionByIsbn } from "@/app/api/edition";
import { Card, CardContent } from "../ui/card";
import CoverImage from "../cover-image";

export default function LibraryQuickAddForm() {
  const [isbn, setIsbn] = useState("");
  const [edition, setEdition] = useState<Edition | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isbn) return;

    runSearch();
  }

  const runSearch = async () => {
    try {
      if (isbn.length == 10 || isbn.length == 13) {
        const result = await searchForEditionByIsbn(isbn);

        setEdition(result);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSearch}>
        <Field>
          <FieldLabel>
            <ScanBarcode /> ISBN Lookup
          </FieldLabel>
          <FieldDescription>
            Enter the ISBN to quickly fetch book data.
          </FieldDescription>
          <div className="flex gap-4">
            <Input
              placeholder="Enter ISBN 10 or ISBN 13"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <Button type="submit">
              <CircleArrowRight />
            </Button>
          </div>
        </Field>
      </form>
      {edition && <EditionOverviewCard edition={edition} />}
    </div>
  );
}

function EditionOverviewCard({ edition }: EditionOverViewProps) {
  if (!edition.id) {
    return;
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-row space-x-4">
          <CoverImage
            title={edition.title}
            width={100}
            height={160}
            coverImageUrl={edition.coverImageUrl}
          />
          <div className="flex flex-col space-y-4 w-24">
            <p className="font-semibold">Title</p>
            <p className="font-semibold">ISBN 10</p>
            <p className="font-semibold">ISBN 13</p>
            <p className="font-semibold">Pages</p>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="line-clamp-1">{edition.title}</p>
            <p>{edition.isbn10}</p>
            <p>{edition.isbn13}</p>
            <p>{edition.pages}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type EditionOverViewProps = {
  edition: Edition;
};
