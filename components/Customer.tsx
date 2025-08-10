"use client";
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
import { customerSchema, customerSchemaType } from "@/lib/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TableHeadersContent = [
  "Name",
  "Contact",
  "Status",
  "Date",
  "Time",
  "Actions",
];

const Customer = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<customerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      status: "Waiting",
      weight: 0,
      loads: 0,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: customerSchemaType) => {
    console.log(data);
    reset();
  };

  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Customer Name </label>
              <input
                className="w-full outline rounded-lg px-3 py-1.5 bg-white"
                type="text"
                placeholder="Enter Customer Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Customer Phone Number </label>
              <input
                className="w-full outline rounded-lg px-3 py-1.5 bg-white"
                type="text"
                placeholder="Enter Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <div className="flex flex-col gap-3">
                <label className="font-semibold"> Initial Status </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select Status"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem
                            className="cursor-pointer"
                            value="Waiting"
                          >
                            Waiting
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="OnProcess"
                          >
                            In Process
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Done">
                            Done
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Weight </label>
              <input
                className="w-full outline rounded-lg px-3 py-1.5 bg-white"
                type="number"
                placeholder="Enter Weight"
                {...register("weight", { valueAsNumber: true })}
              />
              {errors.weight && (
                <p className="text-sm text-red-500">{errors.weight.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Loads </label>
              <input
                type="number"
                className="w-full outline rounded-lg px-3 py-1.5 bg-white"
                placeholder="Enter Loads"
                {...register("loads", { valueAsNumber: true })}
              />
              {errors.loads && (
                <p className="text-sm text-red-500">{errors.loads.message}</p>
              )}
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
