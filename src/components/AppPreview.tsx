import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { PhoneCarousel } from "./PhoneCarousel";

export async function AppPreview() {
  const t = await getTranslations("appPreview");

  return (
    <section className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
            <p className="mt-6 text-sm text-muted">{t("hint")}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <PhoneCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
