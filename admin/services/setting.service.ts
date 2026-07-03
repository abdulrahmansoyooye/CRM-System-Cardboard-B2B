import { api } from "@/lib/api";
import { ApiResponse, ISettings } from "@/types/index";

export const getSettings = async (): Promise<ApiResponse<ISettings[]>> => {
  return api<ApiResponse<ISettings[]>>("/settings");
};

export const updateSettings = async (id: string, data: Partial<ISettings>): Promise<ApiResponse<ISettings>> => {
  return api<ApiResponse<ISettings>>(`/admin/settings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const createSettings = async (data: Omit<ISettings, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<ISettings>> => {
  return api<ApiResponse<ISettings>>("/admin/settings", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
