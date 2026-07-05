import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Looksmaxxing AI — Free AI Facial Analysis & Aesthetic Consultant",
  description:
    "Free AI looksmaxxing tool. Upload a photo for a personalised facial harmony analysis, skincare routine, and grooming plan powered by AI.",
  openGraph: {
    title: "Looksmaxxing AI — Free AI Facial Analysis & Aesthetic Consultant",
    description:
      "Free AI looksmaxxing tool. Upload a photo for a personalised facial harmony analysis, skincare routine, and grooming plan powered by AI.",
    siteName: "Looksmaxxing AI",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Looksmaxxing AI" }],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
