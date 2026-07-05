"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";
import { Factory, Cog, Layers, Truck, ShieldCheck, Zap } from "lucide-react";
import { getSettings } from "@/lib/api";

// metadata export in a client component won't work,
// so we export metadata from a separate server component pattern.
// This page is client-rendered; the root layout provides fallback metadata.

const MACHINERY = [
  {
    name: "5-Ply Automatic Corrugation Line",
    desc: "BHS High-speed corrugator capable of 300m/min continuous production with precision moisture control.",
    specs: ["Width: 2500mm", "Speed: 300mpm", "Auto-Splicer"]
  },
  {
    name: "High-Resolution Flexo Folder Gluer",
    desc: "6-color high-definition printing with integrated die-cutting and folder gluer for rapid turnaround.",
    specs: ["Colors: 6", "Slotting: Inline", "Precision: 0.1mm"]
  },
  {
    name: "Automated Flatbed Die-Cutter",
    desc: "Computer-controlled die cutting system for intricate designs and heavy-duty structural packaging.",
    specs: ["Format: 1600x1200", "Pressure: 400T", "Auto-Stripping"]
  },
  {
    name: "Vertical Load Compression Tester",
    desc: "Advanced testing rig to verify BCT and ECT values of finished products ensuring logistics safety.",
    specs: ["Load: 20KN", "Precision: Grade 1", "Digital Log"]
  }
];

export default function InfrastructurePage() {
  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center bg-[#0A0F1A] overflow-hidden">
        <Image
          src={getPlaceholderImage('factory')}
          alt="Advanced Manufacturing Facility"
          fill
          className="object-cover opacity-30 grayscale saturate-0 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-6"
          >
            ENGINEERING POWERHOUSE
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase"
          >
            INDUSTRIAL <br />
            <span className="text-white/30 italic font-light">INFRASTRUCTURE.</span>
          </motion.h1>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-6">World-Class Manufacturing Floor</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Operating from a state-of-the-art 500,000 sq.ft facility, we maintain one of the region's largest 
                corrugation capacities. Our infrastructure is designed for high-velocity supply chains where failure 
                is not an option.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-secondary/50 border border-border">
                   <div className="text-3xl font-black text-primary mb-1">500K+</div>
                   <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sq. Ft Area</div>
                </div>
                <div className="p-6 bg-secondary/50 border border-border">
                   <div className="text-3xl font-black text-primary mb-1">450T</div>
                   <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Daily Capacity</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-square">
               <Image 
                 src={getPlaceholderImage('warehouse')}
                 alt="Facility Overview"
                 fill
                 className="object-cover grayscale saturate-50 brightness-75 border-l-8 border-accent"
               />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent p-8 flex flex-col justify-end">
                  <span className="text-4xl font-black text-white leading-none">24/7</span>
                  <span className="text-[10px] font-black text-white/60 uppercase">Operations</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery List */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-24">
             <h2 className="text-[10px] font-black tracking-[0.4em] text-accent uppercase mb-4">TECHNOLOGY STACK</h2>
             <h3 className="text-5xl font-black tracking-tighter uppercase">PRECISION MACHINE <span className="text-muted-foreground font-light italic">INVENTORY</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MACHINERY.map((mac, idx) => (
              <motion.div
                key={mac.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background border border-border p-10 group hover:border-accent transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Cog className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-4xl font-black text-muted-foreground/10 group-hover:text-accent/10 transition-colors">0{idx + 1}</span>
                </div>
                <h4 className="text-2xl font-black tracking-tighter uppercase mb-4 group-hover:text-accent transition-colors">{mac.name}</h4>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed uppercase font-bold tracking-tight">{mac.desc}</p>
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                   {mac.specs.map(spec => (
                     <span key={spec} className="text-[10px] font-black bg-secondary px-3 py-1 tracking-widest uppercase">{spec}</span>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity Statement */}
      <section className="py-40 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
           <Factory className="w-[500px] h-[500px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">SCALABILITY <br/> <span className="text-accent underline">GUARANTEED.</span></h2>
           <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 font-bold leading-tight uppercase tracking-tight">
             Our infrastructure is ready to scale with your business demands, ensuring 100% supply chain continuity even during peak industrial cycles.
           </p>
           <button className="bg-accent text-accent-foreground px-12 py-5 font-black text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-primary transition-all">
             GET DETAILED FACILITY SPECS
           </button>
        </div>
      </section>
    </main>
  );
}
