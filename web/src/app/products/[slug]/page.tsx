import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from 'next';
import { getProductBySlug, getProducts } from "@/lib/api";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    return {
      title: `${product.name} | CARDBOX Industrial`,
      description: product.shortDescription || product.description,
    };
  } catch {
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 border border-border bg-secondary/30 rounded-sm max-w-md">
          <h2 className="text-2xl font-black text-primary mb-4 tracking-tighter uppercase">Product Not Found</h2>
          <p className="text-muted-foreground mb-8 font-medium">The requested industrial specification is either archived or the link is invalid.</p>
          <Link href="/products">
             <Button className="font-bold tracking-widest uppercase py-6 px-10 rounded-sm">Return to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = product.name;
  const image = product.images?.[0] || getPlaceholderImage('box');

  return (
    <div className="bg-background">
      <div className="bg-primary/5 border-b border-border text-sm font-medium py-3">
        <div className="container mx-auto px-4 lg:px-8 flex items-center gap-2 text-muted-foreground">
          <Link
            href="/products"
            className="hover:text-accent transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-bold tracking-tight uppercase">{name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-secondary rounded-sm overflow-hidden border border-border group">
              <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 contrast-125" />
            </div>
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-square bg-secondary rounded-sm overflow-hidden border border-border opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Image
                      src={img}
                      alt={`${name} view ${idx}`}
                      fill
                      className="object-cover grayscale hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent/10 border border-accent text-accent font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
              SPEC ID: {product.slug.toUpperCase()}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[0.9] mb-8 uppercase">
              {name}
            </h1>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
              {product.shortDescription || "Engineered structural solution designed for maximum supply chain durability and load-bearing performance."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-secondary/40 p-8 rounded-sm border border-border group hover:border-accent transition-colors">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-3">
                  Structural Ply
                </div>
                <div className="text-2xl font-black text-primary tracking-tight uppercase">
                  {product.ply || "Custom Engineering"}
                </div>
              </div>
              <div className="bg-secondary/40 p-8 rounded-sm border border-border group hover:border-accent transition-colors">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-3">
                  Classification
                </div>
                <div className="text-2xl font-black text-primary tracking-tight uppercase">
                  {product.categoryId?.name || "Uncategorized"}
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full mb-12 border-t border-border" defaultValue="specs">
              <AccordionItem value="specs" className="border-b border-border">
                <AccordionTrigger className="text-xl font-black text-primary hover:text-accent no-underline hover:no-underline py-6 uppercase tracking-tight">
                  Material Attributes
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed py-4 px-1">
                  <ul className="space-y-4">
                    {product.specifications?.map((spec: string, i: number) => (
                      <li key={i} className="flex gap-4 items-start">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />{" "}
                        <span className="font-bold text-primary/80 uppercase text-xs tracking-widest">{spec}</span>
                      </li>
                    )) || <li className="text-sm italic">Standard industrial specification applies.</li>}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="strength" className="border-b border-border">
                <AccordionTrigger className="text-xl font-black text-primary hover:text-accent no-underline hover:no-underline py-6 uppercase tracking-tight">
                  Application Context
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed py-4 px-1 font-medium">
                   {product.description || "Detailed technical documentation available upon authorized request."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/request-quote" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-accent rounded-sm font-black tracking-widest px-10 h-16 uppercase transition-all shadow-xl shadow-primary/10"
                >
                  Initiate Quote Request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}