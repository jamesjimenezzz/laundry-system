import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const preset = searchParams.get("preset");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const today = new Date();
  const startDay = new Date(today.setHours(0, 0, 0, 0));
  const endDay = new Date(today.setHours(23, 59, 59, 999));
  const sevenDaysRange = new Date();
  sevenDaysRange.setDate(today.getDate() - 6);
  sevenDaysRange.setHours(0, 0, 0, 0);
  const startFixed = startOfDay(start!);
  const endFixed = endOfDay(end!);

  let where = {};

  try {
    if (start && end) {
      where = {
        createdAt: { gte: new Date(startFixed), lte: new Date(endFixed) },
      };
    } else if (preset === "7days") {
      where = {
        createdAt: { gte: sevenDaysRange, lt: endDay },
      };
    } else if (preset === "today") {
      where = {
        createdAt: { gte: startDay, lt: endDay },
      };
    } else {
      where = {};
    }

    const customers = await prisma.customer.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to GET request" });
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
