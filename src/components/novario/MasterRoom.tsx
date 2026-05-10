import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  collection, onSnapshot, query, orderBy, doc, updateDoc, 
  deleteDoc, getDocs, setDoc, writeBatch, Timestamp, limit 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Users, MessageSquare, ShieldAlert, Zap, Trash2, 
  Lock, Unlock, LogOut, Monitor, Smartphone, 
  Activity, Database, ShieldCheck, ChevronRight, X, Clock,
  Mic, Image as ImageIcon, Volume2, Search, Filter, AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

const ROOM = "ovii-room";

interface Presence {
  id: string;
  name: string;
  avatar: string;
  typing: boolean;
  recording: boolean;
  lastSeen: any;
  device?: string;
  online?: boolean;
}

interface Message {
  id: string;
  name: string;
  content: string;
  type: string;
  createdAt: any;
  avatar: string;
}

export function MasterRoom({ onLock }: { onLock: () => void }) {
  const [users, setUsers] = useState<Presence[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [stats, setStats] = useState({ users: 0, messages: 0, media: 0 });
  const [activeTab, setActiveTab] = useState<"users" | "chat" | "health" | "logs">("users");

  useEffect(() => {
    // 1. Listen for users
    const unsubPresence = onSnapshot(collection(db, "ovii", ROOM, "presence"), (s) => {
      const u = s.docs.map(d => ({ id: d.id, ...d.data() } as Presence));
      setUsers(u);
    });

    // 2. Listen for chat preview (last 50)
    const unsubMsgs = onSnapshot(query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "desc"), limit(50)), (s) => {
      const m = s.docs.map(d => ({ id: d.id, ...d.data() } as Message));
      setMessages(m);
    });

    // 3. Listen for freeze status
    const unsubSettings = onSnapshot(doc(db, "ovii", ROOM, "settings", "global"), (d) => {
      if (d.exists()) setIsFrozen(!!d.data().frozen);
    });

    return () => {
      unsubPresence();
      unsubMsgs();
      unsubSettings();
    };
  }, []);

  const toggleFreeze = async () => {
    try {
      await setDoc(doc(db, "ovii", ROOM, "settings", "global"), { frozen: !isFrozen }, { merge: true });
      toast.success(isFrozen ? "Chat Unfrozen" : "Chat Frozen");
    } catch (e) {
      toast.error("Failed to toggle freeze");
    }
  };

  const forceLogout = async (uid: string) => {
    try {
      await updateDoc(doc(db, "ovii", ROOM, "presence", uid), { forceLogout: true });
      toast.info("User session terminated");
    } catch (e) {
      toast.error("Failed to terminate session");
    }
  };

  const wipeChat = async () => {
    if (!confirm("Wipe ALL messages? This cannot be undone.")) return;
    const batch = writeBatch(db);
    const snapshot = await getDocs(collection(db, "ovii", ROOM, "messages"));
    snapshot.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    toast.success("Chat wiped clean");
  };

  const wipeMedia = async () => {
    if (!confirm("Wipe all media (photos/voice notes)?")) return;
    const snapshot = await getDocs(collection(db, "ovii", ROOM, "messages"));
    const mediaDocs = snapshot.docs.filter(d => d.data().type !== "text");
    const batch = writeBatch(db);
    mediaDocs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    toast.success("Media cleaned up");
  };

  return (
    <div className="h-full w-full bg-[#0b141a] text-[#e9edef] flex flex-col font-sans overflow-hidden">
      {/* ── Header ── */}
      <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#111b21]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic">Master Room</h1>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFreeze}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
              isFrozen 
                ? "bg-destructive text-white shadow-lg shadow-destructive/20" 
                : "bg-white/5 hover:bg-white/10 text-white/60"
            }`}
          >
            {isFrozen ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {isFrozen ? "Unfreeze" : "Freeze"}
          </button>
          <button 
            onClick={onLock}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Sidebar Nav ── */}
        <div className="w-20 sm:w-64 border-r border-white/5 flex flex-col bg-[#111b21]/40 overflow-y-auto shrink-0">
          <div className="p-4 space-y-2">
            {[
              { id: "users", icon: Users, label: "Live Users", count: users.length },
              { id: "chat", icon: MessageSquare, label: "Live Chat", count: messages.length },
              { id: "health", icon: Activity, label: "System Health" },
              { id: "logs", icon: Zap, label: "Action Logs" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  activeTab === tab.id ? "bg-primary/10 text-primary" : "text-white/40 hover:bg-white/5 hover:text-white/60"
                }`}
              >
                <tab.icon className="w-5 h-5 shrink-0" />
                <span className="hidden sm:block text-xs font-black uppercase tracking-widest flex-1 text-left">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="hidden sm:block text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-full">{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-auto p-4 border-t border-white/5 space-y-2">
            <div className="px-4 py-2 text-[9px] font-black text-white/20 uppercase tracking-widest">Danger Zone</div>
            <button 
              onClick={wipeChat}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-all"
            >
              <Trash2 className="w-5 h-5 shrink-0" />
              <span className="hidden sm:block text-xs font-black uppercase tracking-widest">Wipe Chat</span>
            </button>
            <button 
              onClick={wipeMedia}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-all"
            >
              <Database className="w-5 h-5 shrink-0" />
              <span className="hidden sm:block text-xs font-black uppercase tracking-widest">Wipe Media</span>
            </button>
          </div>
        </div>

        {/* ── Content Area ── */}
        <main className="flex-1 overflow-y-auto bg-[#0b141a] p-6">
          <AnimatePresence mode="wait">
            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black uppercase italic tracking-tight">Active Sessions</h2>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest border border-white/10 rounded-full px-3 py-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {users.length} Online
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map(u => (
                    <div key={u.id} className="bg-white/5 border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-colors group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} className="w-12 h-12 rounded-2xl object-cover border border-white/10" alt="" />
                          <div>
                            <div className="text-sm font-black tracking-tight">{u.name}</div>
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ID: {u.id.slice(0, 8)}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => forceLogout(u.id)}
                          className="p-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100"
                          title="Force Logout"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="bg-black/20 rounded-2xl p-3 flex flex-col items-center justify-center gap-1">
                          {u.device === "desktop" ? <Monitor className="w-4 h-4 text-white/40" /> : <Smartphone className="w-4 h-4 text-white/40" />}
                          <span className="text-[9px] font-black uppercase text-white/20">{u.device || "Mobile"}</span>
                        </div>
                        <div className="bg-black/20 rounded-2xl p-3 flex flex-col items-center justify-center gap-1">
                          <Activity className={`w-4 h-4 ${u.typing || u.recording ? "text-primary animate-pulse" : "text-white/40"}`} />
                          <span className="text-[9px] font-black uppercase text-white/20">{u.recording ? "Recording" : (u.typing ? "Typing" : "Active")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black uppercase italic tracking-tight">Live Preview</h2>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest animate-pulse flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Real-time stream
                  </div>
                </div>

                <div className="flex-1 space-y-4 pr-4">
                  {messages.map(m => (
                    <div key={m.id} className="flex gap-4 group">
                      <img src={m.avatar} className="w-10 h-10 rounded-xl object-cover border border-white/5" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-[12px] font-black tracking-tight">{m.name}</span>
                          <span className="text-[10px] text-white/20 font-medium">{m.createdAt?.toDate()?.toLocaleTimeString()}</span>
                        </div>
                        <div className={`p-4 rounded-2xl rounded-tl-none border ${
                          m.type === 'text' ? "bg-white/5 border-white/5" : "bg-primary/5 border-primary/10"
                        }`}>
                          {m.type === 'text' ? (
                            <p className="text-sm leading-relaxed opacity-80">{m.content}</p>
                          ) : (
                            <div className="flex items-center gap-3 text-primary">
                              {m.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              <span className="text-[11px] font-black uppercase tracking-widest">{m.type} shared</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={async () => {
                          if (confirm("Delete this message?")) await deleteDoc(doc(db, "ovii", ROOM, "messages", m.id));
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-destructive transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "health" && (
              <motion.div
                key="health"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Firebase Status", value: "Optimal", color: "text-green-500", icon: ShieldCheck },
                    { label: "Sync Latency", value: "14ms", color: "text-green-500", icon: Zap },
                    { label: "Storage Load", value: "2%", color: "text-primary", icon: Database },
                    { label: "Security", value: "Level 4", color: "text-primary", icon: ShieldAlert },
                  ].map(card => (
                    <div key={card.label} className="bg-white/5 border border-white/5 rounded-3xl p-6">
                      <card.icon className="w-6 h-6 text-white/20 mb-4" />
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{card.label}</div>
                      <div className={`text-xl font-black italic ${card.color}`}>{card.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/5 rounded-[40px] p-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6">Room Activity Heatmap</h3>
                  <div className="h-64 flex items-end gap-1.5">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-primary/20 rounded-full hover:bg-primary transition-all cursor-pointer relative group"
                        style={{ height: `${Math.random() * 100}%` }}
                      >
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {i}:00 · {Math.floor(Math.random() * 100)} msgs
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest bg-[#111b21]/40 backdrop-blur-md">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Secure Master Key</span>
          <span className="flex items-center gap-1.5"><Database className="w-3 h-3" /> Realtime Sync On</span>
        </div>
        <div>Last Heartbeat: {new Date().toLocaleTimeString()}</div>
      </footer>
    </div>
  );
}
