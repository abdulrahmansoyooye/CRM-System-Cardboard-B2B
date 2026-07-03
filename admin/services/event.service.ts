import { api } from "@/lib/api";
import { ApiResponse, IEvent } from "@/types/index";

export async function getEvents(): Promise<ApiResponse<IEvent[]>> {
  return await api<ApiResponse<IEvent[]>>("/events", {
    cache: "no-store",
    next: { tags: ["events"] },
  });
}

export async function getEventById(id: string): Promise<ApiResponse<IEvent>> {
  return await api<ApiResponse<IEvent>>(`/events/${id}`, {
    cache: "no-store",
    next: { tags: ["events"] },
  });
}

export async function createEvent(data: Partial<IEvent>): Promise<ApiResponse<IEvent>> {
  return await api<ApiResponse<IEvent>>("/admin/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEvent(id: string, data: Partial<IEvent>): Promise<ApiResponse<IEvent>> {
  return await api<ApiResponse<IEvent>>(`/admin/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: string): Promise<ApiResponse<null>> {
  return await api<ApiResponse<null>>(`/admin/events/${id}`, {
    method: "DELETE",
  });
}
