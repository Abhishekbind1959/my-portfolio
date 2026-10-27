import { Github, ExternalLink, FolderGit2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import TiltCard from '@/components/TiltCard';
import { PROJECTS } from '@/data/portfolio';

const STATUS_STYLES: Record<string, string> = {
  Live: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'In Progress': 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  Planned: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="PROJECTS // 04"
          title={PROJECTS.heading}
          subtitle="A selection of work from my digital universe. More missions loading."
        />

        <div className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.items.map((project, i) => {
            const hasGithub = project.github && !project.github.startsWith('[');
            const hasDemo = project.demo && !project.demo.startsWith('[');
            return (
              <TiltCard
                key={i}
                className="group h-full"
                max={10}
              >
                <div className="hud-corner relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#080d1b]/70 p-6 backdrop-blur transition-colors duration-300 group-hover:border-cyan-400/30">
                  {/* Animated top border */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Preview placeholder */}
                  <div className="relative mb-5 h-32 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0a1124] to-[#0d1530]">
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <FolderGit2 className="h-10 w-10 text-cyan-400/40" />
                    </div>
                    <div
                      className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cyan-400/10 to-transparent"
                      style={{ animation: 'scan 3s linear infinite' }}
                    />
                    <span
                      className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wide ${STATUS_STYLES[project.status] || STATUS_STYLES['Planned']}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] tracking-wide text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                    {hasGithub ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-300 transition hover:text-cyan-300"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Github className="h-4 w-4" /> Repo TBD
                      </span>
                    )}
                    {hasDemo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="ml-auto flex items-center gap-1.5 text-xs font-medium text-slate-300 transition hover:text-cyan-300"
                      >
                        Live <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-600">
                        No demo
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
