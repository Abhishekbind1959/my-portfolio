import { useEffect, useState } from 'react';
import { Download, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import MagneticButton from '@/components/MagneticButton';
import { RESUME } from '@/data/portfolio';

export default function Resume() {
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(RESUME.pdfPath, { method: 'HEAD' });
        setPdfAvailable(res.ok);
      } catch {
        setPdfAvailable(false);
      }
    }
    check();
  }, []);

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="RESUME // 06" title={RESUME.heading} align="center" />

        <div className="reveal mt-14 flex justify-center">
          <div className="hud-corner relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#080d1b]/70 p-8 backdrop-blur">
            {/* Decorative orbit */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-cyan-400/10 animate-spin-slow" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-violet-400/10 animate-spin-reverse" />

            <div className="relative flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                <FileText className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Abhishek Bind</h3>
                <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/80">PROFILE.DOCUMENT</p>
              </div>
            </div>

            <dl className="relative mt-6 divide-y divide-white/5">
              {RESUME.fields.map((field) => (
                <div key={field.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-6">
                  <dt className="w-44 shrink-0 font-mono text-[10px] tracking-[0.15em] text-slate-500">
                    {field.label.toUpperCase()}
                  </dt>
                  <dd className="text-sm text-slate-200">{field.value}</dd>
                </div>
              ))}
            </dl>

            <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              {pdfAvailable ? (
                <MagneticButton href={RESUME.pdfPath} variant="primary" icon={<Download className="h-4 w-4" />}>
                  Download Resume
                </MagneticButton>
              ) : (
                <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-xs text-amber-300">
                  <AlertTriangle className="h-4 w-4" />
                  Add a PDF at public/resume/abhishek-bind-resume.pdf to enable download
                </div>
              )}
              <p className="font-mono text-[10px] tracking-[0.15em] text-slate-500">
                {pdfAvailable ? <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="h-3 w-3" /> FILE READY</span> : 'AWAITING FILE'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
