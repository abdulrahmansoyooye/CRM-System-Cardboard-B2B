import { Building2, Factory, Globe2, Truck } from "lucide-react";
import Image from "next/image";

export function CompanyOverview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Main Visual */}
          <div className="relative group">
            <div className="aspect-[4/3] w-full overflow-hidden bg-primary/5 rounded-sm flex items-center justify-center">
              <Image
                src="/images/company.png"
                alt="Corrugated Box Manufacturing Plant"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-10 -right-10 bg-accent text-accent-foreground p-8 hidden md:block max-w-sm rounded-sm">
              <div className="font-bold text-lg mb-2 flex items-center gap-3">
                <Factory className="w-6 h-6" />
                <span>STATE OF THE ART</span>
              </div>
              <p className="text-accent-foreground/90 font-medium leading-relaxed">
                Our facilities operate with automated machineries delivering
                high structural precision logic.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:pl-12 flex flex-col justify-center">
            <h2 className="text-secondary-foreground font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-1 bg-accent inline-block" />
              Who We Are
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight mb-6">
              RELIABLE PACKAGING <br />
              <span className="text-muted-foreground font-light">
                FOR GLOBAL EXPORTERS
              </span>
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              For over two decades, CARDBOX has been the cornerstone of
              industrial packaging. We specialize in engineering corrugated
              boxes that protect your high-value goods through complex supply
              chains.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-primary mt-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-tight">
                    Massive Infrastructure
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Over 500,000 sq.ft of manufacturing space
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0">
                  <Globe2 className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-tight">
                    Global Footprint
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Exporting to 35+ countries continuously
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0">
                  <Factory className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-tight">
                    Advanced Corrugation
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    5-Ply and 7-Ply machinery
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0">
                  <Truck className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-tight">
                    On-Time Logistics
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Own fleet management for deliveries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
