// 16 premium 3D Pixar-style avatars (Headshots)
export const AVATARS = [
  { id: "boy1", name: "Alex", url: "/avatars/boy1.png", color: "#6EC6F5" },
  { id: "girl1", name: "Mia", url: "/avatars/girl1.png", color: "#FB7185" },
  { id: "boy2", name: "Zane", url: "/avatars/boy2.png", color: "#38BDF8" },
  { id: "girl2", name: "Luna", url: "/avatars/girl2.png", color: "#A78BFA" },
  { id: "boy3", name: "Leo", url: "/avatars/boy3.png", color: "#FBBF24" },
  { id: "girl3", name: "Hana", url: "/avatars/girl3.png", color: "#10B981" },
  { id: "boy4", name: "Finn", url: "/avatars/boy4.png", color: "#94a3b8" },
  { id: "girl4", name: "Ava", url: "/avatars/girl4.png", color: "#facc15" },
  { id: "boy5", name: "Kai", url: "/avatars/boy5.png", color: "#60a5fa" },
  { id: "girl5", name: "Emi", url: "/avatars/girl5.png", color: "#f472b6" },
  { id: "boy6", name: "Jace", url: "/avatars/boy6.png", color: "#4ade80" },
  { id: "girl6", name: "Mila", url: "/avatars/girl6.png", color: "#c084fc" },
  { id: "boy7", name: "Hugo", url: "/avatars/boy7.png", color: "#fb923c" },
  { id: "girl7", name: "Zoe", url: "/avatars/girl7.png", color: "#2dd4bf" },
  { id: "boy8", name: "Otis", url: "/avatars/boy8.png", color: "#fcd34d" },
  { id: "girl8", name: "Ivy", url: "/avatars/girl8.png", color: "#f87171" },
];

export function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
