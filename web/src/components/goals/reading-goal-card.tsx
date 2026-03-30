"use client";

import { ReadingGoal, updateReadingGoalProgress } from "@/app/api/reading-goal";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EllipsisVertical, Flag } from "lucide-react";
import GoalManagementMenu from "./goal-management-menu";
import { Button } from "../ui/button";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { toast } from "sonner";

export default function ReadingGoalCard({
  goal: initialGoal,
  onDelete,
}: ReadingGoalCardProps) {
  const [progress, setProgress] = useState(initialGoal.progress ?? 0);

  const progressGoal = initialGoal.progressGoal ?? 0;
  const goalType = String(initialGoal.type).toLowerCase();

  async function handleProgressCommit(value: number[]) {
    const newProgress = value[0];

    const updated = await updateReadingGoalProgress(
      initialGoal.id,
      newProgress,
    );

    if (!updated) {
      setProgress(progress);
      toast.error("Failed to update progress.");
    } else {
      toast.success("Updated reading goal progress.");
    }
  }

  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <div className="flex flex-row gap-4 justify-between items-center">
          <CardTitle>{initialGoal.name}</CardTitle>
          <GoalManagementMenu goalId={initialGoal.id} onDelete={onDelete}>
            <Button variant="ghost" size="icon" className="size-7">
              <EllipsisVertical className="size-3.5" />
            </Button>
          </GoalManagementMenu>
        </div>
        <CardDescription>
          Read {progressGoal} <strong>{goalType}</strong> by
          {format(new Date(initialGoal.endDate), " MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 items-center">
            <Flag className="shrink-0" />
            <Slider
              value={[progress]}
              max={progressGoal}
              onValueChange={(value) => setProgress(value[0])}
              onValueCommit={handleProgressCommit}
              disabled={progressGoal === 0}
            />
          </div>
          <p className="text-sm text-muted-foreground text-right">
            {progress} / {progressGoal} {goalType}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

type ReadingGoalCardProps = {
  goal: ReadingGoal;
  onDelete: (id: number) => void;
};
