"use client";

import { PieChart, Pie } from "recharts";
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
import { CategoryData } from "@/types/dashboard";

const stringToHue = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
};

const buildDataset = (
  raw: CategoryData[]
): { category: string; amount: number; fill: string }[] =>
  raw.map(({ category, total }) => ({
    category,
    amount: total,
    fill: `hsl(${stringToHue(category)} 50% 55%)`,
  }));

type ExpenseSlice = CategoryData;

interface ExpenseChartProps {
  data: ExpenseSlice[];
  title?: string;
  periodLabel?: string;
}

const chartConfig = {} satisfies ChartConfig;

export function ExpenseChart({
  data,
  title = "Expense categories",
  periodLabel = "Last 30 days",
}: ExpenseChartProps) {
  const chartData = buildDataset(data);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{periodLabel}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[100px] max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              label
              stroke="transparent"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
