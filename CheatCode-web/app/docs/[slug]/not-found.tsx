import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap">
      <div className="empty">
        That topic does not exist. <Link href="/docs">Browse all topics</Link>
      </div>
    </main>
  );
}
