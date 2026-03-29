"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck, Zap, Layers } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QUOTE_FEATURES = [
  { icon: ShieldCheck, title: "MISSION CRITICAL PROTECTION" },
  { icon: Zap, title: "HIGH-VELOCITY DELIVERY" },
  { icon: Layers, title: "STRUCTURAL ENGINEERING" }
];

import { submitQuote } from "@/lib/api";

export default function RequestQuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productId: "60f1b2b3e4b0c5a1d4f1a2b3", // Fallback ID for generic product
    quantity: 5000,
    deliveryLocation: "",
    customizationDetails: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await submitQuote(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError("FAILED TO SYNC INQUIRY. PLEASE TRY AGAIN LATER.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Visual background element */}
      <div className="fixed top-0 right-0 w-1/3 h-full bg-secondary/30 pointer-events-none -z-10" />

      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-12 mb-16">
             <motion.h2 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-8 flex items-center gap-10"
             >
               <span className="w-16 h-px bg-accent inline-block" />
               INQUIRY PROTOCOL
             </motion.h2>
             <motion.h1 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase"
             >
               REQUEST A <br />
               <span className="text-muted-foreground font-light italic text-4xl md:text-7xl">QUOTE.</span>
             </motion.h1>
          </div>

          {!isSubmitted ? (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-8 bg-background border border-border p-12 md:p-20 shadow-2xl relative overflow-hidden"
              >
                {/* Visual accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="JOHN DOE" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Company Name</label>
                    <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="ENTERPRISE CORP" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Email Address</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="REGISTRY@CORPORATE.COM" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (000) 000-0000" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>
                  
                  <div className="space-y-4 md:col-span-2">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Delivery Location / Address</label>
                    <input type="text" required value={formData.deliveryLocation} onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})} placeholder="CITY, COUNTRY / INDUSTRIAL ZONE" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Estimated Quantity</label>
                    <input type="number" required value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})} placeholder="5000+" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Required Timeline</label>
                    <input type="text" required placeholder="Q2 2026" className="w-full bg-secondary/50 border-2 border-border/50 h-16 px-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic" />
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Technical Specifications / Notes</label>
                    <textarea rows={6} value={formData.customizationDetails} onChange={(e) => setFormData({...formData, customizationDetails: e.target.value})} className="w-full bg-secondary/50 border-2 border-border/50 p-8 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic resize-none" placeholder="DESCRIBE YOUR SPECIFIC PROTECTION REQUIREMENTS..."></textarea>
                  </div>

                  {error && (
                    <div className="md:col-span-2 p-6 bg-rose-50 border border-rose-100 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                       {error}
                    </div>
                  )}

                  <div className="md:col-span-2 pt-10">
                    <Button disabled={isLoading} type="submit" className="w-full bg-primary text-white hover:bg-accent hover:text-white h-24 text-sm font-black tracking-[0.4em] uppercase shadow-2xl transition-all duration-700 group">
                      {isLoading ? "CALIBRATING TELEMETRY..." : "SYNC INQUIRY"} 
                      <Send className="w-6 h-6 ml-4 group-hover:translate-x-4 transition-transform duration-700" />
                    </Button>
                  </div>
                </form>
              </motion.div>

              {/* Sidebar Info */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-4 lg:pt-20 space-y-16"
              >
                <div>
                  <h4 className="text-xl font-black tracking-tighter uppercase mb-6 underline decoration-accent decoration-4 underline-offset-8">THE CARDBOX EDGE</h4>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-tight leading-relaxed">
                    Our technical team reviews every inquiry within 24 operational hours. For mission-critical urgent requirements, please contact our direct industrial hotline.
                  </p>
                </div>

                <div className="space-y-10">
                   {QUOTE_FEATURES.map(feat => (
                     <div key={feat.title} className="flex items-center gap-6 group">
                        <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center shrink-0 group-hover:bg-accent-500 group-hover:border-accent transition-colors">
                           <feat.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-[10px] font-black tracking-widest uppercase group-hover:text-accent transition-colors">{feat.title}</span>
                     </div>
                   ))}
                </div>

                <div className="pt-10 border-t border-border">
                   <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Industrial Hotline</div>
                   <div className="text-3xl font-black tracking-tighter text-primary">+1 (800) 123-4567</div>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-12 py-40 flex flex-col items-center justify-center text-center bg-background border border-border/50"
            >
               <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mb-12">
                  <CheckCircle2 className="w-16 h-16 text-accent" />
               </div>
               <h3 className="text-5xl font-black tracking-tighter uppercase mb-6">INQUIRY <span className="text-accent">SYNCHRONIZED.</span></h3>
               <p className="text-xl text-muted-foreground font-bold uppercase tracking-tight max-w-xl mx-auto mb-16 leading-relaxed">
                 Your technical requirements have been logged into our system. An industrial consultant will interface with your team shortly.
               </p>
               <Link href="/">
                 <Button className="btn-secondary h-16 px-12 tracking-widest font-black uppercase text-xs">BACK TO COMMAND CENTER</Button>
               </Link>
            </motion.div>
          )}

        </div>
      </section>
    </main>
  );
}
