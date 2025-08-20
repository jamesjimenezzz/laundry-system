import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import Customer from "@/components/Customer";
import Analytics from "@/components/Analytics";
import AllCustomers from "@/components/AllCustomers";

const Home = () => {
  return (
    <div className="max-w-7xl my-10 mx-auto">
      <Tabs className="" defaultValue="dashboard">
        <TabsList className="gap-3   w-full ">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="customer-entry">Customer Entry</TabsTrigger>
          <TabsTrigger value="customer-all">All Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
