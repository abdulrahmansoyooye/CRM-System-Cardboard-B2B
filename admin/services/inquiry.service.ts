import { api } from "@/lib/api";
import { ApiResponse, IInquiry } from "@/types/index";

export const getInquiries = async (): Promise<ApiResponse<IInquiry[]>> => {
  return api<ApiResponse<IInquiry[]>>("/admin/inquiries");
};

export const createInquiry = async (data: Omit<IInquiry, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IInquiry>> => {
  return api<ApiResponse<IInquiry>>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateInquiry = async (id: string, data: Partial<IInquiry>): Promise<ApiResponse<IInquiry>> => {
  return api<ApiResponse<IInquiry>>(`/admin/inquiries/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteInquiry = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/inquiries/${id}`, {
    method: "DELETE",
  });
};
