"use client";

import { useEffect, useRef } from "react";

function parseColorToRgb(color: string, fallback: [number, number, number]): [number, number, number] {
  if (!color) return fallback;
  const hex = color.trim().replace(/^#/, "");
  if (hex.length === 6) {
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return [r, g, b];
  }
  return fallback;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const computed = window.getComputedStyle(document.documentElement);
    const brassVal = computed.getPropertyValue("--color-primary").trim();
    const forestVal = computed.getPropertyValue("--color-accent").trim();
    const inkVal = computed.getPropertyValue("--color-foreground").trim();

    const [br, bg, bb] = parseColorToRgb(brassVal, [199, 154, 92]);
    const [fr, fg, fb] = parseColorToRgb(forestVal, [54, 75, 60]);
    const [ir, ig, ib] = parseColorToRgb(inkVal, [23, 20, 15]);

    const lr = Math.min(255, Math.round(br * 0.8 + 255 * 0.2));
    const lg = Math.min(255, Math.round(bg * 0.8 + 255 * 0.2));
    const lb = Math.min(255, Math.round(bb * 0.8 + 255 * 0.2));

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetMouseY = Math.max(0, Math.min(1, e.clientY / window.innerHeight));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;
    let lastTime = 0;

    const render = (currentTime: number) => {
      if (!isVisible) return;

      const isMobile = window.innerWidth < 768;
      if (isMobile && currentTime - lastTime < 32) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      time += 0.007;

      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;

      ctx.clearRect(0, 0, width, height);

      const progress = (1 - Math.cos(time)) / 2;

      const startX = -width * 0.12;
      const startY = height * 0.14;
      const endX = width * 1.12;
      const endY = height * 0.86;

      const mouseOffsetX = (mouseX - 0.5) * 60;
      const mouseOffsetY = (mouseY - 0.5) * 45;

      const orbX = startX + (endX - startX) * progress + mouseOffsetX;
      const orbY = startY + (endY - startY) * progress + mouseOffsetY;
      const orbRadius = Math.max(width, height) * 0.46;

      const grad1 = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius);
      grad1.addColorStop(0, `rgba(${br}, ${bg}, ${bb}, 0.24)`);
      grad1.addColorStop(0.35, `rgba(${br}, ${bg}, ${bb}, 0.10)`);
      grad1.addColorStop(0.70, `rgba(${br}, ${bg}, ${bb}, 0.02)`);
      grad1.addColorStop(1, `rgba(${ir}, ${ig}, ${ib}, 0)`);
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const progressTrail = (1 - Math.cos(time - 0.32)) / 2;
      const trailX = startX + (endX - startX) * progressTrail + mouseOffsetX * 0.7;
      const trailY = startY + (endY - startY) * progressTrail + mouseOffsetY * 0.7;
      const trailRadius = Math.max(width, height) * 0.36;

      const grad2 = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, trailRadius);
      grad2.addColorStop(0, `rgba(${lr}, ${lg}, ${lb}, 0.18)`);
      grad2.addColorStop(0.40, `rgba(${br}, ${bg}, ${bb}, 0.06)`);
      grad2.addColorStop(0.80, `rgba(${br}, ${bg}, ${bb}, 0.01)`);
      grad2.addColorStop(1, `rgba(${ir}, ${ig}, ${ib}, 0)`);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const counterProgress = 1 - progress;
      const counterX = width * 0.18 + counterProgress * width * 0.15;
      const counterY = height * 0.75 - counterProgress * height * 0.20;
      const counterRadius = Math.max(width, height) * 0.42;

      const grad3 = ctx.createRadialGradient(counterX, counterY, 0, counterX, counterY, counterRadius);
      grad3.addColorStop(0, `rgba(${fr}, ${fg}, ${fb}, 0.18)`);
      grad3.addColorStop(0.50, `rgba(${fr}, ${fg}, ${fb}, 0.05)`);
      grad3.addColorStop(1, `rgba(${ir}, ${ig}, ${ib}, 0)`);
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 blur-2xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-foreground)_15%,transparent)_0%,color-mix(in_srgb,var(--color-foreground)_72%,transparent)_65%,var(--color-foreground)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-foreground to-transparent" />
    </div>
  );
}
