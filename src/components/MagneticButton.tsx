import { useRef, type ReactNode, type MouseEvent } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  icon?: ReactNode;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  strength = 0.3,
  type = 'button',
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0,0)';
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform';
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#03040b] shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_40px_rgba(0,229,255,0.55)]',
    ghost: 'text-slate-300 hover:text-white',
    outline:
      'border border-cyan-400/40 text-cyan-200 hover:border-cyan-400/80 hover:bg-cyan-400/10 backdrop-blur',
  };

  const content = (
    <>
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />
      )}
    </>
  );

  const shared = {
    ref,
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    'data-cursor': 'hover',
  } as const;

  if (href) {
    return (
      <a href={href} {...shared}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={(e) => onClick?.(e)} {...shared}>
      {content}
    </button>
  );
}
