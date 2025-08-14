import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "No ID Found." });
  }
  try {
    const customers = await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Customer not found" });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "No ID Found." });
  }
  try {
    const body = await req.json();
    const customers = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        phone: body.phone,
        status: body.status,
        weight: body.weight,
        loads: body.loads,
        price: body.price,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed PATCH" });
  }
}
