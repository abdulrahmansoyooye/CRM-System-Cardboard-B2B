"use client";

import { motion } from "framer-motion";
import { MoveRight, Briefcase, GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CAREER_POINTS = [
  {
    icon: Users,
    title: "EXPERT LEADERSHIP",
    desc: "Work with industry veterans who shaped the corrugation landscape."
  },
  {
    icon: Briefcase,
    title: "INDUSTRIAL STABILITY",
    desc: "Join a legacy company with consistent growth and global presence."
  },
  {
    icon: GraduationCap,
    title: "SKILL ADVANCEMENT",
    desc: "Rigorous training on the latest automated manufacturing technology."
  }
];

export function CareersPreview() {
  return (
    <section className="py-40 bg-[#0A0F1A] overflow-hidden relative border-t border-white/5">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,77,0.02),transparent_70%)]" />
      
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-accent font-black tracking-[0.4em] text-[11px] uppercase mb-10 flex items-center gap-10">
              <span className="w-16 h-px bg-accent inline-block" />
              JOIN THE LEGACY
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-12 uppercase">
              SHAPING THE <br />
              <span className="text-white/30 italic font-light">FUTURE</span> <br />
              OF PACKAGING.
            </h3>
            <p className="text-white/40 text-sm font-bold mb-16 leading-relaxed max-w-xl tracking-tight uppercase">
              We are constantly seeking industrial engineers, supply chain specialists, and manufacturing technicians to join our high-performance team. Build your career at CARDBOX.
            </p>

            <Link href="/careers">
              <Button size="lg" className="bg-white text-primary hover:bg-accent hover:text-white h-20 px-12 text-xs tracking-[0.3em] font-black rounded-none transition-all duration-500 group">
                VIEW OPEN POSITIONS 
                <MoveRight className="w-6 h-6 ml-3 group-hover:translate-x-4 transition-transform duration-700" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-12">
            {CAREER_POINTS.map((point, idx) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="flex gap-10 group"
              >
                <div className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <point.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-3 tracking-tighter uppercase group-hover:text-accent transition-colors">
                    {point.title}
                  </h4>
                  <p className="text-white/40 text-[11px] font-bold leading-relaxed tracking-tight uppercase">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Corporate watermark */}
      <div className="absolute bottom-20 right-0 text-[120px] font-black text-white/5 leading-none translate-x-1/4 pointer-events-none select-none tracking-tighter uppercase">
        Careers
      </div>
    </section>
  );
}
