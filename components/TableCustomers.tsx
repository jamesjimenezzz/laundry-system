import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomers } from "@/hooks/useCustomer";
import { type Customer as CustomerType } from "@prisma/client";

const TableCustomers = () => {
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

  const { data } = useCustomers();

  return (
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
      <TableBody>
        {data?.map((d: CustomerType) => (
          <TableRow key={d.id}>
            <TableCell className="text-center"> {d.name} </TableCell>
            <TableCell className="text-center"> {d.phone} </TableCell>
            <TableCell className="text-center"> {d.status} </TableCell>
            <TableCell className="text-center"> {d.weight} </TableCell>
            <TableCell className="text-center"> {d.loads} </TableCell>
            <TableCell className="text-center"> {d.price} </TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableCustomers;
