import { api } from "@/lib/api"
import { ApiResponse, ICategory } from "@/types/index"

export const getCategories = async (): Promise<ApiResponse<ICategory[]>> => {
    return api<ApiResponse<ICategory[]>>("/categories")
}

export const createCategory = async (data: Omit<ICategory, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<ICategory>> => {
    return api<ApiResponse<ICategory>>("/admin/categories", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateCategory = async (id: string, data: Partial<ICategory>): Promise<ApiResponse<ICategory>> => {
    return api<ApiResponse<ICategory>>(`/admin/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteCategory = async (id: string): Promise<ApiResponse<null>> => {
    return api<ApiResponse<null>>(`/admin/categories/${id}`, {
        method: "DELETE",
    });
};
