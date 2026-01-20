import { Metadata } from "next";
import Link from "next/link";
import AvatarEditor from "@/components/avatar/AvatarEditor";
import { loadAvatarState } from "@/lib/avatar/config/params";
import { resolveAvatarStateFromParams } from "@/lib/utils/avatar-resolver";
import type { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Flavitars Editor",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await loadAvatarState(searchParams);
  const initialState = resolveAvatarStateFromParams(params);

  return (
    <main className="h-full relative">
      <div className="absolute top-4 right-4 z-10">
        <Link 
          href="/path-editor" 
          className="px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono rounded-lg border border-zinc-700/50 backdrop-blur-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-3 h-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Path Editor
        </Link>
      </div>
      <AvatarEditor initialState={initialState} />
    </main>
  );
}
