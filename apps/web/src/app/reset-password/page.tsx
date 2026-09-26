"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type RecoveryStatus = "checking" | "ready" | "invalid" | "success";

export default function ResetPasswordPage() {

  const [status, setStatus] = useState<RecoveryStatus>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    // Supabase normally emits PASSWORD_RECOVERY when it
    // processes a valid recovery link.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === "PASSWORD_RECOVERY" && session) {
        setStatus("ready");
      }
    });

    // The client may have processed the URL before this
    // component subscribed to authentication events.
    // The recovery marker is only a UI hint; the actual
    // session is still required to update the password.
    async function checkRecoveryLink() {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));

      const hasRecoveryMarker = hash.get("type") === "recovery";

      const { data, error: sessionError } = await supabase.auth.getSession();

      if (!active) return;

      if (!sessionError && hasRecoveryMarker && data.session) {
        setStatus("ready");
        return;
      }

      // Do not overwrite a PASSWORD_RECOVERY event that
      // may arrive while the session is being checked.
      setStatus((current) => (current === "ready" ? current : "invalid"));
    }

    void checkRecoveryLink();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading || status !== "ready") return;

    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      // End the recovery session so the user can
      // explicitly sign in with the new password.
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      setStatus("success");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update your password.",
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

          <h1 className="mt-8 text-2xl font-semibold">Set a new password</h1>

          <p className="mt-2 text-sm text-zinc-400">
            Secure your Mosaic account.
          </p>
        </div>

        {status === "checking" && (
          <div
            role="status"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-sm text-zinc-400"
          >
            Verifying your recovery link...
          </div>
        )}

        {status === "invalid" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
            <p className="text-sm text-zinc-400">
              We could not verify your recovery link. Please request a new one.
            </p>

            <Link
              href="/forgot-password"
              className="mt-6 inline-block text-sm font-medium text-violet-400 hover:text-violet-300"
            >
              Request another link
            </Link>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
            <h2 className="text-xl font-semibold">Password updated</h2>

            <p className="mt-3 text-sm text-zinc-400">
              You can now sign in with your new password.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Go to login
            </Link>
          </div>
        )}

        {status === "ready" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8"
          >
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                New password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
              className="w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
