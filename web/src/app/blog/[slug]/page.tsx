import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import { getBlogBySlug } from "@/lib/api";
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);
    return {
      title: `${post.title} | CARDBOX Industrial Blog`,
      description: post.excerpt || "Industrial packaging insights and corrugated engineering protocols.",
    };
  } catch {
    return { title: "Blog Post | CARDBOX" };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-12 border border-border bg-secondary/20 max-w-lg rounded-none">
          <h2 className="text-3xl font-black text-primary mb-6 tracking-tighter uppercase italic">Protocol Not Indexed</h2>
          <p className="text-muted-foreground mb-10 font-bold uppercase text-xs tracking-widest leading-relaxed">The requested intelligence report is either restricted or the index has been purged.</p>
          <Link href="/blog">
             <Button className="font-black tracking-[0.3em] uppercase py-8 px-12 rounded-none bg-primary text-primary-foreground hover:bg-accent transition-all">Back to Intelligence Hub</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background font-sans">
      {/* Breadcrumb */}
      <div className="bg-secondary/40 border-b border-border text-[10px] font-black uppercase tracking-[0.2em] py-4">
        <div className="container mx-auto px-4 lg:px-12 flex items-center gap-4 text-muted-foreground">
          <Link
            href="/blog"
            className="hover:text-accent transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Intelligence Hub
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-primary truncate max-w-md">
            {post.title}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 py-32 max-w-5xl">
        {/* Header */}
        <div className="mb-20">
          <div className="flex flex-wrap items-center gap-8 mb-10">
            <span className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-accent border-r-4 border-accent bg-accent/5 px-6 py-2.5 shadow-sm">
              <Tag className="w-4 h-4" />
              {post.category || "General Intelligence"}
            </span>
            <span className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
              <Calendar className="w-4 h-4 text-accent" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
             <span className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
              <User className="w-4 h-4 text-accent" />
              OPERATOR
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-[0.85] mb-10 uppercase italic">
            {post.title}
          </h1>
          {post.excerpt && (
             <p className="text-xl md:text-2xl text-muted-foreground font-bold tracking-tight leading-relaxed italic opacity-80 border-l-8 border-accent pl-10 max-w-3xl">
                {post.excerpt}
             </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden border border-border mb-24 bg-secondary shadow-2xl group">
          <Image
            src={post.coverImage || getPlaceholderImage('hero')}
            alt={post.title}
            fill
            className="object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000 contrast-125 scale-105"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-32">
          <div 
             className="text-primary font-medium leading-relaxed space-y-10 text-lg selection:bg-accent selection:text-white"
             dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-8 justify-between pt-16 border-t border-border/60 mt-24">
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-secondary rounded-none font-black tracking-[0.3em] text-[10px] h-16 px-10 uppercase group transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-3 transition-transform" />
              ALL PROTOCOLS
            </Button>
          </Link>
          <Link href="/request-quote">
            <Button className="bg-primary text-primary-foreground hover:bg-accent rounded-none font-black tracking-[0.3em] text-[10px] h-16 px-12 uppercase group shadow-xl shadow-primary/10">
              INITIATE QUOTE
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-3 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
