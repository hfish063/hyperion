"use client";

import ThemeToggle from "./theme-toggle";
import SearchBar from "./search-bar";

export default function AppHeader() {
  return (
    <header className="flex flex-row space-x-4 items-center w-full justify-between">
      <SearchBar />
      <ThemeToggle />
    </header>
  );
}
