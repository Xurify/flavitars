import { Metadata } from "next";
import AvatarEditor from "@/components/avatar/AvatarEditor";

export const metadata: Metadata = {
  title: "Flavitars Editor",
};

export default function Home() {
  return (
    <main className="h-full">
      <AvatarEditor />
    </main>
  );
}
