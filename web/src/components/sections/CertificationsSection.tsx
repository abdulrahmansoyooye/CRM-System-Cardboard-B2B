"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Award, FileCheck, CheckCircleIcon } from "lucide-react";

const CERTIFICATIONS = [
  {
    icon: Award,
    title: "ISO 9001:2015",
    desc: "Quality Management System Certified",
    label: "Quality"
  },
  {
    icon: ShieldCheck,
    title: "FSC® CERTIFIED",
    desc: "Forest Stewardship Council chain-of-custody",
    label: "Sustainable"
  },
  {
    icon: FileCheck,
    title: "ASTM STANDARDS",
    desc: "Compliance with international testing norms",
    label: "Industrial"
  },
  {
    icon: CheckCircleIcon,
    title: "UN APPROVED",
    desc: "Packaging for hazardous materials & exports",
    label: "Certified"
  }
];

export function CertificationsSection() {
  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-6"
          >
            VALIDATED QUALITY
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
          >
            GLOBAL <span className="text-muted-foreground font-light italic text-3xl md:text-5xl">STANDARDS.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative bg-background border border-border/50 p-10 flex flex-col items-center text-center hover:border-accent transition-all duration-500 shadow-xl shadow-slate-900/5 hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-secondary flex items-center justify-center rounded-none mb-8 group-hover:bg-accent group-hover:rotate-6 transition-all duration-500">
                <cert.icon className="w-10 h-10 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              
              <div className="inline-block text-[9px] font-black uppercase tracking-widest text-accent mb-3 opacity-60">
                 {cert.label}
              </div>
              
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors">
                {cert.title}
              </h4>
              
              <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-tight">
                {cert.desc}
              </p>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-accent/0 border-l-transparent group-hover:border-t-accent transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
