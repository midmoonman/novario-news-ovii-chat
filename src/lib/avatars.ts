// 8 premium 3D Pixar-style avatars
export const AVATARS = [
  { id: "boy1", name: "Alex", url: "/avatars/boy1.png", color: "#6EC6F5" },
  { id: "girl1", name: "Mia", url: "/avatars/girl1.png", color: "#FB7185" },
  { id: "boy2", name: "Zane", url: "/avatars/boy2.png", color: "#38BDF8" },
  { id: "girl2", name: "Luna", url: "/avatars/girl2.png", color: "#A78BFA" },
  { id: "boy3", name: "Leo", url: "/avatars/boy3.png", color: "#FBBF24" },
  { id: "girl3", name: "Hana", url: "/avatars/girl3.png", color: "#10B981" },
  { id: "boy4", name: "Finn", url: "/avatars/boy4.png", color: "#94a3b8" },
  { id: "girl4", name: "Ava", url: "/avatars/girl4.png", color: "#facc15" },
];

export function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
