"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { TTestimonial } from "@/types";
import { getPlaceholderImage } from "@/lib/utils";

export function Testimonials({ testimonials }: { testimonials: TTestimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-10 text-[200px] font-black tracking-tighter uppercase select-none">
          Trust
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-6"
          >
            VALIDATED PARTNERSHIPS
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
          >
            CLIENT <span className="text-muted-foreground font-light italic text-3xl md:text-5xl">TESTIMONIALS.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-background border border-border/50 p-10 flex flex-col relative group hover:border-accent transition-all duration-500 shadow-xl"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-accent/10 group-hover:text-accent/20 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < (t.rating || 5) ? 'text-accent fill-accent' : 'text-muted-foreground/20'}`} 
                  />
                ))}
              </div>

              <p className="text-lg font-bold text-primary mb-10 leading-relaxed italic tracking-tight flex-1">
                &quot;{t.message}&quot;
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-border/50">
                <div className="relative w-14 h-14 shrink-0 overflow-hidden border-2 border-accent/20">
                  <Image 
                    src={t.image || getPlaceholderImage('hero')} 
                    alt={t.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tighter text-primary">{t.name}</h4>
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">{t.role} {" // "} {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
