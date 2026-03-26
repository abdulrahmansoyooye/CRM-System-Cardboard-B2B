"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Box, MoveRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[750px] flex items-center justify-center overflow-hidden bg-[#0A0F1A]"
    >
      {/* Premium Background Layering */}
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Industrial Manufacturing Facility"
          fill
          className="object-cover opacity-20 grayscale saturate-0 contrast-150"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-[#0A0F1A]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,183,77,0.05),transparent_70%)]" />
      </motion.div>

      {/* Mouse Parallax Decorative Grid */}
      <motion.div 
        style={{ 
          x: useTransform(dx, (v) => v * 0.02),
          y: useTransform(dy, (v) => v * 0.02)
        }}
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </motion.div>

      {/* Floating Spotlight Effect */}
      <motion.div
        style={{
          left: useTransform(dx, (v) => v + window.innerWidth / 2),
          top: useTransform(dy, (v) => v + window.innerHeight / 2),
        }}
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="container relative z-10 px-4 lg:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 text-primary-foreground h-full items-center pt-20">
        <div className="flex flex-col justify-center max-w-3xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-none bg-accent text-accent-foreground font-black text-[11px] tracking-[0.3em] mb-12 w-fit uppercase border-l-4 border-white shadow-2xl"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ESTABLISHED 1998 • ISO 9001:2015 CERTIFIED</span>
          </motion.div>

          {/* Main Heading with Reveal Effect */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase"
            >
              ENGI<span className="text-accent italic">NEER</span>ING <br />
              <span className="text-white/40 font-light italic">STRUCTURAL</span> <br />
              DEFENSE.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/60 mb-14 max-w-xl font-bold leading-tight tracking-tight border-l-2 border-accent/30 pl-8"
          >
            Enterprise-grade corrugated packaging designed for heavy
            manufacturing, export logistics, and high-velocity supply chains.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8"
          >
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-white hover:text-[#0A0F1A] h-20 px-12 text-xs tracking-[0.3em] font-black group transition-all duration-700 rounded-none shadow-[15px_15px_0px_rgba(255,183,77,0.15)] relative overflow-hidden"
            >
              <span className="relative z-10">REQUEST TECHNICAL AUDIT</span>
              <MoveRight className="w-6 h-6 ml-3 group-hover:translate-x-4 transition-transform duration-700 relative z-10" />
              <motion.div 
                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-20 px-12 bg-transparent border-2 border-white/10 text-white hover:border-accent hover:text-accent text-xs tracking-[0.3em] font-black rounded-none group transition-all duration-700 flex items-center gap-4"
            >
              <Zap className="w-5 h-5 text-accent" />
              EXPLORE SOLUTIONS
            </Button>
          </motion.div>

          {/* Real-time metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 mt-24 pt-12 border-t border-white/5">
            {[
              { label: "Precision Machining", value: "0.01mm" },
              { label: "Daily Output Tons", value: "450T" },
              { label: "Export Partners", value: "35+" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1 + idx * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-black text-white mb-2 tracking-tighter flex items-end gap-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black tracking-[0.2em] text-accent uppercase flex items-center gap-3">
                   <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                   {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Product Preview (Decorative) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex justify-center items-center pointer-events-none relative"
        >
          <div className="relative w-full aspect-square max-w-2xl group">
             {/* Decorative circles */}
             <div className="absolute inset-0 border-[40px] border-white/5 rounded-full animate-[#cardbox-spin_20s_linear_infinite]" />
             <div className="absolute inset-[15%] border-[1px] border-accent/20 rounded-full animate-[#cardbox-spin_30s_linear_infinite_reverse]" />
             
             {/* Box placeholder or high-end image */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 w-full h-full flex items-center justify-center p-20"
             >
                <div className="relative w-full h-full border-2 border-accent/30 p-4">
                   <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-accent" />
                   <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-right-4 border-accent" />
                   <div className="w-full h-full bg-white/5 backdrop-blur-3xl flex items-center justify-center">
                     <Box className="w-32 h-32 text-accent/20" strokeWidth={0.5} />
                   </div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical coordinates */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-20 text-[10px] font-black text-white/20 tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
        <span>40.7128° N, 74.0060° W</span>
        <span className="text-accent underline">SYSTEM ACTIVE // 2026.03.25</span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 group cursor-pointer"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
        <span className="text-[11px] font-black tracking-[0.4em] uppercase text-white/80 group-hover:text-accent transition-colors">OPERATIONS</span>
      </motion.div>
    </section>
  );
}

