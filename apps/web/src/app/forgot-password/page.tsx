"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const { error: recoveryError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (recoveryError) throw recoveryError;

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not process your request. Please try again.",
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

          <h1 className="mt-8 text-2xl font-semibold">Reset your password</h1>

          <p className="mt-2 text-sm text-zinc-400">
            Enter your email to receive a recovery link.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
            <h2 className="text-xl font-semibold">Check your email</h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              If an account exists for this email, you will receive password
              recovery instructions.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block text-sm font-medium text-violet-400 hover:text-violet-300"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8"
          >
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
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
              {loading ? "Sending..." : "Send recovery link"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
