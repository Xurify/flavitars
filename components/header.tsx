import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteIcon, PenToolIcon } from "lucide-react";
import { ProductionLink } from "@/components/ProductionLink";
import { Button } from "@/components/ui/button";

export function Header(): React.JSX.Element {
  return (
    <header className="border-b border-border/70 bg-white/85 backdrop-blur-md h-14 shrink-0 flex items-center justify-between px-4 lg:px-6 z-40 relative">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl ring-1 ring-border/80 bg-primary/10 flex items-center justify-center overflow-hidden relative shadow-xs group-hover:scale-105 transition-transform">
            <Image
              src="/images/icons/drew.png"
              alt="Flavitar Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Flavitars
            </span>
            <span className="hidden sm:inline-flex items-center rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground tracking-wide">
              Studio
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium text-foreground gap-1.5"
            >
              <PaletteIcon className="w-3.5 h-3.5 text-primary" />
              <span>Editor</span>
            </Button>
          </Link>
          <Link href="/path-editor">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium text-muted-foreground hover:text-foreground gap-1.5"
            >
              <PenToolIcon className="w-3.5 h-3.5 opacity-60" />
              <span>Path Editor</span>
            </Button>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {process.env.NODE_ENV === "development" && (
          <Suspense
            fallback={
              <Button variant="outline" size="sm" disabled>
                Production
              </Button>
            }
          >
            <ProductionLink />
          </Suspense>
        )}
      </div>
    </header>
  );
}


