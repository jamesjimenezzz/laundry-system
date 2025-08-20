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

export default TableCustomers;
