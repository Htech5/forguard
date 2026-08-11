import { Drone, ScanEye, SunMedium } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS = [Drone, ScanEye, SunMedium];

export async function SolutionOverview() {
  const t = await getTranslations("solution");
  const pillars = t.raw("pillars") as { title: string; description: string }[];

  return (
    <section id="solusi" className="relative bg-forest-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-line bg-surface p-8 shadow-sm transition-colors hover:border-forest-400">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
