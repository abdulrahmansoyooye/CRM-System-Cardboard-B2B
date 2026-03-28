import { api } from "@/lib/api";

export const getTestimonials = async () => {
  return api("/testimonials");
};

export const createTestimonial = async (data: any) => {
  return api("/admin/testimonials", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTestimonial = async (id: string, data: any) => {
  return api(`/admin/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteTestimonial = async (id: string) => {
  return api(`/admin/testimonials/${id}`, {
    method: "DELETE",
  });
};
