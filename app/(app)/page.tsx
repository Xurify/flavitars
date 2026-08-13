import { Metadata } from "next";
import AvatarEditor from "@/components/avatar/AvatarEditor";
import { loadAvatarState } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";
import type { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Avatar Studio",
};

interface PageProperties {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: PageProperties): Promise<React.JSX.Element> {
  const params = await loadAvatarState(searchParams);
  const initialState = resolveAvatarStateFromParams(params);

  return (
    <main className="h-full relative">
      <AvatarEditor initialState={initialState} />
    </main>
  );
}

