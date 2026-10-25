export type Block =
  | { type: "text"; text: string }
  | { type: "tip"; text: string }
  | { type: "code"; code: string; title?: string }
  | { type: "facts"; items: [string, string][] }
  | { type: "command"; name: string; what: string; syntax: string; options?: [string, string][]; example?: string }
  | { type: "tabs"; tabs: { label: string; note?: string; commands: string[]; more?: string }[] };

export type Section = { id: string; title: string; lead?: string; blocks: Block[] };
export type TopicSummary = { slug: string; title: string; icon: string; summary: string; order: number };
export type Topic = { slug: string; title: string; icon?: string; summary?: string; sections: Section[] };
