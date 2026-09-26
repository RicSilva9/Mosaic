import { notFound } from "next/navigation";

interface PublicProfile {
  username: string;
  displayName: string;
  bio: string | null;
  avatarKey: string | null;
}

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

async function getPublicProfile(
  username: string,
): Promise<PublicProfile | null> {
  const response = await fetch(
    `http://localhost:3001/profiles/${encodeURIComponent(username)}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Could not load profile (HTTP ${response.status}).`);
  }

  return response.json();
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await getPublicProfile(username);

  if (!profile) {
    notFound();
  }

  const initial =
    profile.displayName.trim().charAt(0).toUpperCase() ||
    profile.username.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-2xl font-black tracking-tight">
          mosaic<span className="text-violet-500">.</span>
        </a>

        <section className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/20 text-3xl font-bold text-violet-300">
              {initial}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{profile.displayName}</h1>

              <p className="mt-2 text-sm text-zinc-400">@{profile.username}</p>
            </div>
          </div>

          {profile.bio && (
            <p className="mt-8 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
              {profile.bio}
            </p>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold">Creations</h2>

          <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center">
            <p className="text-sm text-zinc-400">
              Published creations will appear here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
