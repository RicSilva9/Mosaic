"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { VideoCard } from "@/components/feed/video-card";
import { mockVideos } from "@/lib/mock-videos";
import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";

type PageStatus = "checking" | "ready" | "error";

interface Identity {
  id: string;
  profile: {
    username: string;
    displayName: string;
  };
}

export default function HomePage() {
  const router = useRouter();

  const [status, setStatus] = useState<PageStatus>("checking");
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const checkAccess = useCallback(
    async (signal: AbortSignal) => {
      setStatus("checking");
      setError("");

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (signal.aborted) return;

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          router.replace("/login");
          return;
        }

        const response = await fetch(`${API_URL}/identity/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          cache: "no-store",
          signal,
        });

        if (signal.aborted) return;

        if (response.status === 404) {
          router.replace("/complete-profile");
          return;
        }

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Could not verify your profile (HTTP ${response.status}).`,
          );
        }

        const data: Identity = await response.json();

        if (signal.aborted) return;

        if (!data?.id || !data?.profile?.username) {
          throw new Error("Invalid profile response.");
        }

        setIdentity(data);
        setStatus("ready");
      } catch (err) {
        if (signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Could not verify your account.",
        );

        setStatus("error");
      }
    },
    [router],
  );

  useEffect(() => {
    const controller = new AbortController();

    void checkAccess(controller.signal);

    return () => controller.abort();
  }, [checkAccess, retryCount]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        throw logoutError;
      }

      setIdentity(null);
      setStatus("checking");

      router.replace("/login");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not sign out. Please try again.",
      );

      setLoggingOut(false);
    }
  }

  if (status === "checking") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <p className="text-sm text-zinc-400">Checking your account...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
          <h1 className="text-xl font-bold">Something went wrong</h1>

          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10">
      <section className="mb-12">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-medium text-violet-400">
              Welcome back, @{identity?.profile.username}
            </p>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Discover
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
              Explore creative ideas, discover AI-generated videos and find
              inspiration for your next creation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-xl border border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 disabled:opacity-50"
          >
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-5 text-sm text-red-300">
            {error}
          </p>
        )}
      </section>

      <section aria-labelledby="feed-heading">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 id="feed-heading" className="text-xl font-bold tracking-tight">
              Explore creations
            </h2>

            <p className="mt-1 text-xs text-zinc-500">Preview content</p>
          </div>

          <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs text-zinc-400">
            All categories
          </span>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </main>
  );
}
