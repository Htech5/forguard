import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function Roadmap() {
  const t = await getTranslations("roadmap");
  const stages = t.raw("stages") as { period: string; title: string; description: string }[];

  return (
    <section id="roadmap" className="relative bg-forest-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <Reveal key={stage.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                  {stage.period}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {stage.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
