import Image from "next/image";
import Link from "next/link";
import Badge from "../components/badge";
import Card from "../components/card";
import CaseStudyCard from "../components/case-study-card";
import CommandPalette from "../components/command-palette";
import ContactPanel from "../components/contact-panel";
import CTAButton from "../components/cta-button";
import MetricCard from "../components/metric-card";
import Reveal from "../components/reveal";
import SectionHeading from "../components/section-heading";
import Terminal from "../components/terminal";
import TimelineItem from "../components/timeline-item";
import { site } from "../lib/site";

export default function HomePage() {
  const featured = site.caseStudies.slice(0, 3);

  return (
    <div className="relative">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold text-white">
            {site.profile.name}
          </Link>
          <div className="hidden items-center gap-6 text-xs text-muted md:flex">
            {site.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="hover:text-white focus-ring"
              >
                {section.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 md:inline-flex focus-ring"
            >
              Resume
            </a>
            <CommandPalette sections={site.sections} caseStudies={site.caseStudies} />
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-12">
        <section id="hero" className="scroll-mt-24 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {site.hero.eyebrow}
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-muted">
                {site.profile.location}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl font-display">
                {site.profile.name}
              </h1>
              <p className="text-sm text-white/80">{site.profile.role}</p>
              <p className="text-base text-muted md:text-lg max-w-2xl">
                {site.hero.tagline}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {site.metrics.slice(0, 4).map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-surface/70 p-4"
                >
                  <p className="text-xl font-semibold text-white">{metric.value}</p>
                  <p className="text-xs text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <CTAButton href="#case-studies">{site.hero.ctaPrimary}</CTAButton>
              <CTAButton href="/resume.pdf" variant="secondary">
                {site.hero.ctaSecondary}
              </CTAButton>
            </div>
            <div className="flex flex-wrap gap-2">
              {site.badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative rounded-3xl border border-white/10 bg-elevated/70 p-5">
              <Image
                src="/images/priyansha.png"
                alt="Portrait of Priyansha Nanda"
                width={520}
                height={640}
                className="rounded-2xl object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
            </div>
            <Card className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Executive Snapshot
              </p>
              <p className="text-sm text-white">
                AI product leader delivering measurable outcomes in market surveillance,
                GenAI assistants, and FinOps efficiency.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Responsible AI
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Cross-functional leadership
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Scaled orgs
                </span>
              </div>
            </Card>
          </div>
        </section>

        <section id="impact" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.impact.eyebrow}
            title={site.sectionsContent.impact.title}
            subtitle={site.sectionsContent.impact.subtitle}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {site.metrics.map((metric) => (
              <Reveal key={metric.label}>
                <MetricCard {...metric} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="achievements" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.achievements.eyebrow}
            title={site.sectionsContent.achievements.title}
            subtitle={site.sectionsContent.achievements.subtitle}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {site.achievements.map((achievement) => (
              <Card key={achievement.title} className="flex h-full flex-col gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
                  <p className="text-sm text-muted">{achievement.description}</p>
                </div>
                <CTAButton href={achievement.cta.href} variant="secondary" className="mt-auto">
                  {achievement.cta.label}
                </CTAButton>
              </Card>
            ))}
          </div>
        </section>

        <section id="case-studies" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.caseStudies.eyebrow}
            title={site.sectionsContent.caseStudies.title}
            subtitle={site.sectionsContent.caseStudies.subtitle}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((study) => (
              <CaseStudyCard
                key={study.slug}
                title={study.title}
                summary={study.summary}
                tags={study.tags}
                href={`/case-studies/${study.slug}`}
              />
            ))}
          </div>
        </section>

        <section id="operating-model" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.operatingModel.eyebrow}
            title={site.sectionsContent.operatingModel.title}
            subtitle={site.operatingModel.subtitle}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {site.operatingModel.systems.map((system) => (
              <Card key={system.title} className="space-y-3">
                <h3 className="text-base font-semibold text-white">{system.title}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  {system.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.experience.eyebrow}
            title={site.sectionsContent.experience.title}
          />
          <div className="grid gap-6">
            {site.timeline.map((entry) => (
              <TimelineItem key={entry.company} {...entry} />
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.skills.eyebrow}
            title={site.sectionsContent.skills.title}
            subtitle={site.sectionsContent.skills.subtitle}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {site.skills.map((group) => (
              <Card key={group.group} className="space-y-4">
                <h3 className="text-base font-semibold text-white">{group.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow={site.sectionsContent.contact.eyebrow}
            title={site.sectionsContent.contact.title}
            subtitle={site.sectionsContent.contact.subtitle}
          />
          <ContactPanel
            email={site.profile.email}
            linkedin={site.profile.linkedin}
            phone={site.profile.phone}
            helper={site.sectionsContent.contact.helper}
          />
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.profile.name}. {site.ui.footer}
      </footer>
    </div>
  );
}
