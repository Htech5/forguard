import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function ProblemStats() {
  const t = await getTranslations("problem");
  const stats = t.raw("stats") as { value: string; unit: string; label: string }[];

  return (
    <section id="masalah" className="relative bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-forest-800 bg-forest-900/50 p-6">
                <p className="font-display text-3xl font-bold text-alert">
                  {stat.value}
                  <span className="ml-1 text-base font-semibold text-forest-300">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-mist/70">{t("source")}</p>
      </div>
    </section>
  );
}
