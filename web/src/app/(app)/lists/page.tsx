import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ListsPage() {
  return (
    <div className="flex flex-col space-y-4">
      <PageHeader text="Lists" />
      <Link href={"/lists/create"}>
        <Button>
          <PlusIcon /> New List
        </Button>
      </Link>
    </div>
  );
}
