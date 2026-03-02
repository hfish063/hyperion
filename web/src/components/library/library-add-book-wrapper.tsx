"use client";

import { Book, CircleArrowRight, ScanBarcode } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Edition, searchForEditionByIsbn } from "@/app/api/edition";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function LibraryQuickAddForm() {
  const [edition, setEdition] = useState<Edition | undefined>(undefined);

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row space-x-2 items-center">
              <Book /> <p>Details</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditionDetailsForm edition={edition} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <IsbnSearchForm setEdition={setEdition} />
        </CardContent>
      </Card>
    </div>
  );
}

function EditionDetailsForm({ edition }: EditionDetailsFormProps) {
  return (
    <form className="flex flex-col space-y-4">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input />
      </Field>
      <Field>
        <FieldLabel>Description (Optional)</FieldLabel>
        <Input />
      </Field>
      <Field>
        <FieldLabel>ISBN 10</FieldLabel>
        <Input />
      </Field>
      <Field>
        <FieldLabel>ISBN 13</FieldLabel>
        <Input />
      </Field>
      <Field>
        <FieldLabel>Cover Image</FieldLabel>
        <Input />
      </Field>
    </form>
  );
}

function IsbnSearchForm({ setEdition }: IsbnSearchFormProps) {
  const [isbn, setIsbn] = useState("");
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
  );
}

type EditionDetailsFormProps = {
  edition: Edition | undefined;
};

type IsbnSearchFormProps = {
  setEdition: Dispatch<SetStateAction<Edition | undefined>>;
};
