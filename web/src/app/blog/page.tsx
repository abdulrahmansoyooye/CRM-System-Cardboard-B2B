import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";

const POSTS = [
  {
    slug: "corrugated-box-strength-guide",
    title:
      "Understanding ECT vs. Burst Strength in Industrial Corrugated Boxes",
    excerpt:
      "Learn how Edge Crush Test (ECT) and Bursting Strength (BMT) values determine the structural capacity of your packaging under compression and shipping stress.",
    date: "March 5, 2026",
    category: "Technical Guide",
    imageType: "box",
  },
  {
    slug: "5-ply-vs-7-ply-packaging",
    title: "5-Ply vs 7-Ply: Which Corrugated Board Is Right for Your Product?",
    excerpt:
      "Choosing the right ply count affects everything from transit safety to cost-per-unit. This breakdown helps procurement teams make data-driven packaging decisions.",
    date: "February 20, 2026",
    category: "Packaging Insights",
    imageType: "box",
  },
  {
    slug: "export-packaging-compliance",
    title:
      "Export Packaging Compliance: Meeting International Shipping Standards",
    excerpt:
      "ISPM-15, ISTA protocols, and regional labeling — a comprehensive guide for exporters on how to ensure your corrugated packaging is globally compliant.",
    date: "February 8, 2026",
    category: "Export & Compliance",
    imageType: "hero",
  },
  {
    slug: "sustainable-packaging-kraft",
    title:
      "The Rise of Recycled Kraft: Sustainable Corrugated for Modern Supply Chains",
    excerpt:
      "How switching to 100% recycled kraft liner reduces your carbon footprint without compromising on structural integrity, burst resistance, or print quality.",
    date: "January 25, 2026",
    category: "Sustainability",
    imageType: "box",
  },
  {
    slug: "die-cutting-precision",
    title: "How Die-Cutting Technology Enables Precision Custom Packaging",
    excerpt:
      "Modern flatbed and rotary die-cutting delivers millimeter-accurate carton shapes, enabling tight product fits, reduced void fill, and improved box-to-product ratios.",
    date: "January 10, 2026",
    category: "Technical Guide",
    imageType: "factory",
  },
  {
    slug: "pharma-packaging-requirements",
    title: "Packaging Requirements for Pharmaceutical Cold-Chain Exports",
    excerpt:
      "Corrugated boxes for pharmaceutical use demand specific ECT ratings, anti-humidity coatings, and regulatory markings. Here is what you need to know.",
    date: "December 28, 2025",
    category: "Industry Focus",
    imageType: "hero",
  },
];

const CATEGORIES = [
  "All",
  "Technical Guide",
  "Packaging Insights",
  "Export & Compliance",
  "Sustainability",
  "Industry Focus",
];

export const metadata = {
  title: "CARDBOX Blog | Corrugated Packaging Insights & Industry News",
  description:
    "Expert articles on corrugated box engineering, export packaging compliance, sustainability, and manufacturing process insights from CARDBOX.",
};

export default function BlogPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Knowledge Hub"
        subtitle="Technical guides, industry news, and packaging insights from our engineering and logistics teams."
      />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={cat === "All" ? "default" : "outline"}
                size="sm"
                className={
                  cat === "All"
                    ? "bg-primary text-primary-foreground font-bold tracking-wide rounded-sm"
                    : "text-primary rounded-sm tracking-wide font-medium hover:text-accent hover:border-accent"
                }
              >
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                {cat}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-9 h-11 rounded-sm bg-secondary border-border"
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${POSTS[0].slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video lg:aspect-auto min-h-75 overflow-hidden bg-secondary">
                <Image
                  src={getPlaceholderImage(POSTS[0].imageType as "box" | "factory" | "hero")}
                  alt={POSTS[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
                  Featured
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center bg-secondary/30">
                <span className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
                  {POSTS[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors">
                  {POSTS[0].title}
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                  {POSTS[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                    <Calendar className="w-4 h-4" />
                    {POSTS[0].date}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary group-hover:text-accent transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {POSTS.slice(1).map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-secondary overflow-hidden border border-border rounded-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block h-52 overflow-hidden shrink-0"
              >
                <Image
                  src={getPlaceholderImage(post.imageType as "box" | "factory" | "hero")}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
                  {post.category}
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                <h3 className="font-bold text-lg text-primary leading-snug mb-3 group-hover:text-accent transition-colors flex-1">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-border">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold tracking-wide uppercase text-primary group-hover:text-accent transition-colors gap-2"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            className="w-10 h-10 border-border text-primary rounded-sm"
            disabled
          >
            &lt;
          </Button>
          <Button
            variant="default"
            className="w-10 h-10 bg-primary text-primary-foreground rounded-sm font-bold"
          >
            1
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 border-border text-primary rounded-sm font-bold"
          >
            2
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 border-border text-primary rounded-sm"
          >
            &gt;
          </Button>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
