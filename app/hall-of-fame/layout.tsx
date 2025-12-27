import type { Metadata } from "next";

const description = "Our collection of legendary characters";

export const metadata: Metadata = {
  title: "Hall of Fame | Flavitars",
  description,
  openGraph: {
    title: "Hall of Fame | Flavitars",
    description,
    url: "https://flavitars.com/hall-of-fame",
    siteName: "Flavitars",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hall of Fame | Flavitars",
    description,
  },
};

export default function HallOfFameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
