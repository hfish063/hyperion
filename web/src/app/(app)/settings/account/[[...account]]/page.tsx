"use client";

import { UserProfile } from "@clerk/nextjs";

export default function AccountSettingsPage() {
  return (
    <div className="flex justify-center">
      <UserProfile />
    </div>
  );
}
