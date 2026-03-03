import PageHeader from "@/components/page-header";
import ReadingOverview from "@/components/reading-overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 w-full px-4 md:px-0">
      <div className="flex flex-col items-center w-full space-y-4">
        <PageHeader text="Get Started" />
        <QuickLinks />
        <ReadingOverview />
        <div className="w-full flex items-start">
          <GithubLink />
        </div>
      </div>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <Link href="/library" className="w-full">
        <Card className="w-full">
          <CardContent className="flex flex-col space-y-2">
            <BookOpen className="text-3xl" />
            <p>
              Your personal library. Track books you own, are reading, or want
              to read. Stay organized and never lose sight of your reading
              goals.
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/explore" className="w-full">
        <Card className="w-full">
          <CardContent className="flex flex-col space-y-2">
            <Search className="text-3xl" />
            <p>
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
      <Button className="p-0" variant="link">
        Github
      </Button>
    </Link>
  );
}
