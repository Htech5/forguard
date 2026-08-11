"use client";

import { useState } from "react";
import Image from "next/image";

type PhoneImage = {
  src: string;
  alt: string;
};

// Placeholders until the real ForGuard app screens ("tampilan1.webp",
// "tampilan2.webp", "tampilan3.webp") are dropped into public/img/app/ —
// same filenames, so swapping the files is all that's needed.
const DEFAULT_IMAGES: PhoneImage[] = [
  { src: "/img/app/tampilan1.webp", alt: "Tampilan aplikasi ForGuard 1" },
  { src: "/img/app/tampilan2.webp", alt: "Tampilan aplikasi ForGuard 2" },
  { src: "/img/app/tampilan3.webp", alt: "Tampilan aplikasi ForGuard 3" },
];

function phoneTransform(offset: number) {
  const abs = Math.abs(offset);
  if (abs > 2) {
    return { opacity: 0, pointerEvents: "none" as const, transform: "" };
  }
  const x = offset * 128;
  const rotate = offset * 10;
  const scale = 1 - abs * 0.14;
  const z = 30 - abs * 10;
  const opacity = 1 - abs * 0.3;

  return {
    opacity,
    zIndex: z,
    transform: `translateX(${x}px) rotate(${rotate}deg) scale(${scale})`,
  };
}

export function PhoneCarousel({ images = DEFAULT_IMAGES }: { images?: PhoneImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative flex h-[420px] items-center justify-center sm:h-[480px]">
      {images.map((image, i) => {
        const offset = i - active;
        const style = phoneTransform(offset);
        const isActive = offset === 0;

        return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={image.alt}
            aria-current={isActive}
            className="absolute w-[220px] cursor-pointer transition-[transform,opacity] duration-500 ease-out sm:w-[248px]"
            style={style}
            tabIndex={isActive ? -1 : 0}
          >
            <div
              className={`overflow-hidden rounded-[2.25rem] border-[6px] bg-ink shadow-xl transition-shadow duration-500 ${
                isActive
                  ? "border-ink shadow-forest-900/20"
                  : "border-ink/70 shadow-forest-900/10"
              }`}
            >
              <div className="relative aspect-[9/19.5] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="248px"
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
