import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import { getIndustryBySlug, getIndustries } from "@/lib/api";
import { CTABanner } from "@/components/sections/CTABanner";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { TProduct } from "@/types";

export const revalidate = 60;

// Pre-generate static paths for all industries
export async function generateStaticParams() {
  try {
    const industries = await getIndustries();
    return industries.map((ind: { slug: string }) => ({ slug: ind.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const industry = await getIndustryBySlug(slug);
    return {
      title: `${industry.name} | CARDBOX Industrial`,
      description:
        industry.overview ||
        `Specialized corrugated packaging solutions for the ${industry.name} sector.`,
      openGraph: {
        title: `${industry.name} | CARDBOX`,
        description: industry.overview || "",
        images: industry.images?.[0] ? [industry.images[0]] : [],
      },
    };
  } catch {
    return { title: "Industry | CARDBOX" };
  }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let industry = null;
  try {
    industry = await getIndustryBySlug(slug);
  } catch {
    notFound();
  }

  if (!industry) notFound();

  const relatedProducts: TProduct[] = industry.relatedProducts || [];

  return (
    <div className="bg-background font-sans">
      {/* Breadcrumb */}
      <div className="bg-secondary/40 border-b border-border text-[10px] font-black uppercase tracking-[0.2em] py-4">
        <div className="container mx-auto px-4 lg:px-12 flex items-center gap-4 text-muted-foreground">
          <Link
            href="/industries"
            className="hover:text-accent transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            All Industries
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-primary truncate max-w-md">{industry.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-100 flex items-center bg-[#0A0F1A] overflow-hidden">
        {industry.images?.[0] && (
          <Image
            src={industry.images[0]}
            alt={industry.name}
            fill
            className="object-cover opacity-20 grayscale contrast-150"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent z-10" />
        <div className="container mx-auto px-4 lg:px-12 py-32 min-h-100 relative z-10">
          <p className="text-accent font-black tracking-[0.4em] text-[11px] uppercase mb-8">
            VERTICAL MARKET
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black text-white tracking-tighter leading-none uppercase">
            {industry.name}
          </h1>
        </div>
      </section>

      {/* Overview */}
      <section className="py-32 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="text-[11px] font-black tracking-[0.4em] text-accent mb-10 flex items-center gap-10 uppercase">
                <span className="w-16 h-px bg-accent inline-block" />
                Sector Overview
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-[0.85] mb-10 uppercase italic">
                ENGINEERED FOR <br />
                <span className="text-primary/30 font-light not-italic">
                  THIS SECTOR.
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed font-medium">
                {industry.description ||
                  industry.overview ||
                  "Specialized corrugated solutions engineered to meet the unique demands of this industrial sector."}
              </p>
            </div>

            <div className="relative aspect-4/3 w-full bg-secondary border border-border group overflow-hidden rounded-sm">
              <Image
                src={industry.images?.[0] || getPlaceholderImage("factory")}
                alt={industry.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-32 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="flex items-end justify-between mb-20">
              <div>
                <div className="text-[11px] font-black tracking-[0.4em] text-accent mb-8 flex items-center gap-10 uppercase">
                  <span className="w-12 h-px bg-accent inline-block" />
                  Solutions
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[0.85] uppercase">
                  RECOMMENDED <br />
                  <span className="text-primary/30 font-light italic">PRODUCTS.</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase text-primary hover:text-accent transition-colors group"
              >
                FULL CATALOG
                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedProducts.map((prod) => (
                <div
                  key={prod._id}
                  className="group border border-border bg-white overflow-hidden flex flex-col hover:border-accent transition-all duration-500 rounded-sm"
                >
                  <Link
                    href={`/products/${prod.slug}`}
                    className="block relative aspect-square overflow-hidden bg-secondary"
                  >
                    <Image
                      src={prod.images?.[0] || getPlaceholderImage("box")}
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
                      {prod.shortDescription || "High-performance industrial packaging."}
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
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-32 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-12 text-center">
          <p className="text-accent font-black tracking-[0.4em] text-[11px] uppercase mb-10">
            READY TO OPTIMISE?
          </p>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
            LET&apos;S ENGINEER <br />
            <span className="text-white/30 italic font-light">YOUR SOLUTION.</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center gap-4 bg-accent text-accent-foreground h-16 px-12 font-black text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-primary transition-all duration-500 group"
            >
              REQUEST QUOTE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-4 border-2 border-white/20 text-white h-16 px-12 font-black text-xs tracking-[0.3em] uppercase hover:border-accent hover:text-accent transition-all duration-500"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
