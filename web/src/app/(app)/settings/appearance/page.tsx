"use client";

import BackButton from "@/components/back-button";
import ThemeToggle from "@/components/theme-toggle";

export default function AppearanceSettingsPage() {
  return (
    <div className="flex flex-col space-y-4">
      <BackButton href="/settings" label="Settings" />
      <div className="flex flex-row space-x-4 items-center">
        <p className="font-semibold w-32">Theme</p>
        <ThemeToggle />
      </div>
    </div>
  );
}
