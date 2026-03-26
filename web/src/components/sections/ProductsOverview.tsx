"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PackageOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Heavy Duty Master Cartons",
    desc: "Multi-wall structured for extreme load-bearing industrial exports.",
    image: "/images/box.png",
    specs: "7-PLY / 450GSM",
  },
  {
    id: 2,
    name: "Custom Precision Die-Cuts",
    desc: "Branded packages with automated flexo printing technology.",
    image: "/images/box.png",
    specs: "3-PLY / 280GSM",
  },
  {
    id: 3,
    name: "Moisture Resistant Boards",
    desc: "Engineered coatings for long-haul maritime logistics.",
    image: "/images/box.png",
    specs: "5-PLY / 350GSM",
  },
  {
    id: 4,
    name: "Export Grade Solutions",
    desc: "Reinforced edges for automated warehouse handling systems.",
    image: "/images/box.png",
    specs: "HEAVY-DUTY",
  },
];

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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export function ProductsOverview() {
  return (
    <section className="py-40 bg-[#0A0F1A] text-white overflow-hidden relative">
      {/* Decorative side text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left opacity-[0.03] pointer-events-none">
        <span className="text-[120px] font-black tracking-[-0.1em] whitespace-nowrap">SOLUTIONS // 2026</span>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h2 className="text-accent font-black tracking-[0.4em] text-[11px] uppercase mb-10 flex items-center gap-10">
              <span className="w-16 h-[1px] bg-accent inline-block" />
              SYSTEM PORTFOLIO
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">
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
            className="flex flex-col items-end gap-6"
          >
            <p className="text-white/40 text-sm font-bold max-w-xs text-right leading-relaxed tracking-tight">
              Our automated production lines deliver structural precision for high-velocity supply chains.
            </p>
            <Button
              variant="outline"
              className="border-2 border-white/10 hover:border-accent text-white hover:text-accent font-black tracking-[0.3em] text-[10px] h-16 px-10 rounded-none transition-all duration-700 bg-transparent uppercase group"
            >
              FULL CAPABILITIES
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-3 transition-transform duration-500" />
            </Button>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/5 border border-white/5"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.id}
              variants={itemVariants}
              className="group relative bg-[#0D121F] overflow-hidden flex flex-col h-full hover:z-10 transition-all duration-700"
            >
              {/* Card Reveal Overlay */}
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none opacity-5 z-20" />
              
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-cover grayscale saturate-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 contrast-125"
                />
                
                {/* Specs Badge */}
                <div className="absolute top-8 left-0 z-30 bg-accent text-[9px] font-black tracking-[0.3em] px-4 py-2 text-accent-foreground border-r-4 border-white shadow-2xl uppercase">
                  {prod.specs}
                </div>

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
                  {prod.desc}
                </p>

                <Link
                  href={`/products/${prod.id}`}
                  className="inline-flex items-center text-[10px] font-black tracking-[0.3em] uppercase text-accent hover:text-white transition-all duration-500 gap-4 group/link"
                >
                  <span className="w-10 h-[2px] bg-accent group-hover/link:w-16 group-hover/link:bg-white transition-all duration-700" />
                  CASE STUDY
                </Link>
              </div>

              {/* Decorative border animation */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

