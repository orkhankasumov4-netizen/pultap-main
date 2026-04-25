export const PageHeader = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
    <div className="absolute inset-0 bg-mesh opacity-60" />
    <div className="container relative py-16 md:py-20">
      {eyebrow && (
        <div className="inline-block mb-3 px-3 py-1 rounded-full glass-dark text-xs font-medium uppercase tracking-wider">
          {eyebrow}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">{title}</h1>
      {subtitle && <p className="mt-4 text-base md:text-lg text-secondary-foreground/75 max-w-2xl">{subtitle}</p>}
    </div>
  </section>
);
