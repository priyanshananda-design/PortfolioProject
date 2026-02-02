"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "../lib/site";

type PaletteItem = {
  id: string;
  label: string;
  type: "section" | "case-study";
  href: string;
};

type CommandPaletteProps = {
  sections: { id: string; label: string }[];
  caseStudies: { slug: string; title: string }[];
  showButton?: boolean;
};

export default function CommandPalette({
  sections,
  caseStudies,
  showButton = true
}: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if ((isMac && event.metaKey && event.key.toLowerCase() === "k") || (!isMac && event.ctrlKey && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = useMemo<PaletteItem[]>(() => {
    const sectionItems = sections.map((section) => ({
      id: section.id,
      label: section.label,
      type: "section" as const,
      href: `#${section.id}`
    }));
    const caseItems = caseStudies.map((study) => ({
      id: study.slug,
      label: study.title,
      type: "case-study" as const,
      href: `/case-studies/${study.slug}`
    }));
    return [...sectionItems, ...caseItems];
  }, [sections, caseStudies]);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const selectItem = (item: PaletteItem) => {
    if (item.type === "section") {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(item.href);
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      {showButton ? (
          <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 focus-ring"
          aria-label="Open command palette"
        >
            {site.ui.commandPalette.triggerLabel}
        </button>
      ) : null}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 backdrop-blur">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-surface p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {site.ui.commandPalette.title}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-muted hover:text-white focus-ring"
              >
                {site.ui.commandPalette.closeLabel}
              </button>
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={site.ui.commandPalette.placeholder}
              className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-accent"
              autoFocus
              aria-label="Search command palette"
            />
            <div className="mt-3 max-h-72 space-y-2 overflow-auto">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted">{site.ui.commandPalette.empty}</p>
              ) : null}
              {filtered.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  type="button"
                  onClick={() => selectItem(item)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-black/40 px-3 py-2 text-left text-sm text-white hover:border-accent/60 focus-ring"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-muted">
                    {item.type === "section" ? "Section" : "Case Study"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
