"use client";

import {
  Home,
  TriangleAlert,
  Layers3,
  ScanEye,
  PlugZap,
  Users,
  Download,
} from "lucide-react";

const ICONS = {
  home: Home,
  problem: TriangleAlert,
  solution: Layers3,
  detection: ScanEye,
  charging: PlugZap,
  team: Users,
} as const;

type IconKey = keyof typeof ICONS;

export function MobileBottomNav({
  items,
  ctaLabel,
}: {
  items: { key: IconKey; href: string; label: string }[];
  ctaLabel: string;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 xl:hidden">
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface/95 p-1.5 shadow-lg shadow-forest-900/10 backdrop-blur-lg">
        {items.map((item) => {
          const Icon = ICONS[item.key];
          return (
            <a
              key={item.key}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-forest-100 hover:text-forest-700"
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
