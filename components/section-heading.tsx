type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-semibold font-display text-white">{title}</h2>
      {subtitle ? <p className="text-sm text-muted max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}
