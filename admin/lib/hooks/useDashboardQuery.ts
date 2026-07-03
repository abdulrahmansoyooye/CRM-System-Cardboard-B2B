import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }

  return "Operation failed";
};

export function useDashboardQuery<TQueryFnData, TData = TQueryFnData, TError = Error>(
  queryKey: readonly string[],
  fetchFn: () => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, readonly string[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
    ...options,
  });
}

export function useDashboardMutation<TVariables, TData = unknown, TError = unknown>(
  mutationFn: (data: TVariables) => Promise<TData>,
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
    onError: (error: TError) => {
      toast.error(getErrorMessage(error));
      console.error(error);
    },
  });
}
