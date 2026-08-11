import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const IMAGES = [
  "/img/isometric-1.webp",
  "/img/isometric-2.webp",
  "/img/drone-3.webp",
  "/img/drone-4.webp",
  "/img/samping.webp",
  "/img/dalam.webp",
  "/img/drone-5.webp",
  "/img/drone-6.webp",
  "/img/isometric-3.webp",
  "/img/dalam-2.webp",
  "/img/drone-2.webp",
  "/img/isometric-4.webp",
];

export async function Gallery() {
  const t = await getTranslations("gallery");

  return (
    <section id="galeri" className="relative bg-forest-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="center"
          />
        </Reveal>

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {IMAGES.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.06}>
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                <Image
                  src={src}
                  alt="ForGuard drone render"
                  width={500}
                  height={500}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
