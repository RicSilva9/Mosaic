import type { MockVideo } from "@/lib/mock-videos";

interface VideoCardProps {
  video: MockVideo;
}

const aspectRatioClasses = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="group mb-6 break-inside-avoid">
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-gradient-to-br ${video.gradient}
          ${aspectRatioClasses[video.aspectRatio]}
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
            Video preview coming soon
          </span>
        </div>

        <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium backdrop-blur">
          {video.category}
        </span>
      </div>

      <div className="px-1 pt-3">
        <h3 className="text-sm font-semibold text-zinc-100">{video.title}</h3>

        <p className="mt-1 text-xs text-zinc-400">@{video.creator}</p>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
          {video.prompt}
        </p>
      </div>
    </article>
  );
}
