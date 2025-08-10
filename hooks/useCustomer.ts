import { insertCustomer } from "@/lib/api";
import { customerSchemaType } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddCustomer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: customerSchemaType) => insertCustomer(data),
  });
}
