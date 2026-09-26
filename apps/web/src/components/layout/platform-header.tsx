"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { usePlatformAuth } from "@/components/auth/platform-auth-guard";

export function PlatformHeader() {
  const { identity, logout, loggingOut, logoutError } = usePlatformAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial =
    identity.profile.displayName.trim().charAt(0).toUpperCase() ||
    identity.profile.username.charAt(0).toUpperCase();

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">
        <Link href="/" className="shrink-0 text-2xl font-black tracking-tight">
          mosaic<span className="text-violet-500">.</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          <Link
            href="/"
            aria-current="page"
            className="text-sm font-semibold text-white"
          >
            Discover
          </Link>

          <span className="cursor-not-allowed text-sm text-zinc-500">
            Following
          </span>

          <span className="cursor-not-allowed text-sm text-zinc-500">
            Saved
          </span>
        </nav>

        <div className="ml-auto hidden max-w-sm flex-1 lg:block">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-500">
            Search prompts and creators...
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <span className="hidden cursor-not-allowed rounded-xl bg-violet-600/40 px-5 py-3 text-sm font-semibold text-violet-200 sm:inline-block">
            Create
          </span>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={menuOpen}
              aria-controls="account-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/20 text-sm font-bold text-violet-300 transition hover:bg-violet-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              {initial}
            </button>

            {menuOpen && (
              <div
                id="account-menu"
                className="absolute right-0 top-14 w-64 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl"
              >
                <div className="border-b border-zinc-800 px-3 py-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {identity.profile.displayName}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-400">
                    @{identity.profile.username}
                  </p>
                </div>

                <div className="py-2">
                  <span className="block cursor-not-allowed rounded-lg px-3 py-3 text-sm text-zinc-500">
                    My profile · Coming soon
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-2">
                  <button
                    type="button"
                    onClick={() => void logout()}
                    disabled={loggingOut}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {loggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>

                {logoutError && (
                  <p role="alert" className="px-3 pb-2 text-xs text-red-300">
                    {logoutError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
