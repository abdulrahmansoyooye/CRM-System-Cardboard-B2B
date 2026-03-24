import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function InfrastructurePreview() {
  return (
    <section className="py-24 bg-primary text-primary-foreground border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-secondary tracking-widest text-xs uppercase mb-4 flex items-center gap-4 font-bold">
              <span className="w-8 h-1 bg-accent inline-block" />
              Infrastructure
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              HEAVY DUTY{" "}
              <span className="text-accent font-light">FACTORY SETUP</span>
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed max-w-lg font-medium">
              Equipped with high-speed automated corrugators and multi-color
              flexo-printing lines, our facility is engineered to produce
              industrial volumes with millimeter precision.
            </p>

            <ul className="space-y-4 text-primary-foreground tracking-wide font-medium">
              <li className="flex items-center gap-4 border-b border-primary-foreground/10 pb-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span>BHS High Speed Corrugator Machine</span>
              </li>
              <li className="flex items-center gap-4 border-b border-primary-foreground/10 pb-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span>5-Color Flexographic Printer Slotter</span>
              </li>
              <li className="flex items-center gap-4 border-b border-primary-foreground/10 pb-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span>Automated Flatbed Die-Cutter</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span>In-house Laboratory for Edge Crush Testing (ECT)</span>
              </li>
            </ul>
          </div>

          {/* Right Images Layout */}
          <div className="lg:w-1/2 relative min-h-[500px] w-full mt-12 lg:mt-0">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden border-border bg-white/5 border-2 rounded-sm z-10">
              <Image
                src="/images/factory.png"
                alt="Corrugated Production Line"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 overflow-hidden border-border bg-white/5 border-2 z-20 rounded-sm shadow-xl mt-20">
              <Image
                src="/images/hero.png"
                alt="Stacked Corrugated Boxes"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Accent Square */}
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent rotate-45 z-0 opacity-50 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
