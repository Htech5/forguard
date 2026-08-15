"use client";

import { useState } from "react";
import Image from "next/image";

type CarouselImage = {
  src: string;
  alt: string;
};

/**
 * `offset` places a card in the fan; `slot` is that offset re-centred on the
 * container, so the whole deck stays put as the active card changes instead of
 * sliding off the right edge on narrow screens. --stack-gap is set per
 * breakpoint on the container.
 */
function stackTransform(offset: number, slot: number) {
  const abs = Math.abs(offset);
  if (abs > 2) {
    return { opacity: 0, pointerEvents: "none" as const, transform: "" };
  }

  return {
    zIndex: 30 - abs * 10,
    transform: `translateX(calc(${slot} * var(--stack-gap))) rotate(${offset * 9}deg) scale(${1 - abs * 0.12})`,
  };
}

export function StackCarousel({
  images,
  height = "h-[360px] sm:h-[480px]",
}: {
  images: CarouselImage[];
  height?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden [--stack-gap:52px] sm:[--stack-gap:96px] ${height}`}
    >
      {images.map((image, i) => {
        const offset = i - active;
        const slot = i - (images.length - 1) / 2;
        const isActive = offset === 0;

        return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={image.alt}
            aria-current={isActive}
            className="absolute w-[168px] cursor-pointer transition-transform duration-500 ease-out sm:w-[248px]"
            style={stackTransform(offset, slot)}
            tabIndex={isActive ? -1 : 0}
          >
            {/* Every phone stays fully opaque — depth comes from scale, rotation
                and shadow only. */}
            <div
              className={`overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-xl transition-shadow duration-500 ${
                isActive ? "shadow-forest-900/25" : "shadow-forest-900/15"
              }`}
            >
              <div className="relative aspect-[9/19.5] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 168px, 248px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 mx-auto mt-2 h-4 w-20 rounded-full bg-ink"
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
