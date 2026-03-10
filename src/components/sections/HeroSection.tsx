import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay with Industrial texture or placeholder */}
      {/* Note: In a real project, replace src with an actual industrial factory picture without faces */}
      <div className="absolute inset-0 z-0 bg-primary">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4ce5e3668f9?q=80&w=2000&auto=format&fit=crop"
          alt="Industrial Manufacturing Facility"
          fill
          className="object-cover opacity-20 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent mix-blend-multiply" />
      </div>

      <div className="container relative z-10 px-4 lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-primary-foreground">
        <div className="flex flex-col justify-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs tracking-wider mb-6 w-fit border border-accent/30">
            <Box className="w-4 h-4" />
            <span>HEAVY-DUTY PACKAGING SOLUTIONS</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
            ENGINEERING <br />
            <span className="text-accent">PROTECTION</span> FOR INDUSTRY.
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl font-medium leading-relaxed">
            Enterprise-grade corrugated packaging designed for heavy
            manufacturing, export logistics, and automated supply chains.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm h-14 px-8 tracking-wide font-bold"
            >
              REQUEST A QUOTE
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm h-14 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary tracking-wide font-bold"
            >
              VIEW PRODUCTS
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Quick Stats directly in Hero */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20">
            <div>
              <div className="text-3xl font-black text-accent mb-1">25+</div>
              <div className="text-xs font-semibold tracking-wider text-primary-foreground/70 uppercase">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-accent mb-1">100K+</div>
              <div className="text-xs font-semibold tracking-wider text-primary-foreground/70 uppercase">
                Tons Capacity
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-3xl font-black text-accent mb-1">ISO</div>
              <div className="text-xs font-semibold tracking-wider text-primary-foreground/70 uppercase">
                Certified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
