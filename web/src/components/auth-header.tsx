"use client";

import { FlameIcon } from "lucide-react";
import ThemeToggle from "./theme-toggle";

export default function AuthHeader() {
  return (
    <header className="flex flex-row space-x-4 items-center w-full justify-between p-4">
      <div className="flex flex-row space-x-2 items-center">
        <FlameIcon />
        <p className="text-2xl font-bold p-2">Hyperion</p>
      </div>
      <ThemeToggle />
    </header>
  );
}
