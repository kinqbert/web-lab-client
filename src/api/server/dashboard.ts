import { AnalyticData, CategoryData, SummaryData } from "@/types/dashboard";

import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const getDashboardSummary = async (): Promise<SummaryData> => {
  return await fetchWithAuth(
    "http://localhost:5050/transactions/analytics/summary"
  );
};

export const getDashboardExpenses = async (): Promise<CategoryData[]> => {
  return await fetchWithAuth(
    "http://localhost:5050/transactions/analytics/categories"
  );
};

export const getDashboardAnalytics = async (): Promise<AnalyticData[]> => {
  return await fetchWithAuth(
    "http://localhost:5050/transactions/analytics/timeline"
  );
};
