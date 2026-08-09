import { useEffect, useMemo, useState } from "react";
import { Folder, Star, Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import projects from "../data/projects.json";


const defaultStatus = {
  AI: "Research Prototype",
  Backend: "Production Ready",
  Research: "Research Prototype",
  Mobile: "Production Ready",
  "Open Source": "Open Source",
};

function getStatus(project) {
  if (project.status) {
    return project.status;
  }

  return project.featured ? "Production Ready" : defaultStatus[project.category] || "Active";
}

export default function Projects() {
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null);

  const filtered = useMemo(() => {
    // Always show all projects — top category filters removed per request.
    return projects;
  }, []);

  useEffect(() => {
    if (!filtered.some((project) => project.id === selectedId)) {
      setSelectedId(filtered[0]?.id ?? null);
    }
  }, [filtered, selectedId]);

  const activeProject = filtered.find((project) => project.id === selectedId) ?? filtered[0] ?? null;

  return (
    <section id="projects" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading
          tag="projects"
          title="Project Explorer"
        />


        <div className="grid gap-6 md:grid-cols-[minmax(0,35%)_minmax(0,65%)]">
          <aside className="rounded-[20px] border border-border bg-surface overflow-hidden lg:max-h-[30vh] lg:overflow-y-auto">
            <div className="sticky top-0 z-10 bg-surface px-5 py-4 border-b border-border">
              <p className="mono text-xs uppercase tracking-[0.25em] text-muted">projects/</p>
            </div>

            <div className="flex md:block gap-2 p-3 overflow-x-auto md:overflow-visible">
              {filtered.map((project) => {
                const active = project.id === activeProject?.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    className={`group flex min-w-[16rem] md:min-w-0 w-full md:w-full flex-col justify-between gap-2 rounded-3xl border border-transparent p-4 text-left transition duration-150 ${
                      active
                        ? "bg-accent-soft border-accent/70 border-l-4 ring-1 ring-accent/10"
                        : "bg-surface hover:bg-surface/90 hover:border-l-4 hover:border-accent/70"
                    }`}
                  >
                    <div>
                        <p className="font-medium text-ink leading-5">{project.title}</p>
                      </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {activeProject ? (
                      <article className="rounded-[20px] border border-border bg-surface p-6 sm:p-8 lg:max-h-[60vh] lg:overflow-y-auto">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-3xl font-semibold tracking-tight text-ink">{activeProject.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-muted">{activeProject.description}</p>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-ink">Tech stack</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {activeProject.technologies.map((tech) => (
                                <span key={tech} className="rounded-full border border-border bg-surface px-3 py-1 text-[13px] text-muted">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* <div>
                            <p className="text-sm font-semibold text-ink">Links</p>
                            <div className="mt-3 flex flex-wrap gap-3 text-sm">
                              {activeProject.github && (
                                <a href={activeProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-ink transition hover:border-accent/50 hover:text-accent">
                                  <Github size={14} />
                                  GitHub
                                </a>
                              )}
                              {activeProject.demo && (
                                <a href={activeProject.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-ink transition hover:border-accent/50 hover:text-accent">
                                  <ArrowUpRight size={14} />
                                  Live demo
                                </a>
                              )}
                            </div>
                          </div> */}
                        </div>
                      </article>
                    ) : (
                      <div className="rounded-[20px] border border-border bg-surface p-8 text-sm text-muted">No repositories available.</div>
                    )}
        </div>
      </div>
    </section>
  );
}
