"use client";

import {
  Home,
  TriangleAlert,
  Layers3,
  ScanEye,
  PlugZap,
  Images,
  Download,
} from "lucide-react";
import { useActiveSection } from "@/lib/useActiveSection";

const ICONS = {
  home: Home,
  problem: TriangleAlert,
  solution: Layers3,
  detection: ScanEye,
  charging: PlugZap,
  gallery: Images,
} as const;

type IconKey = keyof typeof ICONS;

export function MobileBottomNav({
  items,
  ctaLabel,
}: {
  items: { key: IconKey; href: string; label: string }[];
  ctaLabel: string;
}) {
  const active = useActiveSection(items.map((i) => i.href.slice(1)));

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 xl:hidden">
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface/95 p-1.5 shadow-lg shadow-forest-900/10 backdrop-blur-lg">
        {items.map((item) => {
          const Icon = ICONS[item.key];
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.key}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              aria-current={isActive}
              className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                isActive
                  ? "bg-forest-100 text-forest-700"
                  : "text-muted hover:bg-forest-100 hover:text-forest-700"
              }`}
            >
              <Icon size={19} strokeWidth={2} />
            </a>
          );
        })}
        <a
          href="#unduh"
          aria-label={ctaLabel}
          title={ctaLabel}
          className="ml-1 flex size-10 items-center justify-center rounded-full bg-forest-600 text-white transition-colors hover:bg-forest-700"
        >
          <Download size={18} strokeWidth={2.25} />
        </a>
      </div>
    </nav>
  );
}
