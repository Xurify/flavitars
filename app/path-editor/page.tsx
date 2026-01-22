import { Suspense } from "react";
import { Metadata } from "next";
import { SvgPathEditor } from "@/components/svg-editor/SvgPathEditor";

export const metadata: Metadata = {
  title: "SVG Editor | Flavitars",
  description: "Edit avatar hairstyles and visualize hat interactions",
};

function EditorLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse" />
        <span className="text-zinc-500 text-sm">Loading Editor...</span>
      </div>
    </div>
  );
}

export default function EditsPage() {
  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Suspense fallback={<EditorLoading />}>
        <SvgPathEditor />
      </Suspense>
    </main>
  );
}
