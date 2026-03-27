"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getPlaceholderImage } from "@/lib/utils";

const UPDATES = [
  {
    id: 1,
    title: "CARDBOX Acquires New 5-Color Flexo Printer",
    date: "March 12, 2026",
    category: "Infrastructure",
    imageType: 'factory',
    slug: "new-flexo-printer",
  },
  {
    id: 2,
    title: "Sustainability: Shifting to 100% Recycled Kraft Liner",
    date: "February 28, 2026",
    category: "Corporate Update",
    imageType: 'box',
    slug: "sustainability-recycled-kraft",
  },
  {
    id: 3,
    title: "International Export Logistics Symposium 2026",
    date: "February 15, 2026",
    category: "Event",
    imageType: 'hero',
    slug: "export-symposium-2026",
  },
];

export function EventsAndBlogPreview() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-accent font-black tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-6">
              <span className="w-12 h-0.5 bg-accent inline-block" />
              LATEST INSIGHTS
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              NEWS &{" "}
              <span className="text-muted-foreground font-light italic">UPDATES</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-black tracking-widest text-xs h-14 px-8 rounded-none transition-all duration-500"
            >
              VIEW ALL
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {UPDATES.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group flex flex-col bg-secondary/50 overflow-hidden border border-border rounded-none hover:border-accent transition-colors duration-500"
            >
              <Link
                href={`/news/${post.slug}`}
                className="relative h-72 overflow-hidden block"
              >
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-700" />
                <Image
                  src={getPlaceholderImage(post.imageType as any)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-6 left-6 bg-accent text-accent-foreground text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.2em] rounded-none z-20 shadow-xl">
                  {post.category}
                </div>
              </Link>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-6 text-[10px] text-muted-foreground mb-6 font-black uppercase tracking-[0.15em]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-accent" />
                    ADMIN
                  </div>
                </div>
                <h4 className="font-black text-2xl mb-6 group-hover:text-accent transition-colors leading-tight tracking-tighter uppercase">
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h4>
                <div className="mt-auto pt-8 border-t border-border/50">
                  <Link
                    href={`/news/${post.slug}`}
                    className="inline-flex items-center text-[10px] font-black tracking-[0.2em] uppercase text-primary group-hover:text-accent transition-all duration-300 gap-3 group/link"
                  >
                    READ MORE
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
