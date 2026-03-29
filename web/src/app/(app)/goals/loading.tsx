import { Spinner } from "@/components/ui";

export default function ReadingGoalsLoading() {
  return (
    <div className="flex justify-center items-center py-8">
      <Spinner variant="circle" />
    </div>
  );
}
