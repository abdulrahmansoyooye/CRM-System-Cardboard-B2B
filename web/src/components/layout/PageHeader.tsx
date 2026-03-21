interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative w-full h-64 lg:h-80 bg-primary flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>
      <div className="relative z-10 max-w-3xl border-l-[6px] border-accent pl-6 text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground tracking-tight leading-none mb-4 uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-foreground/80 font-medium text-lg lg:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
