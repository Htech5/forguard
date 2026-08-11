import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function Team() {
  const t = await getTranslations("team");
  const members = t.raw("members") as { name: string; role: string }[];

  return (
    <section id="tim" className="relative bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-forest-800 bg-forest-900/50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-800 font-display text-xl font-bold text-forest-200">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-forest-100">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-mist">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
