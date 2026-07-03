"use client";

import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitInquiry } from "@/lib/api";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    inquiryType: "Sales Quotation",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await submitInquiry({
        name: formData.name,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        productInterested: formData.inquiryType,
        message: formData.message,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send your message. Please try again or contact us directly.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-secondary/50 p-8 border border-border rounded-sm shadow-sm flex flex-col items-center justify-center min-h-125 text-center">
        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-accent" />
        </div>
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-4 text-primary">
          INQUIRY RECEIVED
        </h3>
        <p className="text-muted-foreground font-bold text-sm uppercase tracking-tight leading-relaxed max-w-xs">
          Our team will respond within 24 operational hours. Thank you for reaching out.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 p-8 border border-border rounded-sm shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
      <h3 className="text-2xl font-black text-primary tracking-tight mb-8">
        INQUIRY FORM
      </h3>

      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Company Name *
            </label>
            <Input
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your Organization Ltd."
              className="h-12 bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Contact Person *
            </label>
            <Input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="h-12 bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Phone Number *
            </label>
            <Input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              className="h-12 bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Nature of Inquiry
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option>Sales Quotation</option>
            <option>Supplier Application</option>
            <option>Export Distribution</option>
            <option>Technical Specification</option>
            <option>General Support</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Message / Specifications *
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            placeholder="Provide box dimensions, load capacity, ECT requirement, etc."
          />
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-sm">
            {error}
          </div>
        )}

        <Button
          size="lg"
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-sm tracking-widest font-bold bg-primary hover:bg-accent rounded-sm transition-all group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-3 animate-spin" />
              SENDING...
            </>
          ) : (
            <>
              SUBMIT INQUIRY
              <Send className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
