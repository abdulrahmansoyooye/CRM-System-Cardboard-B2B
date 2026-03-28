import { api } from "@/lib/api";

export const getIndustries = async () => {
  return api("/industries");
};

export const createIndustry = async (data: any) => {
  return api("/admin/industries", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateIndustry = async (id: string, data: any) => {
  return api(`/admin/industries/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteIndustry = async (id: string) => {
  return api(`/admin/industries/${id}`, {
    method: "DELETE",
  });
};
