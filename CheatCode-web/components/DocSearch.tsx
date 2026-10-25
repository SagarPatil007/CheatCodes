"use client";

/** Hides every [data-search] element on the page that does not match the typed text. */
export default function DocSearch() {
  function filter(value: string) {
    const term = value.trim().toLowerCase();
    document.querySelectorAll<HTMLElement>("[data-search]").forEach((el) => {
      el.hidden = term !== "" && !(el.textContent ?? "").toLowerCase().includes(term);
    });
  }
  return (
    <input
      className="search"
      type="search"
      placeholder="Search this topic, e.g. run, -p, volume"
      aria-label="Search this topic"
      onChange={(e) => filter(e.target.value)}
    />
  );
}
