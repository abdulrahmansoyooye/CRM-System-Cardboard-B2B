import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDashboardQuery<T>(
  queryKey: string[],
  fetchFn: () => Promise<any>,
  options = {}
) {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
    ...options,
  });
}

export function useDashboardMutation<T>(
  mutationFn: (data: T) => Promise<any>,
  successMessage: string,
  queryKeyToInvalidate: string[][]
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryKeyToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      toast.success(successMessage);
    },
    onError: (error: any) => {
      toast.error(error.message || "Operation failed");
      console.error(error);
    },
  });
}
