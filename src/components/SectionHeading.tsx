export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-forest-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-balance text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
