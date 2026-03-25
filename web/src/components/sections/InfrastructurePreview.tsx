"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const CAPABILITIES = [
  "BHS High Speed Corrugator Machine",
  "5-Color Flexographic Printer Slotter",
  "Automated Flatbed Die-Cutter",
  "In-house Laboratory for Edge Crush Testing (ECT)",
];

export function InfrastructurePreview() {
  return (
    <section className="py-32 bg-primary text-primary-foreground border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-secondary tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-6 font-black">
              <span className="w-12 h-[2px] bg-accent inline-block" />
              INFRASTRUCTURE
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-10 uppercase">
              HEAVY DUTY <br />
              <span className="text-accent font-light italic">FACTORY SETUP</span>
            </h3>
            <p className="text-primary-foreground/60 text-lg mb-12 leading-relaxed max-w-lg font-bold tracking-tight">
              Equipped with high-speed automated corrugators and multi-color
              flexo-printing lines, our facility is engineered to produce
              industrial volumes with millimeter precision.
            </p>

            <ul className="space-y-6 text-primary-foreground tracking-tight font-bold">
              {CAPABILITIES.map((cap, idx) => (
                <motion.li 
                  key={cap}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-6 border-b border-white/5 pb-6 last:border-0 group"
                >
                  <div className="w-8 h-8 rounded-none border border-accent flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                    <CheckCircle2 className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm tracking-wide uppercase transition-colors group-hover:text-accent">
                    {cap}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Images Layout */}
          <div className="lg:w-1/2 relative min-h-[600px] w-full mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[85%] h-[80%] overflow-hidden border-white/10 bg-white/5 border-2 rounded-none z-10 group"
            >
              <Image
                src="/images/factory.png"
                alt="Corrugated Production Line"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -40, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-[65%] h-[60%] overflow-hidden border-white/10 bg-white/5 border-2 z-20 rounded-none shadow-2xl group"
            >
              <Image
                src="/images/hero.png"
                alt="Stacked Corrugated Boxes"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
            </motion.div>

            {/* Accent Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
