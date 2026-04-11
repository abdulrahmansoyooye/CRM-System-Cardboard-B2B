import { PageHeader } from "@/components/layout/PageHeader";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getSettings } from "@/lib/api";
import { TSettings } from "@/types";
import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    return {
      title: `Contact | ${config?.companyName || "CARDBOX"}`,
      description:
        "Direct routing to our sales, engineering, and logistics teams. Send an inquiry or request a quote.",
    };
  } catch {
    return { title: "Contact | CARDBOX" };
  }
}

export default async function ContactPage() {
  let config: TSettings | undefined;
  try {
    const settings = await getSettings();
    config = Array.isArray(settings) ? settings[0] : (settings as unknown as TSettings);
  } catch {
    config = undefined;
  }

  const address =
    config?.address || "123 Industrial Park, Sector 4, Manufacturing City, 452001";
  const phone =
    config?.contactPhone || "+1 (800) 123-4567";
  const email =
    config?.contactEmail || "sales@cardbox.industrial";

  return (
    <div className="bg-background">
      <PageHeader
        title="Contact Operations"
        subtitle="Direct routing to our sales, engineering, and logistics teams."
      />

      <div className="container mx-auto px-4 lg:px-8 py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tight leading-tight mb-8 uppercase">
              GET IN TOUCH
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              For volume quotations, structural design specifications, or factory visits,
              kindly fill out the inquiry form or reach us via direct lines.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm border border-border">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Factory &amp; Headquarters
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm border border-border">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Direct Lines
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Sales: {phone}
                    <br />
                    Logistics: {phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm border border-border">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Electronic Mail
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Sales:{" "}
                    <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
                      {email}
                    </a>
                    <br />
                    Careers:{" "}
                    <a
                      href="mailto:careers@cardbox.industrial"
                      className="hover:text-accent transition-colors"
                    >
                      careers@cardbox.industrial
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm border border-border">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Operating Hours
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Plant Operation: 24/7 (3 Shifts)
                    <br />
                    Corporate Office: Monday – Friday, 08:00 – 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form — client component */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
