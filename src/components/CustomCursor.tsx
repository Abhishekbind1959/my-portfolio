import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePortfolio';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [label, setLabel] = useState('');
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Disable on touch / small screens
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        setHidden(false);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        const c = target.dataset.cursor;
        if (c === 'view') {
          setVariant('view');
          setLabel(target.dataset.cursorLabel || 'VIEW');
        } else {
          setVariant('hover');
          setLabel('');
        }
      } else {
        setVariant('default');
        setLabel('');
      }
    }

    function onDown() {
      if (ringRef.current) ringRef.current.style.transform += ' scale(0.8)';
    }
    function onUp() {
      // ring scale resets via raf loop
    }
    function onLeave() {
      setHidden(true);
      visible = false;
    }
    function onEnter() {
      setHidden(false);
      visible = true;
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        const scale = variant === 'view' ? 1.9 : variant === 'hover' ? 1.6 : 1;
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [reduced, variant]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-cyan-300 transition-opacity duration-200"
        style={{
          opacity: hidden ? 0 : 1,
          boxShadow: '0 0 12px rgba(0,229,255,0.9), 0 0 24px rgba(0,229,255,0.4)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[opacity,border-color,background-color] duration-200"
        style={{
          opacity: hidden ? 0 : 1,
          width: 36,
          height: 36,
          borderColor: variant === 'view' ? 'rgba(0,229,255,0.9)' : 'rgba(0,229,255,0.4)',
          backgroundColor: variant === 'view' ? 'rgba(0,229,255,0.08)' : 'transparent',
        }}
      >
        {label && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[8px] tracking-[0.2em] text-cyan-200">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
