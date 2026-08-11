"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";

export function LangSwitcher() {
  const t = useTranslations("langSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="flex items-center gap-1 rounded-full border border-forest-700 bg-forest-900/60 p-1 text-xs font-semibold">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() =>
            router.replace(
              // @ts-expect-error -- params shape is dynamic per route
              { pathname, params },
              { locale: loc }
            )
          }
          className={`rounded-full px-2.5 py-1 transition-colors ${
            loc === locale
              ? "bg-forest-300 text-forest-950"
              : "text-mist hover:text-forest-100"
          }`}
          aria-current={loc === locale}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
