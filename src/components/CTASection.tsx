import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const PDF_PATH =
  "/documents/TEKNOLOGI DRONE AUTONOMUS PENDETEKSI KEGIATAN_Habib Mukhlis Triatmojo_Universitas Diponegoro.pdf";

export async function CTASection() {
  const t = await getTranslations("cta");

  return (
    <section id="unduh" className="relative bg-forest-900/40 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest-300">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance text-forest-100 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-mist">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={encodeURI(PDF_PATH)}
              download
              className="rounded-full bg-forest-300 px-6 py-3 text-sm font-semibold text-forest-950 transition-transform hover:scale-105"
            >
              {t("downloadLabel")}
            </a>
            <a
              href="mailto:habibtrmojo@gmail.com"
              className="rounded-full border border-forest-700 px-6 py-3 text-sm font-semibold text-forest-100 transition-colors hover:border-forest-400 hover:text-forest-200"
            >
              {t("contactLabel")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
