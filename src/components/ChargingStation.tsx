import Image from "next/image";
import { Waypoints, PlugZap, Gauge } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS = [Waypoints, PlugZap, Gauge];

export async function ChargingStation() {
  const t = await getTranslations("charging");
  const features = t.raw("features") as { title: string; description: string }[];
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section id="charging" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
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
              {features.map((feature, i) => {
                const Icon = ICONS[i];
                return (
                  <Reveal key={feature.title} delay={i * 0.08}>
                    <div className="flex gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-ink">
                          {feature.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <Reveal delay={0.15}>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-forest-50 shadow-sm">
                <Image
                  src="/img/drone-1-nobg.webp"
                  alt="ForGuard drone docked at PV-PCM charging station"
                  fill
                  className="object-contain p-6"
                />
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.2 + i * 0.08}>
                  <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                    <p className="font-display text-xl font-bold text-canopy">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
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
