import { redirect } from "next/navigation";
import Link from "next/link";
import { getTopics } from "@/lib/api";

export default async function DocsIndex() {
  const topics = await getTopics();
  if (topics.length === 1) redirect(`/docs/${topics[0].slug}`);
  return (
    <main className="wrap">
      <h1 className="sub" style={{ fontSize: 36 }}>Documentation</h1>
      {topics.length === 0 ? (
        <div className="empty">No topics found. Is the API running on port 8080?</div>
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
