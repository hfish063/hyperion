"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataSourcesDialog from "./data-sources-dialog";

export default function SettingsDropdown() {
  const [dataSourcesOpen, setDataSourcesOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setDataSourcesOpen(true)}>
            Data Sources
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DataSourcesDialog
        open={dataSourcesOpen}
        onOpenChange={setDataSourcesOpen}
      />
    </>
  );
}
