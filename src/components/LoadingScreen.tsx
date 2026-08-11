"use client";

import { useEffect, useRef, useState } from "react";
import { Drone } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function LoadingScreen({
  brand,
  tagline,
}: {
  brand: string;
  tagline: string;
}) {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<SVGSVGElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.to(rootRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => setDone(true),
          });
        },
      });

      tl.fromTo(
        ringRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0
      )
        .fromTo(
          droneRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4 },
          0.25
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.4
        )
        .to(
          sweepRef.current,
          { rotate: 360, duration: 1.8, ease: "none" },
          0.3
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power1.inOut" },
          0.5
        );
    },
    { scope: rootRef }
  );

  // Safety net: never let the loading screen block the site if animations
  // don't run (e.g. reduced-motion edge cases or a stalled tick source).
  useEffect(() => {
    const fallback = setTimeout(() => setDone(true), 4000);
    return () => clearTimeout(fallback);
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background"
    >
      <div
        ref={ringRef}
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-line"
      >
        <div
          ref={sweepRef}
          className="absolute inset-0 rounded-full border-t-2 border-forest-500"
        />
        <Drone
          ref={droneRef}
          size={30}
          strokeWidth={1.6}
          className="text-forest-600"
        />
      </div>

      <div ref={textRef} className="mt-6 text-center">
        <p className="font-display text-xl font-semibold tracking-tight text-ink">
          {brand}
        </p>
        <p className="mt-1.5 text-sm text-muted">{tagline}</p>
      </div>

      <div className="mt-8 h-px w-40 origin-left overflow-hidden bg-line">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-forest-500"
        />
      </div>
    </div>
  );
}
