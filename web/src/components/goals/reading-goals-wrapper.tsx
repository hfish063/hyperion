import { ReadingGoal } from "@/app/api/reading-goal";
import PageHeader from "../page-header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ErrorAlert from "../error-alert";
import Link from "next/link";
import ReadingGoalList from "./reading-goal-list";

export default function ReadingGoalsWrapper({
  goals,
}: ReadingGoalsWrapperProps) {
  if (goals === undefined) {
    return <ErrorAlert message="Error fetching reading goals." />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader text="Reading Goals" />
      <div>
        <Link href={"/goals/create"}>
          <Button>
            <Plus />
            New Goal
          </Button>
        </Link>
      </div>
      <hr />
      <ReadingGoalList goals={goals} />
    </div>
  );
}

type ReadingGoalsWrapperProps = {
  goals: ReadingGoal[];
};
