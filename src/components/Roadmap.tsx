import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function Roadmap() {
  const t = await getTranslations("roadmap");
  const stages = t.raw("stages") as { period: string; title: string; description: string }[];

  return (
    <section id="roadmap" className="relative bg-forest-900/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <Reveal key={stage.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-forest-800 bg-forest-950/60 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest-300">
                  {stage.period}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-forest-100">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
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
