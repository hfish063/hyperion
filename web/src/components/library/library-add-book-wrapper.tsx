"use client";

import {
  Book,
  CircleArrowRight,
  Plus,
  ScanBarcode,
  Trash,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Dispatch,
  SetStateAction,
  SubmitEvent,
  useEffect,
  useState,
} from "react";
import {
  Author,
  Collaborator,
  Edition,
  searchForEditionByIsbn,
} from "@/app/api/edition";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ErrorAlert from "../error-alert";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import {
  ReadingStatus,
  saveBookForUser,
  saveBookForUserWithInput,
  LibraryBook,
} from "@/app/api/library-book";
import { toast } from "sonner";

export default function LibraryAddForm({ initialIsbn }: LibraryAddFormProps) {
  const [edition, setEdition] = useState<Edition | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (
      !initialIsbn ||
      (initialIsbn.length !== 10 && initialIsbn.length !== 13)
    ) {
      return;
    }

    async function fetchEdition() {
      try {
        const result = await searchForEditionByIsbn(initialIsbn!);
        if (!result) {
          setError("Error fetching edition.");
        } else {
          setEdition(result);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError("Failed to retrieve edition details.");
        }
      }
    }

    fetchEdition();
  }, [initialIsbn]);

  return (
    <div className="flex flex-col space-y-4">
      {error && <ErrorAlert message={error} />}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row space-x-2 items-center">
            <Book /> <p>Details</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditionDetailsForm edition={edition} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row space-x-2 items-center">
            <Zap /> <p>Quick Search</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IsbnSearchForm />
        </CardContent>
      </Card>
    </div>
  );
}

function EditionDetailsForm({ edition }: EditionDetailsFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([""]);
  const [description, setDescription] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [isbn13, setIsbn13] = useState("");
  const [pages, setPages] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  useEffect(() => {
    if (edition?.title) setTitle(edition.title);

    const authorNames =
      edition?.collaborators
        ?.filter((c) => c.author?.name)
        .map((c) => c.author.name) ?? [];
    setAuthors(authorNames.length ? authorNames : [""]);

    if (edition?.description) setDescription(edition.description);
    if (edition?.isbn10) setIsbn10(edition.isbn10);
    if (edition?.isbn13) setIsbn13(edition.isbn13);
    if (edition?.pages) setPages(String(edition.pages));
    if (edition?.coverImageUrl) setCoverImageUrl(edition.coverImageUrl);
  }, [edition]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    let newCollaborators: Collaborator[] = [];
    authors.forEach((author) =>
      newCollaborators.push({
        author: { name: author } as Author,
        contribution: "Author",
      } as Collaborator),
    );

    const newEdition = {
      title: title,
      description: description,
      isbn10: isbn10 || null,
      isbn13: isbn13 || null,
      pages: Number(pages) || null,
      coverImageUrl: coverImageUrl,
      collaborators: newCollaborators,
    } as unknown as Edition;

    const toAdd = {
      edition: newEdition,
      readingStatus: ReadingStatus.CURRENTLY_READING,
    } as LibraryBook;

    try {
      await saveBookForUserWithInput(toAdd as LibraryBook);
      toast.success("Book added to library.");
      router.push("/library");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Error saving edition.");
      }
    }
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Field>

      <Card>
        <CardContent>
          <AuthorsField authors={authors} setAuthors={setAuthors} />
        </CardContent>
      </Card>

      <Field>
        <FieldLabel>Description (Optional)</FieldLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel>ISBN 10</FieldLabel>
        <Input value={isbn10} onChange={(e) => setIsbn10(e.target.value)} />
      </Field>

      <Field>
        <FieldLabel>ISBN 13</FieldLabel>
        <Input value={isbn13} onChange={(e) => setIsbn13(e.target.value)} />
      </Field>

      <Field>
        <FieldLabel>Pages</FieldLabel>
        <Input
          type="number"
          value={pages}
          onChange={(e) => {
            if (Number(e.target.value) > 0) {
              setPages(e.target.value);
            }
          }}
        />
      </Field>

      <Field>
        <FieldLabel>Cover Image</FieldLabel>
        <Input
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
      </Field>

      <Button>
        <Plus /> Add
      </Button>
    </form>
  );
}

function AuthorsField({ authors, setAuthors }: AuthorsFieldProps) {
  const handleAuthorChange = (index: number, value: string) => {
    const updated = [...authors];
    updated[index] = value;
    setAuthors(updated);
  };

  const addAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const deleteAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  return (
    <Field>
      <FieldLabel>Author(s)</FieldLabel>
      <div className="flex flex-col space-y-4">
        {authors.map((author, index) => (
          <div key={index} className="flex flex-row space-x-4">
            <Input
              value={author}
              onChange={(e) => {
                handleAuthorChange(index, e.target.value);
              }}
            />
            {index + 1 == authors.length ? (
              <Button type="button" variant={"outline"} onClick={addAuthor}>
                Add Author
              </Button>
            ) : (
              <Button
                type="button"
                variant={"outline"}
                onClick={() => deleteAuthor(index)}
                size={"icon"}
              >
                <Trash />
              </Button>
            )}
          </div>
        ))}
      </div>
    </Field>
  );
}

function IsbnSearchForm() {
  const router = useRouter();
  const [isbn, setIsbn] = useState("");

  async function handleSearch(e: SubmitEvent) {
    e.preventDefault();

    if (!isbn) return;

    router.push(`/library/add/${encodeURIComponent(isbn)}`);
  }

  function formatIsbn(isbn: string) {
    return isbn.trim().replace("-", "");
  }

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
            onChange={(e) => setIsbn(formatIsbn(e.target.value))}
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

type LibraryAddFormProps = {
  initialIsbn?: string;
};

type EditionDetailsFormProps = {
  edition: Edition | undefined;
};

type AuthorsFieldProps = {
  authors: string[];
  setAuthors: Dispatch<SetStateAction<string[]>>;
};
