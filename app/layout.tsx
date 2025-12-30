import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const description = "Extremely modular avatars to use across my projects";

export const metadata: Metadata = {
  title: "Flavitars",
  description,
  openGraph: {
    title: "Flavitars",
    description,
    url: "https://flavitars.com",
    siteName: "Flavitars",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1920,
        height: 913,
        alt: "Flavitars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavitars",
    description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1920,
        height: 913,
        alt: "Flavitars",
      },
    ],
  },
  applicationName: "Flavitars",
  metadataBase: new URL("https://flavitars.com"),
  alternates: {
    canonical: "https://flavitars.com/",
  },
  authors: [{ name: "Xurify" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="antialiased selection:bg-orange-500 selection:text-white font-retro bg-[#F5F0E6] text-foreground h-dvh flex flex-col overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <NuqsAdapter>{children}</NuqsAdapter>
        </div>
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
