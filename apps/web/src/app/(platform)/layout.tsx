import type { ReactNode } from "react";

import { PlatformAuthGuard } from "@/components/auth/platform-auth-guard";
import { PlatformHeader } from "@/components/layout/platform-header";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <PlatformAuthGuard>
      <div className="min-h-screen bg-zinc-950 text-zinc-50">
        <PlatformHeader />

        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </PlatformAuthGuard>
  );
}
