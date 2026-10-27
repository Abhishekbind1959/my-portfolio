import { Rocket } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { INTERNSHIPS } from '@/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="EXPERIENCE // 03" title={INTERNSHIPS.heading} />

        <div className="reveal mt-14 max-w-3xl">
          {/* Timeline rail */}
          <div className="relative">
            {/* Animated progress line */}
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-violet-500/30" />
            <div
              className="absolute left-4 top-0 w-px bg-gradient-to-b from-cyan-400 to-blue-500"
              style={{ height: '100%', animation: 'scan 3s ease-in-out infinite alternate' }}
            />

            <div className="space-y-10">
              {INTERNSHIPS.items.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-14"
                  style={{ animation: `fade-up 0.7s ${i * 0.15}s ease both` }}
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-[#03040b]">
                    <Rocket className="h-4 w-4 text-cyan-300" />
                    <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-pulse-glow" />
                  </div>

                  {/* Orbiting marker */}
                  <div className="absolute left-4 top-5 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
                    <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400/60" />
                  </div>

                  {/* Card */}
                  <div
                    data-cursor="hover"
                    className="hud-corner group rounded-xl border border-white/5 bg-[#080d1b]/60 p-6 backdrop-blur transition hover:border-cyan-400/30 hover:bg-[#080d1b]/80"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-300/80">
                        MISSION_{item.index}
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[9px] tracking-wide text-slate-400">
                        INTERNSHIP
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{item.company}</h3>
                    <p className="mt-1 text-sm font-medium text-cyan-300/90">{item.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-violet-400/25 bg-violet-400/5 px-2.5 py-0.5 font-mono text-[9px] tracking-wide text-violet-300/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
