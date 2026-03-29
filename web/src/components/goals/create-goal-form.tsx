"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Link from "next/link";
import { useState } from "react";
import {
  ReadingGoal,
  ReadingGoalType,
  saveReadingGoal,
} from "@/app/api/reading-goal";
import { toast } from "sonner";
import { Spinner } from "../ui";
import { useRouter } from "next/navigation";

export default function CreateGoalForm() {
  const [name, setName] = useState("");
  const [progress, setProgress] = useState("");
  const [type, setType] = useState(ReadingGoalType.BOOKS);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [isLoading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (!startDate || !endDate) return;

    setLoading(true);

    try {
      const toSave = {
        name: name,
        type: type,
        startDate: startDate,
        endDate: endDate,
      } as ReadingGoal;

      const result = await saveReadingGoal(toSave);

      if (result) {
        toast.success("Reading goal created successfully.");
        router.push("/goals");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Error creating reading goal.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Goal name input field */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          {/* Goal progress and type input fields*/}
          <Field>
            <FieldLabel>Progress</FieldLabel>
            <FieldDescription>
              What attribute would you like to keep track of?
            </FieldDescription>
            <div className="flex flex-row gap-4">
              <Input
                value={progress}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    setProgress(e.target.value);
                  }
                }}
                type="number"
                required
              />
              <ToggleGroup
                variant={"outline"}
                type="single"
                defaultValue="books"
                onValueChange={(val) => {
                  if (val === "books") {
                    setType(ReadingGoalType.BOOKS);
                  } else if (val === "pages") {
                    setType(ReadingGoalType.PAGES);
                  } else if (val === "hours") {
                    setType(ReadingGoalType.HOURS);
                  }
                }}
              >
                <ToggleGroupItem value="books">Books</ToggleGroupItem>
                <ToggleGroupItem value="pages">Pages</ToggleGroupItem>
                <ToggleGroupItem value="hours">Hours</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Field>

          {/* Goal start/end dates input fields */}
          <Field
            data-invalid={
              submitted && (!startDate || !endDate) ? true : undefined
            }
          >
            <FieldLabel>Between</FieldLabel>
            <div className="flex flex-row gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {submitted && !startDate && (
              <FieldError>Start date is required.</FieldError>
            )}
            {submitted && startDate && !endDate && (
              <FieldError>End date is required.</FieldError>
            )}
          </Field>

          {/* Form buttons */}
          <div className="flex flex-row gap-4">
            <Link href={"/goals"}>
              <Button variant={"outline"}>Cancel</Button>
            </Link>
            <Button type="submit">
              {isLoading ? <Spinner variant="circle" /> : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
