"use client";
import React, { useState } from "react";
import ChartLineLabel from "./LineChart";
import AnalyticsHeading from "./ui/analyticsheading";
import { DateRange } from "react-day-picker";
import { Customer } from "@prisma/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { ChartBarMultiple } from "./ui/chart-bar-multiple";
import SimpleDateRange from "./ui/simpledaterange";
import { useCustomers } from "@/hooks/useCustomer";

const Analytics = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  const { data } =
    useCustomers(
      range?.from && range?.to
        ? {
            start: `${range.from.toISOString()}`,
            end: `${range.to.toISOString()}`,
          }
        : { preset: "today" }
    ) || 0;

  const dataTotalCustomers = data?.length;
  const dataLoads =
    data?.reduce((acc: number, d: Customer) => acc + d.loads, 0) || 0;
  const dataIncome =
    data?.reduce((acc: number, d: Customer) => acc + d.price, 0) || 0;

  const analyzeCards = [
    {
      name: "Total Customers",
      value: dataTotalCustomers,
      description: "In selected period",
      gradient: "from-blue-500 to-blue-300",
    },
    {
      name: "Total Loads",
      value: dataLoads,
      description: "In selected period",
      gradient: "from-green-500 to-green-300",
    },
    {
      name: "Average Order",
      value: "₱" + " " + dataIncome,
      description: "Per Customer",
      gradient: "from-purple-500 to-purple-300",
    },
  ];

  return (
    <div>
      <AnalyticsHeading />
      <SimpleDateRange setRange={setRange} range={range} />

      <div className="grid grid-cols-3 gap-5 mb-10">
        {analyzeCards.map((ac, i) => (
          <Card className={`bg-gradient-to-br ${ac.gradient} py-9`} key={i}>
            <CardHeader>
              <CardTitle className="text-white text-xl font-semibold">
                {ac.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p className="text-white font-semibold text-xl">{ac.value}</p>
                <p className="text-white">{ac.description}</p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <ChartLineLabel />
        <ChartBarMultiple />
      </div>
    </div>
  );
};

export default Analytics;
