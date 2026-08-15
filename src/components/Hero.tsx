"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Download, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ForestTreeline } from "./ForestTreeline";

// Swap this for a ForGuard mobile app screenshot once it's ready — the
// framed showcase below is sized for either a drone render or an app UI.
const SHOWCASE_IMAGE = "/img/drone-1-nobg.webp";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = [
        badgeRef.current,
        headingRef.current,
        subtitleRef.current,
        ctaRef.current,
      ].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 16 });
      gsap.set(showcaseRef.current, { opacity: 0, y: 32 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
      }).to(
        showcaseRef.current,
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden border-b border-line bg-forest-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--forest-300)_1.5px,transparent_1.5px),linear-gradient(to_bottom,var(--forest-300)_1.5px,transparent_1.5px)] bg-size-[48px_48px] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full [background:radial-gradient(130%_70%_at_50%_0%,transparent_0%,var(--forest-50)_88%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 sm:pb-20 md:pt-36">
        <div className="text-center">
          <a
            ref={badgeRef}
            href="#deteksi"
            className="group mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-3 pr-1 text-xs shadow-sm transition-colors hover:border-forest-400 sm:gap-3 sm:pl-4 sm:text-sm"
          >
            <span className="text-ink">{t("badge")}</span>
            <span className="flex size-6 items-center justify-center overflow-hidden rounded-full bg-forest-100 text-forest-700">
              <ChevronRight
                size={14}
                strokeWidth={2.25}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </a>

          <h1
            ref={headingRef}
            className="mx-auto mt-6 max-w-4xl font-display text-[2.125rem] font-bold leading-[1.1] text-balance text-ink sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("title")}
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted sm:mt-8 sm:text-lg"
          >
            {t("subtitle")}
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center"
          >
            <a
              href="#unduh"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
            >
              <Download size={16} strokeWidth={2.25} />
              {t("ctaPrimary")}
            </a>
            <a
              href="#cara-kerja"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest-400 hover:text-forest-700"
            >
              {t("ctaSecondary")}
              <ArrowRight size={16} strokeWidth={2.25} />
            </a>
          </div>
        </div>

        <div ref={showcaseRef} className="relative mt-12 md:mt-20">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-forest-900/5 ring-1 ring-forest-900/5">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-forest-50">
              <Image
                src={SHOWCASE_IMAGE}
                alt="ForGuard drone 3D render"
                fill
                priority
                className="object-contain p-4 sm:p-8"
              />
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-1 h-24 bg-linear-to-b from-transparent to-forest-50"
          />
        </div>
      </div>

      <ForestTreeline className="pointer-events-none absolute inset-x-0 bottom-0 w-full" />
    </section>
  );
}
