"use client";

import { useEffect, useRef } from "react";
import type { Chip, FighterId, Vec2, World } from "@/lib/math-wars/types";
import { isSolid } from "@/lib/math-wars/world";

export type Playback = {
  key: number;
  points: Vec2[];
  chips: Chip[];
  color: string;
};

type ArenaCanvasProps = {
  world: World;
  preview: Vec2[];
  previewColor: string;
  playback: Playback | null;
  aimId: FighterId | null;
  overlay?: string;
  onChip?: (chip: Chip) => void;
  onPlaybackDone?: (key: number) => void;
};

const SPEED = 30;

function worldToScreen(
  world: World,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
) {
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;
  const scale = Math.min(cw / world.width, ch / world.height);
  const ox = (cw - world.width * scale) / 2;
  const oy = (ch - world.height * scale) / 2;
  return {
    x: ox + x * scale,
    y: oy + (world.height - y) * scale,
    scale,
  };
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  world: World,
  canvas: HTMLCanvasElement,
) {
  const a = worldToScreen(world, canvas, 0, 0);
  const b = worldToScreen(world, canvas, world.width, world.height);
  ctx.fillStyle = "#12171e";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.beginPath();
  for (let x = 0; x <= world.width; x += 1) {
    const p = worldToScreen(world, canvas, x, 0);
    ctx.moveTo(p.x, a.y);
    ctx.lineTo(p.x, b.y);
  }
  for (let y = 0; y <= world.height; y += 1) {
    const p = worldToScreen(world, canvas, 0, y);
    ctx.moveTo(a.x, p.y);
    ctx.lineTo(b.x, p.y);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  for (let x = 0; x <= world.width; x += 5) {
    const p = worldToScreen(world, canvas, x, 0);
    ctx.moveTo(p.x, a.y);
    ctx.lineTo(p.x, b.y);
  }
  for (let y = 0; y <= world.height; y += 5) {
    const p = worldToScreen(world, canvas, 0, y);
    ctx.moveTo(a.x, p.y);
    ctx.lineTo(b.x, p.y);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.stroke();
}

function drawBricks(
  ctx: CanvasRenderingContext2D,
  world: World,
  canvas: HTMLCanvasElement,
  extraHoles: Set<string>,
) {
  for (let y = 0; y < world.height; y += 1) {
    for (let x = 0; x < world.width; x += 1) {
      if (!isSolid(world, x, y) || extraHoles.has(`${x},${y}`)) continue;
      const p = worldToScreen(world, canvas, x, y + 1);
      const s = p.scale;
      const pad = Math.max(1, s * 0.08);
      ctx.fillStyle = "#c9a06a";
      ctx.strokeStyle = "#7c5633";
      ctx.lineWidth = 1;
      ctx.fillRect(p.x + pad, p.y + pad, s - pad * 2, s - pad * 2);
      ctx.strokeRect(p.x + pad, p.y + pad, s - pad * 2, s - pad * 2);
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.beginPath();
      ctx.arc(p.x + s * 0.5, p.y + s * 0.38, s * 0.16, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  world: World,
  canvas: HTMLCanvasElement,
  points: Vec2[],
  color: string,
  width: number,
  alpha: number,
) {
  if (points.length < 2) return;
  ctx.beginPath();
  points.forEach((pt, i) => {
    const p = worldToScreen(world, canvas, pt.x, pt.y);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawFighter(
  ctx: CanvasRenderingContext2D,
  world: World,
  canvas: HTMLCanvasElement,
  id: FighterId,
  aiming: boolean,
) {
  const unit = id === "blue" ? world.blue : world.red;
  const p = worldToScreen(world, canvas, unit.x, unit.y);
  const r = p.scale * 0.62;
  ctx.save();
  if (aiming) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2);
    ctx.strokeStyle = id === "blue" ? "rgba(96,165,250,0.55)" : "rgba(251,146,60,0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  const grad = ctx.createRadialGradient(
    p.x - r * 0.3,
    p.y - r * 0.35,
    2,
    p.x,
    p.y,
    r,
  );
  if (id === "blue") {
    grad.addColorStop(0, "#dbeafe");
    grad.addColorStop(1, "#2563eb");
  } else {
    grad.addColorStop(0, "#ffedd5");
    grad.addColorStop(1, "#ea580c");
  }
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(p.x - r * 0.18, p.y - r * 0.1, r * 0.12, 0, Math.PI * 2);
  ctx.arc(p.x + r * 0.2, p.y - r * 0.1, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const pipY = p.y - r - 10;
  for (let i = 0; i < unit.maxHp; i += 1) {
    ctx.beginPath();
    ctx.arc(p.x - ((unit.maxHp - 1) * 6) / 2 + i * 6, pipY, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = i < unit.hp ? "#f43f5e" : "rgba(255,255,255,0.18)";
    ctx.fill();
  }
}

export function ArenaCanvas({
  world,
  preview,
  previewColor,
  playback,
  aimId,
  overlay,
  onChip,
  onPlaybackDone,
}: ArenaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const holesRef = useRef<Set<string>>(new Set());
  const firedChipsRef = useRef<Set<number>>(new Set());
  const indexRef = useRef(0);
  const doneRef = useRef(false);
  const playbackRef = useRef(playback);
  const worldRef = useRef(world);
  const previewRef = useRef(preview);
  const previewColorRef = useRef(previewColor);
  const aimRef = useRef(aimId);
  const overlayRef = useRef(overlay);
  const onChipRef = useRef(onChip);
  const onDoneRef = useRef(onPlaybackDone);

  playbackRef.current = playback;
  worldRef.current = world;
  previewRef.current = preview;
  previewColorRef.current = previewColor;
  aimRef.current = aimId;
  overlayRef.current = overlay;
  onChipRef.current = onChip;
  onDoneRef.current = onPlaybackDone;

  useEffect(() => {
    holesRef.current = new Set();
    firedChipsRef.current = new Set();
    indexRef.current = 0;
    doneRef.current = false;
  }, [playback?.key]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const shot = playbackRef.current;
      if (shot && !doneRef.current) {
        indexRef.current += (dt * SPEED) / 0.08;
        const max = shot.points.length - 1;
        if (indexRef.current >= max) {
          indexRef.current = max;
          if (!doneRef.current) {
            doneRef.current = true;
            onDoneRef.current?.(shot.key);
          }
        }
        shot.chips.forEach((chip) => {
          if (
            indexRef.current >= chip.at &&
            !firedChipsRef.current.has(chip.at)
          ) {
            firedChipsRef.current.add(chip.at);
            holesRef.current.add(`${chip.x},${chip.y}`);
            onChipRef.current?.(chip);
          }
        });
      }

      const ctx = canvas.getContext("2d");
      const currentWorld = worldRef.current;
      if (ctx) {
        drawGrid(ctx, currentWorld, canvas);
        drawBricks(ctx, currentWorld, canvas, holesRef.current);
        drawTrail(
          ctx,
          currentWorld,
          canvas,
          previewRef.current,
          previewColorRef.current,
          2,
          0.35,
        );
        const live = playbackRef.current;
        if (live) {
          const end = Math.max(2, Math.floor(indexRef.current));
          const slice = live.points.slice(0, end);
          drawTrail(ctx, currentWorld, canvas, slice, live.color, 3.5, 0.95);
          const bolt = live.points[Math.min(end, live.points.length - 1)];
          if (bolt) {
            const p = worldToScreen(currentWorld, canvas, bolt.x, bolt.y);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "#fff7ed";
            ctx.fill();
          }
        }
        drawFighter(ctx, currentWorld, canvas, "blue", aimRef.current === "blue");
        drawFighter(ctx, currentWorld, canvas, "red", aimRef.current === "red");

        const text = overlayRef.current;
        if (text) {
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.fillRect(0, canvas.clientHeight / 2 - 28, canvas.clientWidth, 56);
          ctx.fillStyle = "#fff";
          ctx.font =
            '600 22px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, canvas.clientWidth / 2, canvas.clientHeight / 2);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full min-h-[240px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
