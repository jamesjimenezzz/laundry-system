import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <Card className="gap-2" key={i}>
          <CardHeader>
            <CardTitle>
              <h1 className="text-xl">Today Customers</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex flex-col gap-2">
              <p className="font-bold text-3xl">12</p>
              <p className="text-sm">
                <span className="bg-gray-200 rounded-lg py-0.5 px-2 font-semibold">
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
