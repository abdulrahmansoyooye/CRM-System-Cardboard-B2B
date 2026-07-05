import { api } from "@/lib/api";
import { ApiResponse, IJobApplication } from "@/types/index";

export const getApplications = async (): Promise<ApiResponse<IJobApplication[]>> => {
  return api<ApiResponse<IJobApplication[]>>("/admin/applications");
};

export const updateApplication = async (
  id: string,
  data: Omit<Partial<IJobApplication>, "status"> & { status?: string }
): Promise<ApiResponse<IJobApplication>> => {
  return api<ApiResponse<IJobApplication>>(`/admin/applications/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteApplication = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/applications/${id}`, {
    method: "DELETE",
  });
};
