import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function AppPreview() {
  const t = await getTranslations("appPreview");

  return (
    <section className="relative bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border border-forest-700 bg-gradient-to-b from-forest-600 to-forest-800 p-4 shadow-2xl shadow-black/40">
              <div className="rounded-2xl bg-forest-950/40 p-4">
                <div className="flex items-center justify-between text-xs text-forest-100/80">
                  <span>ForGuard</span>
                  <span>●●●</span>
                </div>

                <div className="mt-4 rounded-xl border border-forest-500/40 bg-forest-900/60 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-forest-300">
                    Status Drone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-forest-100">
                    Aktif — Wilayah A
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-forest-800">
                    <div className="h-full w-[70%] rounded-full bg-forest-300" />
                  </div>
                  <p className="mt-1 text-[10px] text-mist">Baterai 70%</p>
                </div>

                <div className="mt-3 rounded-xl border border-alert/40 bg-alert/10 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-alert">
                    Terdeteksi
                  </p>
                  <p className="mt-1 text-xs text-forest-100">
                    Objek manusia — perlu konfirmasi
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {["Return", "Landing", "Hold", "Stop"].map((label) => (
                    <div
                      key={label}
                      className="rounded-lg border border-forest-700 bg-forest-900/60 py-2 text-center text-[10px] text-mist"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
