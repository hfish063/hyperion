import findAllReadingGoals from "@/app/api/reading-goal";
import ReadingGoalsWrapper from "@/components/goals/reading-goals-wrapper";

export default async function ReadingGoalsPage() {
    const goals = await findAllReadingGoals();

    return <ReadingGoalsWrapper goals={goals} />
}