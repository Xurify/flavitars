import { Header } from "@/components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {children}
      </div>
    </>
  );
}
