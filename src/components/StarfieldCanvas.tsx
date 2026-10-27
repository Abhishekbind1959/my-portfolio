import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePortfolio';

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkle: number;
  twinkleSpeed: number;
  hue: number;
};

type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

type Props = {
  className?: string;
  /** 0..1 density multiplier */
  density?: number;
  showShootingStars?: boolean;
};

const STAR_COLORS = [
  { r: 255, g: 255, b: 255 },
  { r: 200, g: 230, b: 255 },
  { r: 0, g: 229, b: 255 },
  { r: 157, g: 78, b: 221 },
];

export default function StarfieldCanvas({ className = '', density = 1, showShootingStars = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxNullable = canvas.getContext('2d');
    if (!ctxNullable) return;
    const ctx: CanvasRenderingContext2D = ctxNullable;
    const safeCanvas = canvas;
    const safeCtx = ctx;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let shooting: Shooting[] = [];
    let raf = 0;
    let lastShoot = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const isMobile = window.innerWidth < 768;
    const baseCount = isMobile ? 140 : 320;
    const count = Math.floor(baseCount * density);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      safeCanvas.width = w * dpr;
      safeCanvas.height = h * dpr;
      safeCanvas.style.width = w + 'px';
      safeCanvas.style.height = h + 'px';
      safeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < count; i++) {
        const colorIdx = Math.floor(Math.random() * STAR_COLORS.length);
        const depth = Math.random();
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: depth,
          size: 0.4 + depth * 1.8,
          baseAlpha: 0.25 + depth * 0.7,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 1.6,
          hue: colorIdx,
        });
      }
    }

    function spawnShooting() {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -50 : w + 50;
      const startY = Math.random() * h * 0.6;
      const speed = 6 + Math.random() * 5;
      const angle = fromLeft ? Math.PI * 0.18 : Math.PI - Math.PI * 0.18;
      shooting.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 80 + Math.random() * 40,
      });
    }

    function drawNebula() {
      // Subtle nebula blobs
      const blobs = isMobile ? 2 : 4;
      const nebColors = [
        { r: 65, g: 105, b: 255 },
        { r: 157, g: 78, b: 221 },
        { r: 0, g: 229, b: 255 },
      ];
      for (let i = 0; i < blobs; i++) {
        const c = nebColors[i % nebColors.length];
        const nx = (w * (0.2 + i * 0.25)) + Math.sin(perfTime * 0.0001 + i) * 60;
        const ny = h * (0.3 + (i % 2) * 0.35) + Math.cos(perfTime * 0.0001 + i) * 40;
        const r = Math.min(w, h) * (0.25 + (i % 2) * 0.1);
        const g = safeCtx.createRadialGradient(nx, ny, 0, nx, ny, r);
        g.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.06)`);
        g.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        safeCtx.fillStyle = g;
        safeCtx.fillRect(0, 0, w, h);
      }
    }

    let perfTime = 0;
    function tick(t: number) {
      perfTime = t;
      safeCtx.clearRect(0, 0, w, h);

      // Nebula
      drawNebula();

      // Parallax interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Stars
      for (const s of stars) {
        s.twinkle += s.twinkleSpeed * 0.016;
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        const px = s.x + mouseX * s.z * 30;
        const py = s.y + mouseY * s.z * 30;
        const c = STAR_COLORS[s.hue];
        safeCtx.beginPath();
        safeCtx.arc(px, py, s.size, 0, Math.PI * 2);
        safeCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        safeCtx.fill();
        if (s.size > 1.2) {
          safeCtx.beginPath();
          safeCtx.arc(px, py, s.size * 2.6, 0, Math.PI * 2);
          safeCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha * 0.12})`;
          safeCtx.fill();
        }
      }

      // Shooting stars
      if (showShootingStars && !reduced && !isMobile && t - lastShoot > 6000 + Math.random() * 8000) {
        spawnShooting();
        lastShoot = t;
      }
      shooting = shooting.filter((sh) => sh.life < sh.maxLife);
      for (const sh of shooting) {
        sh.life += 1;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const tailX = sh.x - sh.vx * 6;
        const tailY = sh.y - sh.vy * 6;
        const grad = safeCtx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        const fade = 1 - sh.life / sh.maxLife;
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
        grad.addColorStop(0.4, `rgba(0,229,255,${0.5 * fade})`);
        grad.addColorStop(1, 'rgba(0,229,255,0)');
        safeCtx.strokeStyle = grad;
        safeCtx.lineWidth = 2;
        safeCtx.beginPath();
        safeCtx.moveTo(sh.x, sh.y);
        safeCtx.lineTo(tailX, tailY);
        safeCtx.stroke();
      }

      raf = requestAnimationFrame(tick);
    }

    function onMouse(e: MouseEvent) {
      targetMouseX = (e.clientX / w - 0.5) * 2;
      targetMouseY = (e.clientY / h - 0.5) * 2;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [density, showShootingStars, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
