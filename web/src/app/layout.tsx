import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings, getCategories, getIndustries } from "@/lib/api";
import { TSettings, TCategory, TIndustry } from "@/types";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cardbox.example.com";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    const companyName = config?.companyName || "CARDBOX";
    const tagline = config?.tagline || "Industrial Packaging";
    const title = `${companyName} | ${tagline}`;
    const description = config?.defaultSEO?.metaDesc || "Enterprise-grade manufacturing of heavy duty corrugated boxes.";

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title,
        description,
        url: siteUrl,
        siteName: companyName,
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      metadataBase: new URL(siteUrl),
      title: "CARDBOX | Heavy Duty Packaging",
      description: "Enterprise-grade manufacturing of heavy duty corrugated boxes.",
      alternates: {
        canonical: "/",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settingsData: TSettings | undefined = undefined;
  let categories: TCategory[] = [];
  let industries: TIndustry[] = [];

  try {
    const [settings, cats, inds] = await Promise.all([
      getSettings(),
      getCategories().catch(() => []),
      getIndustries().catch(() => []),
    ]);
    settingsData = (Array.isArray(settings) ? settings[0] : settings) || undefined;
    categories = cats;
    industries = inds;
  } catch {
    // Fallback handled by settingsData being undefined
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased min-h-screen flex flex-col font-sans relative`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <div className="grain-overlay" />
        <Navbar settings={settingsData} categories={categories} industries={industries} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer settings={settingsData} />
      </body>
    </html>
  );
}
