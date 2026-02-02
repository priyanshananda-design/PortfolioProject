import Link from "next/link";

type CTAButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
};

export default function CTAButton({
  href,
  variant = "primary",
  children,
  className = ""
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-ring";
  const styles =
    variant === "primary"
      ? "bg-accent text-[#04070f] hover:bg-accent-strong shadow-glow"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
