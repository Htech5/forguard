"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !droneRef.current || !contentRef.current)
        return;

      gsap.to(droneRef.current, {
        x: "12vw",
        y: "-8vh",
        rotate: 6,
        scale: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "65% top",
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        droneRef.current,
        { y: "-1%" },
        {
          y: "1.5%",
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-line bg-forest-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:64px_64px] opacity-40"
      />

      <div
        ref={droneRef}
        className="pointer-events-none absolute right-[4%] top-[14%] hidden w-[32vw] max-w-sm xl:block"
        style={{
          maskImage:
            "radial-gradient(closest-side, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 60%, transparent 100%)",
        }}
      >
        <Image
          src="/img/Drone 3.JPG"
          alt="ForGuard drone 3D render"
          width={800}
          height={800}
          priority
          className="aspect-square rounded-full border border-line object-cover shadow-xl shadow-forest-900/10"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-7xl px-6 py-24"
      >
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-600">
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#unduh"
              className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
            >
              <Download size={16} strokeWidth={2.25} />
              {t("ctaPrimary")}
            </a>
            <a
              href="#cara-kerja"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest-400 hover:text-forest-700"
            >
              {t("ctaSecondary")}
              <ArrowRight size={16} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
