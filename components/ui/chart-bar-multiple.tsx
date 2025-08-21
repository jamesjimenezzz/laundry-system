"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCustomers } from "@/hooks/useCustomer";
import { Customer } from "@prisma/client";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "Gross",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  const { data } = useCustomers();
  const today = new Date();
  const lastDay = new Date();
  lastDay.setDate(today.getDate() - 6);
  const lastDayFixed = lastDay.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const todayFixed = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  const chartData2 = () => {
    const sevenDays = Array.from({ length: 7 }, (_, i) => {
      const dayToDay = new Date();
      dayToDay.setHours(0, 0, 0, 0);
      dayToDay.setDate(today.getDate() - 6 + i);

      const customerData = data?.filter((d: Customer) => {
        const created = new Date(d.createdAt);
        created.setHours(0, 0, 0, 0);
        return created.getTime() === dayToDay.getTime();
      });

      return {
        date: dayToDay.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        gross: customerData.reduce(
          (acc: number, d: Customer) => acc + d.price,
          0
        ),
      };
    });
    return sevenDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gross Income</CardTitle>
        <CardDescription>
          {lastDayFixed} - {todayFixed}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData2()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="gross" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Current 7 Days <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing Gross Income for the current 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
