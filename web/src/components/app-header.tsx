"use client";

import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

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
  } else if (pathname === "/lists") {
    return <h1 className="text-2xl font-bold">Lists</h1>;
  } else if (pathname === "/lists/create") {
    return <h1 className="text-2xl font-bold">Lists</h1>;
  } else if (pathname === "/settings") {
    return <h1 className="text-2xl font-bold">Settings</h1>;
  } else if (pathname === "/settings/appearance") {
    return <h1 className="text-2xl font-bold">Appearance Settings</h1>;
  } else if (pathname === "/settings/account") {
    return <h1 className="text-2xl font-bold">Account Settings</h1>;
  } else if (pathname === "/settings/account/security") {
    return <h1 className="text-2xl font-bold">Security Settings</h1>;
  } else {
    return <div />;
  }
}

function AppHeaderModules() {
  return (
    <div className="flex flex-row items-center space-x-4">
      <SignedOut>
        <SignInButton>
          <Button variant={"link"}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button variant={"link"}>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
}
