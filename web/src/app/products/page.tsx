import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import { getProducts, getCategories, getSettings } from "@/lib/api";
import { TProduct } from "@/types";
import { Metadata } from 'next';
import { ProductFilterBar } from "@/components/sections/ProductFilterBar";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    const ogImage = config?.defaultSEO?.ogImage;
    return {
      title: `Industrial Catalog | ${config?.companyName || 'CARDBOX'}`,
      description: "Explore our structural catalog of corrugated solutions and heavy-duty packaging.",
      openGraph: {
        title: `Industrial Catalog | ${config?.companyName || 'CARDBOX'}`,
        description: "Explore our structural catalog of corrugated solutions and heavy-duty packaging.",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch {
    return { title: "Industrial Catalog | CARDBOX" };
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; searchTerm?: string }>;
}) {
  const { category, searchTerm } = await searchParams;
  
  const [products, categories] = await Promise.all([
    getProducts({ 
      categoryId: category || "", 
      searchTerm: searchTerm || "" 
    }).catch(() => []),
    getCategories().catch(() => []), 
  ]);

  return (
    <div className="bg-background">
      <PageHeader
        title="Industrial Catalog"
        subtitle="Explore our structural catalog of corrugated solutions designed for maximum supply chain efficiency."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Filters and Search */}
        <ProductFilterBar categories={categories} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((prod: TProduct) => (
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
             <h3 className="text-xl font-black text-primary/40 uppercase tracking-tighter">No configurations found matching your parameters.</h3>
          </div>
        )}
      </div>

      <CTABanner />
    </div>
  );
}
