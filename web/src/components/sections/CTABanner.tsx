import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="relative py-24 w-full bg-primary overflow-hidden flex flex-col justify-center items-center text-center px-4">
      {/* Background Graphic / Texture */}
      <div className="absolute inset-0 z-0 bg-[url('/images/product_cardboard.png')] bg-cover bg-center bg-no-repeat opacity-5 mix-blend-overlay grayscale" />

      {/* Orange Accent Lines */}
      <div className="absolute top-0 w-full h-2 bg-accent" />
      <div className="absolute top-1/2 left-0 w-1/4 h-px bg-accent/20" />
      <div className="absolute top-1/2 right-0 w-1/4 h-px bg-accent/20" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground tracking-tight leading-tight mb-8">
          NEED{" "}
          <span className="text-accent underline decoration-4 underline-offset-[12px]">
            CUSTOM
          </span>{" "}
          PACKAGING SOLUTIONS?
        </h2>

        <p className="text-primary-foreground/80 font-medium text-lg md:text-xl max-w-2xl mb-12">
          Partner with CARDBOX for reliable, heavy-duty industrial corrugated
          boards designed exactly to your specifications. Let's engineer your
          protection.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center w-full justify-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-white hover:text-primary transition-colors text-lg h-16 px-10 rounded-sm font-bold tracking-wider w-full sm:w-auto"
          >
            GET A QUOTE
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-0 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-accent">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider font-semibold opacity-70">
                  Sales Direct
                </div>
                <div className="font-bold">+1 (800) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
