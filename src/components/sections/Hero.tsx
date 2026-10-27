import { ArrowRight, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import PortraitFrame from '@/components/PortraitFrame';
import { PERSONAL, CONTACT } from '@/data/portfolio';

const HERO_TITLE = PERSONAL.heroHeading.split(' ');

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(65,105,255,0.4), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(157,78,221,0.4), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy */}
        <div className="reveal text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-300">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {HERO_TITLE.map((word, i) => (
              <span key={i} className="block">
                <span
                  className="gradient-text neon-text"
                  style={{
                    opacity: 0,
                    animation: `fade-up 0.8s ${0.2 + i * 0.25}s cubic-bezier(0.16,1,0.3,1) forwards`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-6 font-mono text-sm tracking-[0.3em] text-cyan-300/80"
            style={{ opacity: 0, animation: 'fade-up 0.8s 0.9s ease forwards' }}
          >
            {PERSONAL.title.toUpperCase()}
          </p>

          <p
            className="mx-auto mt-5 max-w-xl text-lg text-slate-300 text-balance lg:mx-0"
            style={{ opacity: 0, animation: 'fade-up 0.8s 1.1s ease forwards' }}
          >
            {PERSONAL.heroTagline}
          </p>
          <p
            className="mx-auto mt-3 max-w-xl text-sm text-slate-400 text-balance lg:mx-0"
            style={{ opacity: 0, animation: 'fade-up 0.8s 1.25s ease forwards' }}
          >
            {PERSONAL.heroDescription}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ opacity: 0, animation: 'fade-up 0.8s 1.4s ease forwards' }}
          >
            <MagneticButton href="#projects" variant="primary" icon={<Sparkles className="h-4 w-4" />}>
              Explore My Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              Let's Connect
            </MagneticButton>
          </div>

          {/* Social row */}
          <div
            className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
            style={{ opacity: 0, animation: 'fade-up 0.8s 1.6s ease forwards' }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500">FIND ME:</span>
            <div className="flex gap-3">
              <a
                href={CONTACT.github}
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.linkedin}
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

       {/* Right: portrait */}
<div className="relative isolate flex min-h-[420px] items-center justify-center lg:min-h-[560px] lg:justify-end">
  <div className="relative z-10 w-full max-w-md shrink-0">
    <PortraitFrame
      src="/images/abhishek-hero.jpeg"
      alt="Portrait of Abhishek Bind"
      variant="hero"
      className="relative z-10"
    />
  </div>

</div>
      </div>
      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.3em] text-slate-500">SCROLL TO EXPLORE</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-cyan-400/30 pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-cyan-400" style={{ animation: 'scan 1.6s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}
