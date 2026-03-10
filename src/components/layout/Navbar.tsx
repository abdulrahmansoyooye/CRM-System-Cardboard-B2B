"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <Link
            href="/"
            className="font-bold text-2xl tracking-tighter text-primary flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-black">
                CB
              </span>
            </div>
            CARDBOX
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-accent text-foreground/80"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-accent text-foreground/80"
          >
            About Us
          </Link>
          <div className="group relative">
            <Link
              href="/products"
              className="transition-colors hover:text-accent text-foreground/80 flex items-center gap-1"
            >
              Products
            </Link>
            {/* Mega menu placeholder can go here */}
          </div>
          <Link
            href="/industries"
            className="transition-colors hover:text-accent text-foreground/80"
          >
            Industries
          </Link>
          <Link
            href="/process"
            className="transition-colors hover:text-accent text-foreground/80"
          >
            Process
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-accent text-foreground/80"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button className="font-bold tracking-wide">REQUEST A QUOTE</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <Link href="/about" className="hover:text-accent">
              About Us
            </Link>
            <Link href="/products" className="hover:text-accent">
              Products
            </Link>
            <Link href="/industries" className="hover:text-accent">
              Industries
            </Link>
            <Link href="/process" className="hover:text-accent">
              Process
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
            <Button className="w-full mt-4">REQUEST A QUOTE</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
