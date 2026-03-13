"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const PRODUCTION_ORIGIN = "https://flavitars.com";

export function ProductionLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `${PRODUCTION_ORIGIN}${pathname}?${query}` : `${PRODUCTION_ORIGIN}${pathname}`;

  return (
    <Button variant="outline" size="sm" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        Open in production
      </a>
    </Button>
  );
}
