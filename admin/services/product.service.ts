import { api } from "@/lib/api"
import { ApiResponse, IProduct } from "@/types/index"

export const getProducts = async(): Promise<ApiResponse<IProduct[]>> => {
    return api<ApiResponse<IProduct[]>>("/products")
}

export const createProduct = async (data: Omit<IProduct, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IProduct>> => {
    return api<ApiResponse<IProduct>>("/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateProduct = async (id: string, data: Partial<IProduct>): Promise<ApiResponse<IProduct>> => {
    return api<ApiResponse<IProduct>>(`/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteProduct = async (id: string): Promise<ApiResponse<null>> => {
    return api<ApiResponse<null>>(`/admin/products/${id}`, {
        method: "DELETE",
    });
};
