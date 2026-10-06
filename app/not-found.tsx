import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { AvatarState, DEFAULT_AVATAR_STATE } from "@/lib/avatar/types";
import { AvatarSvg } from "@/components/avatar/AvatarSvg";
import { Button } from "@/components/ui/button";
import { AVATAR_PRESETS } from "@/lib/avatar/config/presets/presets";

export default function NotFound(): React.JSX.Element {
  const { name: _name, description: _description, ...prvy } = AVATAR_PRESETS.prvy;
  const avatarState = { ...DEFAULT_AVATAR_STATE, ...prvy, texture: "none" } as AvatarState;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground flex flex-col items-center justify-center px-6 py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30, 41, 59, 0.08) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative flex items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute select-none font-heading font-black tracking-tighter leading-none text-[11rem] sm:text-[16rem] text-foreground/[0.06]"
        >
          404
        </span>
        <AvatarSvg
          state={avatarState}
          className="relative w-56 h-56 sm:w-72 sm:h-72 text-foreground"
        />
      </div>

      <div className="relative mt-6 max-w-md text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Error 404</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
          This avatar wandered off
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Prvy is keeping watch
          while you head back.
        </p>
      </div>

      <Link href="/" className="relative mt-8">
        <Button variant="primary" size="default" className="gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Studio</span>
        </Button>
      </Link>
    </main>
  );
}
