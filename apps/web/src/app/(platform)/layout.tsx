import type { ReactNode } from "react";
import { PlatformHeader } from "@/components/layout/platform-header";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <PlatformHeader />

      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
