"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { usePlatformAuth } from "@/components/auth/platform-auth-guard";
import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface PublicProfile {
  username: string;
  displayName: string;
  bio: string | null;
  avatarKey: string | null;
  avatarUrl: string | null;
}

type PageStatus = "loading" | "ready" | "error";

async function getAccessToken(): Promise<string> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  return session.access_token;
}

export default function EditProfilePage() {
  const { identity, updateIdentityProfile } = usePlatformAuth();

  const username = identity.profile.username;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<PageStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const [savedDisplayName, setSavedDisplayName] = useState("");
  const [savedBio, setSavedBio] = useState("");

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loadingError, setLoadingError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [success, setSuccess] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const avatarBusy = uploading || removing;

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

        setDisplayName(profile.displayName);
        setBio(profile.bio ?? "");
        setSavedDisplayName(profile.displayName);
        setSavedBio(profile.bio ?? "");
        setAvatarUrl(profile.avatarUrl ?? null);
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

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const trimmedName = displayName.trim();

  const isValid =
    trimmedName.length >= 2 && trimmedName.length <= 60 && bio.length <= 500;

  const hasChanges = displayName !== savedDisplayName || bio !== savedBio;

  const displayedAvatar = previewUrl ?? avatarUrl;

  function cancelChanges() {
    setDisplayName(savedDisplayName);
    setBio(savedBio);
    setSaveError("");
    setSuccess("");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setAvatarError("");
    setSuccess("");

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setSelectedFile(null);
      setAvatarError("Please select a JPEG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setSelectedFile(null);
      setAvatarError("Your profile photo must not exceed 2 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    event.target.value = "";
  }

  function cancelAvatarSelection() {
    setSelectedFile(null);
    setAvatarError("");
  }

  async function handleAvatarUpload() {
    if (!selectedFile || avatarBusy || saving) return;

    setUploading(true);
    setAvatarError("");
    setSuccess("");

    try {
      const accessToken = await getAccessToken();

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await fetch(`${API_URL}/profiles/me/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Could not upload profile photo (HTTP ${response.status}).`,
        );
      }

      const updated: PublicProfile = await response.json();

      setAvatarUrl(updated.avatarUrl ?? null);
      updateIdentityProfile({
        avatarUrl: updated.avatarUrl ?? null,
      });
      setSelectedFile(null);
      setSuccess("Your profile photo has been updated successfully.");
    } catch (error) {
      setAvatarError(
        error instanceof Error
          ? error.message
          : "Could not upload your profile photo.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleAvatarRemoval() {
    if (!avatarUrl || avatarBusy || saving) return;

    setRemoving(true);
    setAvatarError("");
    setSuccess("");

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/profiles/me/avatar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Could not remove profile photo (HTTP ${response.status}).`,
        );
      }

      const updated: PublicProfile = await response.json();

      setAvatarUrl(updated.avatarUrl ?? null);
      setSelectedFile(null);
      setSuccess("Your profile photo has been removed.");
    } catch (error) {
      setAvatarError(
        error instanceof Error
          ? error.message
          : "Could not remove your profile photo.",
      );
    } finally {
      setRemoving(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving || avatarBusy || !isValid || !hasChanges) {
      return;
    }

    setSaving(true);
    setSaveError("");
    setSuccess("");

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/profiles/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
      setAvatarUrl(updated.avatarUrl ?? null);

      updateIdentityProfile({
        displayName: updated.displayName,
        avatarUrl: updated.avatarUrl ?? null,
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
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <section className="border-b border-zinc-800 pb-8">
            <h2 className="text-lg font-semibold text-white">Profile photo</h2>

            <div className="mt-5 flex flex-wrap items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-500/40 bg-violet-500/20 text-3xl font-bold text-violet-300">
                {displayedAvatar ? (
                  // The URL is returned by our API and
                  // points to the configured storage bucket.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={displayedAvatar}
                    alt="Profile photo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  displayName.trim().charAt(0).toUpperCase() ||
                  username.charAt(0).toUpperCase()
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">@{username}</p>

                <p className="mt-1 text-sm text-zinc-400">
                  JPEG, PNG or WebP. Maximum 2 MB.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  disabled={avatarBusy || saving}
                  className="hidden"
                  aria-label="Choose profile photo"
                />

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={avatarBusy || saving}
                    className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {avatarUrl ? "Change photo" : "Choose photo"}
                  </button>

                  {avatarUrl && !selectedFile && (
                    <button
                      type="button"
                      onClick={() => void handleAvatarRemoval()}
                      disabled={avatarBusy || saving}
                      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-red-500/50 hover:text-red-300 disabled:opacity-40"
                    >
                      {removing ? "Removing..." : "Remove photo"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
                <p className="break-all text-sm text-zinc-200">
                  Selected: {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  The preview is not saved yet.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void handleAvatarUpload()}
                    disabled={avatarBusy || saving}
                    className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-40"
                  >
                    {uploading ? "Uploading..." : "Upload photo"}
                  </button>

                  <button
                    type="button"
                    onClick={cancelAvatarSelection}
                    disabled={avatarBusy}
                    className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {avatarError && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300"
              >
                {avatarError}
              </p>
            )}
          </section>

          <form onSubmit={handleSubmit}>
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
                disabled={saving || avatarBusy}
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
                disabled={saving || avatarBusy}
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
                disabled={saving || avatarBusy || !hasChanges}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || avatarBusy || !isValid || !hasChanges}
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
