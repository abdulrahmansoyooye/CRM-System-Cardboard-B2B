"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";
import { ShieldCheck, ClipboardCheck, Microscope, Ruler, FileText, CheckCircle, Award } from "lucide-react";

const TESTING_NORMS = [
  {
    title: "Bursting Strength Test",
    desc: "Verification of corrugated board's resistance to rupture under pressure.",
    standard: "ASTM D3786"
  },
  {
    title: "Box Compression Test (BCT)",
    desc: "Testing maximum vertical load a box can withstand before collapsing.",
    standard: "TAPPI T804"
  },
  {
    title: "Edge Crush Test (ECT)",
    desc: "Measuring the compressive strength of the board edge.",
    standard: "ISO 3037"
  },
  {
    title: "Cobb Sizing Test",
    desc: "Assessing water absorption rates for moisture-sensitive cargo.",
    standard: "ISO 535"
  }
];

export default function QualityPage() {
  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center bg-[#0A0F1A] overflow-hidden">
        <Image
          src={getPlaceholderImage('industry')}
          alt="Quality Testing Laboratory"
          fill
          className="object-cover opacity-20 filter contrast-150 saturate-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-6"
          >
            PRECISION ASSURANCE
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase"
          >
            QUALITY <br />
            <span className="text-white/30 italic font-light">VALIATION.</span>
          </motion.h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-8">OUR PROMISE</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-10 leading-[0.9]">Beyond <span className="text-muted-foreground font-light italic">Standard</span> Compliance.</h3>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-12 italic border-l-4 border-accent pl-10">
              "At CARDBOX, quality is not a department—it is the governing protocol for every fiber we process. 
              Our commitment to mission-critical protection ensures your cargo reaches its destination exactly as it left."
            </p>
          </div>
        </div>
      </section>

      {/* Lab Testing Section */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
             <div>
               <div className="space-y-12">
                 {TESTING_NORMS.map((norm, idx) => (
                   <motion.div 
                     key={norm.title}
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="flex gap-10 group"
                   >
                     <div className="w-16 h-16 bg-background border border-border flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                       <CheckCircle className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-accent mb-2 uppercase tracking-widest leading-none">{norm.standard}</div>
                        <h4 className="text-2xl font-black tracking-tighter uppercase mb-3 transition-colors group-hover:text-accent">{norm.title}</h4>
                        <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-tight">{norm.desc}</p>
                     </div>
                   </motion.div>
                 ) )}
               </div>
             </div>
             
             <div className="relative pt-20">
               <div className="premium-card p-10 bg-primary text-white relative z-10 border-none shadow-2xl">
                 <Microscope className="w-12 h-12 text-accent mb-10" />
                 <h4 className="text-3xl font-black tracking-tighter uppercase mb-6">In-House Laboratory</h4>
                 <p className="text-white/50 text-base font-bold leading-relaxed mb-10 tracking-tight uppercase">
                   We maintain a fully equipped testing lab on the factory floor, allowing for real-time 
                   audit of every shift. We don't wait for third-party reports; we validate our own excellence.
                 </p>
                 <ul className="space-y-4">
                    {["Moisture Control Systems", "Force Distribution Mapping", "GSM Verification", "Glue Adhesion Strength"].map(item => (
                      <li key={item} className="flex items-center gap-4 text-[11px] font-black tracking-[0.2em] text-white uppercase italic">
                        <span className="w-4 h-0.5 bg-accent" /> {item}
                      </li>
                    ))}
                 </ul>
               </div>
               <div className="absolute top-0 right-0 w-full h-[60%] border-2 border-accent/20 -translate-y-10 translate-x-10 pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* Certifications Display */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center">
           <h2 className="text-[10px] font-black tracking-[0.4em] text-accent-500 uppercase mb-12">GLOBAL ACCREDITATION</h2>
           <div className="flex flex-wrap justify-center gap-20 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
              <ShieldCheck className="w-24 h-24" />
              <Award className="w-24 h-24" />
              <ClipboardCheck className="w-24 h-24" />
              <FileText className="w-24 h-24" />
              <Ruler className="w-24 h-24" />
           </div>
           
           <div className="mt-32 max-w-2xl mx-auto">
             <h4 className="text-2xl font-black uppercase mb-6">Download Quality Reports</h4>
             <p className="text-muted-foreground mb-10 font-bold uppercase tracking-tight text-sm">Access our monthly compliance certificates and audit summaries.</p>
             <button className="btn-primary px-12 h-16 rounded-none tracking-[0.3em] font-black text-xs">DOWNLOAD ISO CERTIFICATES</button>
           </div>
        </div>
      </section>
    </main>
  );
}
