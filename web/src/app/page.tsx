import { HeroSection } from "@/components/sections/HeroSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { InfrastructurePreview } from "@/components/sections/InfrastructurePreview";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { EventsAndBlogPreview } from "@/components/sections/EventsAndBlogPreview";
import { CareersPreview } from "@/components/sections/CareersPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { getProducts, getIndustries, getBlogs, getEvents, getTestimonials, getSettings } from "@/lib/api";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    return {
      title: config?.companyName
        ? `${config.companyName} | ${config.tagline || "Premium Industrial Packaging"}`
        : "CARDBOX | Heavy-Duty Corrugated Packaging",
      description:
        config?.defaultSEO?.metaDesc ||
        "Enterprise-grade corrugated packaging engineered for heavy manufacturing, export logistics, and high-velocity supply chains.",
      openGraph: {
        title: config?.companyName || "CARDBOX Industrial",
        description: config?.defaultSEO?.metaDesc || "Industrial packaging solutions.",
        images: config?.defaultSEO?.ogImage ? [config.defaultSEO.ogImage] : [],
      },
    };
  } catch {
    return {
      title: "CARDBOX | Heavy-Duty Corrugated Packaging",
      description:
        "Enterprise-grade corrugated packaging for heavy manufacturing and global supply chains.",
    };
  }
}

export default async function Home() {
  const [products, industries, blogs, events, testimonials, settings] = await Promise.all([
    getProducts({ limit: "6", isFeatured: "true" }).catch(() => []),
    getIndustries().catch(() => []),
    getBlogs({ limit: "3" }).catch(() => []), 
    getEvents({ limit: "3" }).catch(() => []),
    getTestimonials().catch(() => []),
    getSettings().catch(() => ({})),
  ]);

  const config = Array.isArray(settings) ? settings[0] : settings;

  return (
    <>
      <HeroSection settings={config} />
      <CompanyOverview settings={config} />
      <ProductsOverview products={products} />
      <IndustriesServed industries={industries} />
      <ProcessPreview />
      <InfrastructurePreview />
      <CertificationsSection />
      <Testimonials testimonials={testimonials} />
      <EventsAndBlogPreview blogs={blogs} events={events} />
      <CareersPreview />
      <CTABanner />
    </>
  );
}
