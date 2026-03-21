import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-10 w-full",
        {
          "items-start text-left": align === "left",
          "items-center text-center mx-auto": align === "center",
          "items-end text-right": align === "right",
        },
        className,
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl">
          {subtitle}
        </p>
      )}
      <div
        className={cn("h-1.5 w-16 bg-accent mt-4 rounded-full", {
          "mx-auto": align === "center",
          "ml-auto": align === "right",
        })}
      />
    </div>
  );
}
