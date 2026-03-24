import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UPDATES = [
  {
    id: 1,
    title: "CARDBOX Acquires New 5-Color Flexo Printer",
    date: "March 12, 2026",
    category: "Infrastructure",
    image: "/images/factory.png",
    slug: "new-flexo-printer",
  },
  {
    id: 2,
    title: "Sustainability: Shifting to 100% Recycled Kraft Liner",
    date: "February 28, 2026",
    category: "Corporate Update",
    image: "/images/product_cardboard.png",
    slug: "sustainability-recycled-kraft",
  },
  {
    id: 3,
    title: "International Export Logistics Symposium 2026",
    date: "February 15, 2026",
    category: "Event",
    image: "/images/hero.png",
    slug: "export-symposium-2026",
  },
];

export function EventsAndBlogPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-secondary-foreground font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-4 text-accent">
              <span className="w-8 h-1 bg-accent inline-block" />
              Latest Insights
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              NEWS &{" "}
              <span className="text-muted-foreground font-light">UPDATES</span>
            </h3>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-wider"
          >
            VIEW ALL
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UPDATES.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-secondary overflow-hidden border border-border rounded-sm"
            >
              <Link
                href={`/news/${post.slug}`}
                className="relative h-64 overflow-hidden block"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
                  {post.category}
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    Admin
                  </div>
                </div>
                <h4 className="font-bold text-xl mb-4 group-hover:text-accent transition-colors leading-tight">
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h4>
                <div className="mt-auto pt-4 border-t border-border">
                  <Link
                    href={`/news/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold tracking-wide uppercase text-primary group-hover:text-accent transition-colors gap-2"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
