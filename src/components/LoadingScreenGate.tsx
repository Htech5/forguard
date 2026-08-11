"use client";

import { useTranslations } from "next-intl";
import { LoadingScreen } from "./LoadingScreen";

export function LoadingScreenGate() {
  const t = useTranslations("loading");
  return <LoadingScreen brand={t("brand")} tagline={t("tagline")} />;
}
