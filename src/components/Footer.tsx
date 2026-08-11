import { Radar } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-line bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
        <span className="inline-flex items-center gap-2 font-display text-lg font-bold text-ink">
          <Radar size={18} strokeWidth={2.25} className="text-forest-600" />
          {nav("brand")}
        </span>
        <p className="max-w-md text-sm text-muted">{t("tagline")}</p>
        <p className="text-xs text-muted/70">{t("rights")}</p>
        <p className="text-xs text-muted/50">{t("sourceNote")}</p>
      </div>
    </footer>
  );
}
