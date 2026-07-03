import { api } from "@/lib/api"
import { ApiResponse, IAdminUser } from "@/types/index"

export const getUsers = async (): Promise<ApiResponse<IAdminUser[]>> => {
    return api<ApiResponse<IAdminUser[]>>("/admin/users")
}

export const createUser = async (data: Omit<IAdminUser, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse<IAdminUser>> => {
    return api<ApiResponse<IAdminUser>>("/admin/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateUser = async (id: string, data: Partial<IAdminUser>): Promise<ApiResponse<IAdminUser>> => {
    return api<ApiResponse<IAdminUser>>(`/admin/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteUser = async (id: string): Promise<ApiResponse<null>> => {
    return api<ApiResponse<null>>(`/admin/users/${id}`, {
        method: "DELETE",
    });
};
