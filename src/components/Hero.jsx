import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import profile from "../data/profile.json";
import socials from "../data/socials.json";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const github = socials.find((s) => s.label === "GitHub");
  const linkedin = socials.find((s) => s.label === "LinkedIn");

  return (
    <section id="top" className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.3fr_1fr] gap-14 items-start"
        >
          <div>
            <motion.p variants={item} className="eyebrow mb-5">
              // whoami
            </motion.p>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-6xl font-semibold tracking-tight text-ink leading-[1.05]"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 text-lg sm:text-xl text-muted max-w-xl leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-ink/85 transition-colors"
              >
                View projects
              </a>
              <a
                href="#articles"
                className="inline-flex items-center gap-2 border border-border text-sm font-medium px-4 py-2.5 rounded-lg text-ink hover:border-ink/30 transition-colors"
              >
                Read articles
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-4">
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-muted hover:text-ink transition-colors"
                >
                  <Github size={19} />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted hover:text-ink transition-colors"
                >
                  <Linkedin size={19} />
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="mono text-sm bg-surface border border-border rounded-xl p-6 self-start"
          >
            <p className="text-muted mb-4 select-none">// manifest.yml</p>
            <dl className="space-y-3">
              <Row k="role" v={profile.role} />
              <Row k="focus" v={profile.focusTags.join(", ")} />
              <Row k="building" v={profile.building} />
              <Row k="mission" v={profile.mission} />
              <Row k="writing" v={profile.writing} />
              <Row k="researchDirection" v={profile.researchDirection} />
            </dl>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 hidden sm:flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors w-fit"
        >
          <ArrowDown size={14} />
          scroll
        </motion.a>
      </div>
    </section>
  );
}

function Row({ k, v, accent }) {
  return (
    <div className="flex gap-3">
      <dt className="text-accent shrink-0">{k}:</dt>
      <dd className={accent ? "text-ink font-medium" : "text-ink/80"}>{v}</dd>
    </div>
  );
}
