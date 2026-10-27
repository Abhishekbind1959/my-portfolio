import { useRef, type ReactNode, type MouseEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePortfolio';

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

export default function TiltCard({ children, className = '', max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  function handleMove(e: MouseEvent) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    if (glare) {
      el.style.setProperty('--glare-x', `${px * 100}%`);
      el.style.setProperty('--glare-y', `${py * 100}%`);
    }
  }
  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      className={`relative transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
      {glare && !reduced && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x,50%) var(--glare-y,50%), rgba(0,229,255,0.18), transparent 50%)',
          }}
        />
      )}
    </div>
  );
}
