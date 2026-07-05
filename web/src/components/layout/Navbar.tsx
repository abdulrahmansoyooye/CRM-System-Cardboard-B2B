"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Menu, Search, X, ChevronDown, MoveRight, 
  Mail, Phone, MapPin, Globe, ShieldCheck, 
  ArrowUpRight, LayoutGrid, Box, Factory, 
  Newspaper, Info, Briefcase, MessageSquare,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TSettings, TCategory, TIndustry } from "@/types";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

export function Navbar({ 
  settings, 
  categories = [], 
  industries = [] 
}: { 
  settings?: TSettings;
  categories?: TCategory[];
  industries?: TIndustry[];
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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

  const [focusedDropdownIndex, setFocusedDropdownIndex] = useState<Record<string, number>>({});

  const handleDropdownKeyDown = (e: React.KeyboardEvent, linkLabel: string, childrenCount: number) => {
    const isOpen = openDropdown === linkLabel;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setOpenDropdown(isOpen ? null : linkLabel);
        if (!isOpen) setFocusedDropdownIndex(prev => ({ ...prev, [linkLabel]: -1 }));
        break;
      case "Escape":
        e.preventDefault();
        setOpenDropdown(null);
        break;
      case "ArrowDown":
        if (isOpen) {
          e.preventDefault();
          setFocusedDropdownIndex(prev => ({
            ...prev,
            [linkLabel]: Math.min((prev[linkLabel] ?? -1) + 1, childrenCount - 1),
          }));
        }
        break;
      case "ArrowUp":
        if (isOpen) {
          e.preventDefault();
          setFocusedDropdownIndex(prev => ({
            ...prev,
            [linkLabel]: Math.max((prev[linkLabel] ?? 0) - 1, -1),
          }));
        }
        break;
    }
  };

  const closeDropdown = () => setOpenDropdown(null);

  const DYNAMIC_NAV: NavItem[] = [
    {
      label: "Products",
      href: "/products",
      icon: Box,
      description: "Advanced industrial packaging solutions",
      children: categories.map(cat => ({
        label: cat.name,
        href: `/products?category=${cat._id}`,
        description: "Custom specification handling",
        icon: Factory
      })).slice(0, 6)
    },
    {
      label: "Industries",
      href: "/industries",
      icon: LayoutGrid,
      description: "Sector-specific manufacturing expertise",
      children: industries.map(ind => ({
        label: ind.name,
        href: `/industries/${ind.slug}`,
        description: "Enterprise integration",
        icon: ShieldCheck
      })).slice(0, 6)
    },
    {
      label: "Solutions",
      href: "#",
      icon: Factory,
      description: "Our end-to-end operational capacity",
      children: [
        { label: "Manufacturing Process", href: "/process", description: "Automated production cycles", icon: Globe },
        { label: "Infrastructure Hub", href: "/infrastructure", description: "Logistics and warehousing", icon: Box },
        { label: "Quality Protocol", href: "/quality", description: "ISO 9001 certified standards", icon: ShieldCheck },
        { label: "Industrial Gallery", href: "/gallery", description: "Visual asset archive", icon: Newspaper },
      ],
    },
    {
      label: "Intelligence",
      href: "#",
      icon: Newspaper,
      description: "Thought leadership and corporate updates",
      children: [
        { label: "Operational Log", href: "/blog", description: "Industry insights and news", icon: Newspaper },
        { label: "System Updates", href: "/updates", description: "Latest platform deployment", icon: Info },
        { label: "About Cardbox", href: "/about", description: "Management and core mission", icon: Globe },
      ],
    },
    { label: "Careers", href: "/careers", icon: Briefcase },
    { label: "Contact", href: "/contact", icon: MessageSquare },
  ];

  return (
    <>
    <header 
      className={cn(
        "fixed top-0 w-full bg-background/60 backdrop-blur-3xl border-b border-border/40 py-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-500",
        isMobileMenuOpen ? "z-[120] bg-transparent border-none shadow-none" : "z-[100]",
        scrolled ? "py-2 bg-background/80" : "py-3"
      )}
    >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo Cluster */}
          <Link
            href="/"
            className="flex items-center gap-4 group shrink-0 relative z-[110]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
               <motion.div 
                 className="absolute inset-0 bg-primary group-hover:bg-accent transition-colors duration-500"
                 layoutId="logoBg"
               />
               <div className="absolute inset-0 border-[3px] border-white/10" />
               <div className="relative z-10 text-white font-black text-xs tracking-tighter flex flex-col items-center">
                 <span className="leading-none">{settings?.companyName?.substring(0, 2).toUpperCase() || "CB"}</span>
                 <div className="w-4 h-0.5 bg-accent mt-0.5 group-hover:bg-white transition-colors" />
               </div>
            </div>
            <div className="flex flex-col -gap-1">
              <span className={cn(
                "text-2xl font-black tracking-tighter leading-none transition-colors duration-500",
                isMobileMenuOpen ? "text-white" : "text-primary"
              )}>
                {"CARDBOX"}
              </span>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-[10px] font-black tracking-[0.4em] uppercase transition-colors",
                  isMobileMenuOpen ? "text-white/60" : "text-accent"
                )}>
                  Enterprise
                </span>
                <div className="h-[1px] w-8 bg-border" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Advanced Dropdowns */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary navigation" role="navigation">
            {DYNAMIC_NAV.map((link) => {
              const Icon = link.icon;
              return link.children && link.children.length > 0 ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={closeDropdown}
                  onFocus={() => setOpenDropdown(link.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      closeDropdown();
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                    aria-label={`Open ${link.label} menu`}
                    aria-controls={`dropdown-${link.label}`}
                    onKeyDown={(e) => handleDropdownKeyDown(e, link.label, link.children?.length ?? 0)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase cursor-pointer transition-all relative group",
                      openDropdown === link.label ? "text-accent" : "text-primary/70 hover:text-primary"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-500 relative z-10", openDropdown === link.label && "rotate-180")} />
                    <motion.div 
                      className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity rounded-none"
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div 
                        id={`dropdown-${link.label}`}
                        role="menu"
                        aria-label={`${link.label} submenu`}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 min-w-[500px] bg-white border border-border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] p-0 z-50 overflow-hidden mt-1"
                      >
                        <div className="grid grid-cols-2">
                            <div className="p-8 bg-slate-50 border-r border-border" aria-hidden="true">
                                <div className="p-4 bg-primary text-white w-12 h-12 flex items-center justify-center mb-6">
                                    {Icon && <Icon className="w-6 h-6" />}
                                </div>
                                <h3 className="text-lg font-black text-primary leading-tight uppercase tracking-tighter mb-2">{link.label}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    {link.description}
                                </p>
                                <div className="mt-8 pt-8 border-t border-border/50">
                                    <Link href={link.href} className="text-[10px] font-black text-accent flex items-center gap-3 uppercase tracking-widest hover:gap-5 transition-all">
                                        Exploration Protocol <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-1">
                                {link.children.map((child, childIdx) => {
                                    const ChildIcon = child.icon;
                                    const isFocused = focusedDropdownIndex[link.label] === childIdx;
                                    return (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            role="menuitem"
                                            tabIndex={isFocused ? 0 : -1}
                                            ref={(el) => {
                                              if (isFocused && el) {
                                                setTimeout(() => el.focus(), 0);
                                              }
                                            }}
                                            onKeyDown={(e) => handleDropdownKeyDown(e, link.label, link.children?.length ?? 0)}
                                            className={cn(
                                              "flex items-center gap-4 p-4 hover:bg-slate-50 transition-all group/item",
                                              isFocused && "bg-slate-50"
                                            )}
                                        >
                                            <div className="w-8 h-8 rounded-none border border-border flex items-center justify-center text-primary group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-white transition-all">
                                                {ChildIcon ? <ChildIcon className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                                            </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">{child.label}</h4>
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase opacity-60 mt-0.5">{child.description}</p>
                                        </div>
                                    </Link>
                                )})}
                            </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase text-primary/70 hover:text-primary transition-all relative group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.div 
                    className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Group */}
          <div className="hidden lg:flex items-center gap-4">
            <button aria-label="Search" className="p-3 text-primary/40 hover:text-accent transition-colors flex items-center justify-center">
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="w-px h-8 bg-border/40 mx-2" />
            <Link href="/request-quote" className="group relative">
               <div className="absolute inset-0 bg-accent translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
               <Button className="relative z-10 font-black tracking-[0.25em] bg-primary text-white hover:bg-black border-none rounded-none px-8 text-[10px] h-14 transition-all duration-300">
                PROVISION QUOTE
               </Button>
            </Link>
          </div>

          {/* Mobile Toggle - Improved design */}
          <div className="flex items-center gap-4 xl:hidden relative z-[110]">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              className={cn(
                "w-12 h-12 flex items-center justify-center transition-all duration-500",
                isMobileMenuOpen ? "bg-white text-primary" : "bg-primary text-white"
              )}
            >
              <div className="relative w-6 h-5" aria-hidden="true">
                <span className={cn(
                    "absolute h-0.5 w-6 bg-current transition-all duration-500",
                    isMobileMenuOpen ? "top-[9px] rotate-45" : "top-[2px]"
                )} />
                <span className={cn(
                    "absolute h-0.5 w-6 bg-current transition-all duration-500 top-[9px]",
                    isMobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"
                )} />
                <span className={cn(
                    "absolute h-0.5 w-4 bg-current transition-all duration-500 right-0",
                    isMobileMenuOpen ? "top-[9px] -rotate-45 w-6" : "top-[16px]"
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Command Center - Refactored */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex overflow-hidden"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            {/* Backdrop Shard */}
            <motion.div 
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-0 bg-primary origin-top"
            />{/* Grid Pattern Overlay */}
            <div aria-hidden="true" className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <div className="relative w-full h-full flex flex-col container mx-auto px-8 pt-40 pb-12 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
                    <div className="flex flex-col gap-1 sm:gap-2">
                         {DYNAMIC_NAV.map((link, idx) => (
                            <motion.div 
                                key={link.label}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + (idx * 0.05) }}
                                className="group"
                            >
                                {link.children ? (
                                    <div className="py-2">
                                        <button 
                                            onClick={() => setActiveTab(activeTab === link.label ? null : link.label)}
                                            className="text-4xl sm:text-6xl font-black text-white hover:text-accent transition-colors uppercase tracking-tighter flex items-center gap-4"
                                        >
                                            {link.label}
                                            <ChevronDown className={cn("w-8 h-8 transition-transform duration-500", activeTab === link.label && "rotate-180")} />
                                        </button>
                                        <AnimatePresence>
                                            {activeTab === link.label && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden flex flex-col gap-4 mt-6 pl-6 border-l-4 border-accent/30"
                                                >
                                                    {link.children.map(child => (
                                                        <Link 
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="text-lg font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-between group/sub"
                                                        >
                                                            {child.label}
                                                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover/sub:opacity-100 transition-all" />
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link 
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl sm:text-6xl font-black text-white hover:text-accent transition-colors uppercase tracking-tighter block py-2"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </motion.div>
                         ))}
                    </div>

                    <div className="lg:border-l lg:border-white/10 lg:pl-12 flex flex-col justify-between py-12">
                        <div className="space-y-12">
                            <div>
                                <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6">Headquarters Protocol</p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 text-white group">
                                        <MapPin className="w-5 h-5 text-accent mt-1" />
                                        <span className="text-xl font-bold leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
                                            {settings?.address || "123 Manufacturing Way, Industrial Sector 4, Tech City"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-white group">
                                        <Phone className="w-5 h-5 text-accent" />
                                        <span className="text-xl font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                                            {settings?.contactPhone || "+1 (800) 123-4567"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-white group">
                                        <Mail className="w-5 h-5 text-accent" />
                                        <span className="text-xl font-bold opacity-70 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                                            {settings?.contactEmail || "SALES@CARDBOX.DEMO"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {['LinkedIn', 'X-Platform', 'Instagram', 'YouTube'].map(social => (
                                    <button key={social} className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12">
                            <Link href="/request-quote" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full h-24 bg-accent text-white font-black tracking-[0.3em] text-sm uppercase group relative overflow-hidden">
                                    <span className="relative z-10">Initialize Production Quote</span>
                                    <motion.div 
                                        className="absolute inset-0 bg-black/20"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">
                        © {new Date().getFullYear()} {settings?.companyName} INDUSTRIAL SYSTEMS // v2.4.0
                    </p>
                    <div className="flex gap-8 text-[9px] font-black text-white/50 uppercase tracking-widest">
                        <Link href="/privacy" className="hover:text-accent">Security Protocol</Link>
                        <Link href="/terms" className="hover:text-accent">Terms of Engagement</Link>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

