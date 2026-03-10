import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import Image from "next/image";

const TIMELINE = [
  {
    year: "2000",
    title: "Foundation",
    desc: "Established first small-scale manual corrugation unit.",
  },
  {
    year: "2008",
    title: "Automation",
    desc: "Imported 3-ply auto-corrugation plant.",
  },
  {
    year: "2015",
    title: "Expansion",
    desc: "Constructed 500,000 sq.ft facility and 5-ply operations.",
  },
  {
    year: "2022",
    title: "Global Reach",
    desc: "Commenced direct exports of heavy duty corrugated boards to 10+ countries.",
  },
  {
    year: "2026",
    title: "Present",
    desc: "Leader in industrial transit packaging.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="About Us"
        subtitle="Uncompromising quality in every corrugated board, engineered for structural dominance."
      />

      {/* Vision & Mission */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight mb-8">
            OUR{" "}
            <span className="text-accent underline decoration-4 underline-offset-8">
              MISSION
            </span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto mb-16">
            "To deliver unparalleled structural packaging integrity that enables
            seamless global supply chains for the manufacturing sector without
            compromising environmental standards."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
            <div className="bg-background p-10 border border-border shadow-sm rounded-sm">
              <h3 className="text-2xl font-black text-primary mb-4 tracking-tighter">
                THE VISION
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Becoming the global benchmark for heavy-duty industrial
                corrugated solutions, prioritizing automation and scalable
                production mechanics over manual labor constraints.
              </p>
            </div>
            <div className="bg-background p-10 border border-border shadow-sm rounded-sm">
              <h3 className="text-2xl font-black text-primary mb-4 tracking-tighter">
                OUR VALUES
              </h3>
              <ul className="text-muted-foreground text-lg leading-relaxed space-y-2 list-disc pl-5">
                <li className="font-bold text-primary">Structural Integrity</li>
                <li className="font-bold text-primary">Automated Precision</li>
                <li className="font-bold text-primary">
                  Sustainable Operations
                </li>
                <li className="font-bold text-primary">
                  Logistical Reliability
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-accent font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-4 justify-center">
              <span className="w-8 h-1 bg-accent inline-block" />
              Corporate History
              <span className="w-8 h-1 bg-accent inline-block" />
            </h2>
            <h3 className="text-4xl font-black text-primary tracking-tight leading-tight">
              A JOURNEY OF GROWTH
            </h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-border" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex items-center justify-between gap-8 ${i % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 -ml-4 w-8 h-8 rounded-full bg-accent border-4 border-background flex items-center justify-center shadow-md z-10" />
                  <div
                    className={`w-1/2 ${i % 2 === 0 ? "text-left pl-8" : "text-right pr-8"}`}
                  >
                    <div className="text-accent font-black text-4xl tracking-tighter mb-2">
                      {item.year}
                    </div>
                    <h4 className="font-bold text-primary text-xl mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section without faces */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-accent font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-4 justify-center">
              <span className="w-8 h-1 bg-accent inline-block" />
              Leadership
              <span className="w-8 h-1 bg-accent inline-block" />
            </h2>
            <h3 className="text-4xl font-black text-primary tracking-tight leading-tight">
              THE EXECUTIVES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: "Managing Director",
                desc: "Driving the strategic operations, global exports, and macro-financial structuring of CARDBOX since 2005.",
              },
              {
                role: "Director of Plant Operations",
                desc: "Overseeing corrugation automation, safety parameters, engineering, and the 500k sq.ft facility floor operations.",
              },
              {
                role: "Head of Logistics",
                desc: "Managing supply chain, outbound logistics, fleet tracking, and port-level export distribution networks.",
              },
            ].map((l) => (
              <div
                key={l.role}
                className="bg-background border-t-4 border-primary p-8 rounded-sm shadow-sm hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-accent/20 border border-accent rounded-full flex items-center justify-center text-accent text-sm font-black mb-6">
                  CB
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  {l.role}
                </h4>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {l.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
