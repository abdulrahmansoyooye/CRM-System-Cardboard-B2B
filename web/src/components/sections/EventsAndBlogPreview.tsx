"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getPlaceholderImage } from "@/lib/utils";

export function EventsAndBlogPreview({ blogs: initialBlogs, events: initialEvents }: { 
  blogs?: { _id: string; title: string; slug: string; category?: string; coverImage?: string; createdAt: string }[];
  events?: { _id: string; title: string; eventDate?: string; images?: string[] }[];
}) {
  const blogs = initialBlogs || [];
  const events = initialEvents || [];
  
  return (
    <section className="py-32 bg-background overflow-hidden font-sans">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Blogs Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-10 flex items-center gap-10">
              <span className="w-16 h-px bg-accent inline-block" />
              INTELLIGENCE HUB
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">
              STRATEGIC <br />
              <span className="text-muted-foreground font-light italic">INSIGHTS.</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-black tracking-[0.3em] text-[10px] h-16 px-12 rounded-none transition-all duration-700 uppercase group"
              >
                FULL KNOWLEDGE BASE
                <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-3 transition-transform duration-500" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-border/40 border border-border/40 mb-32">
          {blogs.map((post, idx) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-white overflow-hidden hover:z-20 transition-all duration-700 relative"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative h-80 overflow-hidden block group-hover:scale-105 transition-transform duration-1000"
              >
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 duration-700" />
                <Image
                  src={post.coverImage || getPlaceholderImage('box')}
                  alt={post.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale brightness-110 group-hover:grayscale-0 contrast-125"
                />
                <div className="absolute top-8 left-8 bg-accent text-accent-foreground text-[10px] font-black px-5 py-2 uppercase tracking-[0.3em] rounded-none z-20 shadow-2xl border-r-4 border-white">
                  {post.category || "Insight"}
                </div>
              </Link>
              <div className="p-12 flex flex-col flex-1 bg-white relative z-30 group-hover:-translate-y-10 transition-transform duration-700">
                <div className="flex items-center gap-8 text-[10px] text-muted-foreground/60 mb-8 font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-accent" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-accent" />
                    OPERATOR
                  </div>
                </div>
                <h4 className="font-black text-3xl mb-8 group-hover:text-accent transition-colors leading-[0.95] tracking-tighter uppercase line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <div className="mt-auto pt-10 border-t border-border/50">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[10px] font-black tracking-[0.3em] uppercase text-primary group-hover:text-accent transition-all duration-500 gap-4 group/link"
                  >
                    READ PROTOCOL
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-3 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
          {blogs.length === 0 && Array(3).fill(0).map((_, i) => (
             <div key={i} className="h-125 bg-secondary/20 animate-pulse border border-border/10" />
          ))}
        </div>

        {/* Events Section */}
        {events.length > 0 && (
          <div className="pt-20 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-8 flex items-center gap-8">
                  <span className="w-12 h-px bg-accent inline-block" />
                  OPERATIONAL LOG
                </h2>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                  UPCOMING <span className="text-muted-foreground font-light italic text-3xl md:text-4xl">EVENTS.</span>
                </h3>
              </motion.div>
              <Link href="/updates">
                <Button variant="link" className="text-accent font-black tracking-widest text-[10px] uppercase p-0 h-auto group">
                  VIEW FULL CALENDAR <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, idx) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-secondary/20 border border-border/50 p-8 flex gap-8 items-center hover:bg-white hover:border-accent transition-all duration-500"
                >
                  <div className="w-20 h-20 bg-primary/5 shrink-0 overflow-hidden relative">
                    <Image 
                      src={event.images?.[0] || getPlaceholderImage('hero')} 
                      alt={event.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-accent uppercase tracking-widest mb-2">
                      {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBD"}
                    </div>
                    <h4 className="font-black text-lg text-primary uppercase leading-tight tracking-tighter group-hover:text-accent transition-colors line-clamp-1">
                      {event.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

