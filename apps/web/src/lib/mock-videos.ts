export interface MockVideo {
  id: string;
  title: string;
  creator: string;
  category: string;
  prompt: string;
  aspectRatio: "portrait" | "square" | "landscape";
  gradient: string;
}

export const mockVideos: MockVideo[] = [
  {
    id: "1",
    title: "Neon Dreams",
    creator: "alexcreates",
    category: "Cyberpunk",
    prompt: "A cinematic journey through a futuristic neon city...",
    aspectRatio: "portrait",
    gradient: "from-violet-950 via-fuchsia-900 to-indigo-950",
  },
  {
    id: "2",
    title: "The Last Astronaut",
    creator: "visualmotion",
    category: "Sci-Fi",
    prompt: "An astronaut exploring an abandoned alien planet...",
    aspectRatio: "square",
    gradient: "from-slate-900 via-blue-950 to-cyan-900",
  },
  {
    id: "3",
    title: "Golden Hour",
    creator: "cinematicai",
    category: "Nature",
    prompt: "Sunlight illuminating a breathtaking mountain landscape...",
    aspectRatio: "landscape",
    gradient: "from-amber-950 via-orange-900 to-yellow-800",
  },
  {
    id: "4",
    title: "Into the Unknown",
    creator: "dreamforge",
    category: "Fantasy",
    prompt: "An ancient castle floating above an enchanted forest...",
    aspectRatio: "portrait",
    gradient: "from-emerald-950 via-teal-900 to-slate-950",
  },
  {
    id: "5",
    title: "Midnight Motion",
    creator: "motionlab",
    category: "Abstract",
    prompt: "Abstract fluid shapes moving through a dark environment...",
    aspectRatio: "square",
    gradient: "from-rose-950 via-purple-900 to-zinc-950",
  },
  {
    id: "6",
    title: "Ocean Beyond",
    creator: "pixelwander",
    category: "Nature",
    prompt: "An aerial cinematic view of mysterious ocean formations...",
    aspectRatio: "landscape",
    gradient: "from-blue-950 via-cyan-900 to-emerald-950",
  },
];
