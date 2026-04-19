"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PackageOpen, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { getPlaceholderImage } from "@/lib/utils";
import { TProduct } from "@/types";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProductsOverview({ products: initialProducts }: { products?: TProduct[] }) {
  const [products, setProducts] = useState<TProduct[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(!initialProducts);

  useEffect(() => {
    if (initialProducts) return;
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ limit: "4", isFeatured: "true" });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [initialProducts]);

  return (
    <section className="py-40 bg-[#0A0F1A] text-white overflow-hidden relative">
      {/* Decorative side text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left opacity-[0.03] pointer-events-none">
        <span className="text-[120px] font-black -tracking-widest whitespace-nowrap">SOLUTIONS // 2026</span>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 lg:mb-32 gap-10 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h2 className="text-accent font-black tracking-[0.4em] text-[10px] md:text-[11px] uppercase mb-8 md:mb-10 flex items-center gap-6 md:gap-10">
              <span className="w-10 md:w-16 h-px bg-accent inline-block" />
              SYSTEM PORTFOLIO
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85] uppercase">
              HIGH-STRENGTH <br />
              <span className="text-white/30 italic font-light">PACKAGING</span> <br />
              ARCHITECTURES.
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-start lg:items-end gap-6 w-full lg:w-auto"
          >
            <p className="text-white/40 text-xs md:text-sm font-bold max-w-xs text-left lg:text-right leading-relaxed tracking-tight italic">
              Our automated production lines deliver structural precision for high-velocity supply chains.
            </p>
            <Link href="/products" className="w-full lg:w-auto">
              <Button
                variant="outline"
                className="w-full lg:w-auto border-2 border-white/10 hover:border-accent text-white hover:text-accent font-black tracking-[0.3em] text-[10px] h-14 md:h-16 px-10 rounded-none transition-all duration-700 bg-transparent uppercase group"
              >
                FULL CAPABILITIES
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-3 transition-transform duration-500" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/5 border border-white/5"
          >
            {products.map((prod) => (
              <motion.div
                key={prod._id}
                variants={itemVariants}
                className="group relative bg-[#0D121F] overflow-hidden flex flex-col h-full hover:z-10 transition-all duration-700"
              >
                {/* Card Reveal Overlay */}
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none opacity-5 z-20" />
                
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    src={prod.images?.[0] || getPlaceholderImage('box')}
                    alt={prod.name}
                    fill
                    className="object-cover grayscale saturate-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 contrast-125"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Specs Badge */}
                  {prod.specifications && prod.specifications[0] && (
                    <div className="absolute top-8 left-0 z-30 bg-accent text-[9px] font-black tracking-[0.3em] px-4 py-2 text-accent-foreground border-r-4 border-white shadow-2xl uppercase">
                      {prod.specifications[0]}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-10 flex flex-col flex-1 relative z-30">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-500">
                      <PackageOpen className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h4 className="font-black text-2xl mb-5 group-hover:text-accent transition-colors tracking-tighter uppercase leading-[0.9]">
                    {prod.name}
                  </h4>
                  
                  <p className="text-white/40 text-xs font-bold flex-1 mb-10 leading-relaxed tracking-tight group-hover:text-white/60 transition-colors">
                    {prod.shortDescription}
                  </p>

                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center text-[10px] font-black tracking-[0.3em] uppercase text-accent hover:text-white transition-all duration-500 gap-4 group/link"
                  >
                    <span className="w-10 h-0.5 bg-accent group-hover/link:w-16 group-hover/link:bg-white transition-all duration-700" />
                    CASE STUDY
                  </Link>
                </div>

                {/* Decorative border animation */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
