import { HeroSection } from "@/components/sections/HeroSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { InfrastructurePreview } from "@/components/sections/InfrastructurePreview";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EventsAndBlogPreview } from "@/components/sections/EventsAndBlogPreview";
import { CareersPreview } from "@/components/sections/CareersPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { getProducts, getIndustries, getBlogs } from "@/lib/api";

export default async function Home() {
  const [products, industries, blogs] = await Promise.all([
    getProducts({ limit: "6" }).catch(() => []),
    getIndustries().catch(() => []),
    getBlogs().catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <CompanyOverview />
      <ProductsOverview products={products} />
      <IndustriesServed industries={industries} />
      <ProcessPreview />
      <InfrastructurePreview />
      <CertificationsSection />
      <EventsAndBlogPreview blogs={blogs} />
      <CareersPreview />
      <CTABanner />
    </>
  );
}
