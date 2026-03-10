import { Button } from "@/components/ui/button";
import { ArrowRight, PackageOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "Heavy Duty Master Cartons",
    desc: "Multi-wall structured for industrial exports.",
    image:
      "https://images.unsplash.com/photo-1605600659873-d808a1d14f48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Custom Printed Boxes",
    desc: "Branded packages with flexo printing technology.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Die-Cut Corrugated",
    desc: "Precision shapes for exact product fitting.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Export Packaging",
    desc: "Moisture-resistant boards for shipping logistics.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
  },
];

export function ProductsOverview() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-secondary-foreground font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-4 text-accent">
              <span className="w-8 h-1 bg-accent inline-block" />
              Our Solutions
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              ENGINEERED PACKAGING <br />
              <span className="text-muted-foreground font-light">
                FOR EVERY INDUSTRY
              </span>
            </h3>
          </div>
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold tracking-wider"
          >
            ALL PRODUCTS
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="group relative bg-background/5 border border-primary-foreground/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent flex flex-col h-full"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-transparent transition-colors z-10 duration-500 max-w-full" />
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 max-w-full"
                />

                {/* Icon Badge Overlay */}
                <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-accent flex items-center justify-center text-accent-foreground">
                  <PackageOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors">
                  {prod.name}
                </h4>
                <p className="text-muted-foreground text-sm font-medium flex-1 mb-6">
                  {prod.desc}
                </p>
                <Link
                  href={`/products/${prod.id}`}
                  className="inline-flex items-center text-sm font-bold tracking-wide uppercase text-accent hover:text-white transition-colors gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-0.5 bg-accent group-hover:bg-white transition-all duration-300" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
