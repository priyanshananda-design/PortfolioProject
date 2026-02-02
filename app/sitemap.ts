import { site } from "../lib/site";

export default function sitemap() {
  const base = "https://example.com";
  const caseStudies = site.caseStudies.map((study) => ({
    url: `${base}/case-studies/${study.slug}`,
    lastModified: new Date()
  }));

  return [
    {
      url: base,
      lastModified: new Date()
    },
    ...caseStudies
  ];
}
