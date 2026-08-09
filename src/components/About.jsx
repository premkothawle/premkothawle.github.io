import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import profile from "../data/profile.json";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading tag="about" title="About" />
        <Reveal delay={0.05} className="max-w-prose">
          <p className="text-lg leading-relaxed text-ink/90 text-justify">{profile.about}</p>
        </Reveal>
      </div>
    </section>
  );
}
