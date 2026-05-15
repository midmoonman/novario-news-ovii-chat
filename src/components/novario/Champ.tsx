import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Zap, X, LogOut, Trash2, Eye, RefreshCw,
  MessageSquare, Mic, Image as ImageIcon, File,
  AlertTriangle, CheckCircle2, Clock, Signal, Info,
  Unlock, Palette
} from "lucide-react";
import {
  collection, query, onSnapshot, doc,
  deleteDoc, getDocs, orderBy, Timestamp, limit,
  setDoc, serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ChampProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  msgs: any[];        // already-decrypted messages from parent
  room?: string;
}

type Tab = "users" | "preview" | "wipe";

// ─── Confirmation Dialog ────────────────────────────────────────────────────
function ConfirmDialog({
  title, body, danger = true,
  onConfirm, onCancel
}: {
  title: string; body: string; danger?: boolean;
  onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[1100] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
    >
      <div className="w-full max-w-sm rounded-2xl p-6 border border-white/10" style={{ background: "#16161a" }}>
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/45 font-normal leading-relaxed mb-6">{body}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-95 ${
              danger ? "bg-red-500 hover:bg-red-600" : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Champ({ isOpen, onClose, isDarkMode, msgs, room = "ovii-room" }: ChampProps) {
  const [tab, setTab] = useState<Tab>("users");
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [confirm, setConfirm] = useState<null | {
    title: string; body: string; danger?: boolean; action: () => Promise<void>;
  }>(null);
  const [acting, setActing] = useState<string | null>(null); // uid being acted on
  const previewRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const ask = (title: string, body: string, action: () => Promise<void>, danger = true) =>
    setConfirm({ title, body, danger, action });

  // ── Realtime presence ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const q = query(collection(db, "ovii", room, "presence"));
    const unsub = onSnapshot(q, (snap) => {
      const now = Date.now();
      const users: any[] = [];
      snap.forEach(d => {
        const data = d.data();
        const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
        const noLockUntil = data.noLockUntil || null;
        users.push({
          uid: d.id,
          name: data.name || "Unknown",
          avatar: data.avatar || "",
          isOnline: now - lastSeen < 30_000,
          typing: !!data.typing,
          recording: !!data.recording,
          noLockUntil,
          isNoLock: noLockUntil && now < noLockUntil,
          activePaint: data.activePaint || "default",
          lastSeen,
          lastSeenStr: lastSeen
            ? new Date(lastSeen).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "—",
        });
      });
      // Sort: online first
      users.sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0));
      setOnlineUsers(users);
    });
    return () => unsub();
  }, [isOpen, room]);

  // ── Force logout: write to ovii/{room}/kicked/{uid} ──────────────────────
  const forceLogout = async (uid: string, name: string) => {
    setActing(uid);
    try {
      // 1. Delete presence immediately
      await deleteDoc(doc(db, "ovii", room, "presence", uid));
      
      // 2. Write kick doc
      // Note: If this fails for others, it's likely a Firebase Security Rules issue.
      // Champ needs 'create' permission on 'ovii/{room}/kicked/{uid}' for any uid.
      await setDoc(doc(db, "ovii", room, "kicked", uid), {
        kickedAt: serverTimestamp(),
        kickedBy: "champ_op",
        targetUid: uid
      });
      
      showToast(`${name} forced logout signal sent`, true);
    } catch (e: any) {
      console.error("Force logout error:", e);
      showToast("Logout failed (Check Firebase Rules)", false);
    } finally {
      setActing(null);
    }
  };

  const wipeAll = async () => {
    setActing("wipe-all");
    try {
      const snap = await getDocs(collection(db, "ovii", room, "messages"));
      const ids = snap.docs.map(d => d.id);
      for (let i = 0; i < ids.length; i += 20) {
        await Promise.all(ids.slice(i, i + 20).map(id =>
          deleteDoc(doc(db, "ovii", room, "messages", id))
        ));
      }
      showToast(`${ids.length} messages wiped`, true);
    } catch (e: any) {
      showToast("Wipe failed: " + e.message, false);
    } finally {
      setActing(null);
    }
  };

  const wipeMedia = async () => {
    setActing("wipe-media");
    try {
      const snap = await getDocs(collection(db, "ovii", room, "messages"));
      const mediaDocs = snap.docs.filter(d => {
        const t = d.data().type;
        return ["image", "voice", "audio", "video", "file"].includes(t);
      });
      await Promise.all(mediaDocs.map(d => deleteDoc(d.ref)));
      showToast(`${mediaDocs.length} media files wiped`, true);
    } catch (e: any) {
      showToast("Wipe failed: " + e.message, false);
    } finally {
      setActing(null);
    }
  };

  if (!isOpen) return null;

  const textCount  = msgs.filter(m => m.type === "text").length;
  const imgCount   = msgs.filter(m => m.type === "image").length;
  const voiceCount = msgs.filter(m => m.type === "voice" || m.type === "audio").length;
  const onlineCount = onlineUsers.filter(u => u.isOnline).length;

  const card = "rounded-2xl bg-white/[0.04] border border-white/[0.07]";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex flex-col p-4 md:p-6"
        style={{ background: "rgba(0,0,0,0.90)", backdropFilter: "blur(16px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", boxShadow: "0 0 18px rgba(245,158,11,0.35)" }}
            >
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg text-white font-bold tracking-tight">Champ Control</h1>
              <p className="text-[10px] text-white/35 mt-0.5 font-medium tracking-widest uppercase">
                {room} · Admin Interface
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 shrink-0">
          {[
            { label: "Online",  val: onlineCount,  icon: Users,          color: "text-emerald-400" },
            { label: "Text",    val: textCount,    icon: MessageSquare,  color: "text-blue-400"    },
            { label: "Voice",   val: voiceCount,   icon: Mic,            color: "text-orange-400"  },
            { label: "Images",  val: imgCount,     icon: ImageIcon,      color: "text-purple-400"  },
          ].map(s => (
            <div key={s.label} className={`${card} p-3 flex items-center gap-3`}>
              <s.icon className={`w-4 h-4 ${s.color} shrink-0`} />
              <div>
                <div className="text-[10px] text-white/35 font-medium">{s.label}</div>
                <div className="text-lg font-bold text-white leading-none">{s.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Shell */}
        <div className="flex-1 min-h-0 rounded-[24px] border border-white/[0.08] flex flex-col overflow-hidden relative" style={{ background: "#0c0c0e" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-transparent pointer-events-none rounded-[24px]" />

          {/* Nav */}
          <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-white/[0.06] shrink-0 z-10">
            {([
              { id: "users",   icon: Users,         label: "Users" },
              { id: "preview", icon: Eye,            label: "Realtime View" },
              { id: "wipe",    icon: Trash2,         label: "Cleanup" },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  tab === id ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "text-white/35 hover:text-white/65 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar z-10 relative">
            <AnimatePresence mode="wait">
              {tab === "users" && (
                <motion.div key="users" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                  {onlineUsers.map(user => (
                    <div key={user.uid} className={`${card} flex items-center gap-3 px-4 py-3 group hover:bg-white/[0.02] transition-all`}>
                      <div className="relative shrink-0">
                        {user.avatar
                          ? <img src={user.avatar} className="w-10 h-10 rounded-full border border-white/10 object-cover" alt="" />
                          : <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-lg">{user.name[0]}</div>
                        }
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0c0c0e] ${user.isOnline ? "bg-emerald-500" : "bg-white/20"}`}
                          style={user.isOnline ? { boxShadow: "0 0 6px #10b981" } : {}}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-white truncate">{user.name}</span>
                          {user.isNoLock && (
                            <span className="flex items-center gap-1 text-[9px] text-amber-400 font-bold border border-amber-500/30 px-1.5 py-0.5 rounded-full bg-amber-500/5">
                              <Unlock className="w-2.5 h-2.5" /> No Lock
                            </span>
                          )}
                          {user.activePaint !== "default" && (
                            <span className="flex items-center gap-1 text-[9px] text-blue-400 font-bold border border-blue-500/30 px-1.5 py-0.5 rounded-full bg-blue-500/5">
                              <Palette className="w-2.5 h-2.5" /> {user.activePaint}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                          <span className={user.isOnline ? "text-emerald-400" : "text-white/30"}>
                            {user.isOnline ? "Online" : "Offline"}
                          </span>
                          <span className="text-white/15">·</span>
                          <span className="text-white/30 truncate">{user.uid}</span>
                        </div>
                      </div>

                      <button onClick={() => ask(`Force Logout ${user.name}?`, `This will bypass any "No Lock" settings and throw the user to the entry screen immediately.`, () => forceLogout(user.uid, user.name))}
                        disabled={acting === user.uid}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[11px] font-medium transition-all"
                      >
                        {acting === user.uid ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                        <span>Kick</span>
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}

              {tab === "preview" && (
                <motion.div key="preview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                  {[...msgs].reverse().map(m => (
                    <div key={m.id} className={`${card} flex gap-3 px-3 py-2.5`}>
                      <img src={m.avatar} className="w-8 h-8 rounded-full border border-white/10 object-cover shrink-0" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-white/80">{m.name}</span>
                          <span className="text-[9px] text-white/20">{m.createdAt?.toDate?.()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        {m.type === "text" ? <p className="text-[12px] text-white/60 leading-relaxed break-words">{m.content}</p> :
                         m.type === "image" ? <img src={m.content} className="h-20 rounded-lg border border-white/10 mt-1" alt="" /> :
                         <div className="flex items-center gap-2 mt-1 text-[11px] text-white/40"><Mic className="w-3.5 h-3.5" /> {m.type} data</div>}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {tab === "wipe" && (
                <motion.div key="wipe" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"><AlertTriangle className="w-7 h-7 text-red-400" /></div>
                  <h3 className="text-base font-semibold text-white">System Cleanup</h3>
                  <div className="w-full max-w-xs space-y-3">
                    <button disabled={!!acting} onClick={() => ask("Wipe All Messages?", "Permanent deletion of all chat history.", wipeAll)}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 text-white transition-all">
                      <div className="flex items-center gap-3"><Trash2 className="w-5 h-5 text-red-400" /> <span className="text-sm font-semibold">Wipe Everything</span></div>
                      {acting === "wipe-all" && <RefreshCw className="w-4 h-4 animate-spin" />}
                    </button>
                    <button disabled={!!acting} onClick={() => ask("Wipe Media?", "Delete all images and voice notes only.", wipeMedia)}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/15 text-white transition-all">
                      <div className="flex items-center gap-3"><ImageIcon className="w-5 h-5 text-orange-400" /> <span className="text-sm font-semibold">Media Only</span></div>
                      {acting === "wipe-media" && <RefreshCw className="w-4 h-4 animate-spin" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between shrink-0 z-10 text-[10px] text-white/20 font-medium">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {onlineCount} active</div>
              <Signal className="w-3 h-3" /> Live Signal
            </div>
            <div className="tracking-widest uppercase">Champ OS v2.5</div>
          </div>
        </div>
      </motion.div>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {confirm && <ConfirmDialog title={confirm.title} body={confirm.body} danger={confirm.danger} onCancel={() => setConfirm(null)} onConfirm={async () => { setConfirm(null); await confirm.action(); }} />}
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1200] flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] text-white"
            style={{ background: toast.ok ? "#166534" : "#7f1d1d", borderColor: "#ffffff20" }}>
            {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />} {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
