import { Metadata } from "next";
import { SvgAvatarEditor } from "@/components/svg-editor/SvgAvatarEditor";

export const metadata: Metadata = {
  title: "SVG Editor | Flavitars",
  description: "Edit avatar hairstyles and visualize hat interactions",
};

export default function EditsPage() {
  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <SvgAvatarEditor />
    </main>
  );
}
