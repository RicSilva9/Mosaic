"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";

type PageStatus = "checking" | "ready" | "login" | "error";

type MosaicProfile = {
  id: string;
  profile: {
    username: string;
    displayName: string;
  };
};

export default function CompleteProfilePage() {
  const router = useRouter();

  const [status, setStatus] = useState<PageStatus>("checking");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkProfile = useCallback(
    async (accessToken: string) => {
      setStatus("checking");
      setError("");

      try {
        const response = await fetch(`${API_URL}/identity/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

        if (response.ok) {
          const profile: MosaicProfile = await response.json();

          if (profile.id) {
            router.replace("/");
            return;
          }

          throw new Error("Invalid profile response.");
        }

        if (response.status === 404) {
          setStatus("ready");
          return;
        }

        if (response.status === 401) {
          setStatus("login");
          return;
        }

        throw new Error(
          `Could not check your profile (HTTP ${response.status}).`,
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not check your profile.",
        );
        setStatus("error");
      }
    },
    [router],
  );

  useEffect(() => {
    let active = true;

    async function initialize() {
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (!active) return;

      if (sessionError) {
        setError(sessionError.message);
        setStatus("error");
        return;
      }

      if (data.session) {
        await checkProfile(data.session.access_token);
        return;
      }

      // The confirmation link may still be processing.
      // Give Supabase a chance to establish the session.
      const { data: refreshed } = await supabase.auth.refreshSession();

      if (!active) return;

      if (refreshed.session) {
        await checkProfile(refreshed.session.access_token);
      } else {
        setStatus("login");
      }
    }

    void initialize();

    return () => {
      active = false;
    };
  }, [checkProfile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const cleanUsername = username.trim();
    const cleanDisplayName = displayName.trim();

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanUsername)) {
      setError("Username must contain 3–30 letters, numbers or underscores.");
      return;
    }

    if (cleanDisplayName.length < 2 || cleanDisplayName.length > 60) {
      setError("Display name must contain 2–60 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!data.session) {
        setStatus("login");
        return;
      }

      const response = await fetch(`${API_URL}/identity/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({
          username: cleanUsername,
          displayName: cleanDisplayName,
        }),
      });

      if (response.ok) {
        router.replace("/");
        return;
      }

      if (response.status === 401) {
        setStatus("login");
        return;
      }

      if (response.status === 409) {
        // A previous attempt may already have created the profile.
        const existing = await fetch(`${API_URL}/identity/me`, {
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
          },
          cache: "no-store",
        });

        if (existing.ok) {
          router.replace("/");
          return;
        }

        setError(
          "This username or account is already in use. " +
            "Try a different username.",
        );
        return;
      }

      const body = await response.json().catch(() => null);

      if (response.status === 400) {
        setError(
          Array.isArray(body?.message)
            ? body.message.join(" ")
            : (body?.message ?? "Please check your information."),
        );
        return;
      }

      throw new Error(
        `Could not create your profile (HTTP ${response.status}).`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create your profile.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block text-4xl font-black tracking-tight"
          >
            mosaic<span className="text-violet-500">.</span>
          </Link>

          <h1 className="mt-8 text-2xl font-semibold">Complete your profile</h1>

          <p className="mt-2 text-sm text-zinc-400">
            One last step before joining the community.
          </p>
        </div>

        {status === "checking" && (
          <div
            role="status"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-sm text-zinc-400"
          >
            Checking your account...
          </div>
        )}

        {status === "login" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
            <p className="mb-6 text-sm text-zinc-400">
              Please confirm your email and sign in before completing your
              profile.
            </p>

            <Link
              href="/login"
              className="inline-block rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Go to login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
            <p role="alert" className="mb-5 text-sm text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Try again
            </button>
          </div>
        )}

        {status === "ready" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8"
          >
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                minLength={3}
                maxLength={30}
                pattern="[a-zA-Z0-9_]+"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="your_username"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
              />

              <p className="mt-2 text-xs text-zinc-500">
                3–30 characters. Letters, numbers and underscores.
              </p>
            </div>

            <div>
              <label
                htmlFor="displayName"
                className="mb-2 block text-sm font-medium"
              >
                Display name
              </label>

              <input
                id="displayName"
                type="text"
                required
                minLength={2}
                maxLength={60}
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-900 bg-red-950/50 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating profile..." : "Complete registration"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
