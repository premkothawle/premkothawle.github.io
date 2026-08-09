import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight, FileText, Folder, Compass } from "lucide-react";
import site from "../data/site.json";
import projects from "../data/projects.json";
import articles from "../data/articles.json";

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const navItems = site.nav.map((item) => ({
      type: "nav",
      label: item.label,
      href: item.href,
      icon: Compass,
    }));

    const projectItems = projects.map((p) => ({
      type: "project",
      label: p.title,
      sub: p.category,
      href: p.demo || p.github || "#projects",
      icon: Folder,
    }));

    const articleItems = articles.map((a) => ({
      type: "article",
      label: a.title,
      sub: a.publication,
      href: a.url || "#articles",
      icon: FileText,
    }));

    const all = [...navItems, ...projectItems, ...articleItems];
    if (!q) return all.slice(0, 8);
    return all.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.sub && item.sub.toLowerCase().includes(q))
    );
  }, [query]);

  function go(href) {
    onClose();
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else if (href !== "#") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-lg bg-surface rounded-xl border border-border shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
              <Search size={16} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, articles, sections…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="mono text-[10px] text-muted border border-border rounded px-1.5 py-0.5">
                esc
              </kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-sm text-muted text-center">
                  No matches for “{query}”.
                </li>
              )}
              {results.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={`${item.type}-${item.label}-${i}`}>
                    <button
                      onClick={() => go(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface transition-colors"
                    >
                      <Icon size={15} className="text-muted shrink-0" />
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-ink truncate">
                          {item.label}
                        </span>
                        {item.sub && (
                          <span className="block text-xs text-muted truncate">
                            {item.sub}
                          </span>
                        )}
                      </span>
                      <ArrowRight size={13} className="text-muted shrink-0" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
