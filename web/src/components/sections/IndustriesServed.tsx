import { Cpu, Leaf, ShoppingCart, Truck, Zap } from "lucide-react";

const INDUSTRIES = [
  {
    id: "fmcg",
    name: "FMCG",
    desc: "Fast-moving consumer goods requiring bulk, resilient packaging.",
    icon: ShoppingCart,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    desc: "Durable mailer boxes and transit-safe corrugated solutions.",
    icon: Truck,
  },
  {
    id: "automotive",
    name: "Automotive",
    desc: "Heavy-duty packaging for spare parts and machinery transit.",
    icon: Zap,
  },
  {
    id: "electronics",
    name: "Electronics",
    desc: "Anti-static and high-protection enclosures.",
    icon: Cpu,
  },
  {
    id: "pharma",
    name: "Pharmaceuticals",
    desc: "Clean, certified corrugated packages for healthcare.",
    icon: Leaf,
  },
  {
    id: "agriculture",
    name: "Agriculture",
    desc: "Ventilated boxes for fresh produce export operations.",
    icon: Leaf,
  },
];

export function IndustriesServed() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-accent font-bold tracking-widest text-xs uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-1 bg-accent inline-block" />
            Sectors We Empower
            <span className="w-8 h-1 bg-accent inline-block" />
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight">
            INDUSTRIES WE SERVE
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="group p-8 border border-border bg-secondary/50 hover:bg-primary transition-colors duration-300 rounded-sm cursor-pointer"
              >
                <div className="w-16 h-16 bg-background group-hover:bg-accent flex items-center justify-center mb-6 transition-colors shadow-sm">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl mb-3 text-primary group-hover:text-primary-foreground transition-colors">
                  {ind.name}
                </h4>
                <p className="text-muted-foreground group-hover:text-primary-foreground/80 font-medium transition-colors">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
