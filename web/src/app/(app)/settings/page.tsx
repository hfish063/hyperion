import { Card, CardContent } from "@/components/ui/card";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <Link href={"/settings/account"}>
          <Card>
            <CardContent>
              <div className="flex flex-row space-x-4 items-center">
                <UserCircleIcon />
                <p className="text-sm">Account</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
