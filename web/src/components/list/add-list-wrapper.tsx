"use client";

import { saveUserList, UserList } from "@/app/api/user-list";
import PageHeader from "@/components/page-header";
import { Spinner } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AddListWrapper() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isOrdered, setOrdered] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await saveUserList({
        name: name,
        description: description,
        isOrdered: isOrdered,
      } as UserList);

      if (result) {
        toast.success("List created successfully.");

        router.push("/lists");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Error creating list.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <PageHeader text="Create List" />
      <Card>
        <CardContent>
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

              <Button type="submit">
                {isLoading ? <Spinner variant={"circle"} /> : <p>Save</p>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
