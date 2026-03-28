import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlaceholderImage(category: 'hero' | 'factory' | 'box' | 'product' = 'product') {
  const images = {
    hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070',
    factory: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=2070',
    box: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070',
    product: '/images/company.png'
  };
  return images[category];
}
