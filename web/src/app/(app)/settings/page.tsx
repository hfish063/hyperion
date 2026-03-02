import { Card, CardContent } from "@/components/ui/card";
import { PaintBucket } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-3xl font-semibold">General</h1>
      <div className="flex flex-row space-x-4">
        <Link href={"/settings/appearance"}>
          <Card>
            <CardContent>
              <div className="flex flex-row space-x-4 items-center">
                <PaintBucket />
                <p className="text-sm">Appearance</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
