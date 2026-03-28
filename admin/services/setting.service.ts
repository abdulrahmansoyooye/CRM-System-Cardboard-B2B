import { api } from "@/lib/api";

export const getSettings = async () => {
  return api("/settings");
};

export const updateSettings = async (id: string, data: any) => {
  return api(`/admin/settings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const createSettings = async (data: any) => {
  return api("/admin/settings", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
