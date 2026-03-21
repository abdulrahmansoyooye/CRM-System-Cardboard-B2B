"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Corrugated Master Cartons",
        href: "/products/corrugated-boxes",
      },
      { label: "Custom Printed Boxes", href: "/products/custom-printed" },
      { label: "7-Ply Heavy Duty", href: "/products/heavy-duty" },
      { label: "Die-Cut Cartons", href: "/products/die-cut" },
      { label: "Export Packaging", href: "/products/export-packaging" },
      { label: "Bulk Pallet Boxes", href: "/products/pallet-boxes" },
    ],
  },
  { label: "Industries", href: "/industries" },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "Manufacturing Process", href: "/process" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-2xl tracking-tighter text-primary flex items-center gap-2 shrink-0"
        >
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-black">
              CB
            </span>
          </div>
          CARDBOX
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-sm transition-colors hover:text-accent text-foreground/80"
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 min-w-[220px] bg-background border border-border shadow-xl rounded-sm overflow-hidden z-50 py-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-sm transition-colors hover:text-accent text-foreground/80"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Link href="/contact">
            <Button className="font-bold tracking-wide bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm px-6">
              REQUEST A QUOTE
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-6">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2.5 px-2 hover:text-accent transition-colors text-foreground/80 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 border-l border-border pl-4 mb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-muted-foreground hover:text-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-sm">
                REQUEST A QUOTE
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
