import { NextRequest, NextResponse } from "next/server";
import { renderAvatarSvg } from "@/lib/avatar/core/renderer";
import { loadAvatarState } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = loadAvatarState(searchParams);
  const state = resolveAvatarStateFromParams(params);
  const svgAsString = await renderAvatarSvg(state);

  return new NextResponse(svgAsString, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
