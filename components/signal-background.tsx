"use client";

import { useEffect, useRef } from "react";

export default function SignalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.3 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      canvas.style.opacity = "0.2";
      return;
    }

    let animationFrame: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      };
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY / Math.max(window.innerHeight, 1);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(5, 8, 14, 0.5)";
      ctx.fillRect(0, 0, width, height);

      const waveCount = 6;
      for (let i = 0; i < waveCount; i += 1) {
        const offset = i * 90;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const progress = (x / width) * Math.PI * 2;
          const wave =
            Math.sin(progress + time * 0.0006 + offset * 0.01 + scrollRef.current) *
            (16 + i * 3);
          const drift = (pointerRef.current.y - 0.5) * 120;
          const y = height * (0.2 + i * 0.12) + wave + drift;
          ctx.lineTo(x, y);
        }
        const alpha = 0.12 + i * 0.03;
        ctx.strokeStyle = `rgba(123, 216, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const glowX = pointerRef.current.x * width;
      const glowY = pointerRef.current.y * height;
      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 220);
      gradient.addColorStop(0, "rgba(123, 216, 255, 0.2)");
      gradient.addColorStop(1, "rgba(5, 8, 14, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(draw);
    };
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      aria-hidden="true"
    />
  );
}
