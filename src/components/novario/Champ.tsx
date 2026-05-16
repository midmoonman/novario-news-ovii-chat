import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Zap, X, LogOut, Trash2, Eye, RefreshCw,
  MessageSquare, Mic, Image as ImageIcon, File,
  AlertTriangle, CheckCircle2, Clock, Signal, Info,
  Unlock, Palette, Activity, Monitor, Smartphone, Globe, Wifi
} from "lucide-react";
import {
  collection, query, onSnapshot, doc,
  deleteDoc, getDocs, orderBy, Timestamp, limit,
  setDoc, serverTimestamp, where
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ChampProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  msgs: any[];        // already-decrypted messages from parent
  room?: string;
}

type Tab = "users" | "preview" | "telemetry" | "wipe";

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

// ── Inline device row inside user card ─────────────────────────────────────────────────────
function TelemetryInlineRow({ uid, room }: { uid: string; room: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "ovii", room, "telemetry", uid), (snap) => {
      if (snap.exists()) setData(snap.data());
    });
    return () => unsub();
  }, [uid, room]);
  if (!data) return null;
  return (
    <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {data.deviceType && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-medium" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
            {data.deviceType === "Mobile" ? <Smartphone className="w-3 h-3 text-white/40" /> : <Monitor className="w-3 h-3 text-white/40" />}
            {data.deviceType}
          </div>
        )}
        {data.browser && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-medium" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
            <Globe className="w-3 h-3 text-[#eab308]" />
            {data.browser}
          </div>
        )}
        {data.os && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-medium" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
            <Monitor className="w-3 h-3 text-[#3b82f6]" />
            {data.os}
          </div>
        )}
        {data.screen && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-medium" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
            <Monitor className="w-3 h-3 text-white/40" />
            {data.screen}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {data.ip && (
          <span className="flex items-center gap-2 text-[10px] text-blue-400 font-mono">
            <Globe className="w-3.5 h-3.5 text-blue-400/60" /> {data.ip}
          </span>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {data.network && data.network !== "Unknown" && (
              <span className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                <Wifi className="w-3.5 h-3.5 text-white/30" /> {data.network}
              </span>
            )}
            {data.speed && (
              <span className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                <Activity className="w-3.5 h-3.5 text-white/30" /> {data.speed} Mbps
              </span>
            )}
          </div>
          <div className="flex gap-1 items-center opacity-40">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <div className="w-1 h-1 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
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

  const [telemetry, setTelemetry] = useState<any[]>([]);
  const [expandedExplored, setExpandedExplored] = useState<Record<string, boolean>>({});

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

  // ── Telemetry subscription ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const q = query(collection(db, "ovii", room, "telemetry"), orderBy("lastActive", "desc"), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      setTelemetry(snap.docs.map(d => ({ id: d.id, ...d.data() })));
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
    try {
      setActing("wipe-media");
      const snap = await getDocs(query(collection(db, "ovii", room, "messages"), where("type", "in", ["image", "voice", "audio"])));
      await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
      showToast(`Deleted ${snap.docs.length} media files.`);
    } catch {
      showToast("Error wiping media", false);
    } finally { setActing(null); }
  };

  const clearTelemetry = async () => {
    try {
      setActing("clear-telemetry");
      const snap = await getDocs(collection(db, "ovii", room, "telemetry"));
      await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
      showToast("Telemetry data cleared.");
    } catch {
      showToast("Error clearing telemetry", false);
    } finally { setActing(null); }
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
        style={{ background: "#0b0f16" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "#ff9900", boxShadow: "0 0 20px rgba(255,153,0,0.4)" }}
            >
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[22px] text-white font-bold tracking-tight leading-tight">Champ Control</h1>
              <p className="text-[9px] text-white/40 mt-0 font-medium tracking-[0.15em] uppercase">
                {room} · Admin Interface
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all border border-white/[0.05]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-6 shrink-0 w-full">
          {[
            { label: "Online",  val: onlineCount,  sub: "Users", icon: Users,          color: "text-emerald-400", bg: "bg-emerald-400/5", border: "border-emerald-400/10" },
            { label: "Text",    val: textCount,    sub: "Msgs",     icon: MessageSquare,  color: "text-blue-400", bg: "bg-blue-400/5", border: "border-blue-400/10" },
            { label: "Voice",   val: voiceCount,   sub: "Active",       icon: Mic,            color: "text-orange-400", bg: "bg-orange-400/5", border: "border-orange-400/10" },
            { label: "Images",  val: imgCount,     sub: "Shared",       icon: ImageIcon,      color: "text-purple-400", bg: "bg-purple-400/5", border: "border-purple-400/10" },
          ].map(s => (
            <div key={s.label} className={`rounded-xl sm:rounded-[20px] p-2 sm:p-4 flex flex-col items-center justify-center text-center border ${s.bg} ${s.border} min-w-0 w-full`}>
              <div className={`flex items-center gap-1 mb-1 sm:mb-2 ${s.color}`}>
                <s.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> <span className="text-[9px] sm:text-[10px] font-medium truncate">{s.label}</span>
              </div>
              <div className="text-[20px] sm:text-[26px] font-bold text-white mb-0 leading-none tracking-tight">{s.val}</div>
              <div className="text-[8px] sm:text-[9px] text-white/40 mt-1 truncate w-full">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Shell */}
        <div className="flex-1 min-h-0 rounded-[28px] border border-white/[0.04] flex flex-col overflow-hidden relative" style={{ background: "#0e1116" }}>
          
          {/* Nav */}
          <div className="flex items-center justify-between px-1.5 pt-3 pb-3 border-b border-white/[0.04] shrink-0 z-10 w-full gap-1">
            {([
              { id: "users",     icon: Users,          label: "Users" },
              { id: "preview",   icon: Eye,            label: "Realtime" },
              { id: "telemetry", icon: Activity,       label: "Telemetry" },
              { id: "wipe",      icon: Trash2,         label: "Clean" },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[9px] font-medium transition-all ${
                  tab === id ? "text-emerald-400 border border-emerald-500/30 bg-emerald-500/5" : "text-white/40 hover:text-white/70 border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate w-full text-center px-0.5">{label}</span>
                {tab === id && (
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-emerald-500 rounded-t-full" style={{ boxShadow: "0 -2px 10px rgba(16,185,129,0.5)" }} />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar z-10 relative">
            <AnimatePresence mode="wait">
              {tab === "users" && (
                <motion.div key="users" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  {onlineUsers.length === 0 && (
                    <div className="text-center py-10 text-white/20 text-sm">No users in room</div>
                  )}
                  {onlineUsers.map(user => (
                    <div key={user.uid} className={`rounded-[24px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.04] relative overflow-hidden group`}>
                      {/* Top glowing edge */}
                      {user.isOnline && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />}
                      
                      {/* Main row */}
                      <div className="flex items-center justify-between px-4 pt-4 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {user.isOnline && <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />}
                            {user.avatar
                              ? <img src={user.avatar} className="w-12 h-12 rounded-full border border-white/10 object-cover relative z-10" alt="" />
                              : <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xl relative z-10">{user.name[0]}</div>
                            }
                            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#12161f] z-20 ${user.isOnline ? "bg-emerald-500" : "bg-white/20"}`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[15px] font-bold text-white tracking-wide">{user.name}</span>
                              {user.isNoLock && (
                                <span className="flex items-center gap-1 text-[8px] text-amber-400 font-bold border border-amber-500/30 px-1.5 py-0.5 rounded-sm bg-amber-500/10 uppercase tracking-wider">
                                  <Unlock className="w-2.5 h-2.5" /> No Lock
                                </span>
                              )}
                            </div>
                            <div className={`text-[11px] font-medium ${user.isOnline ? "text-emerald-500" : "text-white/30"}`}>
                              {user.isOnline ? "Online" : `Last seen ${user.lastSeenStr}`}
                            </div>
                          </div>
                        </div>

                        <button onClick={() => ask(`Force Logout ${user.name}?`, `This will bypass any "No Lock" settings and throw the user to the entry screen immediately.`, () => forceLogout(user.uid, user.name))}
                          disabled={acting === user.uid}
                          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-transparent hover:bg-red-500/10 border border-red-500/40 text-red-400 text-[11px] font-semibold transition-all"
                        >
                          {acting === user.uid ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                          <span>Kick</span>
                        </button>
                      </div>

                      {/* Device info row - fetched from telemetry */}
                      <TelemetryInlineRow uid={user.uid} room={room} />
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

              {tab === "telemetry" && (
                <motion.div key="telemetry" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{telemetry.length} Records</div>
                    {telemetry.length > 0 && (
                      <button onClick={() => ask("Clear Telemetry?", "This will permanently delete all captured device and session data.", clearTelemetry)}
                        disabled={acting === "clear-telemetry"}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold transition-all border border-red-500/20"
                      >
                        {acting === "clear-telemetry" ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        Clear Data
                      </button>
                    )}
                  </div>
                  
                  {telemetry.length === 0 && (
                    <div className="text-center py-10 text-white/20 text-sm border border-dashed border-white/10 rounded-2xl">No telemetry data yet</div>
                  )}
                  {telemetry.map(t => (
                    <div key={t.id} className={`${card} p-4`}>
                      {/* Header row */}
                      <div className="flex items-center gap-3 mb-3">
                        {t.avatar ? (
                          <img src={t.avatar} className="w-9 h-9 rounded-full border border-white/10" alt="" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/40">{t.name?.[0]}</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-white truncate">{t.name || "Unknown"}</div>
                          <div className="text-[10px] text-white/30 font-mono truncate">{t.uid}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[14px] font-mono text-emerald-400 font-bold">{Math.floor((t.totalTimeSpentSeconds || 0) / 60)}m {(t.totalTimeSpentSeconds || 0) % 60}s</div>
                          <div className="text-[9px] text-white/25 uppercase tracking-widest">Session Time</div>
                        </div>
                      </div>

                      {/* Device grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                        {[
                          { icon: t.deviceType === "Mobile" ? Smartphone : Monitor, label: "Device", val: t.deviceType },
                          { icon: Globe, label: "Browser", val: t.browser },
                          { icon: Monitor, label: "OS", val: t.os },
                          { icon: Monitor, label: "Screen", val: t.screen },
                          { icon: Globe, label: "IP", val: t.ip, mono: true, highlight: true },
                          { icon: Wifi, label: "Network", val: t.network },
                        ].filter(r => r.val && r.val !== "Unknown").map(r => (
                          <div key={r.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 flex items-center gap-2">
                            <r.icon className={`w-3 h-3 shrink-0 ${r.highlight ? "text-blue-400" : "text-white/30"}`} />
                            <div className="min-w-0">
                              <div className="text-[8px] text-white/25 font-bold uppercase tracking-widest">{r.label}</div>
                              <div className={`text-[11px] truncate font-medium ${r.highlight ? "text-blue-300 font-mono" : "text-white/70"}`}>{r.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      {t.actions && t.actions.length > 0 ? (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="text-[9px] text-white/25 font-bold uppercase tracking-widest">Explored ({t.actions.length})</div>
                            <button
                              onClick={() => setExpandedExplored(prev => ({ ...prev, [t.id]: !prev[t.id] }))}
                              className="text-[9px] text-blue-400 font-bold uppercase tracking-widest hover:text-blue-300 transition-colors"
                            >
                              {expandedExplored[t.id] ? "Show Less" : "Show More"}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {(expandedExplored[t.id] ? t.actions : t.actions.slice(0, 5)).map((act: string, i: number) => (
                              <span key={i} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] text-white/55 font-medium">{act}</span>
                            ))}
                            {!expandedExplored[t.id] && t.actions.length > 5 && (
                              <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] text-white/40 font-medium italic">+{t.actions.length - 5} more...</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[10px] text-white/20 italic">No actions recorded</div>
                      )}
                      
                      {/* Telemetry Actions */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => ask("Force Logout?", `Kick this user (${t.uid}) immediately across all devices?`, () => forceLogout(t.uid, t.name || "User"))}
                          disabled={acting === t.uid}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-[10px] font-bold transition-all border border-orange-500/20"
                        >
                          {acting === t.uid ? <RefreshCw className="w-3 h-3 animate-spin" /> : <LogOut className="w-3 h-3" />}
                          Force Logout
                        </button>
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
