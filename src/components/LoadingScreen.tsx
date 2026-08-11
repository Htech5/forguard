"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen({
  brand,
  tagline,
}: {
  brand: string;
  tagline: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-forest-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-950 to-black" />

          <div className="absolute inset-x-0 bottom-0 h-1/2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 h-full w-full"
                style={{
                  background: `linear-gradient(to top, var(--forest-${
                    900 - i * 100
                  }), transparent)`,
                  clipPath:
                    i === 0
                      ? "polygon(0 100%, 0 60%, 8% 40%, 16% 65%, 24% 35%, 32% 60%, 40% 30%, 48% 55%, 56% 25%, 64% 50%, 72% 30%, 80% 55%, 88% 35%, 96% 60%, 100% 45%, 100% 100%)"
                      : i === 1
                        ? "polygon(0 100%, 0 75%, 10% 55%, 20% 78%, 30% 50%, 40% 72%, 50% 48%, 60% 70%, 70% 45%, 80% 68%, 90% 50%, 100% 70%, 100% 100%)"
                        : "polygon(0 100%, 0 85%, 15% 70%, 30% 88%, 45% 68%, 60% 86%, 75% 65%, 90% 84%, 100% 72%, 100% 100%)",
                }}
                initial={{ x: 0 }}
                animate={{ x: [0, -12, 0] }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 text-5xl"
            initial={{ x: "-40vw", y: "10vh", rotate: -8, opacity: 0 }}
            animate={{
              x: ["-40vw", "0vw", "40vw"],
              y: ["10vh", "-6vh", "-14vh"],
              rotate: [-8, 4, -4],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            aria-hidden
          >
            🛸
          </motion.div>

          <motion.p
            className="relative z-10 mt-6 font-display text-2xl font-semibold tracking-wide text-forest-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {brand}
          </motion.p>

          <motion.p
            className="relative z-10 mt-2 text-sm text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {tagline}
          </motion.p>

          <motion.div
            className="relative z-10 mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-forest-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-forest-300"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
