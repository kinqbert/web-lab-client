import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const getDashboardSummary = async () => {
  return await fetchWithAuth(
    "http://localhost:5050/transactions/analytics/summary"
  );
};
