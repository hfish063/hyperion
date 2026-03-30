"use client";

import { ReadingGoal } from "@/app/api/reading-goal";
import ReadingGoalCard from "./reading-goal-card";
import { useState } from "react";

export default function ReadingGoalList({
  goals: initialGoals,
}: ReadingGoalListProps) {
  const [goals, setGoals] = useState(initialGoals);

  function handleDelete(id: number) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      {goals.map((goal) => (
        <ReadingGoalCard key={goal.id} goal={goal} onDelete={handleDelete} />
      ))}
    </div>
  );
}

type ReadingGoalListProps = {
  goals: ReadingGoal[];
};
