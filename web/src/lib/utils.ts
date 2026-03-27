import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlaceholderImage(category: 'hero' | 'factory' | 'box' | 'product' = 'product') {
  const images = {
    hero: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
    factory: 'https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?auto=format&fit=crop&q=80&w=1932',
    box: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1974',
    product: '/images/company.png'
  };
  return images[category];
}
