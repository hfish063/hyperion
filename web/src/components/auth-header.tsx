"use client";

import ThemeToggle from "./theme-toggle";

export default function AuthHeader() {
  return (
    <header className="flex flex-row space-x-4 items-center w-full justify-end p-4">
      <ThemeToggle />
    </header>
  );
}
