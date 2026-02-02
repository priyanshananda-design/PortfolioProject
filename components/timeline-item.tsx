type TimelineItemProps = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export default function TimelineItem({ company, role, period, highlights }: TimelineItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{company}</h3>
          <p className="text-sm text-muted">{role}</p>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">{period}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        {highlights.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
