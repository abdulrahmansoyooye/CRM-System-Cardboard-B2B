"use client";

import { Building2, Factory, Globe2, Truck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Building2,
    title: "Massive Infrastructure",
    desc: "Over 500,000 sq.ft of manufacturing space",
  },
  {
    icon: Globe2,
    title: "Global Footprint",
    desc: "Exporting to 35+ countries continuously",
  },
  {
    icon: Factory,
    title: "Advanced Corrugation",
    desc: "5-Ply and 7-Ply machinery",
  },
  {
    icon: Truck,
    title: "On-Time Logistics",
    desc: "Own fleet management for deliveries",
  },
];

export function CompanyOverview() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Main Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-primary/5 rounded-none flex items-center justify-center border-l-8 border-accent">
              <Image
                src="/images/company.png"
                alt="Corrugated Box Manufacturing Plant"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-accent text-accent-foreground p-10 hidden xl:block max-w-sm rounded-none shadow-[20px_20px_0px_rgba(0,0,0,0.1)]"
            >
              <div className="font-black text-xl mb-4 flex items-center gap-4">
                <Factory className="w-8 h-8" />
                <span className="tracking-tighter uppercase">STATE OF THE ART</span>
              </div>
              <p className="text-accent-foreground/90 font-bold leading-relaxed text-sm tracking-tight">
                Our facilities operate with automated machineries delivering
                high structural precision logic.
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="lg:pl-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-accent font-black tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-6">
                <span className="w-12 h-[2px] bg-accent inline-block" />
                WHO WE ARE
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[0.9] mb-8 uppercase">
                RELIABLE PACKAGING <br />
                <span className="text-muted-foreground font-light italic">
                  FOR GLOBAL EXPORTERS
                </span>
              </h3>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed font-bold tracking-tight">
                For over two decades, CARDBOX has been the cornerstone of
                industrial packaging. We specialize in engineering corrugated
                boxes that protect your high-value goods through complex supply
                chains.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-primary">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                    <feature.icon className="w-8 h-8 text-accent group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1 tracking-tighter uppercase">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-xs font-bold leading-relaxed tracking-tight">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
