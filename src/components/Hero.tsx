"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const droneX = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const droneY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const droneRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const droneScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-noise"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-950 to-forest-950"
        style={{ y: bgY }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950 to-transparent" />

      <motion.div
        className="pointer-events-none absolute right-[2%] top-[8%] hidden w-[34vw] max-w-sm opacity-90 xl:block"
        style={{
          x: droneX,
          y: droneY,
          rotate: droneRotate,
          scale: droneScale,
          maskImage:
            "radial-gradient(closest-side, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 55%, transparent 100%)",
        }}
        animate={{ y: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/img/Drone 3.JPG"
          alt="ForGuard drone 3D render"
          width={800}
          height={800}
          priority
          className="aspect-square rounded-full object-cover"
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 py-24"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest-300">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-balance text-forest-100 sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#unduh"
              className="rounded-full bg-forest-300 px-6 py-3 text-sm font-semibold text-forest-950 transition-transform hover:scale-105"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#cara-kerja"
              className="rounded-full border border-forest-700 px-6 py-3 text-sm font-semibold text-forest-100 transition-colors hover:border-forest-400 hover:text-forest-200"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-mist"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {t("scrollHint")}
      </motion.div>
    </section>
  );
}
