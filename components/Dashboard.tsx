"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useCustomers } from "@/hooks/useCustomer";
import { Customer } from "@prisma/client";

const Dashboard = () => {
  const { data } = useCustomers({ preset: "today" });

  const todayCustomers = data?.length;
  const waitingOrders = data?.filter(
    (d: Customer) => d.status === "Waiting"
  ).length;
  const processingOrders = data?.filter(
    (d: Customer) => d.status === "OnProcess"
  ).length;
  const doneOrders = data?.filter((d: Customer) => d.status === "Done").length;
  const grossIncome = data?.reduce(
    (acc: number, d: Customer) => acc + d.price,
    0
  );
  const todayLoads = data?.reduce(
    (acc: number, d: Customer) => acc + d.loads,
    0
  );

  const dashboardData = [
    {
      title: "Todays Customers",
      value: todayCustomers,
      gradient: "from-blue-600 to-indigo-400",
    },
    {
      title: "Todays Loads",
      value: todayLoads,
      gradient: "from-teal-600 to-cyan-400",
    },
    {
      title: "Gross Income",
      value: "₱" + " " + grossIncome,
      gradient: "from-orange-500 to-red-300",
    },

    {
      title: "Waiting Orders",
      value: waitingOrders,
      gradient: "from-yellow-500 to-amber-300",
    },
    {
      title: "On Process Orders",
      value: processingOrders,
      gradient: "from-purple-500 to-pink-300",
    },
    {
      title: "Done Orders",
      value: doneOrders,
      gradient: "from-emerald-600 to-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {dashboardData.map((d, i) => (
        <Card className={`bg-gradient-to-br ${d.gradient} py-10`} key={i}>
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
