import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IndustryCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  className?: string;
}

export function IndustryCard({
  title,
  description,
  Icon,
  className,
}: IndustryCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
