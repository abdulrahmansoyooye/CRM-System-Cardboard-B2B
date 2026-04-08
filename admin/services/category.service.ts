import { api } from "@/lib/api"

export const getCategories = async () => {
    return api("/categories")
}

export const createCategory = async (data: any) => {
    return api("/admin/categories", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateCategory = async (id: string, data: any) => {
    return api(`/admin/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteCategory = async (id: string) => {
    return api(`/admin/categories/${id}`, {
        method: "DELETE",
    });
};
