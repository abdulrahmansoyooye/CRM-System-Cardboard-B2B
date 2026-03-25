"use client";

import {
  ArrowRight,
  Box,
  Layers,
  Monitor,
  Printer,
  Scissors,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Paper Roll Sourcing",
    icon: Layers,
    desc: "Kraff liner procurement.",
  },
  {
    step: "02",
    name: "Corrugation",
    icon: Box,
    desc: "Fluting and gluing structure.",
  },
  {
    step: "03",
    name: "Precision Print",
    icon: Printer,
    desc: "Flexographic branding.",
  },
  {
    step: "04",
    name: "Die-Cutting",
    icon: Scissors,
    desc: "Automated shape slotting.",
  },
  {
    step: "05",
    name: "Quality Check",
    icon: Monitor,
    desc: "Crush test verification.",
  },
  { step: "06", name: "Logistics", icon: Truck, desc: "Dispatch scheduling." },
];

export function ProcessPreview() {
  return (
    <section className="py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent font-black tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center justify-center gap-6">
              <span className="w-12 h-[2px] bg-accent inline-block" />
              MANUFACTURING FLOW
              <span className="w-12 h-[2px] bg-accent inline-block" />
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[0.9] uppercase">
              THE PROCESS <span className="text-muted-foreground font-light italic">CHAIN</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-12 border-b-2 border-primary/10 pb-20 relative">
          {/* Connecting line for desktop */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-accent/30 z-0 origin-left" 
          />

          {PROCESS_STEPS.map((ps, idx) => {
            const Icon = ps.icon;
            return (
              <motion.div
                key={ps.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  className="w-14 h-14 bg-primary group-hover:bg-accent text-primary-foreground flex items-center justify-center text-xl font-black mb-6 rounded-none transition-all duration-500 shadow-2xl border-l-4 border-accent group-hover:border-primary"
                >
                  {ps.step}
                </motion.div>
                
                <div className="w-24 h-24 bg-background border border-border group-hover:border-accent flex items-center justify-center rounded-none mb-6 shadow-xl transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-6">
                  <Icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors duration-500" />
                </div>
                
                <h4 className="font-black text-lg mb-2 text-primary tracking-tighter uppercase leading-tight group-hover:text-accent transition-colors">
                  {ps.name}
                </h4>
                <p className="text-muted-foreground text-[10px] font-bold tracking-tight uppercase opacity-60">
                  {ps.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Button
            size="lg"
            variant="ghost"
            className="text-primary hover:text-accent font-black tracking-[0.2em] text-[10px] px-10 h-16 rounded-none group transition-all duration-500 uppercase flex items-center gap-4 mx-auto"
            asChild
          >
            <Link href="/process">
              VIEW FULL INFRASTRUCTURE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
