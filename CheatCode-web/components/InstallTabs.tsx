"use client";
import { useState } from "react";
import CodeBox from "./CodeBox";

type Tab = { label: string; note?: string; commands: string[]; more?: string };

export default function InstallTabs({ tabs }: { tabs: Tab[] }) {
  const [i, setI] = useState(0);
  const t = tabs[i];
  return (
    <div data-search>
      <div className="tabs" role="tablist">
        {tabs.map((x, n) => (
          <button key={x.label} role="tab" aria-selected={n === i} onClick={() => setI(n)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="card">
        {t.note && <p>{t.note}</p>}
        {t.commands.map((c) => (
          <CodeBox key={c} code={c} />
        ))}
        {t.more && <p style={{ marginBottom: 0 }}>{t.more}</p>}
      </div>
    </div>
  );
}
