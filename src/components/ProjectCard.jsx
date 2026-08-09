import { useState } from "react";
import { Github, ArrowUpRight, Folder } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function ProjectCard({ project, delay = 0 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = project.image && !imgFailed;

  return (
    <Reveal delay={delay}>
      <article className="group border border-border rounded-xl overflow-hidden bg-surface hover:border-ink/25 transition-colors h-full flex flex-col">
        <div className="aspect-[16/10] bg-surface border-b border-border flex items-center justify-center overflow-hidden">
          {hasImage ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted">
              <Folder size={22} strokeWidth={1.5} />
              <span className="mono text-[11px]">{project.category}</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-medium text-ink">{project.title}</h3>
            <span className="mono text-[11px] text-accent bg-accent-soft px-2 py-0.5 rounded-full shrink-0">
              {project.category}
            </span>
          </div>

          <p className="text-sm text-muted leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="mono text-[11px] text-muted border border-border rounded px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-4 text-sm">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                <Github size={15} />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                <ArrowUpRight size={15} />
                Live demo
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
