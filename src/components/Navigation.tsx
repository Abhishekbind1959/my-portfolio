import { useEffect, useState } from 'react';
import { NAV_LINKS, PERSONAL } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/usePortfolio';

const ICONS: Record<string, string> = {
  home: 'M3 12 12 3l9 9M5 10v10h14V10',
  about: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
  skills: 'M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3',
  experience: 'M12 8v4l3 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z',
  projects: 'M3 7h18M3 12h18M3 17h18',
  gallery: 'M3 3h18v18H3zM3 15l5-5 4 4 3-3 6 6',
  resume: 'M14 3v5h5M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
  contact: 'M4 6h16v12H4zM4 6l8 7 8-7',
};

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navigation() {
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick(e: React.MouseEvent, href: string) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Monogram */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            data-cursor="hover"
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-[#080d1b]/70 backdrop-blur">
              <span className="font-mono text-sm font-bold tracking-wider text-cyan-300">
                {PERSONAL.monogram}
              </span>
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.3em] text-slate-400 transition group-hover:text-cyan-300 sm:block">
              {PERSONAL.name.toUpperCase()}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-cyan-400/15 bg-[#080d1b]/70 px-2 py-1.5 backdrop-blur-xl lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  data-cursor="hover"
                  className={`group relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                    isActive ? 'text-cyan-200' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-cyan-400/40 bg-cyan-400/10" />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Status indicator + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-300">ONLINE</span>
            </div>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-[#080d1b]/70 backdrop-blur lg:hidden"
              aria-label="Toggle navigation"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`h-px w-5 bg-cyan-300 transition ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span className={`h-px w-5 bg-cyan-300 transition ${mobileOpen ? 'opacity-0' : ''}`} />
                <span
                  className={`h-px w-5 bg-cyan-300 transition ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[190] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-[#03040b]/80 backdrop-blur-xl transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 h-full w-72 border-l border-cyan-400/15 bg-[#080d1b]/95 p-6 pt-24 transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <p className="section-label mb-6">NAVIGATION</p>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive ? 'bg-cyan-400/10 text-cyan-200' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={ICONS[link.id] || ICONS.home} />
                    </svg>
                    <span className="text-sm font-medium">{link.label}</span>
                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-emerald-300">SYSTEM ONLINE</span>
          </div>
        </nav>
      </div>
    </>
  );
}
