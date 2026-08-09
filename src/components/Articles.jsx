import { useEffect, useMemo, useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import articles from "../data/articles.json";

const CATEGORIES = ["All", "AI", "ML Research", "Backend", "Mobile"];

export default function Articles() {
  const [category, setCategory] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState(new Set(["AI", "Backend"]));
  const [selectedArticleTitle, setSelectedArticleTitle] = useState(articles[0]?.title ?? null);

  const filtered = useMemo(() => {
    // Search removed. Tags are read-only and won't be used for filtering.
    return articles.filter((article) => category === "All" || article.category === category);
  }, [category]);

  useEffect(() => {
    if (!filtered.some((article) => article.title === selectedArticleTitle)) {
      setSelectedArticleTitle(filtered[0]?.title ?? null);
    }
  }, [filtered, selectedArticleTitle]);

  const activeArticle = filtered.find((article) => article.title === selectedArticleTitle) ?? filtered[0] ?? null;

  const groupedArticles = useMemo(() => {
    return CATEGORIES.reduce((acc, categoryName) => {
      acc[categoryName] =
        categoryName === "All"
          ? filtered
          : filtered.filter((article) => article.category === categoryName);
      return acc;
    }, {});
  }, [filtered]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((current) => {
      const next = new Set(current);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return articles
      .filter(
        (article) =>
          article.title !== activeArticle.title &&
          article.category === activeArticle.category
      )
      .slice(0, 3);
  }, [activeArticle]);

  return (
    <section id="articles" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading
          tag="documentation"
          title="Technical Articles"
        />

        <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative lg:w-[40%]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted">Browse the knowledge base</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,30%)_minmax(0,70%)] lg:items-start">
          <aside className="hidden lg:block rounded-[20px] border border-border bg-surface p-5 lg:max-h-[72vh] lg:overflow-y-auto">
            <p className="mono text-xs uppercase tracking-[0.25em] text-muted mb-5">knowledge/</p>
            <div className="space-y-4">
              {CATEGORIES.map((categoryName) => {
                const articlesForCategory = groupedArticles[categoryName] || [];
                return (
                  <div key={categoryName} className="rounded-3xl border border-border bg-surface overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCategory(categoryName)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:bg-surface"
                    >
                      <span>{categoryName}</span>
                      <span className="text-muted">{expandedCategories.has(categoryName) ? "▾" : "▸"}</span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        expandedCategories.has(categoryName) ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-2 px-4 pb-4">
                        {articlesForCategory.length > 0 ? (
                          articlesForCategory.map((article) => {
                            const isActive = activeArticle?.title === article.title;
                            return (
                              <button
                                key={article.title}
                                type="button"
                                onClick={() => setSelectedArticleTitle(article.title)}
                                className={`w-full rounded-2xl border border-transparent px-3 py-3 text-left transition duration-150 ${
                                  isActive
                                    ? "bg-accent-soft border-accent/60 border-l-4"
                                    : "hover:bg-surface"
                                }`}
                              >
                                <p className="font-medium text-ink leading-5">{article.title}</p>
                                <p className="text-xs text-muted mt-1">{article.publication} · {article.readingTime}</p>
                              </button>
                            );
                          })
                        ) : (
                          <div className="rounded-2xl bg-surface px-3 py-3 text-sm text-muted">No articles available.</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 text-sm whitespace-nowrap">
              {CATEGORIES.map((categoryName) => (
                <button
                  key={categoryName}
                  type="button"
                  onClick={() => setCategory(categoryName)}
                  className={`rounded-full border px-3 py-2 transition ${
                    category === categoryName
                      ? "bg-ink text-white border-ink"
                      : "bg-surface text-ink border-border hover:border-accent/50"
                  }`}
                >
                  {categoryName}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {(category === "All" ? CATEGORIES : [category]).map((categoryName) => {
                const articlesForCategory = groupedArticles[categoryName] || [];
                if (articlesForCategory.length === 0) {
                  return null;
                }
                return (
                  <div key={categoryName} className="rounded-[20px] border border-border bg-surface overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-ink bg-surface">
                      <span>{categoryName}</span>
                      <span className="text-xs text-muted">{articlesForCategory.length} articles</span>
                    </div>
                    <div className="space-y-1 p-3">
                      {articlesForCategory.map((article) => {
                        const isActive = activeArticle?.title === article.title;
                        return (
                          <button
                            key={article.title}
                            type="button"
                            onClick={() => setSelectedArticleTitle(article.title)}
                            className={`w-full rounded-2xl border border-transparent px-4 py-3 text-left transition duration-150 ${
                              isActive
                                ? "bg-accent-soft border-accent/60 border-l-4"
                                : "hover:bg-surface"
                            }`}
                          >
                            <p className="font-medium text-ink leading-5">{article.title}</p>
                            <p className="text-xs text-muted mt-1">{article.publication} · {article.readingTime}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {activeArticle ? (
            <article className="rounded-[20px] border border-border bg-surface p-6 sm:p-8 lg:max-h-[72vh] lg:overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                    {activeArticle.category}
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tight text-ink">
                    {activeArticle.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span>{activeArticle.publication}</span>
                    <span>·</span>
                    <span>{activeArticle.readingTime}</span>
                    <span>·</span>
                    <span>{formatDate(activeArticle.date)}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-ink">Summary</p>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {activeArticle.summary}
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-ink">Topics</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-[13px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-ink">Links</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      {activeArticle.url && (
                        <a
                          href={activeArticle.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-ink transition hover:border-accent/50 hover:text-accent"
                        >
                          Read article
                        </a>
                      )}
                      {activeArticle.sourceUrl && (
                        <a
                          href={activeArticle.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-ink transition hover:border-accent/50 hover:text-accent"
                        >
                          Source code
                        </a>
                      )}
                    </div>
                  </div>

                  
                </div>
              </div>
            </article>
          ) : (
            <div className="rounded-[20px] border border-border bg-surface p-8 text-sm text-muted">
              No articles match that search. Adjust the query or category to continue browsing.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
