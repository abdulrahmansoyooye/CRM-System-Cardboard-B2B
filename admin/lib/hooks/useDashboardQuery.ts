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

const revalidateWebCache = async (tags: string[]) => {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
  const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;
  if (!webUrl || !secret) return;

  try {
    await fetch(`${webUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags, secret }),
    });
  } catch {}
};

export function useDashboardMutation<TVariables, TData = unknown, TError = unknown>(
  mutationFn: (data: TVariables) => Promise<TData>,
  successMessage: string,
  queryKeyToInvalidate: string[][],
  cacheTags?: string[]
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryKeyToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      if (cacheTags) revalidateWebCache(cacheTags);
      toast.success(successMessage);
    },
    onError: (error: TError) => {
      toast.error(getErrorMessage(error));
      console.error(error);
    },
  });
}
