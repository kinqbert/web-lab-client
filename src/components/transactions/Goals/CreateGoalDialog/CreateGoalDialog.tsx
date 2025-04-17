// src/components/goals/CreateGoalDialog.tsx
"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createGoalAction } from "@/api/actions/goals";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

export function CreateGoalDialog() {
  const [state, formAction] = useActionState(createGoalAction, { error: null });

  useEffect(() => {
    if (state.error) toast(state.error);
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create new goal</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New goal</DialogTitle>
          <DialogDescription>
            Set a name, target amount and (optional) deadline.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="goalName">Goal name</Label>
            <Input
              id="goalName"
              name="goalName"
              placeholder="Laptop"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="targetAmount">Target amount</Label>
            <Input
              id="targetAmount"
              name="targetAmount"
              type="number"
              min={1}
              step={0.01}
              placeholder="1000"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline (optional)</Label>
            <div className="relative">
              <Input id="deadline" name="deadline" type="date" />
              <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="submit">Create</Button>
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
