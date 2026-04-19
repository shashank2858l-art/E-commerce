'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable entirely on touch devices — no cursor to trail
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const MAX_PARTICLES = 30; // Cap particle count for performance
    let particles: { x: number; y: number; life: number; size: number }[] = [];
    let mouseActive = false;
    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId: number | null = null;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Add particle with probability throttle
      if (particles.length < MAX_PARTICLES && Math.random() > 0.5) {
        particles.push({
          x: mouseX,
          y: mouseY,
          life: 1.0,
          size: Math.random() * 3 + 1.5,
        });
      }

      // Start rendering if not already
      if (!mouseActive) {
        mouseActive = true;
        startRenderLoop();
      }

      // Reset idle timer
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        mouseActive = false;
      }, 2000);
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Disable expensive shadow — use simple circles instead
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        ctx.beginPath();
        ctx.fillStyle = `rgba(34, 197, 94, ${p.life * 0.8})`;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();

        p.life -= 0.05;
        p.x += (Math.random() - 0.5) * 1.2;
        p.y += (Math.random() - 0.5) * 1.2;

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Only continue loop if there are particles or mouse is active
      if (particles.length > 0 || mouseActive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    const startRenderLoop = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    resize();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[10000]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
