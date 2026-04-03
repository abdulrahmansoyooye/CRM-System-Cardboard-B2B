import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProducts, getCategories, getSettings } from "@/lib/api";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    return {
      title: `Industrial Catalog | ${config?.companyName || 'CARDBOX'}`,
      description: "Explore our structural catalog of corrugated solutions and heavy-duty packaging.",
    };
  } catch (e) {
    return { title: "Catalog | CARDBOX" };
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="bg-background">
      <PageHeader
        title="Industrial Catalog"
        subtitle="Explore our structural catalog of corrugated solutions designed for maximum supply chain efficiency."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Filters and Search (Simplified Server View) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="default"
              className="bg-primary text-primary-foreground font-black tracking-widest rounded-sm uppercase text-xs h-12 px-8"
            >
              All Specs
            </Button>
            {categories.map((cat: any) => (
              <Button
                key={cat._id}
                variant="outline"
                className="text-primary rounded-sm tracking-widest font-black uppercase text-xs h-12 px-8 border-border hover:bg-secondary transition-all"
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input
              type="search"
              placeholder="Query specifications..."
              className="w-full pl-12 h-14 rounded-sm bg-secondary/50 border-border focus-visible:ring-accent font-medium"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((prod: any) => (
            <div
              key={prod._id}
              className="group border border-border bg-secondary/30 overflow-hidden flex flex-col hover:border-accent transition-all duration-500 rounded-sm"
            >
              <Link
                href={`/products/${prod.slug}`}
                className="block relative aspect-square overflow-hidden bg-secondary"
              >
                <Image
                  src={prod.images?.[0] || getPlaceholderImage('box')}
                  alt={prod.name}
                  fill
                  className="object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 contrast-125"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm shadow-xl border-r-4 border-white">
                  {prod.categoryId?.name || "Industrial"}
                </div>
              </Link>

              <div className="p-8 flex flex-col flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">
                  {prod.ply || "Custom Ply"}
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-primary mb-4 group-hover:text-accent transition-colors uppercase leading-[0.9]">
                  <Link href={`/products/${prod.slug}`}>{prod.name}</Link>
                </h3>
                <p className="text-muted-foreground text-xs font-bold mb-8 flex-1 leading-relaxed opacity-80 uppercase tracking-tight">
                  {prod.shortDescription || "High performance commercial packaging engineered for structural load bearing."}
                </p>
                <Link
                  href={`/products/${prod.slug}`}
                  className="inline-flex items-center text-[10px] font-black tracking-[0.2em] uppercase text-accent group-hover:gap-4 transition-all gap-2"
                >
                  <span className="w-8 h-0.5 bg-accent group-hover:w-12 transition-all" />
                  Technical Specs
                </Link>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-40 border border-dashed border-border rounded-sm">
             <h3 className="text-xl font-black text-primary/40 uppercase tracking-tighter">No configurations found in the active catalog.</h3>
          </div>
        )}
      </div>

      <CTABanner />
    </div>
  );
}
