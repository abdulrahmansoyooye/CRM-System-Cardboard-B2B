"use client";

import { Cpu, Leaf, ShoppingCart, Truck, Zap, Activity, Microscope, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getIndustries } from "@/lib/api";

const STATIC_ICONS = [ShoppingCart, Truck, Zap, Cpu, Microscope, Leaf];

type Industry = {
  _id: string;
  name: string;
  slug: string;
  overview: string;
};

export function IndustriesServed({ industries: initialIndustries }: { industries?: Industry[] }) {
  const [industries, setIndustries] = useState<Industry[]>(initialIndustries || []);
  const [isLoading, setIsLoading] = useState(!initialIndustries);

  useEffect(() => {
    if (initialIndustries) return;
    const fetchIndustries = async () => {
      try {
        const data = await getIndustries();
        setIndustries(data);
      } catch (error) {
        console.error("Error fetching industries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, [initialIndustries]);

  return (
    <section className="py-40 bg-[#0A0F1A] relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ 
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <h2 className="text-accent font-black tracking-[0.4em] text-[10px] md:text-[11px] uppercase mb-8 md:mb-10 flex items-center gap-6 md:gap-10">
              <span className="w-10 md:w-16 h-px bg-accent inline-block" />
              VERTICAL MARKETS
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] lg:leading-[0.85] uppercase">
              SECTORS <span className="text-white/30 italic font-light">WE EMPOWER.</span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 text-white/40 text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-4"
          >
            <Activity className="w-4 h-4 text-accent animate-pulse" />
            LIVE MARKET OPERATIONS
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {industries.map((ind, idx) => {
              const Icon = STATIC_ICONS[idx % STATIC_ICONS.length];
              return (
                <motion.div
                  key={ind._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-12 bg-[#0D121F] hover:bg-accent transition-all duration-700 cursor-pointer flex flex-col h-full relative overflow-hidden"
                >
                  {/* Hover Reveal Background */}
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none z-0" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/3 border border-white/10 flex items-center justify-center mb-12 shadow-2xl transition-all duration-700 group-hover:bg-[#0A0F1A] group-hover:scale-110 group-hover:-rotate-12">
                      <Icon className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />
                    </div>
                    
                    <h4 className="font-black text-3xl mb-5 text-white group-hover:text-[#0A0F1A] transition-colors tracking-tighter uppercase leading-[0.9]">
                      {ind.name}
                    </h4>
                    <p className="text-white/40 group-hover:text-[#0A0F1A]/70 text-sm font-bold tracking-tight leading-relaxed transition-colors duration-500 max-w-60">
                      {ind.overview}
                    </p>
                  </div>
                  
                  {/* Card Numbering */}
                  <div className="absolute bottom-10 right-10 text-[60px] font-black text-white/2 group-hover:text-[#0A0F1A]/5 transition-colors pointer-events-none tracking-tighter leading-none select-none">
                    0{idx + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

