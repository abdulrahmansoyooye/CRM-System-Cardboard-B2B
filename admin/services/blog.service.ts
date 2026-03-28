import { api } from "@/lib/api";

export const getBlogs = async () => {
  return api("/blogs");
};

export const createBlog = async (data: any) => {
  return api("/admin/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateBlog = async (id: string, data: any) => {
  return api(`/admin/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteBlog = async (id: string) => {
  return api(`/admin/blogs/${id}`, {
    method: "DELETE",
  });
};
