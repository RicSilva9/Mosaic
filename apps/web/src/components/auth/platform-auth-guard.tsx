"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";

interface Identity {
  id: string;
  profile: {
    username: string;
    displayName: string;
  };
}

interface PlatformAuthContextValue {
  identity: Identity;
  logout: () => Promise<void>;
  loggingOut: boolean;
  logoutError: string;
}

const PlatformAuthContext = createContext<PlatformAuthContextValue | null>(
  null,
);

export function usePlatformAuth() {
  const context = useContext(PlatformAuthContext);

  if (!context) {
    throw new Error("usePlatformAuth must be used inside PlatformAuthGuard");
  }

  return context;
}

type AuthStatus = "checking" | "ready" | "error";

export function PlatformAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [status, setStatus] = useState<AuthStatus>("checking");
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const checkAccess = useCallback(
    async (signal: AbortSignal) => {
      setStatus("checking");
      setIdentity(null);
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

  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setIdentity(null);
      setStatus("checking");

      router.replace("/login");
      router.refresh();
    } catch (err) {
      setLogoutError(
        err instanceof Error
          ? err.message
          : "Could not sign out. Please try again.",
      );

      setLoggingOut(false);
    }
  }

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="text-sm text-zinc-400">Checking your account...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h1 className="text-xl font-bold">Something went wrong</h1>

          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!identity) {
    return null;
  }

  return (
    <PlatformAuthContext.Provider
      value={{
        identity,
        logout,
        loggingOut,
        logoutError,
      }}
    >
      {children}
    </PlatformAuthContext.Provider>
  );
}
