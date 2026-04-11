"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Search, X, ChevronDown, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TSettings } from "@/types";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  {
    label: "Solutions",
    href: "#",
    children: [
      { label: "Manufacturing Process", href: "/process" },
      { label: "Infrastructure Hub", href: "/infrastructure" },
      { label: "Quality Protocol", href: "/quality" },
      { label: "Industrial Gallery", href: "/gallery" },
    ],
  },
  {
    label: "Intelligence",
    href: "#",
    children: [
      { label: "Operational Log (Blog)", href: "/blog" },
      { label: "System Updates", href: "/updates" },
      { label: "About Cardbox", href: "/about" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ 
  settings, 
  categories = [], 
  industries = [] 
}: { 
  settings?: TSettings;
  categories?: any[];
  industries?: any[];
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const DYNAMIC_NAV = [
    {
      label: "Products",
      href: "/products",
      children: categories.map(cat => ({
        label: cat.name,
        href: `/products?category=${cat._id}`
      })).slice(0, 5) // Limit to top 5 in nav
    },
    {
      label: "Industries",
      href: "/industries",
      children: industries.map(ind => ({
        label: ind.name,
        href: `/industries/${ind.slug}`
      }))
    },
    {
      label: "Solutions",
      href: "#",
      children: [
        { label: "Manufacturing Process", href: "/process" },
        { label: "Infrastructure Hub", href: "/infrastructure" },
        { label: "Quality Protocol", href: "/quality" },
        { label: "Industrial Gallery", href: "/gallery" },
      ],
    },
    {
      label: "Intelligence",
      href: "#",
      children: [
        { label: "Operational Log (Blog)", href: "/blog" },
        { label: "System Updates", href: "/updates" },
        { label: "About Cardbox", href: "/about" },
      ],
    },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-500 border-b",
        scrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl border-border py-2 shadow-2xl" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-4 group shrink-0 relative z-[110]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: scrolled ? 90 : 0 }}
              className="absolute inset-0 bg-primary rounded-none border-l-4 border-accent"
            />
            <span className="relative text-white text-[9px] md:text-[10px] font-black tracking-tighter z-10">
              {settings?.companyName?.substring(0, 2).toUpperCase() || "CB"}
            </span>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-lg md:text-xl font-black text-primary tracking-tighter leading-none group-hover:text-accent transition-colors">
              {settings?.companyName || "CARDBOX"}
            </span>
            <span className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-muted-foreground uppercase opacity-50">
              Industrial
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {DYNAMIC_NAV.map((link) =>
            link.children && link.children.length > 0 ? (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase cursor-pointer transition-all",
                    openDropdown === link.label ? "text-accent" : "text-primary/70 hover:text-primary"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("w-3 h-3 transition-transform duration-500", openDropdown === link.label && "rotate-180")} />
                </div>
                
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 min-w-[240px] bg-white border border-border shadow-2xl p-2 z-50"
                    >
                      <div className="w-full h-1 bg-accent absolute top-0 left-0" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between px-5 py-4 text-[10px] font-black tracking-widest text-primary/60 hover:bg-secondary hover:text-accent transition-all uppercase group/item"
                        >
                          {child.label}
                          <MoveRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
                className="px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase text-primary/70 hover:text-primary transition-all relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ),
          )}
        </nav>

        {/* Action Group */}
        <div className="hidden lg:flex items-center gap-6">
          <Button variant="ghost" size="icon" className="text-primary/40 hover:text-accent hover:bg-transparent transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          <div className="w-px h-8 bg-border/40" />
          <Link href="/request-quote">
            <Button className="font-black tracking-[0.2em] bg-primary text-white hover:bg-accent border-none rounded-none px-10 text-[10px] h-14 transition-all duration-500 shadow-xl shadow-primary/10">
              SYNC QUOTE
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 xl:hidden relative z-[110]">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "p-3 rounded-none transition-all duration-300 flex items-center justify-center",
              isMobileMenuOpen ? "text-accent bg-transparent" : "bg-secondary text-primary border-l-4 border-accent"
            )}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[90]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-[105] flex flex-col pt-28 pb-12 px-10 overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                {DYNAMIC_NAV.map((link) => (
                  <div key={link.label} className="border-b border-border/40 py-4">
                    {link.children && link.children.length > 0 ? (
                      <div>
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                          className="flex items-center justify-between w-full text-2xl font-black text-primary uppercase tracking-tighter"
                        >
                          {link.label}
                          <ChevronDown className={cn("w-6 h-6 transition-transform", openDropdown === link.label && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {openDropdown === link.label && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-4 flex flex-col gap-4 pl-4 border-l-2 border-accent/20"
                            >
                              {link.children.map(child => (
                                <Link 
                                  key={child.href}
                                  href={child.href}
                                  className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] hover:text-accent"
                                  onClick={() => setIsMobileMenuOpen(false)}
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
                        href={link.href}
                        className="text-2xl font-black text-primary uppercase tracking-tighter block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link href="/request-quote" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-20 bg-accent text-white font-black tracking-widest text-xs uppercase rounded-none border-b-4 border-black/10">
                    REQUEST A QUOTE
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 pt-8 border-t border-border/40 text-[9px] font-black text-muted-foreground/50 tracking-[0.3em] uppercase">
                {settings?.companyName} Industrial System // v1.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

