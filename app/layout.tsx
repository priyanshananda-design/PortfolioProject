import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import SignalBackground from "../components/signal-background";
import { site } from "../lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${site.profile.name} — ${site.profile.role}`,
  description: site.profile.summary,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: `${site.profile.name} — AI/Data Product Manager`,
    description: site.profile.summary,
    type: "website",
    url: "https://example.com"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="relative overflow-x-hidden">
        <SignalBackground />
        <div className="grid-overlay pointer-events-none fixed inset-0 -z-20" aria-hidden="true" />
        <div className="signal-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
