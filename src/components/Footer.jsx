import site from "../data/site.json";
import profile from "../data/profile.json";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-content mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p className="mono text-xs">"{site.footerQuote}"</p>
        <p>
          © {year} {profile.name}.
        </p>
      </div>
    </footer>
  );
}
