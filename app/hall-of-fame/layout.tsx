import type { Metadata } from "next";

const description = "Our collection of legendary character presets ready to customize";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description,
  robots: {
    index: false,
    follow: false,
  },
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
}): React.JSX.Element {
  return <>{children}</>;
}

