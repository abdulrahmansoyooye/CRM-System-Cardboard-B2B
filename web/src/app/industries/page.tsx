import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { CheckCircle2, Factory } from "lucide-react";
import Image from "next/image";

export default function IndustriesPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Industries We Empower"
        subtitle="Specialized corrugated engineering tailored for diverse manufacturing sectors and complex supply chains."
      />

      {/* Overview Section */}
      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full bg-secondary border border-border">
            <Image
              src="/images/hero.png"
              alt="FMCG Warehouse Supply Chain"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-sm max-w-xs shadow-xl hidden md:block">
              <div className="font-black text-xl mb-2 flex items-center gap-3">
                <Factory className="w-6 h-6" />
                SECTOR EXPERTISE
              </div>
              <p className="font-semibold tracking-wide text-sm opacity-90 leading-relaxed">
                Over 5,000 supply chains rely on our structural engineering.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight mb-6">
              EVERY INDUSTRY HAS <br />
              <span className="text-muted-foreground font-light">
                UNIQUE DEMANDS
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether it is the moisture resistance required by the agricultural
              sector, the anti-static properties needed for electronics, or the
              bulk stacking strength for FMCG – we re-engineer corrugated boxes
              to solve sector-specific logistical failures.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-secondary/30 p-8 rounded-sm border border-border">
              <ul className="space-y-4 font-bold text-primary">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                  Fast-Moving Consumer Goods
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                  Electronics & Appliances
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                  Fresh Produce Export
                </li>
              </ul>
              <ul className="space-y-4 font-bold text-primary">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                  Automotive Components
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                  E-commerce Logistics
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                  Pharmaceuticals
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <IndustriesServed />

      <CTABanner />
    </div>
  );
}
