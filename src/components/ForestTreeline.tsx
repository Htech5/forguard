"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LOADER_DONE_EVENT } from "./LoadingScreen";
import "./ForestTreeline.css";

const VB_W = 1600;
const VB_H = 300;
const BASE_Y = VB_H;

type SprigSpec = { x: number; h: number; sway: number; leaves: number };

const LAYOUT: SprigSpec[] = [
  { x: 30, h: 186, sway: -14, leaves: 10 },
  { x: 98, h: 122, sway: 10, leaves: 8 },
  { x: 168, h: 238, sway: -8, leaves: 13 },
  { x: 246, h: 150, sway: 16, leaves: 8 },
  { x: 318, h: 204, sway: -18, leaves: 11 },
  { x: 392, h: 128, sway: 8, leaves: 8 },
  { x: 458, h: 252, sway: 12, leaves: 13 },
  { x: 540, h: 162, sway: -10, leaves: 9 },
  { x: 612, h: 216, sway: 18, leaves: 12 },
  { x: 690, h: 132, sway: -8, leaves: 8 },
  { x: 756, h: 232, sway: 10, leaves: 13 },
  { x: 836, h: 156, sway: -16, leaves: 8 },
  { x: 906, h: 198, sway: 8, leaves: 10 },
  { x: 980, h: 124, sway: -10, leaves: 8 },
  { x: 1046, h: 244, sway: 14, leaves: 13 },
  { x: 1126, h: 168, sway: -12, leaves: 9 },
  { x: 1196, h: 210, sway: 10, leaves: 11 },
  { x: 1272, h: 130, sway: -8, leaves: 8 },
  { x: 1338, h: 228, sway: 16, leaves: 13 },
  { x: 1416, h: 154, sway: -14, leaves: 8 },
  { x: 1486, h: 194, sway: 8, leaves: 10 },
  { x: 1558, h: 126, sway: -10, leaves: 8 },
];

// Node and the browser stringify long floats differently, which trips React's
// hydration check — round every number that ends up in an attribute.
const r = (n: number) => n.toFixed(2);

// Deterministic per-leaf jitter (same value on server and client).
const noise = (seed: number) => {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return v - Math.floor(v);
};

// Quadratic bezier stem: base -> tip, with a lateral sway so no two read alike.
function stemPoint(x: number, h: number, sway: number, t: number) {
  const p0 = { x, y: BASE_Y };
  const p1 = { x: x + sway * 0.4, y: BASE_Y - h * 0.55 };
  const p2 = { x: x + sway, y: BASE_Y - h };
  const u = 1 - t;

  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
    dx: 2 * u * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    dy: 2 * u * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  };
}

/**
 * One leaf growing along +x from its attachment point at (0, 0). The blade is
 * asymmetric and its tip curls off-axis, so it reads as foliage rather than an
 * ellipse; the caller mirrors it vertically for leaves on the other side.
 */
function leafPath(len: number, curl: number) {
  const w = len * 0.34;
  const bend = -w * curl; // tip lifts away from the stem axis

  return [
    `M 0 0`,
    `C ${r(len * 0.2)} ${r(-w * 0.95)}, ${r(len * 0.66)} ${r(bend - w * 0.85)}, ${r(len)} ${r(bend)}`,
    `C ${r(len * 0.6)} ${r(bend + w * 0.3)}, ${r(len * 0.3)} ${r(w * 0.55)}, 0 0`,
    `Z`,
  ].join(" ");
}

function Sprig({ x, h, sway, leaves, scale, seed }: SprigSpec & { scale: number; seed: number }) {
  const sh = h * scale;
  const maxLeaf = 14 + sh * 0.085;
  const first = 0.14; // bare stem below the lowest leaf

  const tip = stemPoint(x, sh, sway, 1);

  const nodes = Array.from({ length: leaves }, (_, i) => {
    const t = first + ((1 - first) * i) / (leaves - 1);
    const p = stemPoint(x, sh, sway, t);
    const stemAngle = (Math.atan2(p.dy, p.dx) * 180) / Math.PI;
    const side = i % 2 === 0 ? -1 : 1;
    const j = noise(seed + i * 7.31);

    return {
      t,
      x: p.x,
      y: p.y,
      side,
      // splay wide and droopy at the base, tightening upward, plus a little jitter
      angle: stemAngle + side * (68 - t * 34 + (j - 0.5) * 16),
      len: maxLeaf * (1 - t * 0.58) * (0.82 + j * 0.36),
      curl: 0.5 + j * 0.7,
    };
  });

  return (
    <g>
      <path
        className="treeline-stem"
        pathLength={1}
        fill="none"
        strokeWidth={r(1.8 + sh * 0.007)}
        strokeLinecap="round"
        d={`M ${x} ${BASE_Y} Q ${r(x + sway * 0.4)} ${r(BASE_Y - sh * 0.55)} ${r(tip.x)} ${r(tip.y)}`}
      />
      {nodes.map((n, i) => (
        <g
          key={i}
          transform={`translate(${r(n.x)} ${r(n.y)}) rotate(${r(n.angle)}) scale(1 ${n.side})`}
        >
          <path className="treeline-leaf" data-t={r(n.t)} d={leafPath(n.len, n.curl)} />
        </g>
      ))}
      {/* crown leaf, straight up the stem */}
      <g transform={`translate(${r(tip.x)} ${r(tip.y)}) rotate(${r((Math.atan2(tip.dy, tip.dx) * 180) / Math.PI)})`}>
        <path className="treeline-leaf" data-t="1" d={leafPath(maxLeaf * 0.46, 0.4)} />
      </g>
    </g>
  );
}

export function ForestTreeline({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stems = gsap.utils.toArray<SVGPathElement>(".treeline-stem");
      const leaves = gsap.utils.toArray<SVGPathElement>(".treeline-leaf");

      if (reduce) {
        gsap.set(stems, { strokeDashoffset: 0 });
        gsap.set(leaves, { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ paused: true });

      tl.to(stems, { strokeDashoffset: 0, duration: 1.3, ease: "power2.out" }).to(
        leaves,
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
          // each leaf unfurls exactly as the stem tip passes it
          stagger: (_i, el) => Number((el as HTMLElement).dataset.t) * 1.1,
        },
        0.15
      );

      // The treeline sits above the fold, so scrolling into view can't be the
      // cue — it only starts once the loading screen is out of the way. After
      // that it retracts when scrolled past and regrows on the way back up.
      let ready = false;

      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => ready && tl.play(),
        onEnterBack: () => ready && tl.play(),
        onLeave: () => tl.reverse(),
        onLeaveBack: () => tl.reverse(),
      });

      const start = () => {
        ready = true;
        if (trigger.isActive) tl.play();
      };

      window.addEventListener(LOADER_DONE_EVENT, start, { once: true });
      return () => window.removeEventListener(LOADER_DONE_EVENT, start);
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax meet"
      className={className}
    >
      {/* Back layer is deliberately sparse — every other plant is enough for
          depth, at half the animated nodes. */}
      <g className="fill-forest-200/80 stroke-forest-200/80">
        {LAYOUT.filter((_, i) => i % 2 === 0).map((s, i) => (
          <Sprig key={`back-${i}`} {...s} x={s.x + 40} scale={0.8} seed={i + 1} />
        ))}
      </g>
      <g className="fill-forest-500 stroke-forest-500">
        {LAYOUT.map((s, i) => (
          <Sprig key={`front-${i}`} {...s} scale={1} seed={i + 41} />
        ))}
      </g>
    </svg>
  );
}
