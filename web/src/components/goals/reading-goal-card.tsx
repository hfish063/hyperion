import { ReadingGoal, ReadingGoalType } from "@/app/api/reading-goal";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { EllipsisVertical, Flag } from "lucide-react";
import GoalManagementMenu from "./goal-management-menu";
import { Button } from "../ui/button";

export default function ReadingGoalCard({
  goal,
  onDelete,
}: ReadingGoalCardProps) {
  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <div className="flex flex-row gap-4 justify-between items-center">
          <CardTitle>{goal.name}</CardTitle>
          <GoalManagementMenu goalId={goal.id} onDelete={onDelete}>
            <Button variant="ghost" size="icon" className="size-7">
              <EllipsisVertical className="size-3.5" />
            </Button>
          </GoalManagementMenu>
        </div>
        <CardDescription>
          Read X <strong>{String(goal.type).toLowerCase()}</strong> by
          {format(new Date(goal.endDate), " MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <Flag />
          <Progress value={25} />
        </div>
      </CardContent>
    </Card>
  );
}

type ReadingGoalCardProps = {
  goal: ReadingGoal;
  onDelete: (id: number) => void;
};
