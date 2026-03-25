"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PackageOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Heavy Duty Master Cartons",
    desc: "Multi-wall structured for industrial exports.",
    image: "/images/box.png",
  },
  {
    id: 2,
    name: "Custom Printed Boxes",
    desc: "Branded packages with flexo printing technology.",
    image: "/images/box.png",
  },
  {
    id: 3,
    name: "Die-Cut Corrugated",
    desc: "Precision shapes for exact product fitting.",
    image: "/images/box.png",
  },
  {
    id: 4,
    name: "Export Packaging",
    desc: "Moisture-resistant boards for shipping logistics.",
    image: "/images/box.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ProductsOverview() {
  return (
    <section className="py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-accent font-black tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-6">
              <span className="w-12 h-[2px] bg-accent inline-block" />
              OUR SOLUTIONS
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              ENGINEERED PACKAGING <br />
              <span className="text-primary-foreground/40 font-light italic">
                FOR EVERY INDUSTRY
              </span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-black tracking-widest text-xs h-14 px-8 rounded-none transition-all duration-500"
            >
              ALL PRODUCTS
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.id}
              variants={itemVariants}
              className="group relative bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-accent flex flex-col h-full rounded-none"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/60 group-hover:bg-transparent transition-colors z-10 duration-700 max-w-full" />
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-110 max-w-full"
                />

                {/* Icon Badge Overlay */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  className="absolute top-6 left-6 z-20 w-14 h-14 bg-accent flex items-center justify-center text-accent-foreground shadow-xl"
                >
                  <PackageOpen className="w-7 h-7" />
                </motion.div>
              </div>

              <div className="p-8 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
                <h4 className="font-black text-xl mb-3 group-hover:text-accent transition-colors tracking-tighter uppercase leading-tight">
                  {prod.name}
                </h4>
                <p className="text-primary-foreground/60 text-xs font-bold flex-1 mb-8 leading-relaxed tracking-tight">
                  {prod.desc}
                </p>
                <Link
                  href={`/products/${prod.id}`}
                  className="inline-flex items-center text-[10px] font-black tracking-[0.2em] uppercase text-accent hover:text-white transition-all duration-300 gap-3 group/link"
                >
                  <span className="w-8 h-[2px] bg-accent group-hover/link:w-12 group-hover/link:bg-white transition-all duration-500" />
                  VIEW DETAILS
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
