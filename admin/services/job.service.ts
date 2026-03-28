import { api } from "@/lib/api";

export const getJobs = async () => {
  return api("/jobs");
};

export const createJob = async (data: any) => {
  return api("/admin/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateJob = async (id: string, data: any) => {
  return api(`/admin/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteJob = async (id: string) => {
  return api(`/admin/jobs/${id}`, {
    method: "DELETE",
  });
};
