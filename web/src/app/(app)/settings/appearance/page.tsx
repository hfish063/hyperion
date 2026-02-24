"use client";

import ThemeToggle from "@/components/theme-toggle";

export default function AppearanceSettingsPage() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4 items-center">
        <p className="font-semibold w-32">Theme</p>
        <ThemeToggle />
      </div>
    </div>
  );
}
