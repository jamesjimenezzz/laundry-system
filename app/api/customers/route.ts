import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function phNow() {
  // Lumikha ng ISO string na naka-PH time
  const now = new Date();
  now.setHours(now.getHours() + 8 - now.getTimezoneOffset() / 60);
  return now;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const preset = searchParams.get("preset");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const startOf = (s: string) => new Date(`${s}T00:00:00.000`);
  const nextDay = (s: string) =>
    new Date(`${s}T00:00:00.000Z`).getTime() + 86400000;
  const endOf = (s: string) => new Date(`${s}T23:59:59.999`);
  const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const startDt = new Date(Date.now() - 6 * 86400000); // 7 days inclusive
  const startStr = startDt.toISOString().slice(0, 10);

  let where: any = {};

  try {
    if (start && end) {
      where = {
        createdAt: { gte: startOf(start), lt: new Date(endOf(end)) },
      };
    } else if (preset === "today") {
      const today = new Date().toISOString().slice(0, 10);
      where = {
        createdAt: { gte: startOf(today), lt: new Date(endOf(today)) },
      };
    } else {
      // default current 7 days
      where = {
        createdAt: {
          gte: startOf(startStr),
          lte: endOf(todayStr),
        },
      };
    }

    const customer = await prisma.customer.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customer);
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
        createdAt: phNow(),
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
