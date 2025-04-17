"use client";

import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AnalyticData } from "@/types/dashboard";

interface IncomeExpenseChartProps {
  data: AnalyticData[];
  title?: string;
  periodLabel?: string;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const chartConfig = {
  income: { label: "Income", color: "hsl(262 80% 55%)" },
  expense: { label: "Expense", color: "hsl(20 90% 55%)" },
} satisfies ChartConfig;

export const AnalyticsChart = ({
  data,
  title = "Income vs expense",
  periodLabel = "Last period",
}: IncomeExpenseChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    label: fmtDate(d.date),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{periodLabel}</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
            className="w-full"
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.income.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.income.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.expense.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.expense.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="expense"
              type="monotone"
              fill="url(#fillExpense)"
              stroke={chartConfig.expense.color}
              fillOpacity={0.4}
            />
            <Area
              dataKey="income"
              type="monotone"
              fill="url(#fillIncome)"
              stroke={chartConfig.income.color}
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
