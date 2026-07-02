import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const MOBILE_QUERY = "(max-width: 768px)";
const MOBILE_PARTICLE_CAP = 100;

function getEffectiveParticleCount(requested) {
  if (typeof window === "undefined") return requested;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  if (!isMobile) return requested;
  return Math.min(MOBILE_PARTICLE_CAP, Math.round(requested * 0.12));
}

function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function FlowFieldBackground({
  className,
  color = "#a855f7",
  trailColor = "0, 0, 0",
  trailOpacity = 0.12,
  particleCount = 600,
  speed = 1,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId;
    let isVisible = document.visibilityState !== "hidden";
    let mouse = { x: -1000, y: -1000 };
    const effectiveCount = getEffectiveParticleCount(particleCount);
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx -= dx * force * 0.05;
          this.vy -= dy * force * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.age++;

        if (this.age > this.life) this.reset();

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      draw(context) {
        context.fillStyle = color;
        const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
        context.globalAlpha = alpha * 0.7;
        context.fillRect(this.x, this.y, 1.5, 1.5);
      }
    }

    const init = () => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      if (nextWidth < 2 || nextHeight < 2) return false;

      width = nextWidth;
      height = nextHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      particles = [];
      for (let i = 0; i < effectiveCount; i++) {
        particles.push(new Particle());
      }
      return true;
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      if (width < 2 || height < 2) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      ctx.fillStyle = `rgba(${trailColor}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(ctx); });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState !== "hidden";
    };

    init();
    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailColor, trailOpacity, particleCount, speed]);

  if (prefersReducedMotion()) {
    return (
      <div
        className={cn(
          "absolute inset-0 min-h-full overflow-hidden bg-gradient-to-br from-primary/10 via-transparent to-accent/5",
          className
        )}
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0 min-h-full overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
