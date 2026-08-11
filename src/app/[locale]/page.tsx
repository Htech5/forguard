import { setRequestLocale } from "next-intl/server";
import { LoadingScreenGate } from "@/components/LoadingScreenGate";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemStats } from "@/components/ProblemStats";
import { SolutionOverview } from "@/components/SolutionOverview";
import { HowItWorks } from "@/components/HowItWorks";
import { DetectionTech } from "@/components/DetectionTech";
import { ChargingStation } from "@/components/ChargingStation";
import { Gallery } from "@/components/Gallery";
import { AppPreview } from "@/components/AppPreview";
import { Roadmap } from "@/components/Roadmap";
import { Team } from "@/components/Team";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LoadingScreenGate />
      <Navbar />
      <main className="flex-1 pb-24 xl:pb-0">
        <Hero />
        <ProblemStats />
        <SolutionOverview />
        <HowItWorks />
        <DetectionTech />
        <ChargingStation />
        <Gallery />
        <AppPreview />
        <Roadmap />
        <Team />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
