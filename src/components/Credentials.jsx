import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import credentials from "../data/certifications.json";

export default function Credentials() {
  const [category, setCategory] = useState("All");
  const [selectedTitle, setSelectedTitle] = useState(credentials[0]?.title ?? null);

  const filtered = useMemo(() => {
    // Search removed and skills (tags) won't be used for filtering. Keep category filtering.
    return credentials.filter((credential) => category === "All" || credential.category === category);
  }, [category]);

  const activeCredential = filtered.find((credential) => credential.title === selectedTitle) ?? filtered[0] ?? null;

  useEffect(() => {
    if (!filtered.some((credential) => credential.title === selectedTitle)) {
      setSelectedTitle(filtered[0]?.title ?? null);
    }
  }, [filtered, selectedTitle]);

  useEffect(() => {
    if (activeCredential && activeCredential.title !== selectedTitle) {
      setSelectedTitle(activeCredential.title);
    }
  }, [activeCredential, selectedTitle]);

  const selectCredential = (title) => setSelectedTitle(title);

  return (
    <section id="credentials" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading
          tag="credentials"
          title="Credential Registry"
        />

        <div className="rounded-[20px] border border-border bg-surface overflow-hidden lg:h-[580px]">
          <div className="border-b border-border px-6 py-4 sm:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-surface">
            <div>
              <p className="mono text-xs uppercase tracking-[0.25em] text-muted">credentials/</p>
            </div>
          </div>

          <div className="grid h-full grid-cols-1 lg:grid-cols-[35%_65%]">
            <aside className="border-b border-border lg:border-b-0 lg:border-r border-border p-4 sm:p-5 overflow-hidden">
              <div className="h-[calc(100%-88px)] overflow-y-auto pr-1 space-y-3">
                {filtered.map((credential) => {
                  const active = credential.title === activeCredential?.title;
                  return (
                    <button
                      key={credential.title}
                      type="button"
                      onClick={() => selectCredential(credential.title)}
                      className={`w-full text-left rounded-3xl border border-transparent p-4 transition duration-200 ${
                        active
                          ? "bg-surface border-l-4 border-accent/70"
                          : "hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-ink leading-6">{credential.title}</p>
                          <p className="text-sm text-muted mt-1">{credential.issuer}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted mt-3 mono">{credential.issued}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="p-4 sm:p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeCredential ? (
                  <motion.div
                    key={activeCredential.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full overflow-y-auto pr-1"
                  >
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="rounded-full border border-border bg-surface px-3 py-1 text-[13px] text-muted">
                        {activeCredential.category}
                      </span>
                    </div>

                    <div className="space-y-6 text-sm text-muted">
                      <div className="space-y-4">
                        <div>
                          <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">title</p>
                          <p className="mt-2 text-sm text-ink">{activeCredential.title}</p>
                        </div>
                        <div>
                          <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">issuer</p>
                          <p className="mt-2 text-sm text-ink">{activeCredential.issuer}</p>
                        </div>
                        <div>
                          <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">issued</p>
                          <p className="mt-2 text-sm text-ink">{activeCredential.issued}</p>
                        </div>
                        {activeCredential.credentialId && (
                          <div>
                            <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">credential_id</p>
                            <p className="mt-2 text-sm text-ink">{activeCredential.credentialId}</p>
                          </div>
                        )}
                        {activeCredential.skills?.length > 0 && (
                          <div>
                            <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">skills</p>
                            <div className="mt-2 space-y-1 font-mono text-sm text-ink/90">
                              {activeCredential.skills.map((skill) => (
                                <p key={skill}>- {skill}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {activeCredential.url && (
                          <div>
                            <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">credential_url</p>
                            <a
                              href={activeCredential.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-2 text-accent text-sm font-medium transition hover:underline"
                            >
                              View Credential
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* {activeCredential.description && (
                        <div className="border-t border-border pt-5">
                          <p className="font-medium text-ink">About this credential</p>
                          <p className="mt-3 leading-7 text-sm text-muted">{activeCredential.description}</p>
                        </div>
                      )} */}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-full items-center justify-center"
                  >
                    <p className="text-sm text-muted">Select a credential from the registry to inspect its details.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
