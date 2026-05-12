// 16 New Custom Avatars
export const AVATARS = [
  { id: "hamster-drummer", name: "Rockstar", url: "/avatars/Rockstar Hamster Playing Drums 🎸🐹.jpg", color: "#F97316" },
  { id: "pirate-dog", name: "Captain Pup", url: "/avatars/SaveClip.App_491438162_17903102472155147_7443921825569870270_n.jpg", color: "#3B82F6" },
  { id: "cool-cat", name: "Chill Kitty", url: "/avatars/cat-pfp-16.png", color: "#A78BFA" },
  { id: "happy-dog", name: "Smiling Bud", url: "/avatars/download (4).jpg", color: "#10B981" },
  { id: "hamster-guardia", name: "Guardia", url: "/avatars/HAMSTER GUARDIA.jpg", color: "#EF4444" },
  { id: "mouse-vibes", name: "Vibe Mouse", url: "/avatars/Peace, Love, and Mouse Vibes.jpg", color: "#FBBF24" },
  { id: "lovely-mouse", name: "Luna", url: "/avatars/The Lovely Mouse.jpg", color: "#EC4899" },
  { id: "bhola", name: "Bhola", url: "/avatars/bhola.jpg", color: "#6366F1" },
  { id: "hamster-anyone", name: "Hamster Fan", url: "/avatars/hamster anyone.jpg", color: "#14B8A6" },
  { id: "avatar-8", name: "Pudding", url: "/avatars/download.jpg", color: "#8B5CF6" },
  { id: "avatar-9", name: "Buddy", url: "/avatars/download (1).jpg", color: "#F59E0B" },
  { id: "avatar-10", name: "Sparky", url: "/avatars/download (2).jpg", color: "#06B6D4" },
  { id: "avatar-13", name: "Cookie", url: "/avatars/images (1).jpg", color: "#D946EF" },
  { id: "avatar-14", name: "Pip", url: "/avatars/4a19ace2c10e8dda74cb256d77eb7dd3.jpg", color: "#84CC16" },
  { id: "avatar-15", name: "Nugget", url: "/avatars/551e94ae8845df9d455f221c07421dcd.jpg", color: "#0EA5E9" },
  { id: "avatar-16", name: "Mochi", url: "/avatars/5b40bdbe8b8fe41e40eed4cb428c3f80.jpg", color: "#F43F5E" },
];

export function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
