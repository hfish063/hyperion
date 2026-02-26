"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";

export default function CreateListPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isOrdered, setOrdered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-3xl font-semibold">Create List</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Description (Optional)</FieldLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Field className="max-w-sm items-center" orientation={"horizontal"}>
          <FieldContent>
            <FieldLabel>Ordered List</FieldLabel>
            <FieldDescription>
              Maintain the order of items in this list. Useful for ranking
              books.
            </FieldDescription>
          </FieldContent>
          <Switch
            checked={isOrdered}
            onCheckedChange={(checked) => setOrdered(checked as boolean)}
          />
        </Field>

        <div className="flex gap-4">
          <Button variant={"outline"}>
            <Link href={"/lists"}>Cancel</Link>
          </Button>

          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
