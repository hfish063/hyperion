import PageHeader from "@/components/page-header";
import ReadingOverview from "@/components/reading-overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center space-y-4">
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
      <Link href="/library" className="w-full h-full">
        <Card className="w-full h-full transition-shadow hover:shadow-md">
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

      <Link href="/goals" className="w-full h-full">
        <Card className="w-full h-full transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col space-y-2">
            <Target className="text-3xl" />
            <p>
              Set and track your reading goals. Challenge yourself with a target
              number of books, follow your progress, and celebrate every
              milestone along the way.
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
