"use client";

import {
  ArrowRight,
  Box,
  Layers,
  Printer,
  Scissors,
  Truck,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef } from "react";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "RAW MATERIAL",
    icon: Layers,
    desc: "Premium Kraft liner sourcing.",
  },
  {
    step: "02",
    name: "CORRUGATION",
    icon: Box,
    desc: "Fluting and gluing structure.",
  },
  {
    step: "03",
    name: "PRECISION PRINT",
    icon: Printer,
    desc: "High-def flexo branding.",
  },
  {
    step: "04",
    name: "DIE-CUTTING",
    icon: Scissors,
    desc: "CNC-precise slotting.",
  },
  {
    step: "05",
    name: "QUALITY AUDIT",
    icon: ShieldCheck,
    desc: "BCT / ECT verification.",
  },
  { step: "06", name: "DISPATCH", icon: Truck, desc: "Global logistics sync." },
];

export function ProcessPreview() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="py-40 bg-[#0D121F] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,183,77,0.02),transparent_50%)]" />
      
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <h2 className="text-accent font-black tracking-[0.4em] text-[11px] uppercase mb-10 flex items-center gap-10">
              <span className="w-16 h-px bg-accent inline-block" />
              SYSTEM OPERATIONS
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              THE PRODUCTION <br />
              <span className="text-white/30 italic font-light">LIFECYCLE.</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <div className="flex flex-col items-end">
               <span className="text-accent text-[10px] font-black tracking-widest uppercase">STRICT ISO STANDARDS</span>
               <span className="text-white/30 text-[9px] font-bold">100% QUALITY ASSURANCE</span>
            </div>
            <Settings className="w-10 h-10 text-white/10 animate-spin-slow" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-white/5 border border-white/5 relative">
          {PROCESS_STEPS.map((ps, idx) => {
            const Icon = ps.icon;
            return (
              <motion.div
                key={ps.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col p-12 bg-[#0A0F1A] group border-r border-white/5 last:border-r-0"
              >
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-12">
                   <div className="text-[11px] font-black text-accent tracking-tighter bg-accent/5 px-2 py-1 border border-accent/20">
                      PHASE {ps.step}
                   </div>
                   <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-accent animate-pulse" />
                </div>
                
                <div className="w-16 h-16 bg-white/3 border border-white/10 group-hover:border-accent group-hover:bg-accent flex items-center justify-center mb-10 transition-all duration-500 shadow-2xl relative">
                  <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-500" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-right border-white/20" />
                </div>
                
                <h4 className="font-black text-xl mb-4 text-white tracking-tighter uppercase leading-tight group-hover:text-accent transition-colors">
                  {ps.name}
                </h4>
                <p className="text-white/30 text-[11px] font-bold tracking-tight uppercase group-hover:text-white/60 transition-colors">
                  {ps.desc}
                </p>

                {/* Vertical connecting line for hover */}
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-32 flex flex-col md:flex-row items-center justify-between gap-12 p-12 border border-white/5 bg-white/2"
        >
          <div className="flex items-center gap-8">
             <div className="text-[40px] font-black text-accent tracking-tighter">0.1s</div>
             <p className="text-white/40 text-xs font-bold leading-relaxed max-w-xs uppercase tracking-widest">
               Latency in our automated quality control feedback loop.
             </p>
          </div>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-white hover:text-[#0A0F1A] h-20 px-12 text-xs tracking-[0.3em] font-black rounded-none group transition-all duration-700 shadow-[15px_15px_0px_rgba(255,183,77,0.1)] uppercase"
            asChild
          >
            <Link href="/process">
              SYSTEM ARCHITECTURE
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-4 transition-transform duration-700" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

