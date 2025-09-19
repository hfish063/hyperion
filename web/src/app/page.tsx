import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 w-full 2xl:w-1/2 mx-auto">
      <div className="flex flex-col space-y-4 justify-center items-center w-full">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <div className="w-auto">
          <QuickLinks />
        </div>
      </div>

      <div>
        <GithubLink />
      </div>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link href="/" className="h-full">
        <Card className="h-full flex flex-col">
          <CardContent className="flex flex-col space-y-2 flex-1">
            <BookOpen className="text-2xl" />
            <p className="flex-1">
              Your personal library. Track books you own, are reading, or want
              to read. Stay organized and never lose sight of your reading
              goals.
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/explore" className="h-full">
        <Card className="h-full flex flex-col">
          <CardContent className="flex flex-col space-y-2 flex-1">
            <Search className="text-2xl" />
            <p className="flex-1">
              Explore new titles. Search the database for books to add to your
              library, discover popular reads, and find your next favorite
              story.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

function GithubLink() {
  return (
    <Link href="https://github.com/hfish063">
      <Button variant="link">Github</Button>
    </Link>
  );
}
