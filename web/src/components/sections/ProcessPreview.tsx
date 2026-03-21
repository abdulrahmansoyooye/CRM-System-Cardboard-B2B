import {
  ArrowRight,
  Box,
  Layers,
  Monitor,
  Printer,
  Scissors,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Paper Roll Sourcing",
    icon: Layers,
    desc: "Kraff liner procurement.",
  },
  {
    step: "02",
    name: "Corrugation",
    icon: Box,
    desc: "Fluting and gluing structure.",
  },
  {
    step: "03",
    name: "Precision Print",
    icon: Printer,
    desc: "Flexographic branding.",
  },
  {
    step: "04",
    name: "Die-Cutting",
    icon: Scissors,
    desc: "Automated shape slotting.",
  },
  {
    step: "05",
    name: "Quality Check",
    icon: Monitor,
    desc: "Crush test verification.",
  },
  { step: "06", name: "Logistics", icon: Truck, desc: "Dispatch scheduling." },
];

export function ProcessPreview() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-accent font-bold tracking-widest text-xs uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-1 bg-accent inline-block" />
            Manufacturing Flow
            <span className="w-8 h-1 bg-accent inline-block" />
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight">
            THE PROCESS{" "}
            <span className="text-muted-foreground font-light">CHAIN</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8 border-b-2 border-primary/20 pb-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-[2px] bg-primary/20 z-0" />

          {PROCESS_STEPS.map((ps, idx) => {
            const Icon = ps.icon;
            return (
              <div
                key={ps.step}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 bg-primary group-hover:bg-accent text-primary-foreground flex items-center justify-center text-lg font-bold mb-4 rounded-sm transition-colors shadow-lg">
                  {ps.step}
                </div>
                <div className="w-20 h-20 bg-background border border-border group-hover:border-accent flex items-center justify-center rounded-full mb-4 shadow-sm transition-all group-hover:-translate-y-2">
                  <Icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-primary">
                  {ps.name}
                </h4>
                <p className="text-muted-foreground text-sm font-medium">
                  {ps.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm font-bold tracking-wider px-8 h-14"
            asChild
          >
            <Link href="/process">
              VIEW FULL INFRASTRUCTURE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
