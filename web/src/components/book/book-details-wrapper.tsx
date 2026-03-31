import { Edition } from "@/app/api/edition";
import ErrorAlert from "../error-alert";
import { Card, CardContent } from "../ui/card";
import MissingData from "../missing-data";
import ExpandableText from "../expandable-text";
import Image from "next/image";
import CoverImage from "./cover-image";

export default function BookDetailsWrapper({
  edition,
}: BookDetailsWrapperProps) {
  if (edition === undefined) {
    return <ErrorAlert message="Failed to retrieve edition details." />;
  }

  return (
    <div className="flex flex-col gap-4">
      <BookDetailsHeader details={edition} />
      <BookDetailsDescription description={edition.description} />
      <BookDetailsList details={edition} />
    </div>
  );
}

type BookDetailsWrapperProps = {
  edition: Edition | undefined;
};

function BookDetailsHeader({ details }: BookDetailsHeaderProps) {
  return (
    <div className="flex flex-row gap-4">
      {details.coverImageUrl && (
        <CoverImage
          coverImageUrl={details.coverImageUrl}
          title={details.title}
          height={200}
          width={150}
        />
      )}
      <div className="flex flex-col gap-4 size-full justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{details.title}</h1>
          <BookCollaboratorsList details={details} />
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
      <Card>
        <CardContent>
          <ExpandableText text={description} maxLength={400} />
        </CardContent>
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
      <div className="flex flex-col gap-2">
        {details.collaborators.map((collaborator, index) => (
          <p key={index} className="text-muted-foreground">
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
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex flex-row gap-4">
              <p className="w-24 font-semibold">{label}</p>
              {value ? <p>{value}</p> : <MissingData />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type BookDetailsListProps = {
  details: Edition;
};
