import BackButton from "@/components/back-button";
import LibraryAddForm from "@/components/library/library-add-book-wrapper";

export default async function QuickAddToLibraryPage({
  params,
}: {
  params: { isbn: string };
}) {
  const pageParams = await params;

  return (
    <div className="flex flex-col space-y-4">
      <LibraryAddPageHeader />
      <LibraryAddForm initialIsbn={pageParams.isbn} />
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
