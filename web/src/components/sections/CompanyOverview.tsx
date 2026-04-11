"use client";

import { Building2, Factory, Globe2, Truck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getPlaceholderImage } from "@/lib/utils";
import { StatCounter } from "@/components/StatCounter";

const FEATURES = [
  {
    icon: Building2,
    title: "MASSIVE INFRASTRUCTURE",
    desc: "Over 500,000 sq.ft of precision manufacturing space.",
  },
  {
    icon: Globe2,
    title: "GLOBAL FOOTPRINT",
    desc: "Seamless export operations to 35+ countries.",
  },
  {
    icon: Factory,
    title: "ADVANCED CORRUGATION",
    desc: "High-speed 5-Ply and 7-Ply automated production.",
  },
  {
    icon: Truck,
    title: "LOGISTICS NETWORK",
    desc: "Managed fleet for mission-critical industrial delivery.",
  },
];

import { TSettings } from "@/types";

export function CompanyOverview({ settings }: { settings?: TSettings }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={targetRef} className="py-40 bg-[#0D121F] overflow-hidden relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 left-12 text-[150px] font-black text-white/5 tracking-tighter select-none pointer-events-none">
        LEGACY
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Main Visual Column */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group aspect-[4/5] overflow-hidden border-l border-t border-accent/20"
            >
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10" />
              <motion.div style={{ scale: imgScale, y: imgY }} className="w-full h-full">
                <Image
                  src={getPlaceholderImage('hero')}
                  alt="Corrugated Box Manufacturing Plant"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 saturate-50 contrast-125"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-transparent to-transparent z-20" />
              
              {/* Image Floating Stat */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 left-12 z-30 bg-accent p-8 shadow-[30px_30px_0px_rgba(0,0,0,0.3)] border-r-4 border-b-4 border-white/20"
              >
                <div className="text-4xl font-black text-accent-foreground mb-1 tracking-tighter">25+</div>
                <div className="text-[10px] font-black tracking-[0.2em] text-accent-foreground/60 uppercase">
                  YEARS OF EXCELLENCE
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative corner element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-accent/50 pointer-events-none" />
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-6 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-accent font-black tracking-[0.4em] text-[11px] uppercase mb-8 flex items-center gap-8">
                <span className="w-16 h-0.5 bg-accent inline-block" />
                INDUSTRIAL HERITAGE
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-10 uppercase">
                ENGINEERING <br />
                <span className="text-white/30 italic font-light">RELIABILITY</span> <br />
                SINCE {settings?.contactInfo?.establishedYear || "1998"}.
              </h3>
              <p className="text-white/50 text-xl mb-16 leading-relaxed font-medium tracking-tight max-w-xl">
                For over two decades, CARDBOX has been the backbone of
                industrial logistics. We refine the art of corrugation to protect 
                mission-critical components across global supply chains.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="flex flex-col gap-6 group"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500 relative overflow-hidden">
                    <feature.icon className="w-7 h-7 text-accent group-hover:text-white relative z-10 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg mb-3 tracking-tighter uppercase group-hover:text-accent transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-white/40 text-xs font-bold leading-relaxed tracking-tight">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Proof points */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8 }}
               className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter mb-2">
                    <StatCounter value={new Date().getFullYear() - parseInt(settings?.contactInfo?.establishedYear || "1998")} suffix="+" />
                  </div>
                  <div className="text-[9px] font-black text-white/40 tracking-widest uppercase">YEARS OF EXPERIENCE</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter mb-2">
                    <StatCounter value={parseInt(settings?.contactInfo?.productionCapacity || "450")} suffix="T" />
                  </div>
                  <div className="text-[9px] font-black text-white/40 tracking-widest uppercase">PRODUCTION CAPACITY</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter mb-2">
                    <StatCounter value={parseInt(settings?.contactInfo?.factoryArea || "500")} suffix="K+" />
                  </div>
                  <div className="text-[9px] font-black text-white/40 tracking-widest uppercase">FACTORY AREA (SQ.FT)</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white tracking-tighter mb-2">
                    <StatCounter value={parseInt(settings?.contactInfo?.exportCount || "35")} suffix="+" />
                  </div>
                  <div className="text-[9px] font-black text-white/40 tracking-widest uppercase">EXPORT COUNTRIES</div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

