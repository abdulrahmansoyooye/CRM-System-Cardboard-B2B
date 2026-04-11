import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  Briefcase,
  Building,
  GraduationCap,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";
import { getJobs, getSettings } from "@/lib/api";
import { Metadata } from 'next';
import { JobDetailsModal } from "@/components/forms/JobDetailsModal";
import { TJob } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    return {
      title: `Industrial Careers | ${config?.companyName || 'CARDBOX'}`,
      description: "Join the leading workforce in structural packaging engineering and industrial manufacturing.",
    };
  } catch {
    return { title: "Careers | CARDBOX" };
  }
}

export default async function CareersPage() {
  let jobs: TJob[] = [];
  try {
    jobs = await getJobs();
  } catch {
    jobs = [];
  }

  const activeJobs = jobs.filter(j => j.isActive !== false);

  return (
    <div className="bg-background font-sans">
      <PageHeader
        title="Industrial Careers"
        subtitle="Join the leading workforce in structural packaging engineering."
      />

      <div className="container mx-auto px-4 lg:px-12 py-32">
        <div className="text-center max-w-4xl mx-auto mb-32">
          <div className="text-[11px] font-black tracking-[0.4em] text-accent mb-10 flex items-center justify-center gap-10 uppercase">
            <span className="w-16 h-px bg-accent inline-block" />
            Human Capital
            <span className="w-16 h-px bg-accent inline-block" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-[0.85] mb-12 uppercase italic">
            ENGINEERING THE <br />
            <span className="text-primary/30 font-light not-italic">WORKFORCE FUTURE.</span>
          </h2>
          <p className="text-muted-foreground text-xl font-bold leading-relaxed max-w-2xl mx-auto opacity-80">
            At CARDBOX, we don&apos;t just manufacture boxes; we engineer industrial
            protection. We are looking for operators, engineers, and specialists
            who thrive in high-precision environments.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 border border-border/40 mb-32 shadow-2xl">
          {[
            {
              title: "Industrial Compensation",
              icon: Building,
              desc: "Above market base pay with performance-linked scaling.",
            },
            {
              title: "Health Intelligence",
              icon: Users,
              desc: "Full comprehensive coverage for operators and dependents.",
            },
            {
              title: "Career Hierarchy",
              icon: Briefcase,
              desc: "Defined internal promotion protocols for senior roles.",
            },
            {
              title: "Tech Training",
              icon: GraduationCap,
              desc: "Direct certification on 5-ply automated control networks.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-white p-12 text-center group hover:bg-accent transition-all duration-700"
            >
              <div className="w-20 h-20 mx-auto bg-secondary/50 rounded-none flex items-center justify-center mb-10 group-hover:bg-white group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 border border-border/10">
                <b.icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-black text-xl text-primary mb-5 group-hover:text-white transition-colors tracking-tighter uppercase leading-[0.9]">
                {b.title}
              </h3>
              <p className="text-xs font-bold text-muted-foreground group-hover:text-white/80 transition-colors uppercase tracking-tight leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Job Openings */}
          <div>
            <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
              <h3 className="text-4xl font-black text-primary flex items-center gap-6 tracking-tighter uppercase italic">
                OPEN PROTOCOLS
              </h3>
              <span className="w-16 h-16 rounded-none bg-accent text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-accent/20">
                {activeJobs.length}
              </span>
            </div>
            
            <div className="space-y-6">
              {activeJobs.map((job) => (
                <div
                  key={job._id}
                  className="group border border-border bg-white hover:border-accent p-10 rounded-none transition-all duration-500 flex flex-col sm:flex-row gap-8 justify-between items-start sm:items-center relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h4 className="font-black text-2xl text-primary group-hover:text-accent transition-colors mb-4 uppercase tracking-tighter leading-[0.9]">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                      <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        <Building className="w-4 h-4 text-accent" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        <MapPin className="w-4 h-4 text-accent" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        <Clock className="w-4 h-4 text-accent" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <JobDetailsModal job={job} />
                </div>
              ))}
              
              {activeJobs.length === 0 && (
                 <div className="p-16 border-2 border-dashed border-border text-center bg-secondary/20">
                    <p className="font-black text-primary/40 uppercase tracking-[0.2em] text-sm">All operations currently fully staffed.</p>
                 </div>
              )}

              <div className="pt-10 text-center border-t border-border mt-10">
                <p className="text-muted-foreground/60 text-[10px] font-black uppercase tracking-[0.3em]">
                  Direct Resume Submission:{" "}
                  <a
                    href="mailto:careers@cardbox.demo"
                    className="text-accent underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    TALENT@CARDBOX.INDUSTRIAL
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Culture Image */}
          <div className="relative aspect-square lg:aspect-auto h-full min-h-150 w-full bg-secondary rounded-none overflow-hidden border border-border group shadow-2xl">
            <Image
              src={getPlaceholderImage('factory')}
              alt="Industrial Precision Floor"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 contrast-125 scale-105"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-1000" />
            <div className="absolute bottom-12 left-12 right-12 bg-white p-12 border-l-8 border-accent shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
              <h4 className="text-4xl font-black text-primary tracking-tighter mb-4 uppercase leading-[0.9]">
                OPERATIONAL <br />EXCELLENCE.
              </h4>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-tight leading-relaxed opacity-80">
                Operate within a facility running ultra-advanced <br />computerized corrugation networks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
