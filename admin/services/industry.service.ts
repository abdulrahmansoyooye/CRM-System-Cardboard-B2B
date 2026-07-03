import { api } from "@/lib/api";
import { ApiResponse, IIndustry } from "@/types/index";

export const getIndustries = async (): Promise<ApiResponse<IIndustry[]>> => {
  return api<ApiResponse<IIndustry[]>>("/industries");
};

export const createIndustry = async (data: Omit<IIndustry, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IIndustry>> => {
  return api<ApiResponse<IIndustry>>("/admin/industries", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateIndustry = async (id: string, data: Partial<IIndustry>): Promise<ApiResponse<IIndustry>> => {
  return api<ApiResponse<IIndustry>>(`/admin/industries/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteIndustry = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/industries/${id}`, {
    method: "DELETE",
  });
};
