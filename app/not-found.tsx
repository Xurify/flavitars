import Link from "next/link";
import { Home } from "lucide-react";
import { AvatarState } from "@/lib/avatar/types";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { Button } from "@/components/ui/button";
import { AVATAR_PRESETS } from "@/lib/avatar/config/presets/presets";

export default function NotFound() {
  return (
    <div className="min-h-full bg-[#F5F0E6] flex items-center justify-center p-4 lg:p-8 font-retro text-foreground">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="relative">
          <h1 className="text-[8rem] sm:text-[12rem] font-pixel leading-none select-none [text-shadow:4px_4px_0px_#d64a2f,8px_8px_0px_#2C2420]">
            404
          </h1>
        </div>

        <div className="mx-auto w-40 h-40 bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_#2C2420] overflow-hidden">
          <AvatarPreview
            state={AVATAR_PRESETS.prvy as AvatarState}
            size="preview"
            showBackground={false}
            centered={true}
            className="w-full h-full"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-pixel uppercase">Page Not Found</h2>
          <p className="text-lg opacity-80 max-w-md mx-auto">
            Looks like this avatar wandered off! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto text-lg px-6 py-3 h-auto">
              <Home className="w-5 h-5 mr-2" />
              Back to Editor
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <div className="h-2 bg-foreground w-full max-w-xs mx-auto" />
          <div className="h-2 bg-primary w-full max-w-[200px] mx-auto mt-1" />
          <div className="h-2 bg-foreground w-full max-w-[120px] mx-auto mt-1" />
        </div>
      </div>
    </div>
  );
}
