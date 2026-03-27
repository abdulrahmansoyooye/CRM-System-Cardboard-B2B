import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";


export default function BlogDetailPage() {
  // Mock blog data — in production this would be fetched by slug
  const post = {
    title:
      "Understanding ECT vs. Burst Strength in Industrial Corrugated Boxes",
    date: "March 5, 2026",
    category: "Technical Guide",
    image: getPlaceholderImage('box'),
    content: [
      {
        heading: "What Is Edge Crush Test (ECT)?",
        body: "The Edge Crush Test (ECT) measures the stacking strength of corrugated boards when force is applied to the edge. A board with a 32 ECT rating can withstand 32 lbs of force per linear inch. This is the primary spec for boxes that must be stacked during warehousing and transport.",
      },
      {
        heading: "What Is Burst Strength (BMT)?",
        body: "Burst strength, measured in kg/cm², evaluates resistance to outside forces penetrating the box wall — like punctures from forklift tines or sharp product corners. Higher burst values are critical for hazardous material packaging or abrasive goods.",
      },
      {
        heading: "Which Should You Prioritize?",
        body: "For palletized goods that are stacked in warehouses, ECT is the more important metric. For individually shipped items subject to drops and impact, burst strength matters more. High-value export goods often require both metrics to be specified independently.",
      },
      {
        heading: "CARDBOX Standard Ranges",
        body: "Our 5-ply boards offer ECT ratings from 32 to 48 ECT, while our 7-ply heavy duty boards reach 61 ECT. Burst strength for our export grades ranges from 20 to 45 kg/cm². Custom specifications are available on inquiry.",
      },
    ],
  };

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border text-sm font-medium py-3">
        <div className="container mx-auto px-4 lg:px-8 flex items-center gap-2 text-muted-foreground">
          <Link
            href="/blog"
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
          <span>/</span>
          <span className="text-primary font-bold truncate max-w-xs">
            {post.title}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent border border-accent bg-accent/10 px-3 py-1 rounded-sm">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border mb-12 bg-secondary">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose max-w-none">
          {post.content.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-2xl font-black text-primary tracking-tight mb-4 pb-3 border-b border-border">
                {section.heading}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {section.body}
              </p>
            </div>
          ))}
        </article>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-12 border-t border-border mt-12">
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-border text-primary hover:bg-secondary rounded-sm font-bold tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ALL ARTICLES
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-bold tracking-wide">
              REQUEST A QUOTE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
