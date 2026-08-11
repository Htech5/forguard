import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="cara-kerja" className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-5 top-2 bottom-2 hidden w-px bg-line sm:block"
          />
          <ol className="space-y-8">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="relative flex gap-5 sm:pl-0">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-400 bg-surface font-display text-sm font-bold text-forest-700">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
