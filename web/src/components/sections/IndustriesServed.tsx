"use client";

import { Cpu, Leaf, ShoppingCart, Truck, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent font-black tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center justify-center gap-6">
              <span className="w-12 h-[2px] bg-accent inline-block" />
              SECTORS WE EMPOWER
              <span className="w-12 h-[2px] bg-accent inline-block" />
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[0.9] uppercase">
              INDUSTRIES <span className="text-muted-foreground font-light italic">WE SERVE</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group p-10 border border-border bg-secondary/30 hover:bg-primary transition-all duration-500 rounded-none cursor-pointer flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-accent/20 transition-all duration-700" />
                
                <div className="w-20 h-20 bg-background group-hover:bg-accent flex items-center justify-center mb-10 transition-all duration-500 shadow-xl border border-border rounded-none group-hover:rotate-12">
                  <Icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                
                <h4 className="font-black text-3xl mb-4 text-primary group-hover:text-primary-foreground transition-colors tracking-tighter uppercase leading-none">
                  {ind.name}
                </h4>
                <p className="text-muted-foreground group-hover:text-primary-foreground/70 text-sm font-bold tracking-tight leading-relaxed transition-colors duration-500">
                  {ind.desc}
                </p>
                
                <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-[10px] font-black tracking-widest text-accent group-hover:text-white uppercase">
                  Explore Case Studies
                  <div className="w-8 h-[2px] bg-white" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
