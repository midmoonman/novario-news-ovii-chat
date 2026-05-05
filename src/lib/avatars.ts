// 10 beautiful anime-style avatars using DiceBear (free CDN, no local files needed)
// Style: "adventurer" is the most anime-like and free

export const AVATARS = [
  { id: "sakura", name: "Sakura", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sakura&backgroundColor=ffdfbf", color: "#FF9EAA" },
  { id: "kira", name: "Kira", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kira&backgroundColor=b6e3f4", color: "#6EC6F5" },
  { id: "yuki", name: "Yuki", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Yuki&backgroundColor=d1d4f9", color: "#A78BFA" },
  { id: "hana", name: "Hana", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Hana&backgroundColor=ffd5dc", color: "#FB7185" },
  { id: "ryu", name: "Ryu", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryu&backgroundColor=c0aede", color: "#8B5CF6" },
  { id: "luna", name: "Luna", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Luna&backgroundColor=d0f4de", color: "#34D399" },
  { id: "sora", name: "Sora", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sora&backgroundColor=fde68a", color: "#FBBF24" },
  { id: "neko", name: "Neko", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Neko&backgroundColor=fecaca", color: "#F87171" },
  { id: "zero", name: "Zero", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Zero&backgroundColor=bae6fd", color: "#38BDF8" },
  { id: "miku", name: "Miku", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Miku&backgroundColor=a7f3d0", color: "#10B981" },
  { id: "kenji", name: "Kenji", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kenji&backgroundColor=ffccb6", color: "#FFB085" },
  { id: "akira", name: "Akira", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Akira&backgroundColor=c3b1e1", color: "#A985D3" },
  { id: "chibi", name: "Chibi", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Chibi&backgroundColor=f3b0c3", color: "#F08BA5" },
  { id: "shin", name: "Shin", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Shin&backgroundColor=a8e6cf", color: "#77D3A6" },
  { id: "ren", name: "Ren", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ren&backgroundColor=dcedc1", color: "#B8D994" },
  { id: "hikari", name: "Hikari", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Hikari&backgroundColor=ffd3b6", color: "#FFAA77" },
];

export function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
