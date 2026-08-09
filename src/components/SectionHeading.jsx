import Reveal from "./Reveal.jsx";

/**
 * Every section opens with a code-comment style label ("// about")
 * instead of a decorative eyebrow — the site's one recurring signature.
 */
export default function SectionHeading({ tag, title, description }) {
  return (
    <Reveal className="mb-12 max-w-prose">
      <p className="eyebrow mb-3">// {tag}</p>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
