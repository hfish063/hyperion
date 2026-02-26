import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button className="p-0 w-min" variant={"link"}>
      <Link href={href}>
        <div className="flex flex-row space-x-2 items-center">
          <ArrowLeft />
          <p>{label}</p>
        </div>
      </Link>
    </Button>
  );
}

type BackButtonProps = {
  href: string;
  label: string;
};
