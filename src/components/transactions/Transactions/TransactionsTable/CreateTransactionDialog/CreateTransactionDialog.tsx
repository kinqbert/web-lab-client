// src/components/transactions/CreateTransactionDialog.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createTransactionAction } from "@/api/actions/transaction";

interface Props {
  goals?: { _id: string; goalName: string }[];
}

export function CreateTransactionDialog({ goals }: Props) {
  const [state, formAction] = useActionState(createTransactionAction, {
    error: null,
  });
  const [type, setType] = useState<"income" | "expense">("income");
  const [goalId, setGoalId] = useState<string>("none");

  useEffect(() => {
    if (state.error) toast(state.error);
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-2 sm:w-[160px] sm:mt-0">
          Add transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription>Add income or expense entry.</DialogDescription>
        </DialogHeader>

        <form action={formAction} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min={0.01}
              step={0.01}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Type</Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as "income" | "expense")}
              name="type"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="type" value={type} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="groceries / salary…"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input id="description" name="description" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transactionDate">Date (optional)</Label>
            <Input id="transactionDate" name="transactionDate" type="date" />
          </div>

          {goals && goals.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="goalId">Apply to goal (optional)</Label>
              <Select
                value="none"
                onValueChange={(v) => setGoalId(v as string)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No goal</SelectItem>
                  {goals.map((g) => (
                    <SelectItem key={g._id} value={g._id}>
                      {g.goalName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name="goalId"
                value={goalId === "none" ? "" : goalId}
              />
            </div>
          )}

          {/* Footer */}
          <DialogFooter className="sm:justify-start mt-2">
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
