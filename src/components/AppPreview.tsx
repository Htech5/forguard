import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { StackCarousel } from "./StackCarousel";

// Placeholders until the real ForGuard app screens ("tampilan1.webp",
// "tampilan2.webp", "tampilan3.webp") are dropped into public/img/app/ —
// same filenames, so swapping the files is all that's needed.
const APP_IMAGES = [
  { src: "/img/app/tampilan1.webp", alt: "Tampilan aplikasi ForGuard 1" },
  { src: "/img/app/tampilan2.webp", alt: "Tampilan aplikasi ForGuard 2" },
  { src: "/img/app/tampilan3.webp", alt: "Tampilan aplikasi ForGuard 3" },
];

export async function AppPreview() {
  const t = await getTranslations("appPreview");

  return (
    <section className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
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
            <StackCarousel images={APP_IMAGES} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
