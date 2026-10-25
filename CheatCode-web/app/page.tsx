import Link from "next/link";
import { getTopics } from "@/lib/api";

export default async function Home() {
  const topics = await getTopics();
  return (
    <main className="wrap">
      <section className="hero">
        <h1>Notes that make tools easy.</h1>
        <p>Plain-language guides with every command, every flag, and copy-ready examples. Pick a topic and start.</p>
        <Link className="btn" href="/docs">Open the docs</Link>
      </section>

      <h2 className="sub">Topics</h2>
      {topics.length === 0 ? (
        <div className="empty">
          No topics yet. Start the Spring Boot API on port 8080 and add a .json file to backend/docs.
        </div>
      ) : (
        <div className="grid">
          {topics.map((t) => (
            <Link key={t.slug} href={`/docs/${t.slug}`} className="topic">
              <span className="ic">{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
