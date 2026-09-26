"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";

type PageStatus = "checking" | "ready" | "error";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<PageStatus>("checking");
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

        if (sessionError) throw sessionError;

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

        const identity = await response.json();

        if (signal.aborted) return;

        if (!identity?.id || !identity?.profile?.username) {
          throw new Error("Invalid profile response.");
        }

        setEmail(session.user.email ?? "");
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

    return () => {
      controller.abort();
    };
  }, [checkAccess, retryCount]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) throw logoutError;

      setEmail("");
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
      <main className="flex min-h-screen items-center justify-center">
        <p role="status" className="text-sm text-zinc-400">
          Checking your account...
        </p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
          <h1 className="text-xl font-semibold">Something went wrong</h1>

          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-6 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
        <h1 className="text-3xl font-black">
          mosaic<span className="text-violet-500">.</span>
        </h1>

        <p className="mt-6 text-xl font-semibold">Welcome to Mosaic!</p>

        <p className="mt-3 text-sm text-zinc-400">Signed in as</p>

        <p className="mt-1 break-all text-sm font-medium">{email}</p>

        {error && (
          <p role="alert" className="mt-5 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-8 w-full rounded-lg border border-zinc-700 px-4 py-3 text-sm font-semibold transition hover:bg-zinc-800 disabled:opacity-50"
        >
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </main>
  );
}
