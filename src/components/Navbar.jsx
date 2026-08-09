import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import site from "../data/site.json";
import { useActiveSection } from "../hooks/useActiveSection.js";

export default function Navbar({ onOpenPalette }) {
  const ids = site.nav.map((item) => item.href.replace("#", ""));
  const activeId = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMac =
    typeof navigator !== "undefined" && /Mac/.test(navigator.platform);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled ? "bg-white/90 backdrop-blur border-b border-border" : "bg-white/0"
      }`}
    >
      <nav className="max-w-content mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="mono text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          ~/prem
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {site.nav.map((item) => {
            const id = item.href.replace("#", "");
            const active = id === activeId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm transition-colors ${
                    active ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          onClick={onOpenPalette}
          className="mono flex items-center gap-2 text-xs text-muted border border-border rounded-md px-2.5 py-1.5 hover:border-ink/30 hover:text-ink transition-colors"
          aria-label="Open command palette"
        >
          <Command size={13} strokeWidth={2} />
          <span className="hidden sm:inline">{isMac ? "⌘K" : "Ctrl K"}</span>
        </button>
      </nav>
    </header>
  );
}
