"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPlaceholderImage } from "@/lib/utils";

export function CTABanner() {
  return (
    <section className="relative py-40 w-full bg-primary overflow-hidden flex flex-col justify-center items-center text-center px-4">
      {/* Background Graphic / Texture */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale mix-blend-overlay" 
        style={{ backgroundImage: `url(${getPlaceholderImage('box')})` }}
      />

      {/* Industrial Accents */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 w-full h-3 bg-accent" 
      />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-7xl lg:text-8xl font-black text-primary-foreground tracking-tighter leading-[0.9] mb-12 uppercase"
        >
          NEED <br />
          <span className="text-accent italic font-light lowercase">custom</span> <br />
          PACKAGING SOLUTIONS?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary-foreground/60 font-bold text-lg md:text-2xl max-w-2xl mb-16 tracking-tight leading-relaxed"
        >
          Partner with CARDBOX for reliable, heavy-duty industrial corrugated
          boards designed exactly to your specifications. Let&apos;s engineer your
          protection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-8 items-center w-full justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/request-quote">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-white hover:text-primary transition-all duration-500 text-[10px] tracking-[0.3em] h-20 px-12 rounded-none font-black w-full sm:w-auto shadow-[15px_15px_0px_rgba(255,183,77,0.1)] uppercase"
              >
                GET A QUOTE
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-6 sm:mt-0 text-primary-foreground">
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-5 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-none border-2 border-primary-foreground/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-1">
                  Sales Direct
                </div>
                <div className="font-black text-xl tracking-tighter transition-colors group-hover:text-accent">
                  +1 (800) 123-4567
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
