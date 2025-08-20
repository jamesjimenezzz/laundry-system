import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Dashboard = () => {
  const dashboardData = [
    {
      title: "Todays Customers",
      value: 12,
      gradient: "from-blue-600 to-indigo-400",
    },
    {
      title: "Waiting Orders",
      value: 12,
      gradient: "from-yellow-500 to-amber-300",
    },
    {
      title: "On Process Orders",
      value: 12,
      gradient: "from-purple-500 to-pink-300",
    },
    {
      title: "Done Orders",
      value: 12,
      gradient: "from-emerald-600 to-green-400",
    },
    {
      title: "Gross Income",
      value: 12,
      gradient: "from-orange-500 to-red-300",
    },
    {
      title: "Approximate Net Income",
      value: 12,
      gradient: "from-teal-600 to-cyan-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {dashboardData.map((d, i) => (
        <Card className={`bg-gradient-to-br ${d.gradient}`} key={i}>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold text-white">{d.title}</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex flex-col gap-2">
              <p className="font-bold text-3xl text-white">{d.value}</p>
              <p className="text-sm text-white ">
                <span className="bg-gray-200 text-gray-500 rounded-lg py-0.5 px-2 font-semibold">
                  +4
                </span>{" "}
                vs yesterday
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
