import { api } from "../api";

export const getDashboardSummary = async () =>
  (await api.get("/transactions/analytics/summary")).data;
