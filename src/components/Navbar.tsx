import { getTranslations } from "next-intl/server";
import { DesktopNav } from "./DesktopNav";
import { MobileBottomNav } from "./MobileBottomNav";

const LINK_DEFS = [
  ["problem", "#masalah"],
  ["solution", "#solusi"],
  ["howItWorks", "#cara-kerja"],
  ["detection", "#deteksi"],
  ["charging", "#charging"],
  ["gallery", "#galeri"],
  ["roadmap", "#roadmap"],
] as const;

const MOBILE_KEYS = ["home", "problem", "solution", "detection", "charging", "gallery"] as const;

export async function Navbar() {
  const t = await getTranslations("nav");

  const links = LINK_DEFS.map(([key, href]) => ({
    key,
    href,
    label: t(`links.${key}`),
  }));

  const mobileLabels: Record<string, string> = {
    home: t("brand"),
    problem: t("links.problem"),
    solution: t("links.solution"),
    detection: t("links.detection"),
    charging: t("links.charging"),
    gallery: t("links.gallery"),
  };

  const mobileItems = MOBILE_KEYS.map((key) => ({
    key,
    href: key === "home" ? "#hero" : LINK_DEFS.find(([k]) => k === key)![1],
    label: mobileLabels[key],
  }));

  return (
    <>
      <DesktopNav brand={t("brand")} cta={t("cta")} links={links} />
      <MobileBottomNav items={mobileItems} ctaLabel={t("cta")} />
    </>
  );
}
