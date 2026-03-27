import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building,
  GraduationCap,
  Users,
} from "lucide-react";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";

const JOBS = [
  {
    id: 1,
    title: "Production Shift Manager",
    depart: "Operations",
    loc: "Sector 4 Plant",
    type: "Full-Time",
  },
  {
    id: 2,
    title: "Maintenance Engineer (Corrugator)",
    depart: "Engineering",
    loc: "Sector 4 Plant",
    type: "Full-Time",
  },
  {
    id: 3,
    title: "Export Sales Executive",
    depart: "Sales",
    loc: "Corporate HQ",
    type: "Full-Time",
  },
  {
    id: 4,
    title: "Quality Assurance Analyst",
    depart: "Laboratory",
    loc: "Sector 4 Plant",
    type: "Shift Basis",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Careers & Growth"
        subtitle="Join the leading workforce in structural packaging engineering."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight mb-8">
            <span className="text-accent underline decoration-4 underline-offset-8">
              BUILD
            </span>{" "}
            THE FUTURE OF LOGISTICS
          </h2>
          <p className="text-muted-foreground text-xl font-medium leading-relaxed">
            At CARDBOX, we don&apos;t just manufacture boxes; we engineer industrial
            protection. We are looking for operators, engineers, and sales
            professionals who thrive in high-volume, precision-driven
            environments.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            {
              title: "Competitive Salary",
              icon: Building,
              desc: "Above market compensation with overtime pay.",
            },
            {
              title: "Health Coverage",
              icon: Users,
              desc: "Comprehensive insurance for you and family.",
            },
            {
              title: "Career Growth",
              icon: Briefcase,
              desc: "Internal promotion preference structure.",
            },
            {
              title: "Skill Upgrading",
              icon: GraduationCap,
              desc: "Training on latest automation control systems.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-secondary/50 border border-border p-8 rounded-sm text-center"
            >
              <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center text-accent mb-6 shadow-sm">
                <b.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-3 tracking-tighter">
                {b.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Job Openings */}
          <div>
            <h3 className="text-3xl font-black text-primary mb-8 flex items-center gap-3 tracking-tight">
              CURRENT OPENINGS
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-sm">
                {JOBS.length}
              </span>
            </h3>
            <div className="space-y-4">
              {JOBS.map((job) => (
                <div
                  key={job.id}
                  className="group border border-border bg-background hover:bg-secondary p-6 rounded-sm transition-colors cursor-pointer flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
                >
                  <div>
                    <h4 className="font-bold text-xl text-primary group-hover:text-accent transition-colors mb-2">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span className="bg-primary/5 px-2 py-1 rounded-sm border border-border">
                        {job.depart}
                      </span>
                      <span className="bg-primary/5 px-2 py-1 rounded-sm border border-border">
                        {job.loc}
                      </span>
                      <span className="bg-primary/5 px-2 py-1 rounded-sm border border-border">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="shrink-0 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold tracking-wider rounded-sm"
                  >
                    VIEW ROLE
                  </Button>
                </div>
              ))}
              <div className="pt-4 text-center">
                <p className="text-muted-foreground text-sm font-medium">
                  Don&apos;t see a perfect fit? Send your resume to{" "}
                  <a
                    href="mailto:careers@cardbox.demo"
                    className="text-accent underline font-bold"
                  >
                    careers@cardbox.demo
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Culture Image */}
          <div className="relative aspect-4/3 lg:aspect-auto h-full min-h-125 w-full bg-secondary rounded-sm overflow-hidden border border-border">
            <Image
              src={getPlaceholderImage('factory')}
              alt="Factory Machinery"
              fill
              className="object-cover grayscale"
            />
            {/* Overlay Pattern */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm p-6 border-l-4 border-accent">
              <h4 className="text-2xl font-black text-primary tracking-tight mb-2">
                OPERATIONAL EXCELLENCE
              </h4>
              <p className="text-muted-foreground font-medium text-sm">
                Join a facility operating the most advanced computerized
                corrugation networks in the region.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
