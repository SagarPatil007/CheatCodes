"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1200);
    } catch {}
  }
  return (
    <button type="button" className="cp" onClick={copy}>
      {done ? "Copied" : "Copy"}
    </button>
  );
}
