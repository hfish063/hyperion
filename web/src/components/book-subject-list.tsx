import { Badge } from "./ui/badge";

export default function BookSubjectList({ subjects }: BookSubjectListProps) {
  if (!subjects) {
    return <p>No subjects found.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject, index) => (
        <Badge key={index}>{subject}</Badge>
      ))}
    </div>
  );
}

type BookSubjectListProps = {
  subjects: string[];
};
