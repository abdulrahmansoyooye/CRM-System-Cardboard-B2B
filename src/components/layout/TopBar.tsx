import { Mail, MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-primary text-secondary/90 py-2 border-b-2 border-accent hidden lg:block">
      <div className="container mx-auto px-8 flex justify-between items-center text-xs font-semibold tracking-wide">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
            <Phone className="w-3 h-3 text-accent" />
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
            <Mail className="w-3 h-3 text-accent" />
            <span>sales@cardbox.demo</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-accent" />
          <span>123 Industrial Park, Sector 4, Manufacturing City</span>
        </div>
      </div>
    </div>
  );
}
