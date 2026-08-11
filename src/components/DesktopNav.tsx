"use client";

import { useEffect, useState } from "react";
import { Radar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LangSwitcher } from "./LangSwitcher";

type NavLink = { key: string; href: string; label: string };

export function DesktopNav({
  brand,
  cta,
  links,
}: {
  brand: string;
  cta: string;
  links: NavLink[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden px-4 pt-4 xl:block">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 whitespace-nowrap transition-all duration-300 ${
          isScrolled
            ? "rounded-full border border-line bg-surface/90 px-5 py-2.5 shadow-md shadow-forest-900/5 backdrop-blur-lg"
            : "rounded-2xl border border-transparent px-2 py-2"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display text-lg font-bold tracking-tight text-ink"
        >
          <Radar size={20} strokeWidth={2.25} className="text-forest-600" />
          {brand}
        </Link>

        <ul className="flex items-center gap-5 text-sm text-muted xl:gap-6">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="transition-colors hover:text-forest-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          <LangSwitcher />
          <a
            href="#unduh"
            className="rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
          >
            {cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
