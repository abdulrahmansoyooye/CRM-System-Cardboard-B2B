"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Corrugated Boxes",
        href: "/products/corrugated-boxes",
      },
      { label: "Custom Printed", href: "/products/custom-printed" },
      { label: "Heavy Duty", href: "/products/heavy-duty" },
      { label: "Die-Cut Boxes", href: "/products/die-cut" },
      { label: "Export Packaging", href: "/products/export-packaging" },
    ],
  },
  { label: "Industries", href: "/industries" },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "Manufacturing Process", href: "/process" },
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "Quality Assurance", href: "/quality" },
      { label: "Events & Updates", href: "/updates" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-xl transition-all duration-500">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-black text-2xl tracking-tighter text-primary flex items-center gap-3 shrink-0 group"
        >
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 bg-primary rounded-none flex items-center justify-center border-l-4 border-accent"
          >
            <span className="text-primary-foreground text-xs font-black">
              CB
            </span>
          </motion.div>
          <span className="group-hover:text-accent transition-colors duration-500">CARDBOX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div
                  className="flex items-center gap-2 px-5 py-2 rounded-none transition-all duration-500 hover:text-accent text-foreground font-black text-[10px] tracking-[0.2em] uppercase cursor-pointer group"
                >
                  {link.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${openDropdown === link.label ? 'rotate-180 text-accent' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-0 min-w-[280px] bg-background border border-border shadow-2xl rounded-none overflow-hidden z-50 py-3 mt-1"
                    >
                      <div className="w-full h-1 bg-accent absolute top-0 left-0" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-6 py-3 text-[10px] font-black tracking-widest text-foreground/60 hover:bg-secondary hover:text-accent transition-all duration-300 uppercase border-l-0 hover:border-l-4 border-accent"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-5 py-2 rounded-none transition-all duration-500 hover:text-accent text-foreground font-black text-[10px] tracking-[0.2em] uppercase border-b-2 border-transparent hover:border-accent"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <motion.div whileHover={{ rotate: 90 }}>
            <Button variant="ghost" size="icon" className="hover:bg-accent/10">
              <Search className="w-5 h-5 text-muted-foreground hover:text-accent" />
            </Button>
          </motion.div>
          <Link href="/request-quote">
            <Button className="font-black tracking-[0.2em] bg-accent text-accent-foreground hover:bg-white hover:text-primary transition-all duration-500 rounded-none px-8 text-[10px] h-12 shadow-[8px_8px_0px_rgba(255,183,77,0.1)]">
              REQUEST A QUOTE
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-3 bg-secondary text-foreground rounded-none border-l-4 border-accent"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-accent" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "circInOut" }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-10 gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.div 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 px-2 hover:text-accent transition-colors text-foreground font-black text-xs tracking-widest uppercase border-b border-border/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-6 mt-2 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-3 px-4 text-[10px] font-bold text-muted-foreground hover:text-accent transition-colors uppercase italic border-l-2 border-border/30 hover:border-accent"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/request-quote" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full mt-10 bg-accent text-accent-foreground hover:bg-white hover:text-primary font-black tracking-[0.2em] rounded-none py-8 text-xs h-16 transition-all duration-500">
                    REQUEST A QUOTE
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
