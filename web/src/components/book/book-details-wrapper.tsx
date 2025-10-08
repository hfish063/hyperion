import { Book, searchById } from "@/app/api/book-details";
import { useEffect, useState } from "react";
import { Spinner } from "../ui";
import MissingData from "../missing-data";
import { Button } from "../ui/button";
import Image from "next/image";

export default function BookDetailsWrapper({ id }: BookDetailsWrapperProps) {
  const [bookDetails, setBookDetails] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);

      try {
        const details = await searchById(id);

        setBookDetails(details);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }

      setLoading(false);
    }

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-row space-x-4 w-full h-full items-center justify-center">
        <Spinner variant={"circle"} /> <p>Loading...</p>
      </div>
    );
  }

  if (bookDetails != undefined) {
    return (
      <div className="flex flex-col space-y-4">
        <BookDetailsHeader details={bookDetails} />
        <hr />
        <p>{bookDetails.description}</p>
        <BookDetailsList details={bookDetails} />
      </div>
    );
  }
}

type BookDetailsWrapperProps = {
  id: number;
};

function BookDetailsHeader({ details }: BookDetailsHeaderProps) {
  return (
    <div className="flex flex-row space-x-4">
      {details.coverImageUrl && (
        <Image
          className="rounded"
          src={details.coverImageUrl}
          height={200}
          width={150}
          alt={details.title}
        />
      )}
      <div className="flex flex-col space-y-4 justify-between">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">{details.title}</h1>
          <BookCollaboratorsList details={details} />
        </div>
        <Button className="w-32">Add to Library</Button>
      </div>
    </div>
  );
}

type BookDetailsHeaderProps = {
  details: Book;
};

function BookCollaboratorsList({ details }: BookCollaboratorsListProps) {
  if (details.collaborators) {
    return (
      <div>
        {details.collaborators.map((collaborator, index) => (
          <p key={index} className="italic">
            {collaborator.author.name}
          </p>
        ))}
      </div>
    );
  }
}

type BookCollaboratorsListProps = {
  details: Book;
};

function BookDetailsList({ details }: BookDetailsListProps) {
  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Format", value: details.editionFormat },
    { label: "ISBN 10", value: details.isbn10 },
    { label: "ISBN 13", value: details.isbn13 },
    { label: "Pages", value: details.pages },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {fields.map(({ label, value }) => (
        <div key={label} className="flex flex-row space-x-4">
          <p className="font-semibold w-24">{label}</p>
          {value ? <p>{value}</p> : <MissingData />}
        </div>
      ))}
    </div>
  );
}

type BookDetailsListProps = {
  details: Book;
};
