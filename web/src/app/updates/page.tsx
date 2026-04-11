import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getEvents, getSettings } from "@/lib/api";
import { TEvent } from "@/types";
import { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    return {
      title: `Events & Updates | ${config?.companyName || "CARDBOX"}`,
      description:
        "Stay updated with the latest corporate announcements, events, and industry developments from our team.",
      openGraph: {
        title: `Events & Updates | ${config?.companyName || "CARDBOX"}`,
        description: "Corporate events and industrial updates.",
      },
    };
  } catch {
    return { title: "Events & Updates | CARDBOX" };
  }
}

export default async function UpdatesPage() {
  const events: TEvent[] = await getEvents().catch(() => []);

  const featuredEvents = events.filter((e) => e.isFeatured);
  const upcomingEvents = events.filter((e) => !e.isFeatured);

  return (
    <main className="pt-20 bg-background">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center bg-[#0A0F1A] overflow-hidden">
        <Image
          src={getPlaceholderImage("blog")}
          alt="Events and Corporate Updates"
          fill
          className="object-cover opacity-20 filter saturate-0 contrast-150"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <p className="text-accent font-black tracking-[0.4em] text-[10px] uppercase mb-6">
            CORPORATE TELEMETRY
          </p>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
            EVENTS &{" "}
            <span className="text-white/30 italic font-light">UPDATES.</span>
          </h1>
          <p className="text-white/40 text-sm font-bold mt-6 max-w-xl uppercase tracking-tight leading-relaxed">
            {events.length} active event{events.length !== 1 ? "s" : ""} in current
            operational calendar.
          </p>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-24 bg-secondary/20 border-b border-border/40">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-[11px] font-black tracking-[0.4em] text-accent uppercase mb-16 flex items-center gap-8">
              <span className="w-12 h-px bg-accent inline-block" />
              FEATURED EVENTS
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {featuredEvents.map((event) => (
                <div
                  key={event._id}
                  className="group border border-border bg-white hover:border-accent transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <Image
                      src={event.images?.[0] || getPlaceholderImage("hero")}
                      alt={event.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 bg-accent text-accent-foreground px-4 py-2 text-[10px] font-black uppercase tracking-widest z-10 border-r-4 border-white">
                      FEATURED EVENT
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex flex-wrap gap-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {event.eventDate
                          ? new Date(event.eventDate).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Date TBD"}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-6 leading-tight group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-bold uppercase leading-relaxed tracking-tight">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events Listing */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-[11px] font-black tracking-[0.4em] text-accent uppercase mb-16 flex items-center gap-8">
            <span className="w-12 h-px bg-accent inline-block" />
            UPCOMING EVENTS
          </h2>

          <div className="space-y-12">
            {upcomingEvents.length === 0 && events.length === 0 ? (
              <div className="text-center py-32 bg-secondary/20 border border-border/40">
                <h3 className="text-2xl font-black uppercase tracking-widest text-muted-foreground">
                  No upcoming events currently scheduled.
                </h3>
                <p className="text-muted-foreground/60 text-xs font-bold uppercase tracking-widest mt-4">
                  Check back soon for corporate announcements.
                </p>
              </div>
            ) : (
              (upcomingEvents.length > 0 ? upcomingEvents : events).map(
                (event, idx) => (
                  <div
                    key={event._id}
                    className="group border border-border bg-white hover:border-accent p-12 transition-all duration-700 relative overflow-hidden flex flex-col md:flex-row gap-16 items-center"
                  >
                    {/* Background index */}
                    <div className="absolute top-0 right-0 text-[100px] font-black text-muted-foreground/5 leading-none translate-x-1/4 -translate-y-1/4 pointer-events-none">
                      0{idx + 1}
                    </div>

                    <div className="md:w-1/3 w-full">
                      <div className="aspect-square relative overflow-hidden bg-secondary">
                        <Image
                          src={event.images?.[0] || getPlaceholderImage("hero")}
                          alt={event.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
                          <span className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-widest">
                            EVENT
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 w-full">
                      <div className="flex flex-wrap gap-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-8">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          {event.eventDate
                            ? new Date(event.eventDate).toLocaleDateString()
                            : "TBD"}
                        </div>
                        {event.isFeatured && (
                          <div className="flex items-center gap-3 text-accent font-bold">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            Featured Event
                          </div>
                        )}
                      </div>

                      <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8 leading-tight group-hover:text-accent transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-muted-foreground text-sm font-bold uppercase leading-relaxed tracking-tight mb-12 max-w-xl">
                        {event.description}
                      </p>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase text-primary group-hover:text-accent transition-all"
                      >
                        RSVP / ENQUIRE{" "}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
                      </Link>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-40 bg-secondary/30 text-center relative overflow-hidden border-t border-border/50">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-accent uppercase mb-8">
            NETWORK CHANNEL
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12">
            SUBSCRIBE FOR{" "}
            <span className="text-muted-foreground font-light italic text-4xl md:text-6xl">
              INSIGHTS.
            </span>
          </h3>
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60 italic max-w-md mx-auto">
            Monthly digest of industrial innovations and global events. No spam — only operational intelligence.
          </p>
        </div>
        <div className="absolute top-1/2 left-0 text-[180px] font-black text-muted-foreground/3 -translate-y-1/2 -translate-x-1/4 pointer-events-none select-none tracking-tighter uppercase">
          Digest
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
