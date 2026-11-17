import type { Metadata } from "next";
import {
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { FileTreeSidebar } from "@/components/navigation/FileTreeSidebar";
import { MobileFileTreeNav } from "@/components/navigation/MobileFileTreeNav";
import { getProfile, getProjects } from "@/lib/portfolio-repository";
import { getSiteConfig } from "@/lib/site";

import "./globals.css";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1536,
          height: 1024,
          alt: "Abstract AI system architecture",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);

  return (
    <html
      className={cn(
        instrumentSerif.variable,
        interTight.variable,
        jetbrainsMono.variable,
      )}
      lang="en"
    >
      <body>
        <a
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-xl bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)] transition focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <FileTreeSidebar profile={profile} projects={projects} />
        <MobileFileTreeNav profile={profile} projects={projects} />
        <div className="min-h-screen lg:pl-[22rem]">
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
