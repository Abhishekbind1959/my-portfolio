import { useState, type FormEvent } from 'react';
import { Send, Copy, Github, Linkedin, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import MagneticButton from '@/components/MagneticButton';
import { CONTACT } from '@/data/portfolio';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const emailConfigured = !CONTACT.email.startsWith('[');
const githubConfigured = !CONTACT.github.startsWith('[');
const linkedinConfigured = !CONTACT.linkedin.startsWith('[');

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.subject.trim()) e.subject = 'Please enter a subject.';
    if (!form.message.trim()) e.message = 'Please enter a message.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;

    if (!emailConfigured) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    // Opens the visitor's email client as a safe, real fallback when no backend is configured.
    try {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      const subject = encodeURIComponent(form.subject);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      setTimeout(() => setStatus('success'), 400);
    } catch {
      setStatus('error');
    }
  }

  function copyEmail() {
    if (!emailConfigured) return;
    navigator.clipboard?.writeText(CONTACT.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const inputBase =
    'w-full rounded-xl border bg-[#03040b]/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/60 focus:bg-[#03040b]/80';

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Portal glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.3), rgba(157,78,221,0.2), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="CONTACT // 07"
          title={CONTACT.heading}
          subtitle={CONTACT.subheading}
          align="center"
        />

        <div className="reveal mt-14 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form id="contact-form" onSubmit={handleSubmit} className="hud-corner rounded-2xl border border-cyan-400/20 bg-[#080d1b]/70 p-6 backdrop-blur sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] text-slate-400">FULL NAME</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputBase} ${errors.name ? 'border-red-400/60' : 'border-white/10'}`}
                    placeholder="Your name"
                    data-cursor="hover"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] text-slate-400">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputBase} ${errors.email ? 'border-red-400/60' : 'border-white/10'}`}
                    placeholder="you@example.com"
                    data-cursor="hover"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] text-slate-400">SUBJECT</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`${inputBase} ${errors.subject ? 'border-red-400/60' : 'border-white/10'}`}
                  placeholder="What's this about?"
                  data-cursor="hover"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] text-slate-400">MESSAGE</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputBase} resize-none ${errors.message ? 'border-red-400/60' : 'border-white/10'}`}
                  placeholder="Tell me about your idea..."
                  data-cursor="hover"
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MagneticButton type="submit" variant="primary" icon={
                  status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />
                }>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </MagneticButton>

                {status === 'success' && (
                  <span className="flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> Your email client should be opening.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-sm text-amber-300">
                    Email isn't configured yet. Set your address in src/data/portfolio.ts.
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Contact info / links */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hud-corner rounded-2xl border border-cyan-400/20 bg-[#080d1b]/70 p-6 backdrop-blur">
              <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/80">DIRECT CHANNELS</p>
              <div className="mt-4 space-y-3">
                {/* Email */}
                <button
                  onClick={copyEmail}
                  data-cursor="hover"
                  disabled={!emailConfigured}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3 text-left transition hover:border-cyan-400/40 disabled:opacity-50"
                >
                  <Mail className="h-5 w-5 text-cyan-300" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] tracking-[0.15em] text-slate-500">EMAIL</p>
                    <p className="truncate text-sm text-slate-200">{emailConfigured ? CONTACT.email : 'Not configured yet'}</p>
                  </div>
                  {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-500" />}
                </button>

                {/* GitHub */}
                <a
                  href={githubConfigured ? CONTACT.github : undefined}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className={`flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3 transition hover:border-cyan-400/40 ${!githubConfigured ? 'pointer-events-none opacity-50' : ''}`}
                >
                  <Github className="h-5 w-5 text-cyan-300" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] tracking-[0.15em] text-slate-500">GITHUB</p>
                    <p className="truncate text-sm text-slate-200">{githubConfigured ? CONTACT.github : 'Add your GitHub URL'}</p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={linkedinConfigured ? CONTACT.linkedin : undefined}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className={`flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3 transition hover:border-cyan-400/40 ${!linkedinConfigured ? 'pointer-events-none opacity-50' : ''}`}
                >
                  <Linkedin className="h-5 w-5 text-cyan-300" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] tracking-[0.15em] text-slate-500">LINKEDIN</p>
                    <p className="truncate text-sm text-slate-200">{linkedinConfigured ? CONTACT.linkedin : 'Add your LinkedIn URL'}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#080d1b]/40 p-5 backdrop-blur">
              <p className="font-mono text-[10px] tracking-[0.15em] text-slate-500">
                Edit contact details in <span className="text-cyan-300">src/data/portfolio.ts</span> to activate all buttons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
