import { BookMetadataLink } from "@/app/api/book-metadata";
import Link from "next/link";
import { Button } from "./ui/button";

export default function BookLinkList({ links }: BookLinkListProps) {
  if (links) {
    return (
      <div className="flex flex-wrap gap-2">
        {links.map((link, index) => (
          <Link key={index} href={link.url}>
            <Button variant="link">{link.title}</Button>
          </Link>
        ))}
      </div>
    );
  }

  return <p>No links provided.</p>;
}

type BookLinkListProps = {
  links: BookMetadataLink[];
};
