"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRODUCTION_ORIGIN = "https://flavitars.com";

export function ProductionLink(): React.JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `${PRODUCTION_ORIGIN}${pathname}?${query}` : `${PRODUCTION_ORIGIN}${pathname}`;

  return (
    <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span>Production</span>
        <ExternalLinkIcon className="w-3 h-3 opacity-60" />
      </a>
    </Button>
  );
}

