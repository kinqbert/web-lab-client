import { getDashboardSummary } from "@/api/server/getDashboardSummary";

export const Summary = async () => {
  const data = await getDashboardSummary();

  return <div>Balance: {data.balance}</div>;
};
