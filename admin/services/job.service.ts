import { api } from "@/lib/api";
import { ApiResponse, IJob } from "@/types/index";

export const getJobs = async (): Promise<ApiResponse<IJob[]>> => {
  return api<ApiResponse<IJob[]>>("/jobs");
};

export const createJob = async (data: Omit<IJob, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IJob>> => {
  return api<ApiResponse<IJob>>("/admin/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateJob = async (id: string, data: Partial<IJob>): Promise<ApiResponse<IJob>> => {
  return api<ApiResponse<IJob>>(`/admin/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteJob = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/jobs/${id}`, {
    method: "DELETE",
  });
};
