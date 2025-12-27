import { NextRequest, NextResponse } from "next/server";
import { renderAvatarSvg } from "@/lib/avatar/core/renderer";
import { loadAvatarState } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id.length > 128) {
    return new NextResponse("ID too long (max 128 characters)", { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;

  const combinedParams = new URLSearchParams(searchParams);
  combinedParams.set("id", id);

  const avatarParams = loadAvatarState(combinedParams);
  const state = resolveAvatarStateFromParams(avatarParams);
  const svgAsString = await renderAvatarSvg(state);

  return new NextResponse(svgAsString, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
