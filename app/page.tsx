import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import Customer from "@/components/Customer";
import Analytics from "@/components/Analytics";
import AllCustomers from "@/components/AllCustomers";
import { Users } from "lucide-react";
import { CircleGauge } from "lucide-react";

import { Calendar } from "lucide-react";
import { ChartLine } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-7xl my-10 mx-auto">
      <Tabs className="" defaultValue="dashboard">
        <TabsList className="gap-3 py-6.5 bg-gray-50 shadow-md   w-full ">
          <TabsTrigger
            className="py-4.5 cursor-pointer data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            value="dashboard"
          >
            <CircleGauge /> Dashboard
          </TabsTrigger>
          <TabsTrigger
            className="py-4.5 cursor-pointer data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            value="customer-entry"
          >
            <Users /> Customer Entry
          </TabsTrigger>
          <TabsTrigger
            className="py-4.5 cursor-pointer data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            value="customer-all"
          >
            <Calendar /> All Customers
          </TabsTrigger>
          <TabsTrigger
            className="py-4.5 cursor-pointer data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            value="analytics"
          >
            <ChartLine /> Analytics
          </TabsTrigger>
        </TabsList>
        <div className="my-10">
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="customer-entry">
            <Customer />
          </TabsContent>
          <TabsContent value="customer-all">
            <AllCustomers />
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Home;
