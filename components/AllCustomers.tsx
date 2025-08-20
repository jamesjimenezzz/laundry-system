"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCustomers, useUpdateCustomer } from "@/hooks/useCustomer";
import { type Customer as CustomerType } from "@prisma/client";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { Check } from "lucide-react";
import { useDeleteCustomer } from "@/hooks/useCustomer";
import { Button } from "./ui/button";
import AllCustomersHeading from "./ui/customersheading";

const AllCustomers = () => {
  const [editingId, setEditingId] = useState<null | string>(null);
  const [dataEdit, setDataEdit] = useState<Partial<CustomerType>>({});
  const { mutate: update, isPending } = useUpdateCustomer();
  const [range, setRange] = useState<DateRange | undefined>();

  const handleToday = () => {
    const today = new Date();

    setRange({ from: today, to: today });
  };

  const handle7Days = () => {
    const today = new Date();
    const sevenDays = new Date();
    sevenDays.setDate(today.getDate() - 6);

    setRange({ from: sevenDays, to: today });
  };

  const handle30Days = () => {
    const today = new Date();
    const thirthyDays = new Date();
    thirthyDays.setDate(today.getDate() - 31);

    setRange({ from: thirthyDays, to: today });
  };

  const handleEdit = (row: CustomerType) => {
    setEditingId(row.id);
    setDataEdit({
      name: row.name,
      phone: row.phone,
      status: row.status,
      weight: row.weight,
      loads: row.loads,
      price: row.price,
    });
  };

  const saveEdit = () => {
    if (!editingId) {
      return;
    }

    const payload = {
      id: editingId,
      name: dataEdit.name ?? "",
      phone: dataEdit.phone ?? "",
      status: dataEdit.status as CustomerType["status"],
      weight: Number(dataEdit.weight ?? 0),
      loads: Number(dataEdit.loads ?? 0),
      price: Number(dataEdit.price ?? 0),
    };

    update({ id: editingId, payload });

    setEditingId(null);
  };

  const TableHeadersContent = [
    "Name",
    "Contact",
    "Status",
    "Weight",
    "Loads",
    "Price",
    "Date",
    "Time",
  ];

  const { data } = useCustomers(
    range?.from && range?.to
      ? {
          start: `${range?.from?.toISOString()}`,
          end: `${range?.to?.toISOString()}`,
        }
      : { preset: "all" }
  );

  const { mutate } = useDeleteCustomer();

  console.log(range?.from?.toISOString());
  console.log(range?.to?.toISOString());

  return (
    <>
      <AllCustomersHeading />
      <div>
        <div className=" flex font-semibold gap-2 my-2">
          <Filter size={20} />
          Filter Dates
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-[#5995F7]">
              <CalendarIcon />
              {!range ? (
                "No selected dates"
              ) : (
                <div className="flex gap-2 text-sm ">
                  <p>
                    {range?.from?.toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    }) || "No selected date"}
                  </p>
                  <p>-</p>
                  <p>
                    {range?.to?.toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex">
              {/* Picker  */}
              <Calendar
                mode="range"
                numberOfMonths={1}
                selected={range}
                onSelect={setRange}
              />
              <div className="w-full flex flex-col gap-3 text-center">
                <Button onClick={handleToday} className="cursor-pointer">
                  Today
                </Button>
                <Button onClick={handle7Days} className="cursor-pointer">
                  Last 7 days
                </Button>
                <Button onClick={handle30Days} className="cursor-pointer">
                  Last 30 days
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Table className="my-5">
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
        <TableBody>
          {data?.map((d: CustomerType) => (
            <TableRow key={d.id}>
              {editingId !== d.id ? (
                <>
                  <TableCell className="text-center"> {d.name} </TableCell>
                  <TableCell className="text-center"> {d.phone} </TableCell>
                  <TableCell className="text-center"> {d.status} </TableCell>
                  <TableCell className="text-center"> {d.weight} </TableCell>
                  <TableCell className="text-center"> {d.loads} </TableCell>
                  <TableCell className="text-center"> {d.price} </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="text-center p-0">
                    {" "}
                    <input
                      className="outline text-center "
                      defaultValue={d.name}
                      onChange={(e) =>
                        setDataEdit((s) => ({ ...s, name: e.target.value }))
                      }
                      type="text"
                    />{" "}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <input
                      className="outline text-center "
                      defaultValue={d.phone}
                      onChange={(e) =>
                        setDataEdit((s) => ({ ...s, phone: e.target.value }))
                      }
                      type="text"
                    />{" "}
                  </TableCell>
                  <TableCell className="text-center"> editing </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <input
                      className="outline text-center "
                      defaultValue={d.weight}
                      onChange={(e) =>
                        setDataEdit((s) => ({
                          ...s,
                          weight: Number(e.target.value),
                        }))
                      }
                      type="number"
                    />{" "}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <input
                      className="outline text-center "
                      defaultValue={d.loads}
                      onChange={(e) =>
                        setDataEdit((s) => ({
                          ...s,
                          loads: Number(e.target.value),
                        }))
                      }
                      type="number"
                    />{" "}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <input
                      className="outline text-center "
                      defaultValue={d.price}
                      onChange={(e) =>
                        setDataEdit((s) => ({
                          ...s,
                          price: Number(e.target.value),
                        }))
                      }
                      type="number"
                    />{" "}
                  </TableCell>
                </>
              )}

              <TableCell className="text-center">
                {" "}
                {new Date(d.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}{" "}
              </TableCell>
              <TableCell className="text-center">
                {" "}
                {new Date(d.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              </TableCell>
              <TableCell>
                <Trash
                  className="cursor-pointer"
                  onClick={() => mutate(d.id)}
                  size={18}
                />
              </TableCell>
              <TableCell>
                {editingId !== d.id ? (
                  <Pencil
                    className="cursor-pointer"
                    onClick={() => handleEdit(d)}
                    size={18}
                  />
                ) : (
                  <Check
                    className="cursor-pointer"
                    size={18}
                    onClick={() => saveEdit()}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AllCustomers;
