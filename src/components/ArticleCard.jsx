import { useState } from "react";
import { ArrowUpRight, FileText, Clock } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function ArticleCard({ article, delay = 0 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = article.cover && !imgFailed;

  return (
    <Reveal delay={delay}>
      <a
        href={article.url || "#"}
        target={article.url ? "_blank" : undefined}
        rel="noreferrer"
        className="group flex items-start gap-4 border border-border rounded-xl p-4 bg-surface hover:border-ink/25 transition-colors"
      >
        <div className="w-16 h-16 shrink-0 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden">
          {hasImage ? (
            <img
              src={article.cover}
              alt=""
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <FileText size={18} className="text-muted" strokeWidth={1.5} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-ink group-hover:text-accent transition-colors truncate">
            {article.title}
          </h3>
          <p className="mono text-xs text-muted mt-1">
            {article.publication} · {formatDate(article.date)}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {article.readingTime}
            </span>
            <span className="inline-flex items-center gap-1 text-ink/70 group-hover:text-accent transition-colors">
              Read article
              <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
