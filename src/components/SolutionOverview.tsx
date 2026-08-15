import {
  Cpu,
  Fan,
  Camera,
  Mic,
  FlaskConical,
  Radar,
  Compass,
  MapPin,
  CircuitBoard,
  Microchip,
  Radio,
  BatteryCharging,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS = [
  Cpu,
  Fan,
  Camera,
  Mic,
  FlaskConical,
  Radar,
  Compass,
  MapPin,
  CircuitBoard,
  Microchip,
  Radio,
  BatteryCharging,
];

export async function SolutionOverview() {
  const t = await getTranslations("solution");
  const specs = t.raw("specs") as { title: string; description: string }[];

  return (
    <section id="solusi" className="relative bg-forest-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specs.map((spec, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={spec.title} delay={(i % 4) * 0.06}>
                <div className="flex h-full gap-3.5 rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-forest-400">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink">
                      {spec.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {spec.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
