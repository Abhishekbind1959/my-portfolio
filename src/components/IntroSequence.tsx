import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePortfolio';
import { PERSONAL } from '@/data/portfolio';

type Props = {
  onComplete: () => void;
};

const NAME = PERSONAL.name.toUpperCase().split('');

export default function IntroSequence({ onComplete }: Props) {
  const [phase, setPhase] = useState(0); // 0 space, 1 blackhole, 2 name, 3 done
  const [skipped, setSkipped] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      onComplete();
      return;
    }

    // Skip for repeat visits in the same session
    try {
      if (sessionStorage.getItem('ab_intro_seen') === '1') {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 2300);
    const t3 = setTimeout(() => {
      setPhase(3);
      try {
        sessionStorage.setItem('ab_intro_seen', '1');
      } catch {
        // ignore
      }
      setTimeout(onComplete, 600);
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSkip() {
    setSkipped(true);
    try {
      sessionStorage.setItem('ab_intro_seen', '1');
    } catch {
      // ignore
    }
    onComplete();
  }

  useEffect(() => {
    if (reduced || skipped) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const safeCanvas = canvas;
    const safeCtx = ctx;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const startTime = performance.now();

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      safeCanvas.width = w * dpr;
      safeCanvas.height = h * dpr;
      safeCanvas.style.width = w + 'px';
      safeCanvas.style.height = h + 'px';
      safeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const starCount = 260;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),
      size: 0.3 + Math.random() * 1.6,
      a: 0.2 + Math.random() * 0.7,
    }));

    function draw(t: number) {
      const elapsed = (t - startTime) / 1000;
      safeCtx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const drift = elapsed * s.z * 8;
        safeCtx.beginPath();
        safeCtx.arc(s.x, (s.y + drift) % h, s.size, 0, Math.PI * 2);
        safeCtx.fillStyle = `rgba(255,255,255,${s.a})`;
        safeCtx.fill();
      }

      const cx = w / 2;
      const cy = h / 2;

      // Black hole — accretion disk
      if (phase >= 1) {
        const intensity = Math.min(1, (elapsed - 0.9) / 1.2);
        const push = Math.min(1, (elapsed - 0.9) / 3); // camera push

        // Accretion disk rings
        for (let i = 0; i < 40; i++) {
          const ringR = 60 + i * 7 + Math.sin(elapsed * 1.5 + i * 0.4) * 3;
          const rot = elapsed * (0.6 - i * 0.008) + i * 0.2;
          const tilt = 0.32; // disk tilt
          const segments = 60;
          for (let j = 0; j < segments; j++) {
            const a0 = (j / segments) * Math.PI * 2 + rot;
            const a1 = ((j + 1) / segments) * Math.PI * 2 + rot;
            const r0 = ringR;
            const r1 = ringR;
            const x0 = cx + Math.cos(a0) * r0;
            const y0 = cy + Math.sin(a0) * r0 * tilt;
            const x1 = cx + Math.cos(a1) * r1;
            const y1 = cy + Math.sin(a1) * r1 * tilt;
            const depthFactor = (Math.sin(a0) + 1) / 2; // front brighter
            const alpha = intensity * (0.04 + depthFactor * 0.05) * (1 - i / 45);
            const hue = 190 - i * 2.5;
            safeCtx.strokeStyle = `hsla(${hue}, 100%, ${55 + depthFactor * 15}%, ${alpha})`;
            safeCtx.lineWidth = 2.2;
            safeCtx.beginPath();
            safeCtx.moveTo(x0, y0);
            safeCtx.lineTo(x1, y1);
            safeCtx.stroke();
          }
        }

        // Core glow
        const coreR = 50 + Math.sin(elapsed * 2) * 4;
        const glow = safeCtx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3.5);
        glow.addColorStop(0, `rgba(0,0,0,${0.95 * intensity})`);
        glow.addColorStop(0.4, `rgba(3,4,11,${0.85 * intensity})`);
        glow.addColorStop(0.7, `rgba(0,229,255,${0.12 * intensity})`);
        glow.addColorStop(1, 'rgba(0,229,255,0)');
        safeCtx.fillStyle = glow;
        safeCtx.beginPath();
        safeCtx.arc(cx, cy, coreR * 3.5, 0, Math.PI * 2);
        safeCtx.fill();

        // Event horizon
        safeCtx.beginPath();
        safeCtx.arc(cx, cy, coreR * (0.8 + push * 0.15), 0, Math.PI * 2);
        safeCtx.fillStyle = '#000';
        safeCtx.fill();

        // Photon ring
        safeCtx.beginPath();
        safeCtx.arc(cx, cy, coreR * 0.92, 0, Math.PI * 2);
        safeCtx.strokeStyle = `rgba(0,229,255,${0.6 * intensity})`;
        safeCtx.lineWidth = 1.5;
        safeCtx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [phase, reduced, skipped]);

  if (reduced || skipped) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#03040b] transition-opacity duration-700"
      style={{ opacity: phase === 3 ? 0 : 1 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      {/* Name reveal */}
      <div className="relative z-10 px-6 text-center">
        <div
          className="flex flex-wrap items-center justify-center gap-x-1 text-3xl font-bold tracking-[0.15em] sm:text-5xl md:text-7xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {phase >= 2 &&
            NAME.map((ch, i) => (
              <span
                key={i}
                className="gradient-text neon-text"
                style={{
                  opacity: 0,
                  animation: `fade-up 0.5s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`,
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
        </div>
        <div
          className="mt-4 overflow-hidden"
          style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.6s 0.6s' }}
        >
          <p className="section-label">ASPIRING WEB DEVELOPER</p>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        data-cursor="hover"
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-cyan-200 backdrop-blur transition hover:border-cyan-400/70 hover:bg-cyan-400/10"
      >
        SKIP INTRO
        <span className="inline-block h-3 w-px bg-cyan-400/60" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
          style={{ animation: 'scan 4s linear forwards', transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
}
