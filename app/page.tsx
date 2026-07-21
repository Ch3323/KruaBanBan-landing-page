import { BenefitsSection, FaqSection, FeatureSection, HowItWorksSection, LineIntegrationSection, ProblemSection, ProductFlowSection, SharedKitchenSection, TargetAudienceSection } from "@/components/landing/landing-sections";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <LandingHeader appUrl={appUrl} />
      <main>
        <HeroSection appUrl={appUrl} />
        <ProblemSection />
        <ProductFlowSection />
        <FeatureSection />
        <SharedKitchenSection />
        <LineIntegrationSection />
        <HowItWorksSection />
        <TargetAudienceSection />
        <BenefitsSection />
        <FaqSection />
        <FinalCtaSection appUrl={appUrl} />
      </main>
      <LandingFooter />
    </div>
  );
}
