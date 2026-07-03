import { api } from "@/lib/api";
import { ApiResponse, IAsset } from "@/types/index";

export const getAssets = async (): Promise<ApiResponse<IAsset[]>> => {
  return api<ApiResponse<IAsset[]>>("/assets");
};

export const createAsset = async (data: Omit<IAsset, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IAsset>> => {
  return api<ApiResponse<IAsset>>("/admin/assets", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteAsset = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/assets/${id}`, {
    method: "DELETE",
  });
};
