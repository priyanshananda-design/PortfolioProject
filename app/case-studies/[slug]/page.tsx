import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "../../../components/card";
import SectionHeading from "../../../components/section-heading";
import { site } from "../../../lib/site";

type CaseStudyPageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return site.caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps) {
  const study = site.caseStudies.find((item) => item.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — ${site.profile.name}`,
    description: study.summary
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = site.caseStudies.find((item) => item.slug === params.slug);
  if (!study) notFound();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-16 px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-sm text-muted hover:text-white">
          {site.ui.caseStudyLabels.back}
        </Link>
        <a href="/resume.pdf" className="text-sm text-muted hover:text-white">
          {site.ui.caseStudyLabels.resume}
        </a>
      </header>

      <section className="space-y-4">
        <SectionHeading
          eyebrow={site.ui.caseStudyLabels.caseStudyEyebrow}
          title={study.title}
          subtitle={study.summary}
        />
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {study.metrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-2xl font-semibold text-white">{metric.value}</p>
            <p className="text-sm text-muted">{metric.label}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-8">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {site.ui.caseStudyLabels.problem}
          </h3>
          <p className="text-sm text-muted">{study.problem}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {site.ui.caseStudyLabels.approach}
          </h3>
          <p className="text-sm text-muted">{study.approach}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {site.ui.caseStudyLabels.outcome}
          </h3>
          <p className="text-sm text-muted">{study.outcome}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {site.ui.caseStudyLabels.learned}
          </h3>
          <p className="text-sm text-muted">{study.learned}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {site.ui.caseStudyLabels.next}
          </h3>
          <p className="text-sm text-muted">{study.next}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-surface/70 p-6">
        <h3 className="text-base font-semibold text-white">
          {site.ui.caseStudyLabels.howIWork}
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {site.howIWork.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
