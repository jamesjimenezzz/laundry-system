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
