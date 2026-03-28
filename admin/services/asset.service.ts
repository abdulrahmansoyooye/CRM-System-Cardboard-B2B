import { api } from "@/lib/api";

export const getAssets = async () => {
  return api("/assets");
};

export const createAsset = async (data: any) => {
  return api("/admin/assets", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteAsset = async (id: string) => {
  return api(`/admin/assets/${id}`, {
    method: "DELETE",
  });
};
