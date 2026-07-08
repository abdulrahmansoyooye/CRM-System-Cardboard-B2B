import { fetchJson, postJson } from "./client";
import { TJob } from "@/types";

export async function getJobs(): Promise<TJob[]> {
  return fetchJson<TJob[]>("/jobs", undefined, ["jobs"]);
}

export async function getJobById(id: string): Promise<TJob> {
  return fetchJson<TJob>(`/jobs/${id}`, undefined, ["jobs"]);
}

export async function submitApplication(data: unknown) {
  return postJson("/jobs/apply", data);
}
