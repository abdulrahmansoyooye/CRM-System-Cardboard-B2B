"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getEvents } from "@/lib/api";

export default function UpdatesPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then(data => setEvents(data)).catch(() => setEvents([]));
  }, []);

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center bg-[#0A0F1A] overflow-hidden">
        <Image
          src={getPlaceholderImage('blog')}
          alt="Events and Corporate Updates"
          fill
          className="object-cover opacity-20 filter saturate-0 contrast-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-6"
          >
            CORPORATE TELEMETRY
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase"
          >
            EVENTS & <span className="text-white/30 italic font-light">UPDATES.</span>
          </motion.h1>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-12">
                 <div className="space-y-12">
                   {events.length === 0 ? (
                     <div className="text-center py-32 bg-secondary/20 border border-border/40">
                       <h3 className="text-2xl font-black uppercase tracking-widest text-muted-foreground">No upcoming events currently scheduled.</h3>
                     </div>
                   ) : events.map((event, idx) => (
                     <motion.div
                       key={event._id}
                       initial={{ opacity: 0, x: -50 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: idx * 0.1, duration: 0.8 }}
                       className="group premium-card p-12 hover:border-accent transition-all duration-700 relative overflow-hidden flex flex-col md:flex-row gap-16 items-center"
                     >
                       {/* Background index */}
                       <div className="absolute top-0 right-0 text-[100px] font-black text-muted-foreground/5 leading-none translate-x-1/4 -translate-y-1/4">0{idx + 1}</div>
                       
                       <div className="md:w-1/3 w-full">
                          <div className="aspect-square relative overflow-hidden bg-secondary">
                             <Image 
                               src={event.images?.[0] || getPlaceholderImage('hero')}
                               alt={event.title}
                               fill
                               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 saturate-50 group-hover:scale-110"
                             />
                             <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-primary to-transparent opacity-80" />
                             <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                <span className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-widest">EVENT</span>
                             </div>
                          </div>
                       </div>

                       <div className="md:w-2/3 w-full">
                          <div className="flex flex-wrap gap-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-8">
                             <div className="flex items-center gap-3"><Calendar className="w-3.5 h-3.5 text-accent" /> {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "TBD"}</div>
                             {event.isFeatured && <div className="flex items-center gap-3 text-accent font-bold"><MapPin className="w-3.5 h-3.5 text-accent" /> Featured Event</div>}
                          </div>
                          
                          <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8 leading-tight group-hover:text-accent transition-colors">
                             {event.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm font-bold uppercase leading-relaxed tracking-tight mb-12 max-w-xl">
                             {event.description}
                          </p>
                          
                          <Link href="#" className="inline-flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase text-primary group-hover:text-accent transition-all">
                             RSVP / READ DETAILS <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
                          </Link>
                       </div>
                     </motion.div>
                   ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-40 bg-secondary/30 text-center relative overflow-hidden border-t border-border/50">
        <div className="container mx-auto px-4 relative z-10">
           <h2 className="text-[10px] font-black tracking-[0.4em] text-accent uppercase mb-8">NETWORK CHANNEL</h2>
           <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12">SUBSCRIBE FOR <span className="text-muted-foreground font-light italic text-4xl md:text-6xl">INSIGHTS.</span></h3>
           <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-6">
              <input 
                type="email" 
                placeholder="REGISTRY@CORPORATE.EMAIL" 
                className="flex-1 bg-background border-2 border-border px-8 py-5 text-sm font-black tracking-widest focus:border-accent outline-none transition-all uppercase italic"
              />
              <button className="bg-primary text-white h-16 md:h-20 px-12 font-black text-xs tracking-[0.3em] uppercase hover:bg-accent transition-all duration-500 shadow-2xl">
                SYNC CHANNEL
              </button>
           </div>
           <p className="mt-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60 italic">Monthly Digest of Industry Innovations & Global Events.</p>
        </div>
        
        {/* Background watermark */}
        <div className="absolute top-1/2 left-0 text-[180px] font-black text-muted-foreground/3 -translate-y-1/2 -translate-x-1/4 pointer-events-none select-none tracking-tighter uppercase">
           Digest
        </div>
      </section>
    </main>
  );
}
