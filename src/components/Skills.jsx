import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import skills from "../data/skills.json";
import { getIcon } from "../utils/icons.js";

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading
          tag="skills"
          title="Skills"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.06}>
              <div className="border border-border rounded-xl p-5 h-full bg-surface">
                <h3 className="mono text-xs uppercase tracking-wide text-muted mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((skill) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <li
                        key={skill.name}
                        className="flex items-center gap-2.5 text-sm text-ink/85"
                      >
                        <Icon size={15} className="text-muted shrink-0" />
                        {skill.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
