import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { SKILLS } from '@/data/portfolio';

type Selected = { name: string; description: string; category: string; accent: string } | null;

export default function Skills() {
  const [selected, setSelected] = useState<Selected>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Flatten skills for orbital layout
  const allSkills = SKILLS.groups.flatMap((g) =>
    g.skills.map((s) => ({ ...s, category: g.category, accent: g.accent })),
  );

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="SKILLS // 02" title={SKILLS.heading} align="center" />

        {/* Orbital constellation */}
        <div className="reveal mt-16 flex flex-col items-center">
          <div className="skill-orbit relative mx-auto flex h-[480px] w-full max-w-[520px] items-center justify-center overflow-visible sm:h-[520px]">
            {/* Orbital rings */}
<div className="skill-orbit-decoration pointer-events-none absolute h-[180px] w-[180px] rounded-full border border-cyan-400/20 sm:h-[200px] sm:w-[200px]" />

<div className="skill-orbit-decoration pointer-events-none absolute h-[300px] w-[300px] rounded-full border border-violet-400/15 sm:h-[350px] sm:w-[350px]" />

<div className="skill-orbit-decoration pointer-events-none absolute h-[420px] w-[420px] rounded-full border border-blue-400/15 sm:h-[460px] sm:w-[460px]" />
            {/* Rotating rings with markers */}
            <div className="skill-orbit-decoration absolute h-[280px] w-[280px] animate-spin-slow sm:h-[340px] sm:w-[340px]">
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </div>
            <div className="skill-orbit-decoration absolute h-[380px] w-[380px] animate-spin-reverse sm:h-[460px] sm:w-[460px]">
              <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(157,78,221,0.8)]" />
            </div>

            {/* Core */}
            <div className="skill-orbit-core relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-[#080d1b]/80 backdrop-blur sm:h-28 sm:w-28">
              <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-md animate-pulse-glow" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300">CORE</span>
              <span className="mt-1 text-xs font-semibold text-white">STACK</span>
            </div>

{/* Skill nodes positioned around orbits */}
{allSkills.map((skill, i) => {
  const total = allSkills.length;

  // Assign skills to three rings.
  const ring = i % 3;

  // Keep outer nodes inside the available area.
  const radii = [85, 145, 200];
  const r = radii[ring];

  // Distribute nodes evenly around each ring.
  const skillsInRing = Math.ceil((total - ring) / 3);
  const indexInRing = Math.floor(i / 3);

  const angle =
    (indexInRing / Math.max(skillsInRing, 1) + ring / 8) *
      Math.PI *
      2 -
    Math.PI / 2;

  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r;

  const isHovered = hovered === skill.name;

  return (
    <button
      key={`${skill.category}-${skill.name}`}
      type="button"
      onClick={() => setSelected(skill)}
      onMouseEnter={() => setHovered(skill.name)}
      onMouseLeave={() => setHovered(null)}
      data-cursor="view"
      data-cursor-label="INFO"
      aria-label={`View ${skill.name} details`}
      className="skill-orbit-node absolute z-20 flex flex-col items-center gap-1 transition duration-300"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          animation: `fade-in 0.6s ${i * 0.08}s ease both`,
      }}
    >
      <span
        className="whitespace-nowrap rounded-full border bg-[#080d1b] px-2 py-1.5 font-mono text-[9px] font-semibold backdrop-blur-md transition-all duration-300 sm:px-3 sm:py-2 sm:text-[11px]"
        style={{
          borderColor: isHovered
            ? skill.accent
            : `${skill.accent}80`,
          color: isHovered ? "#ffffff" : skill.accent,
          boxShadow: isHovered
            ? `0 0 20px ${skill.accent}70`
            : `0 0 8px ${skill.accent}25`,
        }}
      >
        {skill.name}
      </span>

      {isHovered && (
        <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-md border border-white/10 bg-[#080d1b] px-2 py-1 text-[10px] text-white">
          {skill.category}
        </span>
      )}
    </button>
  );
})}

            
          </div>
        </div>

        {/* Category legend */}
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-6">
          {SKILLS.groups.map((g) => (
            <div key={g.category} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.accent, boxShadow: `0 0 8px ${g.accent}` }} />
              <span className="font-mono text-[10px] tracking-[0.15em] text-slate-400">{g.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-[#03040b]/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md rounded-2xl border border-cyan-400/25 bg-[#080d1b]/95 p-6 backdrop-blur-xl"
            style={{ animation: 'scale-in 0.3s ease' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hud-corner">
              <p className="font-mono text-[10px] tracking-[0.2em]" style={{ color: selected.accent }}>
                {selected.category.toUpperCase()}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">{selected.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{selected.description}</p>
              <button
                onClick={() => setSelected(null)}
                data-cursor="hover"
                className="mt-6 w-full rounded-full border border-cyan-400/30 py-2.5 text-xs font-medium tracking-wide text-cyan-200 transition hover:bg-cyan-400/10"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
