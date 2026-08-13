import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const headingFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description = "Create modular, customizable SVG avatars for your apps, profiles, and design systems.";

export const metadata: Metadata = {
  title: {
    default: "Flavitars — Modular Avatar Studio",
    template: "%s | Flavitars",
  },
  description,
  openGraph: {
    title: "Flavitars — Modular Avatar Studio",
    description,
    url: "https://flavitars.com",
    siteName: "Flavitars",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 400,
        height: 400,
        alt: "Flavitars Modular Avatar Studio",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Flavitars — Modular Avatar Studio",
    description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 400,
        height: 400,
        alt: "Flavitars Modular Avatar Studio",
      },
    ],
  },
  applicationName: "Flavitars",
  metadataBase: new URL("https://flavitars.com"),
  alternates: {
    canonical: "https://flavitars.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${headingFont.variable} ${monoFont.variable}`}
    >
      <body className="antialiased selection:bg-primary selection:text-white font-sans bg-background text-foreground h-dvh flex flex-col overflow-hidden relative">
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}

