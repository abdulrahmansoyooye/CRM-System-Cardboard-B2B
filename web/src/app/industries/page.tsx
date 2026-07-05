import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { CheckCircle2, Factory } from "lucide-react";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";
import { getIndustries, getSettings } from "@/lib/api";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    const ogImage = config?.defaultSEO?.ogImage;
    return {
      title: `Industrial Sectors | ${config?.companyName || 'CARDBOX'}`,
      description: "Explore the diverse industrial sectors we empower with structural corrugated engineering.",
      openGraph: {
        title: `Industrial Sectors | ${config?.companyName || 'CARDBOX'}`,
        description: "Explore the diverse industrial sectors we empower.",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch {
    return { title: "Industries | CARDBOX" };
  }
}

export default async function IndustriesPage() {
  const industries = await getIndustries().catch(() => []);

  return (
    <div className="bg-background font-sans">
      <PageHeader
        title="Industries We Empower"
        subtitle="Specialized corrugated engineering tailored for diverse manufacturing sectors and complex supply chains."
      />

      {/* Overview Section */}
      <div className="container mx-auto px-4 lg:px-12 py-32 leading-relaxed tracking-tight font-medium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          {/* Image */}
          <div className="relative aspect-4/3 w-full bg-secondary border border-border group overflow-hidden rounded-sm">
            <Image
              src={getPlaceholderImage('factory')}
              alt="Industrial Manufacturing Complex"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-8 rounded-sm max-w-xs shadow-2xl hidden md:block border-r-4 border-white">
              <div className="font-black text-xl mb-3 flex items-center gap-4 tracking-tighter uppercase leading-[0.9]">
                <Factory className="w-7 h-7" />
                SECTOR EXPERTISE
              </div>
              <p className="font-bold tracking-tight text-xs opacity-90 leading-relaxed uppercase">
                Optimizing supply chain structural integrity for global logistics.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="text-[11px] font-black tracking-[0.4em] text-accent mb-10 flex items-center gap-10 uppercase">
              <span className="w-16 h-px bg-accent inline-block" />
              Structural Dynamics
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-[0.85] mb-10 uppercase italic">
              ENGINEERED FOR <br />
              <span className="text-primary/30 font-light not-italic">REAL-WORLD OPS.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              Whether it is the moisture resistance required by the agricultural
              sector, the anti-static properties needed for electronics, or the
              bulk stacking strength for FMCG – we re-engineer corrugated boxes
              to solve sector-specific logistical failures.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-secondary/30 p-10 rounded-sm border border-border transition-all hover:border-accent">
               <div className="space-y-5">
                  {industries.slice(0, 3).map((ind: { _id: string; name: string }) => (
                    <div key={ind._id} className="flex gap-4 items-center group">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-black text-primary uppercase text-xs tracking-widest">{ind.name}</span>
                    </div>
                  ))}
               </div>
               <div className="space-y-5">
                  {industries.slice(3, 6).map((ind: { _id: string; name: string }) => (
                    <div key={ind._id} className="flex gap-4 items-center group">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-black text-primary uppercase text-xs tracking-widest">{ind.name}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      <IndustriesServed industries={industries} />

      <CTABanner />
    </div>
  );
}
