import PageHeader from "../page-header";
import CreateGoalForm from "./create-goal-form";

export default function CreateGoalWrapper() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader text="New Reading Goal" />
      <CreateGoalForm />
    </div>
  );
}
