import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Input from "./Input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TableHeadersContent = [
  "Name",
  "Contact",
  "Status",
  "Date",
  "Time",
  "Actions",
];

const Customer = () => {
  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Customer Name </label>
              <Input placeholder="Enter Customer Name" />
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Customer Phone Number </label>
              <Input placeholder="Enter Phone Number" />
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-3">
                <label className="font-semibold"> Initial Status </label>
                <Select>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select Status"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem className="cursor-pointer" value="waiting">
                        Waiting
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="process">
                        In Process
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="done">
                        Done
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Weight </label>
              <Input placeholder="Enter Weight" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Loads </label>
              <Input placeholder="Enter Loads" />
            </div>
            <div className="col-span-2">
              <Button type="submit" className="w-full">
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Table className="my-15">
        <TableCaption>List of Customers for Today</TableCaption>
        <TableHeader>
          <TableRow>
            {TableHeadersContent.map((t, index) => (
              <TableHead className="text-center" key={index}>
                {t}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default Customer;
