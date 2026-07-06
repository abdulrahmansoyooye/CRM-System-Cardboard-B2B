import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Search, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import { getBlogs, getSettings } from "@/lib/api";
import { Metadata } from 'next';
import { TBlog } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    const ogImage = config?.defaultSEO?.ogImage;
    return {
      title: `Knowledge Hub | ${config?.companyName || 'CARDBOX'}`,
      description: "Technical guides, industry news, and industrial packaging insights from our engineering team.",
      openGraph: {
        title: `Knowledge Hub | ${config?.companyName || 'CARDBOX'}`,
        description: "Technical guides, industry news, and industrial packaging insights.",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch (e) {
    return { title: "Blog | CARDBOX" };
  }
}


export default async function BlogPage() {
  const blogs = await getBlogs().catch(() => []);

  const featuredPost = blogs[0];
  const otherPosts = blogs.slice(1);

  return (
    <div className="bg-background font-sans">
      <PageHeader
        title="Knowledge Hub"
        subtitle="Technical guides, industry news, and packaging insights from our engineering and logistics teams."
      />

      <div className="container mx-auto px-4 lg:px-12 py-24">
        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-10 justify-between items-center mb-20">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
             <Link href="/blog">
               <Button
                  variant="default"
                  size="sm"
                  className="bg-primary text-primary-foreground font-black tracking-[0.2em] rounded-none uppercase text-[10px] h-12 px-8 shadow-lg"
                >
                  All Protocols
                </Button>
             </Link>
              {Array.from(new Set(blogs.map((b: TBlog) => b.category))).filter(Boolean).map((cat) => (
                <Link key={cat} href={`/blog?category=${encodeURIComponent(cat!)}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary rounded-none tracking-[0.2em] font-black uppercase text-[10px] h-12 px-8 border-border hover:border-accent transition-all"
                  >
                    {cat}
                  </Button>
                </Link>
              ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96 shrink-0 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input
              type="search"
              placeholder="Query intelligence..."
              className="pl-12 h-14 rounded-none bg-secondary/40 border-border focus-visible:ring-accent font-bold"
            />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-24 group">
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border overflow-hidden bg-secondary/20 hover:border-accent transition-all duration-700">
                <div className="relative aspect-video lg:aspect-auto min-h-100 overflow-hidden bg-secondary">
                  <Image
                    src={featuredPost.coverImage || getPlaceholderImage('hero')}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale brightness-110 group-hover:grayscale-0 contrast-125"
                    priority
                  />
                  <div className="absolute top-8 left-8 bg-accent text-accent-foreground text-[10px] font-black px-5 py-2 uppercase tracking-[0.3em] z-10 shadow-2xl border-r-4 border-white">
                    FEATURED PROTOCOL
                  </div>
                </div>
                <div className="p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-8">
                     <span className="w-10 h-px bg-accent" />
                     {featuredPost.category || "Technical Intelligence"}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-[0.9] mb-8 group-hover:text-accent transition-colors uppercase italic">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground font-medium leading-relaxed mb-10 text-lg opacity-80">
                    {featuredPost.excerpt || "Strategic overview of industrial packaging advancements and supply chain optimization protocols."}
                  </p>
                  <div className="flex items-center justify-between pt-8 border-t border-border/50">
                    <div className="flex items-center gap-6 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                      <div className="flex items-center gap-2">
                         <Calendar className="w-4 h-4 text-accent" />
                         {new Date(featuredPost.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-accent" />
                        OPERATOR
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-all">
                      ACCESS FULL DATA
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 border border-border/40 mb-24">
          {otherPosts.map((post: TBlog, idx: number) => (
            <article
              key={post._id}
              className="group flex flex-col bg-white overflow-hidden hover:z-20 transition-all duration-700 relative"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block h-72 overflow-hidden bg-secondary"
              >
                <Image
                  src={post.coverImage || getPlaceholderImage('box')}
                  alt={post.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale brightness-110 group-hover:grayscale-0 contrast-125"
                />
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground text-[9px] font-black px-4 py-1.5 uppercase tracking-[0.2em] z-10 shadow-xl border-r-4 border-white">
                  {post.category || "Insight"}
                </div>
              </Link>

              <div className="p-10 flex flex-col flex-1 relative z-30 group-hover:-translate-y-5 transition-transform duration-700 bg-white">
                <div className="flex items-center gap-4 text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] mb-6">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <h3 className="font-black text-2xl text-primary leading-none mb-6 group-hover:text-accent transition-colors flex-1 tracking-tighter uppercase line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground text-xs font-bold leading-relaxed mb-8 line-clamp-3 opacity-70 uppercase tracking-tight">
                  {post.excerpt || "Detailed analysis of structural engineering and logistics protocols."}
                </p>
                <div className="mt-auto pt-6 border-t border-border/50">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[10px] font-black tracking-[0.3em] uppercase text-primary group-hover:text-accent transition-all duration-500 gap-3 group/link"
                  >
                    READ PROTOCOL
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
           <div className="text-center py-40 border border-dashed border-border">
              <h3 className="text-xl font-black text-primary/30 uppercase tracking-widest">No intelligence protocols indexed in active database.</h3>
           </div>
        )}
      </div>

      <CTABanner />
    </div>
  );
}
