"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import React from "react";

export default function ContactPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
  };

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
            <h2 className="text-4xl font-black text-primary tracking-tight leading-tight mb-8">
              GET IN TOUCH
            </h2>

            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              For volume quotations, structural design specifications, or
              factory visits, kindly fill out the inquiry form or reach us via
              direct lines.
            </p>

            <div className="space-y-8">

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Factory & Headquarters
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    123 Industrial Park, Sector 4 <br />
                    Manufacturing City, 452001 <br />
                    Region, Global Export Hub
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Direct Lines
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Sales: +1 (800) 123-4567 <br />
                    Logistics: +1 (800) 123-4568 <br />
                    HQ Fax: +1 (800) 123-4569
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Electronic Mail
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Sales inquiries: sales@cardbox.demo <br />
                    Export inquiries: global@cardbox.demo <br />
                    Recruitment: careers@cardbox.demo
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center shrink-0 rounded-sm">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-primary tracking-tight">
                    Operating Hours
                  </h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Plant Operation: 24/7 (3 Shifts) <br />
                    Corporate Office: Monday - Friday, 08:00 - 18:00
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-secondary/50 p-8 border border-border rounded-sm shadow-sm relative overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />

            <h3 className="text-2xl font-black text-primary tracking-tight mb-8">
              INQUIRY FORM
            </h3>

            <form
              className="space-y-6 relative z-10"
              onSubmit={onSubmit}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Company Name *
                  </label>
                  <Input
                    required
                    placeholder="Your Organization Ltd."
                    className="h-12 bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Contact Person *
                  </label>
                  <Input
                    required
                    placeholder="John Doe"
                    className="h-12 bg-background"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="h-12 bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="+1 234 567 8900"
                    className="h-12 bg-background"
                  />
                </div>

              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Nature of Inquiry
                </label>

                <select className="w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Sales Quotation</option>
                  <option>Supplier Application</option>
                  <option>Export Distribution</option>
                  <option>General Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Message / Specifications *
                </label>

                <textarea
                  required
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Provide box dimensions, load capacity, ECT requirement, etc."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-sm tracking-widest font-bold bg-primary hover:bg-primary/90 rounded-sm"
              >
                SUBMIT INQUIRY
              </Button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
