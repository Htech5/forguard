import { Download, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const PDF_PATH =
  "/documents/TEKNOLOGI DRONE AUTONOMUS PENDETEKSI KEGIATAN_Habib Mukhlis Triatmojo_Universitas Diponegoro.pdf";

export async function CTASection() {
  const t = await getTranslations("cta");

  return (
    <section id="unduh" className="relative bg-forest-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-forest-600">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={encodeURI(PDF_PATH)}
              download
              className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
            >
              <Download size={16} strokeWidth={2.25} />
              {t("downloadLabel")}
            </a>
            <a
              href="mailto:habibtrmojo@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest-400 hover:text-forest-700"
            >
              <Mail size={16} strokeWidth={2.25} />
              {t("contactLabel")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
