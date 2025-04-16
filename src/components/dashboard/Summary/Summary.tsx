import { SummaryData } from "@/types/transactions";

interface Props {
  summaryData: SummaryData;
}

export const Summary = async ({ summaryData }: Props) => {
  return <div>{summaryData.balance}</div>;
};
