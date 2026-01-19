import { NextRequest, NextResponse } from "next/server";
import { getAvatarIdFromState } from "@/lib/avatar/engine/avatar-generator";
import { loadAvatarState } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const avatarParams = loadAvatarState(searchParams);
  const state = resolveAvatarStateFromParams(avatarParams);
  
  const packedId = getAvatarIdFromState(state);

  return NextResponse.json({ id: packedId });
}
