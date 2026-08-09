import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, Newspaper, PenLine } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import profile from "../data/profile.json";
import socials from "../data/socials.json";

const ICONS = { Github, Linkedin, Newspaper, PenLine, Mail };

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, link still works.
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <SectionHeading
          tag="contact"
          title="Get in touch"
          description="Open to backend and AI engineering roles, collaborations, and interesting problems."
        />

        <Reveal delay={0.05} className="flex flex-wrap items-center gap-3">
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-ink/85 transition-colors"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : profile.email}
          </button>

          {socials
            .filter((s) => s.label !== "Email")
            .map((social) => {
              const Icon = ICONS[social.icon] || Mail;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-border text-sm px-4 py-2.5 rounded-lg text-ink hover:border-ink/30 transition-colors"
                >
                  <Icon size={15} />
                  {social.label}
                </a>
              );
            })}
        </Reveal>
      </div>
    </section>
  );
}
