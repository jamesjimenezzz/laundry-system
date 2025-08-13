import { insertCustomer, getCustomers } from "@/lib/api";
import { customerSchemaType } from "@/lib/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCustomers(params?: {
  preset?: string;
  start?: string;
  end?: string;
}) {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
  });
}

export function useAddCustomer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: customerSchemaType) => insertCustomer(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
