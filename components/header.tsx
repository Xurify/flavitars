import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b-2 border-border bg-card h-14 shrink-0 flex items-center justify-between px-4 z-50 relative">
      <Link href="/">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary border-2 border-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
            <Image src="/images/icons/drew.png" alt="Flavitar Logo" fill className="object-cover" />
          </div>
          <h1 className="text-lg font-black tracking-tight text-foreground uppercase">Flavitars</h1>
        </div>
      </Link>
    </header>
  );
}
