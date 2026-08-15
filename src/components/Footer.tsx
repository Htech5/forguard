import { Radar, Mail, MapPin, GraduationCap, FileText, ArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

const PDF_PATH =
  "/documents/TEKNOLOGI DRONE AUTONOMUS PENDETEKSI KEGIATAN_Habib Mukhlis Triatmojo_Universitas Diponegoro.pdf";

const NAV_LINKS = [
  { href: "#masalah", key: "problem" },
  { href: "#solusi", key: "solution" },
  { href: "#cara-kerja", key: "howItWorks" },
  { href: "#deteksi", key: "detection" },
  { href: "#charging", key: "charging" },
  { href: "#galeri", key: "gallery" },
  { href: "#roadmap", key: "roadmap" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-line bg-forest-950 text-forest-100">
      {/* extra bottom padding clears the floating mobile nav pill */}
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 sm:px-6 sm:pt-16 lg:pb-20 lg:pt-20 xl:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2.5 font-display text-2xl font-bold text-white">
              <Radar size={26} strokeWidth={2.25} className="text-forest-300" />
              {nav("brand")}
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-200">
              {t("tagline")}
            </p>
            <a
              href={encodeURI(PDF_PATH)}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest-300/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-forest-300 hover:bg-forest-300/10"
            >
              <FileText size={16} />
              {t("paperLink")}
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-300">
              {t("navHeading")}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-forest-100/80 transition hover:text-white"
                  >
                    {nav(`links.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-300">
              {t("contactHeading")}
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <GraduationCap size={16} className="mt-0.5 shrink-0 text-forest-300" />
                <span className="text-forest-100/80">{t("institution")}</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-forest-300" />
                <span className="text-forest-100/80">{t("location")}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-forest-300" />
                <a
                  href="mailto:habibtrmojo@gmail.com"
                  className="text-forest-100/80 underline-offset-4 transition hover:text-white hover:underline"
                >
                  habibtrmojo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-forest-100/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-forest-200/80">{t("rights")}</p>
            <p className="text-xs text-forest-200/50">{t("sourceNote")}</p>
          </div>
          <a
            href="#hero"
            className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-forest-200/80 transition hover:text-white"
          >
            {t("backToTop")}
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
