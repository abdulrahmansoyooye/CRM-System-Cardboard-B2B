import { api } from "@/lib/api";
import { ApiResponse, ITestimonial } from "@/types/index";

export const getTestimonials = async (): Promise<ApiResponse<ITestimonial[]>> => {
  return api<ApiResponse<ITestimonial[]>>("/testimonials");
};

export const createTestimonial = async (data: Omit<ITestimonial, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<ITestimonial>> => {
  return api<ApiResponse<ITestimonial>>("/admin/testimonials", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTestimonial = async (id: string, data: Partial<ITestimonial>): Promise<ApiResponse<ITestimonial>> => {
  return api<ApiResponse<ITestimonial>>(`/admin/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteTestimonial = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/testimonials/${id}`, {
    method: "DELETE",
  });
};
