import { api } from "@/lib/api";
import { ApiResponse, PaginationParams, IQuote } from "@/types/index";

export const quoteService = {
  getAll: (params?: PaginationParams): Promise<ApiResponse<IQuote[]>> => {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        ).toString()}`
      : "";
    return api<ApiResponse<IQuote[]>>(`/admin/quotes${query}`);
  },
  getOne: (id: string): Promise<ApiResponse<IQuote>> => api<ApiResponse<IQuote>>(`/admin/quotes/${id}`),
  updateStatus: (id: string, status: NonNullable<IQuote["status"]>): Promise<ApiResponse<IQuote>> => 
    api<ApiResponse<IQuote>>(`/admin/quotes/${id}`, { 
      method: "PUT", 
      body: JSON.stringify({ status }) 
    }),
  delete: (id: string): Promise<ApiResponse<null>> => api<ApiResponse<null>>(`/admin/quotes/${id}`, { method: "DELETE" }),
  addNote: (id: string, note: string): Promise<ApiResponse<IQuote>> => 
    api<ApiResponse<IQuote>>(`/admin/quotes/${id}`, { 
      method: "PUT", 
      body: JSON.stringify({ notes: note }) 
    }),
};
