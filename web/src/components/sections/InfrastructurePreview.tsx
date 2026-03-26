"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CAPABILITIES = [
  "BHS High Speed 2.5m Corrugator System",
  "5-Color High-Def Flexographic Printing Line",
  "Automated Flatbed Precision Die-Cutter",
  "In-house Laboratory for BCT/ECT Certification",
];

export function InfrastructurePreview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={containerRef} className="py-40 bg-[#0A0F1A] text-white overflow-hidden relative border-t border-white/5">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.03] -translate-x-1/2 hidden lg:block" />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-accent tracking-[0.4em] text-[11px] uppercase mb-10 flex items-center gap-10 font-black">
              <span className="w-16 h-[1px] bg-accent inline-block" />
              CAPACITY & QUALITY
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-12 uppercase">
              INDUSTRIAL <br />
              <span className="text-white/30 font-light italic">INFRASTRUCTURE.</span>
            </h3>
            <p className="text-white/40 text-sm font-bold mb-16 leading-relaxed max-w-xl tracking-tight uppercase">
              Equipped with high-velocity automated corrugators and precision flexo-printing systems, our facility is engineered to deliver millimeter accuracy for high-volume supply chains.
            </p>

            <div className="grid grid-cols-1 gap-8">
              {CAPABILITIES.map((cap, idx) => (
                <motion.div 
                  key={cap}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="flex items-start gap-8 group"
                >
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <ShieldCheck className="w-5 h-5 text-accent group-hover:text-[#0A0F1A] transition-colors" />
                  </div>
                  <div>
                    <span className="text-sm font-black tracking-widest uppercase transition-colors group-hover:text-accent leading-none block mb-2">
                       {cap}
                    </span>
                    <div className="w-full h-px bg-white/[0.05] group-hover:bg-accent/20 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Images Layout */}
          <div className="lg:w-1/2 relative min-h-[700px] w-full mt-20 lg:mt-0">
            <motion.div 
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 w-[85%] h-[75%] overflow-hidden border-white/10 bg-white/5 border-2 z-10 group"
            >
              <Image
                src="/images/factory.png"
                alt="Corrugated Production Line"
                fill
                className="object-cover grayscale saturate-50 hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent opacity-60" />
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              initial={{ opacity: 0, x: -60, y: 60 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 left-0 w-[60%] h-[55%] overflow-hidden border-white/10 bg-white/5 border-2 z-20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group"
            >
              <Image
                src="/images/hero.png"
                alt="Stacked Corrugated Boxes"
                fill
                className="object-cover grayscale saturate-50 hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent opacity-40" />
            </motion.div>

            {/* Performance Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="absolute bottom-0 right-10 z-30 bg-accent p-8 w-48 h-48 flex flex-col justify-end gap-2 shadow-2xl"
            >
                <div className="text-4xl font-black text-white tracking-tighter">99.8%</div>
                <div className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-tight">PRECISION RATE UPON AUDIT</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

