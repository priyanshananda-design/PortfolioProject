import Link from "next/link";
import Card from "./card";

type CaseStudyCardProps = {
  title: string;
  summary: string;
  tags: string[];
  href: string;
};

export default function CaseStudyCard({ title, summary, tags, href }: CaseStudyCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-muted">{summary}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={href} className="mt-auto text-sm text-accent hover:text-accent-strong">
        View case study →
      </Link>
    </Card>
  );
}
