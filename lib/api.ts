import { customerSchemaType } from "./schema";

export async function getCustomers(params?: {
  preset?: string;
  start?: string;
  end?: string;
}) {
  const query = new URLSearchParams();

  try {
    if (params?.preset) query.set("preset", params.preset);
    if (params?.start) query.set("start", params.start);
    if (params?.end) query.set("end", params.end);

    const url = query.toString()
      ? `/api/customers?${query.toString()} `
      : `/api/customers`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function insertCustomer(data: customerSchemaType) {
  try {
    const res = await fetch(`/api/customers`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
