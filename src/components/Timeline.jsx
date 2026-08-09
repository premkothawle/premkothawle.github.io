import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import experience from "../data/experience.json";
import education from "../data/education.json";
import certifications from "../data/certifications.json";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  Rocket,
} from "lucide-react";

const TYPE_META = {
  work: { icon: Briefcase, label: "Work" },
  education: { icon: GraduationCap, label: "Education" },
  achievement: { icon: Trophy, label: "Achievement" },
  hackathon: { icon: Rocket, label: "Hackathon" },
  certification: { icon: Award, label: "Certification" },
};

function startYear(dateStr) {
  const match = dateStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function Timeline() {
  const certEntries = certifications.map((c) => ({
    type: "certification",
    title: c.title,
    organization: c.issuer,
    date: c.date,
    description: "",
  }));

  const entries = [...experience, ...education, ...certEntries].sort(
    (a, b) => startYear(b.date) - startYear(a.date)
  );

  return (
    <section id="journey" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading
          tag="journey"
          title="Professional Journey"
          description="Education, roles, and milestones — newest first."
        />

        <ol className="relative max-w-2xl">
          <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
          {entries.map((entry, i) => {
            const meta = TYPE_META[entry.type] || TYPE_META.work;
            const Icon = meta.icon;
            return (
              <Reveal as="li" key={`${entry.title}-${i}`} delay={i * 0.04} className="relative pl-8 pb-9 last:pb-0">
                <span className="absolute left-0 top-1 w-[19px] h-[19px] rounded-full bg-surface border-2 border-accent flex items-center justify-center">
                  <Icon size={10} className="text-accent" strokeWidth={2.5} />
                </span>

                <p className="mono text-xs text-muted mb-1">{entry.date}</p>
                <h3 className="font-medium text-ink">{entry.title}</h3>
                {entry.organization && (
                  <p className="text-sm text-muted">{entry.organization}</p>
                )}
                {entry.description && (
                  <p className="text-sm text-ink/80 mt-1.5 leading-relaxed">
                    {entry.description}
                  </p>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
