import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CardsSection } from "@/components/home/CardsSection";
import { AnnualProgramsSection } from "@/components/home/AnnualProgramsSection";
import { TeachingsHero } from "@/components/teachings/TeachingsHero";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <AboutSection />
      <AnnualProgramsSection />
      <CardsSection />
      <TeachingsHero />
    </>
  );
}
