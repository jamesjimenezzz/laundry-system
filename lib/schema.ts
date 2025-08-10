import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required."),
  phone: z
    .string()
    .min(7, "Enter a valid phone number.")
    .regex(/^[0-9+\-\s()]*$/, "Digits and + - ( ) only"),
  status: z.enum(["Waiting", "OnProcess", "Done"], {
    message: "Invalid Status",
  }),
  weight: z.number().positive("Weight must be > 0"),
  loads: z.number().int().min(1, "At least 1 load"),
});

export type customerSchemaType = z.infer<typeof customerSchema>;
