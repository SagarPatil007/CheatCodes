import type { Topic, TopicSummary } from "./types";

const API = process.env.API_URL ?? "http://localhost:8080";

// no-store: new topic files appear immediately, no rebuild needed
export async function getTopics(): Promise<TopicSummary[]> {
  try {
    const res = await fetch(`${API}/api/topics`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function getTopic(slug: string): Promise<Topic | null> {
  try {
    const res = await fetch(`${API}/api/topics/${slug}`, { cache: "no-store" });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}
