import Link from "next/link";

export function PlatformHeader() {
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
          <span className="text-sm font-semibold text-white">Discover</span>

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

          <div
            aria-label="Profile features coming soon"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/20 text-sm font-bold text-violet-300"
          >
            M
          </div>
        </div>
      </div>
    </header>
  );
}
