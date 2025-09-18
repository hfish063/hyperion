import { Button } from "./ui/button";

export default function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <Button onClick={onClick} variant="outline">
      See All Results
    </Button>
  );
}

type LoadMoreButtonProps = {
  onClick: () => void;
};
