import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MEDIA = [
  {
    id: 1,
    cat: "Factory",
    url: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    cat: "Machinery",
    url: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    cat: "Products",
    url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    cat: "Factory",
    url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    cat: "Machinery",
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    cat: "Products",
    url: "https://images.unsplash.com/photo-1605600659873-d808a1d14f48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    cat: "Events",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    cat: "Factory",
    url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "Factory", "Machinery", "Products", "Events"];

export default function GalleryPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div className="bg-background">
      <PageHeader
        title="Visual Asset Gallery"
        subtitle="Inside our state-of-the-art facilities and product applications."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-16">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              className={
                cat === "All"
                  ? "bg-primary text-primary-foreground font-bold tracking-wide rounded-sm px-6"
                  : "text-primary rounded-sm tracking-wide font-medium px-6 hover:text-accent hover:border-accent"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {MEDIA.map((item, i) => (
            <div
              key={item.id}
              className={`relative bg-secondary border border-border group overflow-hidden ${i % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <Image
                src={item.url}
                alt={`Gallery Image ${item.cat}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in"
              />

              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                <div className="bg-background/90 text-primary font-bold px-4 py-2 uppercase tracking-widest text-xs translate-y-4 group-hover:translate-y-0 transition-transform">
                  {item.cat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
