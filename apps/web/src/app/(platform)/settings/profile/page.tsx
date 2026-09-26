"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { usePlatformAuth } from "@/components/auth/platform-auth-guard";
import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";

interface PublicProfile {
  username: string;
  displayName: string;
  bio: string | null;
  avatarKey: string | null;
}

type PageStatus = "loading" | "ready" | "error";

export default function EditProfilePage() {
  const { identity, updateIdentityProfile } = usePlatformAuth();

  const [status, setStatus] = useState<PageStatus>("loading");

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const [savedDisplayName, setSavedDisplayName] = useState("");
  const [savedBio, setSavedBio] = useState("");

  const [loadingError, setLoadingError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const username = identity.profile.username;

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      setStatus("loading");
      setLoadingError("");

      try {
        const response = await fetch(
          `${API_URL}/profiles/${encodeURIComponent(username)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Could not load profile (HTTP ${response.status}).`);
        }

        const profile: PublicProfile = await response.json();

        if (controller.signal.aborted) return;

        const currentName = profile.displayName;
        const currentBio = profile.bio ?? "";

        setDisplayName(currentName);
        setBio(currentBio);
        setSavedDisplayName(currentName);
        setSavedBio(currentBio);
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;

        setLoadingError(
          error instanceof Error
            ? error.message
            : "Could not load your profile.",
        );

        setStatus("error");
      }
    }

    void loadProfile();

    return () => controller.abort();
  }, [username, retryCount]);

  const trimmedName = displayName.trim();

  const isValid =
    trimmedName.length >= 2 && trimmedName.length <= 60 && bio.length <= 500;

  const hasChanges = displayName !== savedDisplayName || bio !== savedBio;

  function cancelChanges() {
    setDisplayName(savedDisplayName);
    setBio(savedBio);
    setSaveError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving || !isValid || !hasChanges) {
      return;
    }

    setSaving(true);
    setSaveError("");
    setSuccess("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!session) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const response = await fetch(`${API_URL}/profiles/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          displayName: trimmedName,
          bio: bio.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Could not save profile (HTTP ${response.status}).`);
      }

      const updated: PublicProfile = await response.json();

      setDisplayName(updated.displayName);
      setBio(updated.bio ?? "");
      setSavedDisplayName(updated.displayName);
      setSavedBio(updated.bio ?? "");

      updateIdentityProfile({
        displayName: updated.displayName,
      });

      setSuccess("Your profile has been updated successfully.");
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Could not save your changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10">
        <Link
          href={`/u/${encodeURIComponent(username)}`}
          className="text-sm text-zinc-400 transition hover:text-violet-300"
        >
          ← Back to profile
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
          Edit profile
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          Customize how other people see you on Mosaic.
        </p>
      </div>

      {status === "loading" && (
        <p role="status" className="text-sm text-zinc-400">
          Loading your profile...
        </p>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
          <p role="alert" className="text-sm text-red-300">
            {loadingError}
          </p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-4 rounded-xl bg-zinc-800 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            Try again
          </button>
        </div>
      )}

      {status === "ready" && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8"
        >
          <div className="flex items-center gap-4 border-b border-zinc-800 pb-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/20 text-2xl font-bold text-violet-300">
              {displayName.trim().charAt(0).toUpperCase() ||
                username.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-white">@{username}</p>

              <p className="mt-1 text-sm text-zinc-400">
                Profile photo editing is coming later.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="displayName"
              className="block text-sm font-semibold text-zinc-200"
            >
              Display name
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              minLength={2}
              maxLength={60}
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                setSuccess("");
              }}
              disabled={saving}
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Between 2 and 60 characters.
            </p>
          </div>

          <div className="mt-8">
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-zinc-200"
            >
              Biography
            </label>

            <textarea
              id="bio"
              name="bio"
              rows={5}
              maxLength={500}
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
                setSuccess("");
              }}
              disabled={saving}
              placeholder="Tell the community about yourself..."
              className="mt-3 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 disabled:opacity-60"
            />

            <p className="mt-2 text-right text-xs text-zinc-500">
              {bio.length}/500
            </p>
          </div>

          {saveError && (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300"
            >
              {saveError}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="mt-6 rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-sm text-green-300"
            >
              {success}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-zinc-800 pt-6">
            <button
              type="button"
              onClick={cancelChanges}
              disabled={saving || !hasChanges}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || !isValid || !hasChanges}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
