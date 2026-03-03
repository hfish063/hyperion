import Image from "next/image";
import { Button } from "../ui/button";

export default function BookCoverImages({ coverIds }: BookCoverImagesProps) {
  if (!coverIds) {
    return <></>;
  }

  const preview = coverIds[0];

  return (
    <div className="flex flex-col space-y-4 items-center">
      <Image
        className="rounded-lg"
        src={`https://covers.openlibrary.org/b/id/${preview}-L.jpg`}
        alt="Book cover image"
        width={150}
        height={200}
      />
      <Button variant="link">View all cover images</Button>
    </div>
  );
}

type BookCoverImagesProps = {
  coverIds: string[];
};
