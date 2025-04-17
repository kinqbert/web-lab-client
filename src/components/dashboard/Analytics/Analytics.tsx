import { getDashboardAnalytics } from "@/api/server/dashboard";
import { AnalyticsChart } from "./AnalyticsChart/AnalyticsChart";

export const Analytics = async () => {
  const data = await getDashboardAnalytics();

  return <AnalyticsChart data={data} />;
};
