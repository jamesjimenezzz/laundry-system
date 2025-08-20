import React from "react";
import ChartLineLabel from "./LineChart";
import AnalyticsHeading from "./ui/analyticsheading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

const Analytics = () => {
  const analyzeCards = [
    {
      name: "Total Customers",
      value: 80,
      description: "In selected period",
      gradient: "from-blue-500 to-blue-300",
    },
    {
      name: "Total Income",
      value: "16,000",
      description: "In selected period",
      gradient: "from-green-500 to-green-300",
    },
    {
      name: "Daily Average",
      value: 11,
      description: "Customers per day",
      gradient: "from-orange-500 to-orange-300",
    },
    {
      name: "Average Order",
      value: 200,
      description: "Per Customer",
      gradient: "from-purple-500 to-purple-300",
    },
  ];

  return (
    <div>
      <AnalyticsHeading />
      <div className="grid grid-cols-4 gap-5 mb-10">
        {analyzeCards.map((ac, i) => (
          <Card className={`bg-gradient-to-br ${ac.gradient} py-9`} key={i}>
            <CardHeader>
              <CardTitle className="text-white font-semibold">
                {ac.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p className="text-white">{ac.value}</p>
                <p className="text-white">{ac.description}</p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <ChartLineLabel />
    </div>
  );
};

export default Analytics;
