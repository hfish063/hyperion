import { BanIcon } from "lucide-react";

export default function MissingData() {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <BanIcon />
      <p>No data</p>
    </div>
  );
}
