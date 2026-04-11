"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types";

export function ProductFilterBar({ categories }: { categories: TCategory[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("searchTerm") || "");
  const currentCategory = searchParams.get("category") || "";

  // Handle category change
  const handleCategoryChange = (catId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("searchTerm", searchQuery);
    } else {
      params.delete("searchTerm");
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    router.push("/products", { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-20">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        <Button
          onClick={() => handleCategoryChange("")}
          variant={currentCategory === "" ? "default" : "outline"}
          className={`font-black tracking-[0.2em] rounded-none uppercase text-[10px] h-12 px-8 transition-all duration-500 ${
            currentCategory === "" 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
              : "border-border hover:border-accent text-primary"
          }`}
        >
          ALL CONFIGURATIONS
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat._id}
            onClick={() => handleCategoryChange(cat._id)}
            variant={currentCategory === cat._id ? "default" : "outline"}
            className={`font-black tracking-[0.2em] rounded-none uppercase text-[10px] h-12 px-8 transition-all duration-500 ${
              currentCategory === cat._id 
                ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" 
                : "border-border hover:border-accent text-primary"
            }`}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Search Field */}
      <div className="relative w-full lg:w-96 group">
        <form onSubmit={handleSearchSubmit}>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="REQUISITION SEARCH..."
            className="w-full pl-14 pr-12 h-14 rounded-none bg-secondary/40 border-border focus-visible:ring-accent font-black text-[11px] uppercase tracking-widest transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(""); router.push("/products", { scroll: false }); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
