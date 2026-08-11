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
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-balance text-forest-100 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-mist">
          {description}
        </p>
      ) : null}
    </div>
  );
}
