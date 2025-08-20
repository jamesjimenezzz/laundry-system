"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
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
import { useAddCustomer } from "@/hooks/useCustomer";
import TableCustomers from "./TableCustomers";
import { Users } from "lucide-react";
import { CirclePlus } from "lucide-react";

const Customer = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<customerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      status: "Waiting",
      weight: 0,
      loads: 0,
      price: 0,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { mutate } = useAddCustomer();

  const onSubmit = (data: customerSchemaType) => {
    mutate(data);
    console.log(data);
    reset();
  };

  return (
    <div className="mb-20">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-xl flex gap-3.5">
            <div className="bg-blue-200 rounded-md p-1.5">
              <Users className="text-blue-500" size={20} />
            </div>{" "}
            Add New Customer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Customer Name </label>
              <input
                className="w-full outline outline-gray-200 rounded-lg px-3 py-1.5 bg-white"
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
                className="w-full outline outline-gray-200 rounded-lg px-3 py-1.5 bg-white"
                type="text"
                placeholder="Enter Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="">
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
                className="w-full outline-gray-200 outline rounded-lg px-3 py-1.5 bg-white"
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
                className="w-full outline rounded-lg outline-gray-200 px-3 py-1.5 bg-white"
                placeholder="Enter Loads"
                {...register("loads", { valueAsNumber: true })}
              />
              {errors.loads && (
                <p className="text-sm text-red-500">{errors.loads.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold"> Price </label>
              <input
                type="number"
                className="w-full outline rounded-lg outline-gray-200 px-3 py-1.5 bg-white"
                placeholder="Enter Price"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#5995F7]"
              >
                <CirclePlus /> Add Customer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <TableCustomers />
    </div>
  );
};

export default Customer;
