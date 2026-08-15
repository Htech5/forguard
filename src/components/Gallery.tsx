import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { MagicBento } from "./MagicBento";

const IMAGES = [
  { src: "/img/isometric-1.webp", alt: "Tampak isometric drone dan station" },
  { src: "/img/drone-3.webp", alt: "Drone tampak atas" },
  { src: "/img/samping.webp", alt: "Tampak samping keseluruhan" },
  { src: "/img/dalam.webp", alt: "Tampak sisi solar panel" },
  { src: "/img/drone-5.webp", alt: "Drone tampak depan" },
  { src: "/img/isometric-3.webp", alt: "Detail komponen charging station" },
];

export async function Gallery() {
  const t = await getTranslations("gallery");
  const items = t.raw("items") as { label: string; title: string }[];

  return (
    <section id="galeri" className="relative bg-forest-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="center"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12">
            <MagicBento cards={IMAGES.map((img, i) => ({ ...img, ...items[i] }))} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
