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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

export const STORAGE_KEY_DATA_SOURCE = "hyperion_data_source";
export const STORAGE_KEY_HARDCOVER_API_KEY = "hyperion_hardcover_api_key";

export type DataSource = "OpenLibraryAPI" | "HardcoverAPI";

type DataSourcesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DataSourcesDialog({
  open,
  onOpenChange,
}: DataSourcesDialogProps) {
  const [selectedSource, setSelectedSource] =
    useState<DataSource>("OpenLibraryAPI");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (!open) return;
    const savedSource = localStorage.getItem(
      STORAGE_KEY_DATA_SOURCE,
    ) as DataSource | null;
    if (savedSource) setSelectedSource(savedSource);
    setApiKey(localStorage.getItem(STORAGE_KEY_HARDCOVER_API_KEY) ?? "");
  }, [open]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY_DATA_SOURCE, selectedSource);
    if (selectedSource === "HardcoverAPI") {
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
            Choose the source used to fetch book data.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={selectedSource}
            onValueChange={(val) => {
              if (val) setSelectedSource(val as DataSource);
            }}
          >
            <ToggleGroupItem value="OpenLibraryAPI">
              Open Library
            </ToggleGroupItem>
            <ToggleGroupItem value="HardcoverAPI">Hardcover</ToggleGroupItem>
          </ToggleGroup>

          {selectedSource === "HardcoverAPI" && (
            <div className="flex flex-col gap-2">
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
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
