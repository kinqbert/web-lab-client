"use server";

import { redirect } from "next/navigation";
import { createTransaction } from "../server/transactions";
import { AxiosError } from "axios";

export async function createTransactionAction(
  _: { error: string | null },
  form: FormData
): Promise<{ error: string | null }> {
  const amount = Number(form.get("amount"));
  const type = form.get("type") as "income" | "expense";
  const category = form.get("category")?.toString() || "";
  const description = form.get("description")?.toString() || "";
  const date = form.get("transactionDate")?.toString() || undefined;
  const goalId = form.get("goalId")?.toString() || undefined;

  if (
    isNaN(amount) ||
    amount <= 0 ||
    !["income", "expense"].includes(type) ||
    !category
  ) {
    return { error: "Please fill all required fields correctly" };
  }

  try {
    await createTransaction({
      amount,
      type,
      category,
      description,
      transactionDate: date,
      goalId: goalId || undefined,
    });
  } catch (err) {
    return {
      error: (err as AxiosError).message ?? "Failed to add transaction",
    };
  }

  redirect("/transactions");
}
