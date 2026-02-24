"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

export default function AppHeader() {
  return (
    <header className="flex flex-row space-x-4 items-center w-full justify-between">
      <AppHeaderTitle />
      <AppHeaderModules />
    </header>
  );
}

function AppHeaderTitle() {
  const pathname = usePathname();

  if (pathname === "/") {
    return <h1 className="text-2xl font-bold">Home</h1>;
  } else if (pathname === "/explore" || pathname.startsWith("/explore/")) {
    return <h1 className="text-2xl font-bold">Explore</h1>;
  } else if (pathname === "/library") {
    return <h1 className="text-2xl font-bold">Library</h1>;
  } else if (pathname === "/settings") {
    return <h1 className="text-2xl font-bold">Settings</h1>;
  } else {
    return <div />;
  }
}

function AppHeaderModules() {
  return (
    <div className="flex flex-row items-center space-x-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <ThemeToggle />
    </div>
  );
}
