import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();

    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        phone: body.phone,
        status: body.status,
        weight: body.weight,
        loads: body.loads,
        price: body.price,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
