import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ListsPage() {
  return (
    <Link href={"/lists/create"}>
      <Button>
        <PlusIcon /> New List
      </Button>
    </Link>
  );
}
