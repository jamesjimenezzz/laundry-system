"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { Customer as CustomerType } from "@prisma/client";

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

export const description = "A line chart with a label";

const useLastSevenDays = () => {
  const today = new Date();
  const { data: customers } = useCustomers();

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(today.getDate() - (6 - i));

    const customersForDay = customers?.filter((c: CustomerType) => {
      const created = new Date(c.createdAt);
      created.setHours(0, 0, 0, 0);
      return created.getTime() === d.getTime();
    });

    const totalLoads = customersForDay?.reduce(
      (sum: number, c: CustomerType) => sum + (c.loads || 0),
      0
    );

    return {
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      customers: customersForDay?.length,
      loads: totalLoads,
    };
  });
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const ChartLineLabel = () => {
  const dateData = useLastSevenDays();
  const startDate = dateData[0].date;
  const endDate = dateData[dateData.length - 1].date;

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Customers & Loads</CardTitle>
        <CardDescription>
          {startDate} - {endDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dateData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              interval={0}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="customers"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Line
              dataKey="loads"
              type="natural"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-mobile)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Current 7 days
        </div>
        <div className="text-muted-foreground leading-none">
          Showing Customers & Loads for the current 7 days
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartLineLabel;
