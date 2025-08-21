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
import { useCustomers, useUpdateCustomer } from "@/hooks/useCustomer";
import { Customer, type Customer as CustomerType } from "@prisma/client";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { Check } from "lucide-react";
import { useDeleteCustomer } from "@/hooks/useCustomer";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TableCustomers = () => {
  const [editingId, setEditingId] = useState<null | string>(null);
  const [dataEdit, setDataEdit] = useState<Partial<CustomerType>>({});
  const { mutate: update, isPending } = useUpdateCustomer();
  const [query, setQuery] = useState("");

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
    if (
      !editingId ||
      !dataEdit.name?.trim() ||
      !dataEdit.phone?.trim() ||
      !dataEdit.status?.trim() ||
      (dataEdit?.weight ?? 0) <= 0 ||
      (dataEdit?.loads ?? 0) <= 0 ||
      (dataEdit?.price ?? 0) <= 0
    ) {
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

  const { data } = useCustomers({ preset: "today" });
  const { mutate } = useDeleteCustomer();

  const results = data?.filter((d: Customer) =>
    d.name.toLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <>
      <div className="mt-15 mb-2">
        <p className="font-semibold">Today's Customers</p>
        <div className="relative">
          <Search
            className=" absolute ml-3  bottom-2 text-muted-foreground"
            size={15}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white w-full outline-gray-200 outline text-sm pl-8 rounded-lg py-1.5"
            type="text"
          />
        </div>
      </div>
      <Table className="">
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
          {results?.map((d: CustomerType) => (
            <TableRow key={d.id}>
              {editingId !== d.id ? (
                <>
                  <TableCell className="text-center"> {d.name} </TableCell>
                  <TableCell className="text-center"> {d.phone} </TableCell>
                  <TableCell
                    className={`text-center font-semibold ${
                      d.status === "Waiting"
                        ? `text-yellow-500`
                        : d.status === "OnProcess"
                        ? "text-blue-500"
                        : d.status === "Done"
                        ? "text-green-600"
                        : ""
                    }`}
                  >
                    {" "}
                    {d.status === "OnProcess" ? "On Process" : d.status}{" "}
                  </TableCell>
                  <TableCell className="text-center"> {d.weight} </TableCell>
                  <TableCell className="text-center"> {d.loads} </TableCell>
                  <TableCell className="text-center"> {d.price} </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="text-center p-0">
                    {" "}
                    <input
                      className="outline w-40 text-center "
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
                      className="outline text-center  "
                      defaultValue={d.phone}
                      onChange={(e) =>
                        setDataEdit((s) => ({ ...s, phone: e.target.value }))
                      }
                      type="text"
                    />{" "}
                  </TableCell>
                  <TableCell className="text-center">
                    <Select
                      onValueChange={(value: CustomerType["status"]) =>
                        setDataEdit((s) => ({ ...s, status: value }))
                      }
                      defaultValue={`${d.status}`}
                    >
                      <SelectTrigger size="sm" className=" cursor-pointer">
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
                            On Process
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Done">
                            Done
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <input
                      className="outline text-center w-24 "
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
                      className="outline text-center w-24 "
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
                  <TableCell className="text-center ">
                    {" "}
                    <input
                      className="outline text-center w-24"
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

export default TableCustomers;
