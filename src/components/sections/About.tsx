import { GraduationCap, Target, Lightbulb, Code2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { PERSONAL } from '@/data/portfolio';

const INFO_CARDS = [
  {
    icon: GraduationCap,
    label: PERSONAL.education.label,
    title: PERSONAL.education.title,
    value: PERSONAL.education.year,
    accent: '#00e5ff',
  },
  {
    icon: Lightbulb,
    label: 'INTERESTS',
    title: 'What Drives Me',
    value: PERSONAL.interests.join(' · '),
    accent: '#4169ff',
  },
  {
    icon: Target,
    label: 'CAREER GOAL',
    title: 'My Mission',
    value: PERSONAL.careerGoal,
    accent: '#9d4edd',
  },
];

const JOURNEY = [
  { phase: 'Origin', text: 'Started exploring computers and programming.' },
  { phase: 'Foundation', text: 'Began Diploma in Information Technology.' },
  { phase: 'Practice', text: 'Internships at Indigo Consultancy and Nucleus Automations.' },
  { phase: 'Now', text: 'Third year — building web projects and learning modern tools.' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="ABOUT // 01" title={PERSONAL.aboutHeading} subtitle={PERSONAL.aboutSubheading} />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* PC setup */}
          <div className="reveal mx-auto w-full max-w-xl lg:mx-0">
            <img
              src="/images/pc-setup.jpeg"
              alt="Desktop PC setup with monitor, tower, keyboard, and speakers"
              className="aspect-[3/2] w-full rounded-xl border border-cyan-400/20 object-cover"
            />
          </div>

          {/* Copy + cards */}
          <div className="space-y-6">
            <div className="reveal space-y-4">
              {PERSONAL.aboutBody.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-300 text-balance">
                  {p}
                </p>
              ))}
            </div>

            {/* Info cards */}
            <div className="reveal grid gap-4 sm:grid-cols-3">
              {INFO_CARDS.map((card) => (
                <div
                  key={card.label}
                  data-cursor="hover"
                  className="hud-corner group relative rounded-xl border border-white/5 bg-[#080d1b]/60 p-4 backdrop-blur transition hover:border-cyan-400/30"
                >
                  <card.icon className="h-5 w-5" style={{ color: card.accent }} />
                  <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-slate-500">{card.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{card.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="reveal">
              <p className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cyan-300">
                <Code2 className="h-3.5 w-3.5" /> LEARNING JOURNEY
              </p>
              <ol className="relative border-l border-cyan-400/20 pl-6">
                {JOURNEY.map((step, i) => (
                  <li key={i} className="relative pb-5 last:pb-0">
                    <span
                      className="absolute -left-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/40 bg-[#03040b]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                    </span>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-cyan-300/80">
                      {String(i + 1).padStart(2, '0')} · {step.phase.toUpperCase()}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-400">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
