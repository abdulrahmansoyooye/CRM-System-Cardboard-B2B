"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Box, MoveRight } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Industrial Manufacturing Facility"
          fill
          className="object-cover opacity-30 grayscale saturate-0 contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent" />
      </motion.div>

      {/* Decorative Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"
        />
        <motion.div
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-2/3 h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>

      <div className="container relative z-10 px-4 lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-primary-foreground">
        <div className="flex flex-col justify-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground font-black text-[10px] tracking-[0.2em] mb-8 w-fit uppercase border border-accent"
          >
            <Box className="w-3.5 h-3.5" />
            <span>ESTABLISHED 1998 • HEAVY-DUTY SPECIALISTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase"
          >
            ENGI<span className="text-accent underline decoration-accent underline-offset-8">NEER</span>ING <br />
            <span className="italic font-light">PRO</span>TECTION.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-xl font-medium leading-relaxed tracking-tight"
          >
            Enterprise-grade corrugated packaging designed for heavy
            manufacturing, export logistics, and automated supply chains.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-white hover:text-primary h-16 px-10 text-xs tracking-[0.2em] font-black group transition-all duration-500 rounded-none shadow-[10px_10px_0px_rgba(255,183,77,0.2)]"
            >
              REQUEST A QUOTE
              <MoveRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-10 bg-transparent border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs tracking-[0.2em] font-black rounded-none group transition-all duration-500"
            >
              VIEW CATALOG
            </Button>
          </motion.div>

          {/* Quick Stats directly in Hero */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mt-20 pt-10 border-t border-primary-foreground/10">
            {[
              { label: "Years Experience", value: "25+" },
              { label: "Tons Capacity", value: "100K+" },
              { label: "ISO Certified", value: "9001" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
              >
                <div className="text-4xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 group cursor-pointer"
      >
        <span className="text-[10px] font-black tracking-widest uppercase">DISCOVER</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
