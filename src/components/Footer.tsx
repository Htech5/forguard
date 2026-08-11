import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-forest-800 bg-forest-950 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
        <span className="font-display text-lg font-bold text-forest-100">
          {nav("brand")}
        </span>
        <p className="max-w-md text-sm text-mist">{t("tagline")}</p>
        <p className="text-xs text-mist/60">{t("rights")}</p>
        <p className="text-xs text-mist/40">{t("sourceNote")}</p>
      </div>
    </footer>
  );
}
