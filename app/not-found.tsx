import Link from "next/link";
import { PaletteIcon } from "lucide-react";
import { AvatarState } from "@/lib/avatar/types";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { Button } from "@/components/ui/button";
import { AVATAR_PRESETS } from "@/lib/avatar/config/presets/presets";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8 text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-border/80 rounded-3xl p-8 sm:p-10 shadow-lg shadow-black/5">
        <div className="mx-auto w-36 h-36 rounded-2xl bg-stone-50 border border-border/70 overflow-hidden flex items-center justify-center p-3 shadow-xs">
          <AvatarPreview
            state={AVATAR_PRESETS.prvy as AvatarState}
            size="preview"
            showBackground={false}
            centered={true}
            className="w-full h-full"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            404 Error
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Avatar Not Found
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Looks like this avatar wandered off! The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link href="/">
            <Button variant="primary" size="default" className="gap-2">
              <PaletteIcon className="w-4 h-4" />
              <span>Back to Studio</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

