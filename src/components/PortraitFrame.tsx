import { useState, useRef, type MouseEvent } from 'react';
import { useMouseParallax, usePrefersReducedMotion } from '@/hooks/usePortfolio';

type Props = {
  src?: string;
  alt: string;
  caption?: string;
  variant?: 'hero' | 'about' | 'gallery';
  className?: string;
};

export default function PortraitFrame({ src, alt, caption, variant = 'hero', className = '' }: Props) {
  const [errored, setErrored] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax();
  const reduced = usePrefersReducedMotion();

  function handleMove(e: MouseEvent) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
  }
  function handleLeave() {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  }

  const parallaxX = reduced ? 0 : mouse.x * 12;
  const parallaxY = reduced ? 0 : mouse.y * 12;

  const sizes = {
    hero: 'aspect-[4/5] w-full max-w-md',
    about: 'aspect-square w-full max-w-sm',
    gallery: 'aspect-[5/4] w-full',
  };
  const widths = {
    hero: 'w-full max-w-md',
    about: 'w-full max-w-sm',
    gallery: 'w-full',
  };

  const showImage = src && !errored;

  return (
    <div className={`relative ${widths[variant]} ${className}`}>
      {/* Glow ring */}
      <div
        className="absolute -inset-4 rounded-[2rem] opacity-50 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(0,229,255,0.25), rgba(65,105,255,0.15) 50%, transparent 70%)',
        }}
      />

      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor="view"
        data-cursor-label="ABHISHEK"
        className={`group relative ${sizes[variant]} overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#080d1b]/60 backdrop-blur transition-transform duration-300 ease-out [transform-style:preserve-3d]`}
        style={{ willChange: 'transform' }}
      >
        {/* Scan line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-cyan-400/15 to-transparent"
          style={{ animation: 'scan 4s linear infinite' }}
        />

        {showImage && (
          <img
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)` }}
          />
        )}

        {/* Cyan rim lighting overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 55%, rgba(3,4,11,0.7) 100%), radial-gradient(circle at 50% 0%, rgba(0,229,255,0.12), transparent 60%)',
          }}
        />

        {/* HUD corners */}
        <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-cyan-400/60" />
        <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-cyan-400/60" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-cyan-400/60" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-cyan-400/60" />

        {caption && (
          <div className="absolute bottom-4 left-4 z-20">
            <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/80">{caption}</p>
          </div>
        )}
      </div>

      {variant !== 'hero' && (
        <div
          className="absolute -right-3 top-1/3 hidden rounded-full border border-cyan-400/30 bg-[#080d1b]/80 px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-cyan-300 backdrop-blur md:block animate-float"
          style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
        >
          DEV_PORTrait
        </div>
      )}
    </div>
  );
}
