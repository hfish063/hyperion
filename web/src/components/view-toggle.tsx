import { Grid3X3, Rows3 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onChange}>
      <ToggleGroupItem value="list">
        <Rows3 />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <Grid3X3 />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

type ViewToggleProps = {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
};

export type ViewMode = "list" | "grid";
