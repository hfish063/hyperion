"use client";

import BackButton from "@/components/back-button";
import { UserProfile } from "@clerk/nextjs";

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col space-y-4">
      <BackButton href="/settings" label="Settings" />
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </div>
  );
}
