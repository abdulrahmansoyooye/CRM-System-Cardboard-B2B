import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Raw Material Procurement",
    description:
      "Sourcing premium virgin and recycled kraft linerboards with strict burst-strength parameters. Every roll undergoes initial GSM and moisture testing before entering the facility.",
    machinery: "Moisture & GSM Analytics Lab",
    imageType: "box",
  },
  {
    step: "02",
    title: "Corrugation",
    description:
      "High-speed fluting and gluing of kraft papers. We construct 3-ply, 5-ply, and heavy-duty 7-ply corrugated boards configured exactly to customer weight-bearing requirements.",
    machinery: "BHS Corrugator Line (Speed: 300m/min)",
    imageType: "factory",
  },
  {
    step: "03",
    title: "Precision Printing",
    description:
      "Applying industrial-grade inks directly onto the boards. Using flexographic printing for maximum clarity, branding compliance, and barcode scannability.",
    machinery: "5-Color Flexographic Printer Slotter",
    imageType: "hero",
  },
  {
    step: "04",
    title: "Die-Cutting & Slotting",
    description:
      "Automated die-cutting mechanisms shape the boards to match precise 3D engineering designs, ensuring folding accuracy and stacking strength.",
    machinery: "Rotary & Flatbed Auto-Platen Die-Cutters",
    imageType: "factory",
  },
  {
    step: "05",
    title: "Quality Testing",
    description:
      "Samples from every batch undergo Edge Crush Test (ECT) and Bursting Strength tests ensuring performance under compression and load.",
    machinery: "Digital ECT & RCT Compressometers",
    imageType: "box",
  },
  {
    step: "06",
    title: "Final Dispatch",
    description:
      "Finished boxes are grouped, wrapped in stretch film, and palletized securely for factory delivery directly into your supply chain.",
    machinery: "Automated Strapping & Palletizing Line",
    imageType: "hero",
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Manufacturing Process"
        subtitle="End-to-end engineered automation from kraft roll to final carton."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24 max-w-5xl">
        <div className="space-y-24">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/3] relative w-full rounded-sm overflow-hidden bg-secondary border border-border">
                  <Image
                    src={getPlaceholderImage(step.imageType as "box" | "factory" | "hero")}
                    alt={step.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-2 font-black text-2xl tracking-tighter">
                    {step.step}
                  </div>
                </div>
                {/* Decorative Accent */}
                <div
                  className={`absolute top-10 -z-10 w-full h-full bg-primary/5 ${index % 2 === 0 ? "-left-6" : "-right-6"}`}
                />
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-black text-primary mb-6 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {step.description}
                </p>
                <div className="border border-border p-6 rounded-sm bg-secondary/30 relative">
                  <div className="absolute -top-3 left-6 bg-background px-2 text-xs font-bold uppercase tracking-wider text-accent">
                    Equipment Used
                  </div>
                  <h4 className="font-bold text-lg text-primary">
                    {step.machinery}
                  </h4>
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
