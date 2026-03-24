import LibraryWrapper from "@/components/library/library-wrapper";
import PageHeader from "@/components/page-header";

export default function Library() {
  return (
    <div className="flex flex-col space-y-4">
      <PageHeader text="Library" />
      <LibraryWrapper />
    </div>
  );
}
