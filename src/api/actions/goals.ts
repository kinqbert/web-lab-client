"use server";

import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { createGoal } from "../server/goals";

export async function createGoalAction(
  _prev: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const goalName = formData.get("goalName")?.toString() || "";
  const target = Number(formData.get("targetAmount"));
  const deadline = formData.get("deadline")?.toString() || "";

  if (!goalName || isNaN(target) || target <= 0) {
    return { error: "Fill all fields correctly" };
  }

  try {
    await createGoal({ goalName, targetAmount: target, deadline });
  } catch (err) {
    const msg =
      (err as AxiosError<{ error?: string }>).response?.data?.error ??
      "Failed to create goal";
    return { error: msg };
  }

  redirect("/transactions");
}
