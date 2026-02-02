type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`card-hover rounded-2xl border border-white/10 bg-surface/80 p-6 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}
