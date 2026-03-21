import { HeroSection } from "@/components/sections/HeroSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { InfrastructurePreview } from "@/components/sections/InfrastructurePreview";
import { EventsAndBlogPreview } from "@/components/sections/EventsAndBlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CompanyOverview />
      <ProductsOverview />
      <IndustriesServed />
      <ProcessPreview />
      <InfrastructurePreview />
      <EventsAndBlogPreview />
      <CTABanner />
    </>
  );
}
