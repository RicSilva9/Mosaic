"use client";

import { usePlatformAuth } from "@/components/auth/platform-auth-guard";
import { VideoCard } from "@/components/feed/video-card";
import { mockVideos } from "@/lib/mock-videos";

export default function HomePage() {
  const { identity, logout, loggingOut, logoutError } = usePlatformAuth();

  return (
    <main className="px-6 py-10">
      <section className="mb-12">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-medium text-violet-400">
              Welcome back, @{identity.profile.username}
            </p>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Discover
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
              Explore creative ideas, discover AI-generated videos and find
              inspiration for your next creation.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => void logout()}
              disabled={loggingOut}
              className="rounded-xl border border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 disabled:opacity-50"
            >
              {loggingOut ? "Signing out..." : "Sign out"}
            </button>

            {logoutError && (
              <p role="alert" className="mt-3 max-w-xs text-sm text-red-300">
                {logoutError}
              </p>
            )}
          </div>
        </div>
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
