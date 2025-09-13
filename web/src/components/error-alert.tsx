import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

type ErrorAlertProps = {
  message: string;
};
