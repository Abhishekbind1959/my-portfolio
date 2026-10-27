import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL, CONTACT, NAV_LINKS } from '@/data/portfolio';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const githubConfigured = !CONTACT.github.startsWith('[');
  const linkedinConfigured = !CONTACT.linkedin.startsWith('[');

  return (
    <footer className="relative border-t border-white/5 bg-[#03040b]/80 py-12 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-mono text-sm font-bold tracking-[0.3em] text-cyan-300">{PERSONAL.monogram}</p>
            <p className="mt-1 text-lg font-semibold text-white">{PERSONAL.name}</p>
            <p className="text-sm text-slate-500">{PERSONAL.title}</p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-cursor="hover"
                className="text-xs text-slate-400 transition hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + back to top */}
          <div className="flex items-center gap-3">
            {githubConfigured && (
              <a href={CONTACT.github} target="_blank" rel="noreferrer" data-cursor="hover" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <Github className="h-4 w-4" />
              </a>
            )}
            {linkedinConfigured && (
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" data-cursor="hover" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            <a href={`mailto:${CONTACT.email}`} data-cursor="hover" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
              <Mail className="h-4 w-4" />
            </a>
            <button
              onClick={scrollTop}
              data-cursor="hover"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 text-cyan-300 transition hover:bg-cyan-400/10"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-center md:flex-row">
          <p className="font-mono text-[10px] tracking-[0.15em] text-slate-600">
            © {new Date().getFullYear()} ABHISHEK BIND · ALL SYSTEMS OPERATIONAL
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] text-slate-600">
            BUILT WITH REACT · CANVAS · TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
}
