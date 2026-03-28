import { api } from "@/lib/api";

export const getApplications = async () => {
  return api("/admin/applications");
};

export const updateApplication = async (id: string, data: any) => {
  return api(`/admin/applications/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteApplication = async (id: string) => {
  return api(`/admin/applications/${id}`, {
    method: "DELETE",
  });
};
