import type { Block } from "@/lib/types";
import CodeBox from "./CodeBox";
import InstallTabs from "./InstallTabs";

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return <h3 key={i} className="sub">{b.text}</h3>;
          case "tip":
            return <div key={i} className="tip" data-search>{b.text}</div>;
          case "code":
            return (
              <div key={i} className="card" data-search>
                {b.title && <p style={{ marginTop: 0 }}>{b.title}</p>}
                <CodeBox code={b.code} />
              </div>
            );
          case "facts":
            return (
              <div key={i}>
                {b.items.map(([k, v]) => (
                  <div className="card" key={k} data-search>
                    <h3>{k}</h3>
                    <p style={{ marginBottom: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            );
          case "tabs":
            return <InstallTabs key={i} tabs={b.tabs} />;
          case "command":
            return (
              <article className="card" key={i} data-search>
                <h3>{b.name}</h3>
                <p>{b.what}</p>
                <CodeBox code={b.syntax} />
                {b.options && b.options.length > 0 && (
                  <div className="tw">
                    <table>
                      <tbody>
                        {b.options.map(([flag, desc]) => (
                          <tr key={flag}><td>{flag}</td><td>{desc}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {b.example && (
                  <>
                    <p style={{ marginBottom: 0 }}>Example</p>
                    <CodeBox code={b.example} />
                  </>
                )}
              </article>
            );
        }
      })}
    </>
  );
}
