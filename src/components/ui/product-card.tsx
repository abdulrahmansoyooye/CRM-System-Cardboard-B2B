import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  className?: string;
}

export function ProductCard({
  title,
  description,
  imageSrc,
  href,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-primary">
          {title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <Link href={href} className="mt-auto inline-block">
          <Button
            variant="ghost"
            className="w-full justify-between font-semibold text-primary hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          >
            VIEW DETAILS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
