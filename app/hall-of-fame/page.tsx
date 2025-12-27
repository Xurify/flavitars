import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AVATAR_PRESETS } from "@/lib/avatar/config/presets/presets";
import { DEFAULT_AVATAR_STATE, AvatarState } from "@/lib/avatar/types";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { Button } from "@/components/ui/button";

export default function PresetsPage() {
  return (
    <div className="min-h-full bg-[#F5F0E6] p-4 lg:p-8 font-retro text-[#2C2420]">
      <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl lg:text-4xl font-pixel uppercase">Hall of Fame</h1>
            <p className="text-base lg:text-lg opacity-80">Our collection of legendary characters</p>
          </div>
          <Link href="/" className="self-start sm:self-auto">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {Object.entries(AVATAR_PRESETS).map(([key, preset]) => {
            const avatarState = { ...DEFAULT_AVATAR_STATE, ...preset } as AvatarState;

            return (
              <Link
                key={key}
                href={`/?preset=${key}`}
                className="group relative block bg-white border-4 border-[#2C2420] p-5 shadow-[6px_6px_0px_0px_#2C2420] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#2C2420] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_#2C2420]"
              >
                <div className="aspect-square mb-3 border-2 border-[#2C2420] overflow-hidden flex items-center justify-center bg-gray-50">
                  <AvatarPreview
                    state={avatarState}
                    size="preview"
                    showBackground={false}
                    centered={true}
                    className="w-full h-full"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-pixel capitalize truncate">{preset.name}</h3>
                  <p className="text-sm opacity-80 font-sans line-clamp-2">{preset.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
