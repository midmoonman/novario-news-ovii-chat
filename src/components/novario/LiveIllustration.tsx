import { motion } from "framer-motion";

export function LiveIllustration({ category }: { category?: string }) {
  const colors = {
    Tech: "rgba(59, 130, 246, 0.15)",
    Business: "rgba(16, 185, 129, 0.15)",
    World: "rgba(245, 158, 11, 0.15)",
    Sports: "rgba(239, 68, 68, 0.15)",
    Entertainment: "rgba(236, 72, 153, 0.15)",
    Science: "rgba(14, 165, 233, 0.15)",
    Health: "rgba(20, 184, 166, 0.15)",
    default: "rgba(139, 92, 246, 0.15)"
  };
  
  const color = colors[category as keyof typeof colors] || colors.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ background: `linear-gradient(to bottom, ${color}, transparent 60%)` }}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
