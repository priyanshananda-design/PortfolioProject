type MetricCardProps = {
  value: string;
  label: string;
  detail: string;
};

export default function MetricCard({ value, label, detail }: MetricCardProps) {
  return (
    <div className="reveal rounded-2xl border border-white/10 bg-elevated/70 p-5">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-sm text-white/80">{label}</p>
      <p className="text-xs text-muted">{detail}</p>
    </div>
  );
}
