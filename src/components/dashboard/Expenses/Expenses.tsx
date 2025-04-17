import { getDashboardExpenses } from "@/api/server/dashboard";
import { ExpenseChart } from "./ExpenseChart/ExpenseChart";

export const Expenses = async () => {
  const data = await getDashboardExpenses();

  return <ExpenseChart data={data} />;
};
