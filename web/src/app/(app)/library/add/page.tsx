import BackButton from "@/components/back-button";
import LibraryQuickAddForm from "@/components/library/library-add-book-wrapper";

export default function LibraryAddPage() {
  return (
    <div className="flex flex-col space-y-4">
      <LibraryAddPageHeader />
      <LibraryQuickAddForm />
    </div>
  );
}

function LibraryAddPageHeader() {
  return (
    <div className="flex flex-row space-x-4 justify-between">
      <h1 className="text-3xl font-semibold">Add Book</h1>
      <BackButton href="/library" label="Return to Library" />
    </div>
  );
}
