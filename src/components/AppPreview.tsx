import { Signal, Wifi, BatteryMedium, TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export async function AppPreview() {
  const t = await getTranslations("appPreview");

  return (
    <section className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border border-line bg-surface p-4 shadow-xl shadow-forest-900/5">
              <div className="rounded-2xl bg-forest-50 p-4">
                <div className="flex items-center justify-between text-muted">
                  <span className="text-xs font-semibold text-ink">ForGuard</span>
                  <span className="flex items-center gap-1.5">
                    <Signal size={13} strokeWidth={2} />
                    <Wifi size={13} strokeWidth={2} />
                    <BatteryMedium size={15} strokeWidth={2} />
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-line bg-surface p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-forest-600">
                    Status Drone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    Aktif — Wilayah A
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-forest-100">
                    <div className="h-full w-[70%] rounded-full bg-forest-500" />
                  </div>
                  <p className="mt-1 text-[10px] text-muted">Baterai 70%</p>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-xl border border-alert/30 bg-alert/5 p-4">
                  <TriangleAlert
                    size={14}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-alert"
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-alert">
                      Terdeteksi
                    </p>
                    <p className="mt-1 text-xs text-ink">
                      Objek manusia — perlu konfirmasi
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {["Return", "Landing", "Hold", "Stop"].map((label) => (
                    <div
                      key={label}
                      className="rounded-lg border border-line bg-surface py-2 text-center text-[10px] text-muted"
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
