import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Users, Shield, Zap, AlertTriangle,
  Terminal, BarChart3, HardDrive, Smartphone,
  Globe, Cpu, Database, Signal, Clock, X,
  Trash2, Lock, EyeOff, RefreshCw,
  Power, Info
} from "lucide-react";
import {
  collection, query, onSnapshot,
  Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ChampProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  msgs: any[];
}

const TABS = [
  { id: "presence", icon: Users,         label: "Presence"    },
  { id: "health",   icon: Activity,      label: "Health"      },
  { id: "mod",      icon: Shield,        label: "Moderation"  },
  { id: "events",   icon: Terminal,      label: "Events"      },
  { id: "stats",    icon: BarChart3,     label: "Analytics"   },
  { id: "device",   icon: Smartphone,    label: "Device"      },
  { id: "danger",   icon: AlertTriangle, label: "Emergency"   },
] as const;

type TabId = typeof TABS[number]["id"];

export function Champ({ isOpen, onClose, isDarkMode, msgs }: ChampProps) {
  const [activeTab, setActiveTab] = useState<TabId>("presence");
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [healthMetrics] = useState<Record<string, string | number>>({
    "Active Users":           0,
    "Msg Throughput":         "Live",
    "Media Status":           "Stable",
    "Sync Latency":           "12 ms",
    "Notification Health":    "Healthy",
    "WebSocket Integrity":    "100%",
    "Firebase Status":        "Operational",
    "Storage Load":           "12%",
  });
  const [eventLogs, setEventLogs] = useState<any[]>([]);
  const [deviceQuality, setDeviceQuality] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) return;
    const q = query(collection(db, "ovii", "ovii-room", "presence"));
    const unsub = onSnapshot(q, (snapshot) => {
      const now = Date.now();
      const users: any[] = [];
      snapshot.forEach(d => {
        const data = d.data();
        const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
        users.push({
          id: d.id, ...data,
          isOnline: now - lastSeen < 30000,
          lastSeenFormatted: lastSeen ? new Date(lastSeen).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
        });
      });
      setOnlineUsers(users);
    });

    setEventLogs([
      { id: 1, severity: "info",    message: "CHAMP Operational Layer initialized",  time: new Date() },
      { id: 2, severity: "success", message: "Firebase realtime connection active",   time: new Date() },
      { id: 3, severity: "info",    message: "Presence stream subscribed",            time: new Date() },
    ]);

    try {
      const ram   = (navigator as any).deviceMemory || "—";
      const cores = navigator.hardwareConcurrency  || "—";
      const conn  = (navigator as any).connection  || {};
      setDeviceQuality({
        ram, cores,
        effectiveType: conn.effectiveType || "—",
        downlink:      conn.downlink      || "—",
        rtt:           conn.rtt           || "—",
        isLowEnd: (typeof ram === "number" && ram <= 4) || (typeof cores === "number" && cores <= 4),
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
    } catch (_) {}

    return () => unsub();
  }, [isOpen]);

  if (!isOpen) return null;

  /* ── shared classes ── */
  const card  = "rounded-2xl bg-white/[0.04] border border-white/[0.07] transition-all duration-300";
  const label = "text-[10px] font-medium text-white/35 tracking-widest uppercase";
  const value = "text-sm font-semibold text-white leading-snug";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex flex-col p-4 md:p-6"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)" }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", boxShadow: "0 0 18px rgba(245,158,11,0.35)" }}
          >
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1
              className="text-lg text-white leading-none"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Champ
            </h1>
            <p className="text-[10px] text-white/35 mt-0.5 font-medium tracking-widest uppercase">
              Operational Intelligence
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Shell ── */}
      <div className="flex-1 min-h-0 rounded-[28px] border border-white/[0.08] flex flex-col overflow-hidden relative" style={{ background: "#0c0c0e" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-transparent pointer-events-none rounded-[28px]" />

        {/* Nav */}
        <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-white/[0.06] overflow-x-auto scrollbar-hide shrink-0 z-10">
          {TABS.map(({ id, icon: Icon, label: lbl }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                  : "text-white/35 hover:text-white/65 hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{lbl}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar z-10 relative">
          <AnimatePresence mode="wait">

            {/* 1 · PRESENCE */}
            {activeTab === "presence" && (
              <motion.div key="presence" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {onlineUsers.map(user => (
                  <div key={user.id} className={`${card} p-4 flex flex-col gap-3 hover:border-amber-500/20`}>
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img src={user.avatar} className="w-11 h-11 rounded-full border border-white/10 object-cover" alt="" />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0c0c0e] ${user.isOnline ? "bg-emerald-500" : "bg-white/20"}`}
                          style={user.isOnline ? { boxShadow: "0 0 8px #10b981" } : {}}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-white truncate">{user.name}</div>
                        <div className="text-[10px] text-white/35 font-medium mt-0.5">
                          {user.isOnline ? "Online" : "Away"}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <div className={label}>Last seen</div>
                        <div className="text-[11px] font-mono text-white/70 mt-0.5">{user.lastSeenFormatted}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <div className={label}>Status</div>
                        <div className="text-[11px] mt-0.5">
                          {user.typing
                            ? <span className="text-emerald-400 font-medium animate-pulse">Typing</span>
                            : user.recording
                              ? <span className="text-red-400 font-medium animate-pulse">Recording</span>
                              : <span className="text-white/50">Quiet</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {onlineUsers.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-24 text-white/20">
                    <Users className="w-12 h-12 mb-3" />
                    <p className="text-sm font-medium">No active sessions</p>
                    <p className="text-[11px] mt-1 font-normal opacity-60">Waiting for users to connect</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 2 · HEALTH */}
            {activeTab === "health" && (
              <motion.div key="health" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {Object.entries(healthMetrics).map(([key, val]) => (
                  <div key={key} className={`${card} p-5 flex flex-col gap-3 hover:border-amber-500/15`}>
                    <div className="flex items-center justify-between">
                      <span className={label}>{key}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: "0 0 6px #10b981" }} />
                    </div>
                    <div className="text-2xl font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.02em" }}>
                      {val}
                    </div>
                    <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 3 · MODERATION */}
            {activeTab === "mod" && (
              <motion.div key="mod" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-[13px] font-semibold text-white/60 flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4" /> Moderation Controls
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { label: "Purge Old Messages",  desc: "Remove messages older than 24 h",       icon: Trash2,    accent: "text-red-400"    },
                      { label: "Force Room Sync",      desc: "Re-trigger presence for all sessions",  icon: RefreshCw, accent: "text-blue-400"   },
                      { label: "Media Lockdown",       desc: "Disable uploads temporarily",           icon: EyeOff,    accent: "text-orange-400" },
                      { label: "Maintenance Mode",     desc: "Set room to read-only for 5 min",       icon: Lock,      accent: "text-amber-400"  },
                    ].map(t => (
                      <button key={t.label} className={`${card} p-5 text-left hover:bg-white/[0.07] group`}>
                        <t.icon className={`w-6 h-6 mb-4 ${t.accent}`} />
                        <div className="text-[13px] font-semibold text-white mb-1">{t.label}</div>
                        <div className="text-[11px] text-white/35 leading-relaxed font-normal">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4 · EVENTS */}
            {activeTab === "events" && (
              <motion.div key="events" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-1.5"
              >
                {eventLogs.map(log => (
                  <div key={log.id} className={`${card} flex gap-4 px-4 py-3 text-[12px]`}>
                    <span className="text-white/25 shrink-0 font-mono tabular-nums">
                      {log.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                    <span className={`font-semibold shrink-0 capitalize ${
                      log.severity === "success" ? "text-emerald-400" :
                      log.severity === "error"   ? "text-red-400"     : "text-amber-400"
                    }`}>
                      {log.severity}
                    </span>
                    <span className="text-white/65 font-normal">{log.message}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 px-4 py-3 text-[12px] opacity-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span className="text-white/50 font-normal">Listening for events…</span>
                </div>
              </motion.div>
            )}

            {/* 5 · ANALYTICS */}
            {activeTab === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className={`${card} p-5 space-y-4`}>
                  <p className={label}>Message traffic · 24 h</p>
                  <div className="h-32 flex items-end gap-1.5">
                    {[40,70,45,90,65,30,55,85,50,75,40,60].map((h, i) => (
                      <div key={i} className="flex-1 relative group cursor-pointer">
                        <div className="absolute bottom-0 inset-x-0 rounded-t bg-white/5" style={{ height: "100%" }} />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                          className="absolute bottom-0 inset-x-0 rounded-t bg-gradient-to-t from-amber-500 to-amber-400/60 group-hover:from-amber-400 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${card} p-5 space-y-5`}>
                  <p className={label}>Media type ratio</p>
                  {[
                    { name: "Text",   pct: 70, color: "#10b981" },
                    { name: "Images", pct: 15, color: "#3b82f6" },
                    { name: "Voice",  pct: 10, color: "#ef4444" },
                    { name: "Files",  pct:  5, color: "#f59e0b" },
                  ].map(item => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-medium text-white/50">
                        <span>{item.name}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 6 · DEVICE */}
            {activeTab === "device" && deviceQuality && (
              <motion.div key="device" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {[
                  { label: "CPU Cores",        val: deviceQuality.cores,          icon: Cpu      },
                  { label: "Device RAM",       val: `${deviceQuality.ram} GB`,    icon: HardDrive},
                  { label: "Network Type",     val: deviceQuality.effectiveType,  icon: Signal   },
                  { label: "Downlink Speed",   val: `${deviceQuality.downlink} Mbps`, icon: Globe },
                  { label: "Round Trip Time",  val: `${deviceQuality.rtt} ms`,    icon: Clock    },
                  { label: "Performance",      val: deviceQuality.isLowEnd ? "Eco Mode" : "High Performance", icon: Zap },
                ].map(info => (
                  <div key={info.label} className={`${card} p-4 flex items-center gap-4 hover:border-amber-500/15`}>
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <info.icon className="w-4.5 h-4.5 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className={label}>{info.label}</div>
                      <div className="text-[13px] font-semibold text-white mt-0.5 truncate">{info.val}</div>
                    </div>
                  </div>
                ))}
                {deviceQuality.isLowEnd && (
                  <div className="col-span-full flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                    <Info className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-[12px] font-semibold text-amber-400">Eco optimisation active</div>
                      <div className="text-[11px] text-amber-400/50 font-normal mt-0.5">Animations and blur reduced to improve stability on this device.</div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 7 · EMERGENCY */}
            {activeTab === "danger" && (
              <motion.div key="danger" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 space-y-8"
              >
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mx-auto mb-5 animate-pulse">
                    <Power className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1.5" style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.02em" }}>
                    Emergency Operations
                  </h3>
                  <p className="text-[11px] text-white/35 font-normal leading-relaxed">
                    Authorised personnel only. These actions affect the live ecosystem.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                  {[
                    { label: "Freeze Ecosystem",   desc: "Global read-only mode",          icon: Lock,      danger: true  },
                    { label: "Wipe Presence",       desc: "Invalidate all active sessions", icon: Trash2,    danger: true  },
                    { label: "Restart Signal",      desc: "Re-initialise SSE layers",       icon: RefreshCw, danger: false },
                    { label: "Clear Cache",         desc: "Global media reset",             icon: Database,  danger: false },
                  ].map(op => (
                    <button
                      key={op.label}
                      className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all group ${
                        op.danger
                          ? "bg-red-500/5 border-red-500/15 hover:bg-red-500/10 hover:border-red-500/25"
                          : "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06]"
                      }`}
                    >
                      <op.icon className={`w-7 h-7 mb-3 transition-transform group-hover:scale-110 ${op.danger ? "text-red-400" : "text-white/50"}`} />
                      <div className={`text-[13px] font-semibold mb-0.5 ${op.danger ? "text-white" : "text-white/80"}`}>{op.label}</div>
                      <div className={`text-[10px] font-normal ${op.danger ? "text-red-400/50" : "text-white/25"}`}>{op.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4 text-[10px] text-white/25 font-medium">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System synced
            </div>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              12 ms
            </div>
          </div>
          <div className="text-[10px] text-white/15 font-medium tracking-widest uppercase">
            Novario · Build 2.4.1
          </div>
        </div>
      </div>
    </motion.div>
  );
}
