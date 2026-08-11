import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LangSwitcher } from "./LangSwitcher";

export async function Navbar() {
  const t = await getTranslations("nav");

  const links = [
    ["problem", "#masalah"],
    ["solution", "#solusi"],
    ["howItWorks", "#cara-kerja"],
    ["detection", "#deteksi"],
    ["charging", "#charging"],
    ["gallery", "#galeri"],
    ["roadmap", "#roadmap"],
    ["team", "#tim"],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-forest-800/80 bg-forest-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-forest-100"
        >
          {t("brand")}
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-mist lg:flex">
          {links.map(([key, href]) => (
            <li key={key}>
              <a
                href={href}
                className="transition-colors hover:text-forest-200"
              >
                {t(`links.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          <a
            href="#unduh"
            className="hidden rounded-full bg-forest-300 px-4 py-2 text-sm font-semibold text-forest-950 transition-transform hover:scale-105 sm:inline-block"
          >
            {t("cta")}
          </a>
        </div>
      </nav>
    </header>
  );
}
