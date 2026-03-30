"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const STORAGE_KEY_DATA_SOURCE = "hyperion_data_source";
export const STORAGE_KEY_HARDCOVER_API_KEY = "hyperion_hardcover_api_key";

export type DataSource = "HardcoverAPI";

type DataSourcesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DataSourcesDialog({
  open,
  onOpenChange,
}: DataSourcesDialogProps) {
  const [activeSource, setActiveSource] =
    useState<DataSource>("HardcoverAPI");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (!open) return;

    const saved = localStorage.getItem(
      STORAGE_KEY_DATA_SOURCE,
    ) as DataSource | null;

    setApiKey(localStorage.getItem(STORAGE_KEY_HARDCOVER_API_KEY) ?? "");
  }, [open]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY_DATA_SOURCE, activeSource);

    if (activeSource === "HardcoverAPI") {
      localStorage.setItem(STORAGE_KEY_HARDCOVER_API_KEY, apiKey);
    }

    onOpenChange(false);
    toast.success("Data source saved.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Data Sources</DialogTitle>
          <DialogDescription>
            Enable a source to fetch book data from. Additional sources might be planned for future releases.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <DataSourceRow
            label="Hardcover"
            description="Personalized reading tracker with rich metadata."
          >
            {activeSource === "HardcoverAPI" && (
              <div className="flex flex-col gap-2 pt-2">
                <Label htmlFor="hardcover-api-key">API Key</Label>
                <Input
                  id="hardcover-api-key"
                  type="password"
                  placeholder="Enter your Hardcover API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            )}
          </DataSourceRow>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type DataSourceRowProps = {
  label: string;
  description: string;
  children?: React.ReactNode;
};

function DataSourceRow({
  label,
  description,
  children,
}: DataSourceRowProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-opacity",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
