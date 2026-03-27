import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function ProductDetailPage() {
  // Using generic mock data instead of finding a real product based on params.id
  const name = "Heavy Duty Master Cartons";
  const image = getPlaceholderImage('box');

  return (
    <div className="bg-background">
      <div className="bg-primary/5 border-b border-border text-sm font-medium py-3">
        <div className="container mx-auto px-4 lg:px-8 flex items-center gap-2 text-muted-foreground">
          <Link
            href="/products"
            className="hover:text-accent transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-bold">{name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-secondary rounded-sm overflow-hidden border border-border">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="relative aspect-video bg-secondary rounded-sm overflow-hidden border border-border opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Image
                    src={image}
                    alt={`${name} view ${num}`}
                    fill
                    className="object-cover grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent/10 border border-accent text-accent font-bold text-xs uppercase tracking-wider mb-6">
              Industrial Grade
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight mb-6">
              {name}
            </h1>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Multi-wall engineered structure created specifically for demanding
              industrial exports. Resistant to compression, puncture, and
              climatic changes during transit logistics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-secondary/50 p-6 rounded-sm border border-border">
                <div className="text-xs uppercase tracking-wider font-bold text-accent mb-2">
                  Minimum Order
                </div>
                <div className="text-xl font-black text-primary">
                  5,000 Units
                </div>
              </div>
              <div className="bg-secondary/50 p-6 rounded-sm border border-border">
                <div className="text-xs uppercase tracking-wider font-bold text-accent mb-2">
                  Lead Time
                </div>
                <div className="text-xl font-black text-primary">
                  10-15 Business Days
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full mb-12">
              <AccordionItem value="specs">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent">
                  Material Specifications
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  <ul className="space-y-3 pt-2">
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                      <span className="font-semibold">Construction:</span> 5-Ply
                      / 7-Ply Heavy Duty
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                      <span className="font-semibold">Paper Quality:</span> 150
                      - 300 GSM Virgin Kraft
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{" "}
                      <span className="font-semibold">Flute Types:</span> A, C,
                      B/C Double Wall
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="strength">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent">
                  Strength Parameters
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  <ul className="space-y-3 pt-2">
                    <li className="flex gap-3">
                      <Settings className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span className="font-semibold">
                        ECT (Edge Crush Test):
                      </span>{" "}
                      44 ECT to 61 ECT
                    </li>
                    <li className="flex gap-3">
                      <Settings className="w-5 h-5 text-primary shrink-0" />{" "}
                      <span className="font-semibold">
                        BMT (Bursting Strength):
                      </span>{" "}
                      20 - 45 kg/cm²
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="customization">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent">
                  Customization & Printing
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Fully customizable dimensions (Length x Width x Height).
                  Flexographic printing available up to 5 colors.
                  Water-repellent coatings and waxed inside liners optional.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm font-bold tracking-wider px-10 h-14 uppercase"
              >
                Request Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-primary hover:bg-secondary rounded-sm font-bold tracking-wider h-14 uppercase"
              >
                Download Specs (PDF)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
