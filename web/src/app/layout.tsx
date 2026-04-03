import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { getSettings } from "@/lib/api";
import { TSettings } from "@/types";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    const config = Array.isArray(settings) ? settings[0] : settings;
    
    return {
      title: config?.companyName ? `${config.companyName} | ${config.tagline || 'Industrial Packaging'}` : "CARDBOX | Heavy Duty Packaging",
      description: config?.defaultSEO?.metaDesc || "Enterprise-grade manufacturing of heavy duty corrugated boxes.",
    };
  } catch {
    return {
      title: "CARDBOX | Heavy Duty Packaging",
      description: "Enterprise-grade manufacturing of heavy duty corrugated boxes.",
    };
  }
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settingsData: TSettings | undefined = undefined;
  try {
    const settings = await getSettings();
    settingsData = (Array.isArray(settings) ? settings[0] : settings) || undefined;
  } catch {
    // Fallback handled by settingsData being undefined
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased min-h-screen flex flex-col font-sans relative`}
      >
        <div className="grain-overlay" />
        <TopBar settings={settingsData} />
        <Navbar settings={settingsData} />
        <main className="flex-1">{children}</main>
        <Footer settings={settingsData} />
      </body>
    </html>
  );
}
