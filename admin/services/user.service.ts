import { api } from "@/lib/api"

export const getUsers = async () => {
    return api("/admin/users")
}

export const createUser = async (data: any) => {
    return api("/admin/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateUser = async (id: string, data: any) => {
    return api(`/admin/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteUser = async (id: string) => {
    return api(`/admin/users/${id}`, {
        method: "DELETE",
    });
};
