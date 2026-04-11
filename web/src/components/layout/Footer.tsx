import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

import { TSettings } from "@/types";

export function Footer({ settings }: { settings?: TSettings }) {
  const contact = settings?.contactInfo;
  const companyName = settings?.companyName || "CARDBOX";
  const social = settings?.socialLinks;

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-primary font-black text-sm">
                  {companyName.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-bold text-2xl tracking-tighter">
                {companyName}
              </span>
            </div>
            <p className="text-secondary/80 text-sm leading-relaxed mb-6">
              {settings?.tagline || "Leading the packaging industry with heavy-duty, custom corrugated cardboard solutions for manufacturing and export needs."}
            </p>
            <div className="flex gap-4">
              <Link
                href={social?.facebook || "#"}
                className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href={social?.twitter || "#"}
                className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href={social?.linkedin || "#"}
                className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href={social?.instagram || "#"}
                className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-accent inline-block"></span>
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80 font-medium">
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About the Company
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  className="hover:text-accent transition-colors"
                >
                  Manufacturing Process
                </Link>
              </li>
              <li>
                <Link
                  href="/infrastructure"
                  className="hover:text-accent transition-colors"
                >
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/quality"
                  className="hover:text-accent transition-colors"
                >
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-accent transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Industries */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-accent inline-block"></span>
              OUR SOLUTIONS
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80 font-medium">
              <li>
                <Link
                  href="/products/corrugated"
                  className="hover:text-accent transition-colors"
                >
                  Corrugated Boxes
                </Link>
              </li>
              <li>
                <Link
                  href="/products/heavy-duty"
                  className="hover:text-accent transition-colors"
                >
                  Heavy Duty Packaging
                </Link>
              </li>
              <li>
                <Link
                  href="/products/custom"
                  className="hover:text-accent transition-colors"
                >
                  Custom Printed Boxes
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/fmcg"
                  className="hover:text-accent transition-colors"
                >
                  FMCG Packaging
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/ecommerce"
                  className="hover:text-accent transition-colors"
                >
                  E-commerce Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-accent inline-block"></span>
              CONTACT US
            </h4>
            <ul className="space-y-4 text-sm text-secondary/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span>
                  {settings?.address || "123 Industrial Park, Sector 4, Manufacturing City, 452001"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>{settings?.contactPhone || "+1 (800) 123-4567"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>{settings?.contactEmail || "sales@cardbox.demo"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary/60">
          <p>&copy; {new Date().getFullYear()} {companyName} Manufacturing.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
