type Props = {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ label, title, subtitle, align = 'left' }: Props) {
  return (
    <div className={`reveal ${align === 'center' ? 'text-center' : ''}`}>
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
        <span className="section-label">{label}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
      </div>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base text-slate-400 sm:text-lg text-balance">{subtitle}</p>
      )}
    </div>
  );
}
