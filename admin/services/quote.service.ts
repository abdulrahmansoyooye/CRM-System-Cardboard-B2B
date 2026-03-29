import { api } from "@/lib/api";

export const quoteService = {
  getAll: (params?: any) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return api(`/quote${query}`);
  },
  getOne: (id: string) => api(`/quote/${id}`),
  updateStatus: (id: string, status: string) => 
    api(`/quote/${id}/status`, { 
      method: "PATCH", 
      body: JSON.stringify({ status }) 
    }),
  delete: (id: string) => api(`/quote/${id}`, { method: "DELETE" }),
  addNote: (id: string, note: string) => 
    api(`/quote/${id}/notes`, { 
      method: "POST", 
      body: JSON.stringify({ note }) 
    }),
};
