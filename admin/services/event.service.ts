import { api } from "@/lib/api";

export async function getEvents() {
  return await api("/events", {
    cache: "no-store",
    next: { tags: ["events"] },
  });
}

export async function getEventById(id: string) {
  return await api(`/events/${id}`, {
    cache: "no-store",
    next: { tags: ["events"] },
  });
}

export async function createEvent(data: Partial<Event>) {
  return await api("/admin/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEvent(id: string, data: Partial<Event>) {
  return await api(`/admin/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: string) {
  return await api(`/admin/events/${id}`, {
    method: "DELETE",
  });
}
