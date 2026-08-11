"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Tab = {
  name: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
};

export function DetectionTech() {
  const t = useTranslations("detection");
  const tabs = t.raw("tabs") as Tab[];
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <section id="deteksi" className="relative bg-forest-900/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === i
                    ? "bg-forest-300 text-forest-950"
                    : "border border-forest-700 text-mist hover:border-forest-400 hover:text-forest-100"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="mt-8 min-h-[280px] rounded-2xl border border-forest-800 bg-forest-950/60 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h3 className="font-display text-2xl font-semibold text-forest-100">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-mist">
                  {current.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {current.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-forest-800 bg-forest-900/60 p-5"
                    >
                      <p className="font-display text-2xl font-bold text-forest-300">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-mist">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
