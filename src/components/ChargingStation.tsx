import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function ChargingStation() {
  const t = await getTranslations("charging");
  const features = t.raw("features") as { title: string; description: string }[];
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section id="charging" className="relative bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={t("description")}
              />
            </Reveal>

            <div className="mt-10 space-y-6">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.08}>
                  <div className="border-l-2 border-forest-500 pl-5">
                    <h3 className="font-display text-base font-semibold text-forest-100">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-forest-800">
                <Image
                  src="/img/Drone 1.JPG"
                  alt="ForGuard drone docked at PV-PCM charging station"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.2 + i * 0.08}>
                  <div className="rounded-xl border border-forest-800 bg-forest-900/60 p-5">
                    <p className="font-display text-xl font-bold text-canopy">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-mist">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
