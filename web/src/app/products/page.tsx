import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  {
    id: "corrugated-boxes",
    name: "Corrugated Master Cartons",
    category: "Heavy",
    imageType: "box",
  },
  {
    id: "custom-printed",
    name: "Custom Printed Boxes",
    category: "Printed",
    imageType: "box",
  },
  {
    id: "heavy-duty",
    name: "7-Ply Heavy Duty Boxes",
    category: "Heavy",
    imageType: "box",
  },
  {
    id: "die-cut",
    name: "Specialized Die Cut Cartons",
    category: "Custom",
    imageType: "box",
  },
  {
    id: "export-packaging",
    name: "Export Packaging",
    category: "Export",
    imageType: "box",
  },
  {
    id: "pallet-boxes",
    name: "Bulk Pallet Boxes",
    category: "Heavy",
    imageType: "box",
  },
];

const CATEGORIES = ["All", "Heavy", "Printed", "Custom", "Export"];

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Industrial Products"
        subtitle="Explore our structural catalog of corrugated solutions designed for maximum supply chain efficiency."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={cat === "All" ? "default" : "outline"}
                className={
                  cat === "All"
                    ? "bg-primary text-primary-foreground font-bold tracking-wide rounded-sm"
                    : "text-primary rounded-sm tracking-wide font-medium"
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search specifications..."
              className="w-full pl-9 h-12 rounded-sm bg-secondary border-border focus-visible:ring-accent"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="group border border-border bg-secondary overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300 rounded-sm"
            >
              <Link
                href={`/products/${prod.id}`}
                className="block relative aspect-video overflow-hidden"
              >
                <Image
                  src={getPlaceholderImage(prod.imageType as "box" | "factory" | "hero")}
                  alt={prod.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
                  {prod.category}
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold tracking-tight text-primary mb-4 group-hover:text-accent transition-colors">
                  <Link href={`/products/${prod.id}`}>{prod.name}</Link>
                </h3>
                <p className="text-muted-foreground text-sm font-medium mb-6 flex-1">
                  High performance commercial packaging engineered for stacking
                  and load bearing capabilities during transit.
                </p>
                <Link
                  href={`/products/${prod.id}`}
                  className="inline-flex items-center text-sm font-bold tracking-wide uppercase text-accent group-hover:text-primary transition-colors gap-2"
                >
                  View Specifications
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination mock */}
        <div className="flex justify-center mt-16 gap-2">
          <Button
            variant="outline"
            className="w-10 h-10 border-border text-primary rounded-sm"
            disabled
          >
            &lt;
          </Button>
          <Button
            variant="default"
            className="w-10 h-10 bg-primary text-primary-foreground rounded-sm font-bold"
          >
            1
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 border-border text-primary rounded-sm font-bold"
          >
            2
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 border-border text-primary rounded-sm"
            disabled
          >
            &gt;
          </Button>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
