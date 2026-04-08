import { api } from "@/lib/api";

export const quoteService = {
  getAll: (params?: any) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return api(`/admin/quotes${query}`);
  },
  getOne: (id: string) => api(`/admin/quotes/${id}`),
  updateStatus: (id: string, status: string) => 
    api(`/admin/quotes/${id}`, { 
      method: "PUT", 
      body: JSON.stringify({ status }) 
    }),
  delete: (id: string) => api(`/admin/quotes/${id}`, { method: "DELETE" }),
  addNote: (id: string, note: string) => 
    api(`/admin/quotes/${id}`, { 
      method: "PUT", 
      body: JSON.stringify({ notes: note }) 
    }),
};
