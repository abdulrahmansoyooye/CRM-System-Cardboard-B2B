import { api } from "@/lib/api";
import { ApiResponse, IBlog } from "@/types/index";

export const getBlogs = async (): Promise<ApiResponse<IBlog[]>> => {
  return api<ApiResponse<IBlog[]>>("/blogs");
};

export const createBlog = async (data: Omit<IBlog, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IBlog>> => {
  return api<ApiResponse<IBlog>>("/admin/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateBlog = async (id: string, data: Partial<IBlog>): Promise<ApiResponse<IBlog>> => {
  return api<ApiResponse<IBlog>>(`/admin/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteBlog = async (id: string): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>(`/admin/blogs/${id}`, {
    method: "DELETE",
  });
};
