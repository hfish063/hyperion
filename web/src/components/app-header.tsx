"use client";

import ThemeToggle from "./theme-toggle";
import SettingsDropdown from "./settings/settings-dropdown";

export default function AppHeader() {
  return (
    <header className="flex flex-row space-x-4 items-center w-full justify-end">
      <div className="flex flex-row items-center space-x-2">
        <SettingsDropdown />
        <ThemeToggle />
      </div>
    </header>
  );
}
