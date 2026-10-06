import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from "lucide-react";
import { AVATAR_PRESETS } from "@/lib/avatar/config/presets/presets";
import { DEFAULT_AVATAR_STATE, AvatarState } from "@/lib/avatar/types";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { Button } from "@/components/ui/button";

export default function PresetsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold mb-1">
              <SparklesIcon className="w-3 h-3" />
              <span>Curated Presets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Hall of Fame
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore legendary character combinations ready to use or remix in the studio.
            </p>
          </div>
          <Link href="/" className="self-start sm:self-auto">
            <Button variant="outline" size="default" className="gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Editor</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {Object.entries(AVATAR_PRESETS).map(([presetKey, preset]) => {
            const avatarState = {
              ...DEFAULT_AVATAR_STATE,
              ...preset,
            } as AvatarState;

            return (
              <Link
                key={presetKey}
                href={`/?preset=${presetKey}`}
                className="group relative flex flex-col justify-between rounded-xl bg-white border border-border/80 p-3 sm:p-3.5 shadow-xs hover:border-primary/50 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <div className="aspect-square mb-3 rounded-lg border border-border/60 overflow-hidden flex items-center justify-center bg-stone-50/70 p-2 group-hover:bg-primary/5 transition-colors">
                    <AvatarPreview
                      state={avatarState}
                      size="fill"
                      showBackground={false}
                      className="drop-shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {preset.name}
                    </h2>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] font-semibold text-primary">
                  <span>Open in Studio</span>
                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

