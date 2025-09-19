"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

export default function AppHeader() {
  return (
    <header className="flex flex-row space-x-4 items-center w-full justify-between">
      <AppHeaderTitle />
      <ThemeToggle />
    </header>
  );
}

function AppHeaderTitle() {
  const pathname = usePathname();

  console.log(pathname);

  if (pathname === "/") {
    return <h1 className="text-2xl font-bold">Home</h1>;
  } else if (pathname === "/explore" || pathname.startsWith("/explore/")) {
    return <h1 className="text-2xl font-bold">Explore</h1>;
  } else {
    return <div />;
  }
}
