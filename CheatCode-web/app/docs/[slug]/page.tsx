import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTopic, getTopics } from "@/lib/api";
import Blocks from "@/components/Blocks";
import DocSearch from "@/components/DocSearch";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTopic(params.slug);
  return { title: t ? `${t.title} | CheatCodes` : "Not found" };
}

export default async function TopicPage({ params }: Props) {
  const [topic, topics] = await Promise.all([getTopic(params.slug), getTopics()]);
  if (!topic) notFound();

  return (
    <div className="docs">
      <aside className="side">
        <p className="side-h">Topics</p>
        {topics.map((t) => (
          <Link key={t.slug} href={`/docs/${t.slug}`} aria-current={t.slug === topic.slug}>
            {t.icon} {t.title}
          </Link>
        ))}
        <p className="side-h">On this page</p>
        {topic.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>{s.title}</a>
        ))}
      </aside>

      <main className="content">
        <h1>{topic.icon} {topic.title}</h1>
        {topic.summary && <p className="lead">{topic.summary}</p>}
        <DocSearch />
        {topic.sections.map((s) => (
          <section key={s.id} id={s.id} className="sec">
            <h2>{s.title}</h2>
            {s.lead && <p className="lead">{s.lead}</p>}
            <Blocks blocks={s.blocks} />
          </section>
        ))}
      </main>
    </div>
  );
}
