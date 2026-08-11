import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const IMAGES = [
  "/img/Isometric 1.JPG",
  "/img/Isometric 2.JPG",
  "/img/Drone 3.JPG",
  "/img/Drone 4.JPG",
  "/img/Samping.JPG",
  "/img/Dalam.JPG",
  "/img/Drone 5.JPG",
  "/img/Drone 6.JPG",
  "/img/Isometric 3.JPG",
  "/img/Dalam 2.JPG",
  "/img/Drone 2.JPG",
  "/img/Isometric 4.JPG",
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
