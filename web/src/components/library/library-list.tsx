import { findAllBooksForUser, UserBook } from "@/app/api/user-book";
import { useEffect, useState } from "react";
import ErrorAlert from "../error-alert";
import { Spinner } from "../ui";

export default function LibraryList() {
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getLibrary() {
      setLoading(true);
      setError(undefined);

      try {
        const library = await findAllBooksForUser();

        setLibrary(library);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }

    getLibrary();

    setLoading(false);
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (loading) {
    return (
      <div className="flex flex-row space-x-4 w-full h-full items-center justify-center">
        <Spinner variant={"circle"} /> <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {library.map((book, index) => (
        <p key={index}>{book.edition.title}</p>
      ))}
    </div>
  );
}
