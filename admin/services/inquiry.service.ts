import { api } from "@/lib/api";

export const getInquiries = async () => {
  return api("/admin/inquiries");
};

export const createInquiry = async (data: any) => {
  return api("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateInquiry = async (id: string, data: any) => {
  return api(`/admin/inquiries/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteInquiry = async (id: string) => {
  return api(`/admin/inquiries/${id}`, {
    method: "DELETE",
  });
};
