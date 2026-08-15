"use client";

import { useRef, useState } from "react";
import { Camera, AudioLines, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Tab = {
  name: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
};

const ICONS = [Camera, AudioLines, FlaskConical];

export function DetectionTech() {
  const t = useTranslations("detection");
  const tabs = t.raw("tabs") as Tab[];
  const [active, setActive] = useState(0);
  const current = tabs[active];
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    },
    { dependencies: [active], scope: panelRef }
  );

  return (
    <section id="deteksi" className="relative bg-forest-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, i) => {
              const Icon = ICONS[i];
              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active === i
                      ? "bg-forest-600 text-white"
                      : "border border-line bg-surface text-muted hover:border-forest-400 hover:text-ink"
                  }`}
                >
                  <Icon size={16} strokeWidth={2} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div className="mt-8 min-h-[280px] overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-sm">
            <div ref={panelRef}>
              <h3 className="font-display text-2xl font-semibold text-ink">
                {current.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                {current.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {current.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-line bg-forest-50 p-5"
                  >
                    <p className="font-display text-2xl font-bold text-forest-700">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
