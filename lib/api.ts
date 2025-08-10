import { customerSchemaType } from "./schema";

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
