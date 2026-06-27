import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "AI Bestie Studio™", template: "%s | AI Bestie Studio™" },
  description: "The Complete AI Creator Operating System™. Build luxury AI characters, craft cinematic prompts, and launch viral content campaigns.",
  keywords: ["AI creator", "AI influencer", "prompt builder", "character builder", "AI content", "digital creator"],
  authors: [{ name: "AI Bestie Club™" }],
  openGraph: { title: "AI Bestie Studio™", description: "The Complete AI Creator Operating System™", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#090611", width: "device-width", initialScale: 1, maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-text-primary antialiased`} suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
