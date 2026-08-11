import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS = ["🛰️", "🧭", "☀️"];

export async function SolutionOverview() {
  const t = await getTranslations("solution");
  const pillars = t.raw("pillars") as { title: string; description: string }[];

  return (
    <section id="solusi" className="relative bg-forest-900/40 py-24">
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
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-forest-800 bg-forest-950/60 p-8 transition-colors hover:border-forest-500">
                <span className="text-3xl">{ICONS[i]}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-100">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
