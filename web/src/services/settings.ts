import { fetchJson } from "./client";
import { TSettings } from "@/types";

export async function getSettings(): Promise<TSettings[]> {
  return fetchJson<TSettings[]>("/settings", undefined, ["settings"]);
}
