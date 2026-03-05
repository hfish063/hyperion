import { Edition, searchForEditionById } from "@/app/api/edition";
import { useEffect, useState } from "react";
import { Spinner } from "../ui";
import MissingData from "../missing-data";
import Image from "next/image";
import { Card } from "../ui/card";
import BackButton from "../back-button";
import ErrorAlert from "../error-alert";

export default function BookDetailsWrapper({
  sourceId,
}: BookDetailsWrapperProps) {
  const [bookDetails, setBookDetails] = useState<Edition | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);

      try {
        const details = await searchForEditionById(sourceId);

        setBookDetails(details);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }

      setLoading(false);
    }

    fetchDetails();
  }, [sourceId]);

  if (loading) {
    return (
      <div className="flex flex-row space-x-4 w-full h-full items-center justify-center">
        <Spinner variant={"circle"} /> <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (bookDetails != undefined) {
    return (
      <div className="flex flex-col space-y-4">
        <BackButton
          href={`/explore/search/${bookDetails.title}`}
          label="See Similar"
        />
        <BookDetailsHeader details={bookDetails} />
        <hr />
        <BookDetailsDescription description={bookDetails.description} />
        <BookDetailsList details={bookDetails} />
      </div>
    );
  }
}

type BookDetailsWrapperProps = {
  sourceId: string;
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
      <div>
        <div className="flex flex-col space-y-4 size-full justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{details.title}</h1>
            <BookCollaboratorsList details={details} />
          </div>
        </div>
      </div>
    </div>
  );
}

type BookDetailsHeaderProps = {
  details: Edition;
};

function BookDetailsDescription({ description }: BookDetailsDescriptionProps) {
  if (description) {
    return (
      <Card className="p-4">
        <p>{description}</p>
      </Card>
    );
  }
}

type BookDetailsDescriptionProps = {
  description: string;
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
  details: Edition;
};

export function BookDetailsList({ details }: BookDetailsListProps) {
  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Format", value: details.editionFormat },
    { label: "ISBN 10", value: details.isbn10 },
    { label: "ISBN 13", value: details.isbn13 },
    { label: "Pages", value: details.pages },
  ];

  return (
    <Card className="flex flex-col space-y-4 p-4">
      {fields.map(({ label, value }) => (
        <div key={label} className="flex flex-row space-x-4">
          <p className="font-semibold w-24">{label}</p>
          {value ? <p>{value}</p> : <MissingData />}
        </div>
      ))}
    </Card>
  );
}

type BookDetailsListProps = {
  details: Edition;
};
