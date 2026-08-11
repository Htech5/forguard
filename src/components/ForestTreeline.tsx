const TREES = [
  { x: 8, h: 34, w: 20 },
  { x: 42, h: 52, w: 28 },
  { x: 84, h: 30, w: 18 },
  { x: 122, h: 46, w: 24 },
  { x: 168, h: 60, w: 32 },
  { x: 214, h: 36, w: 20 },
  { x: 252, h: 50, w: 26 },
  { x: 296, h: 32, w: 18 },
  { x: 330, h: 44, w: 22 },
  { x: 372, h: 58, w: 30 },
  { x: 416, h: 38, w: 20 },
];

function Tree({
  x,
  h,
  w,
  baseY,
  className,
}: {
  x: number;
  h: number;
  w: number;
  baseY: number;
  className?: string;
}) {
  const tiers = 3;
  const tierH = h / tiers;
  const paths = Array.from({ length: tiers }, (_, i) => {
    const tierW = w * (1 - i * 0.22);
    const top = baseY - h + i * tierH * 0.72;
    const bottom = top + tierH * 1.35;
    return (
      <polygon
        key={i}
        points={`${x},${top} ${x - tierW / 2},${bottom} ${x + tierW / 2},${bottom}`}
      />
    );
  });
  return (
    <g className={className}>
      {paths}
      <rect x={x - w * 0.05} y={baseY - h * 0.1} width={w * 0.1} height={h * 0.14} />
    </g>
  );
}

export function ForestTreeline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 440 70"
      preserveAspectRatio="none"
      className={className}
    >
      {TREES.map((t, i) => (
        <Tree
          key={`back-${i}`}
          {...t}
          h={t.h * 0.8}
          w={t.w * 0.9}
          x={t.x + 14}
          baseY={68}
          className="fill-forest-200"
        />
      ))}
      {TREES.map((t, i) => (
        <Tree key={`front-${i}`} {...t} baseY={70} className="fill-forest-400/70" />
      ))}
    </svg>
  );
}
