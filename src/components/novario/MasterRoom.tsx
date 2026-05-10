import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  collection, onSnapshot, query, orderBy, limit, 
  deleteDoc, doc, setDoc, getDocs, writeBatch,
  Timestamp, where, serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Users, Activity, Shield, Trash2, LogOut, 
  Snowflake, Flame, Eye, Settings, 
  TrendingUp, HardDrive, Bell, AlertTriangle,
  Smartphone, Monitor, Clock, X, Trash, 
  RefreshCw, Lock, Unlock, Download, FileText
} from "lucide-react";

type UserPresence = {
  uid: string;
  avatar: string;
  name?: string;
  online: boolean;
  typing?: boolean;
  recording?: boolean;
  lastSeen: any;
  device?: string;
  platform?: string;
};

type MasterStats = {
  totalMessages: number;
  activeUsers: number;
  voiceNotes: number;
  images: number;
  health: number;
};

const ROOM = "ovii-room";

type MasterMsg = {
  id: string;
  uid: string;
  avatar: string;
  name?: string;
  type: "text" | "image" | "voice";
  content: string;
  caption?: string;
  createdAt?: any;
};

export function MasterRoom({ onLock }: { onLock: () => void }) {
  const [users, setUsers] = useState<UserPresence[]>([]);
  const [messages, setMessages] = useState<MasterMsg[]>([]);
  const [stats, setStats] = useState<MasterStats>({
    totalMessages: 0,
    activeUsers: 0,
    voiceNotes: 0,
    images: 0,
    health: 100
  });
  const [isFrozen, setIsFrozen] = useState(false);
  const [isDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const [activeTab, setActiveTab] = useState<"users" | "preview" | "system">("users");
  const [logs, setLogs] = useState<{ id: string, msg: string, type: "info" | "warn" | "error", time: Date }[]>([]);

  const addLog = (msg: string, type: "info" | "warn" | "error" = "info") => {
    setLogs(prev => [{ id: Math.random().toString(), msg, type, time: new Date() }, ...prev].slice(0, 50));
  };

  // ── Listeners ──
  useEffect(() => {
    // 1. Listen for Users
    const unsubPresence = onSnapshot(collection(db, "ovii", ROOM, "presence"), (snap) => {
      const list = snap.docs.map(d => ({ uid: d.id, ...d.data() } as UserPresence));
      setUsers(list);
      setStats(prev => ({ ...prev, activeUsers: list.filter(u => u.online).length }));
    });

    // 2. Listen for Messages (Realtime Preview)
    const unsubMsgs = onSnapshot(query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "desc"), limit(50)), (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as MasterMsg));
      setMessages(list);
      
      // Update basic stats
      setStats(prev => ({ 
        ...prev, 
        totalMessages: prev.totalMessages + snap.docChanges().filter(c => c.type === "added").length,
        voiceNotes: list.filter(m => m.type === "voice").length,
        images: list.filter(m => m.type === "image").length
      }));
    });

    // 3. Listen for Global Settings
    const unsubSettings = onSnapshot(doc(db, "ovii", "settings"), (s) => {
      if (s.exists()) {
        setIsFrozen(!!s.data().frozen);
      }
    });

    addLog("Master Room Session Initialized", "info");
    return () => {
      unsubPresence();
      unsubMsgs();
      unsubSettings();
    };
  }, []);

  // ── Actions ──
  const toggleFreeze = async () => {
    const newState = !isFrozen;
    await setDoc(doc(db, "ovii", "settings"), { frozen: newState }, { merge: true });
    addLog(`Chat ${newState ? "Frozen" : "Unfrozen"} globally`, newState ? "warn" : "info");
  };

  const killUser = async (uid: string, name?: string) => {
    await setDoc(doc(db, "ovii", ROOM, "kill", uid), { time: serverTimestamp() });
    addLog(`Force logout initiated for ${name || uid}`, "warn");
  };

  const wipeChat = async () => {
    if (!confirm("Wipe ALL messages, voice notes and photos? This cannot be undone.")) return;
    const snap = await getDocs(collection(db, "ovii", ROOM, "messages"));
    const batch = writeBatch(db);
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    addLog("Total chat wipe performed", "error");
  };

  const deleteMsg = async (id: string) => {
    await deleteDoc(doc(db, "ovii", ROOM, "messages", id));
    addLog(`Specific message deleted: ${id}`, "info");
  };

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-[#0b141a] text-[#e9edef]" : "bg-[#f0f2f5] text-[#111b21]"
    }`}>
      {/* ── Header ── */}
      <header className={`h-[64px] shrink-0 border-b flex items-center justify-between px-4 sm:px-6 backdrop-blur-md z-10 ${
        isDarkMode ? "bg-[#202c33] border-white/5" : "bg-white border-black/5"
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-sm shadow-primary/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter leading-none flex items-center gap-2">
              MASTER ROOM
              <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[10px] text-primary uppercase font-black">Admin</span>
            </h1>
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-1">System Administration Mode</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onLock}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-black uppercase tracking-wider hover:bg-destructive/20 transition-all active:scale-95 border border-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Exit MR</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ── Sidebar (PC) / Navigation (Global) ── */}
        <div className={`w-[80px] sm:w-[260px] shrink-0 border-r flex flex-col transition-all duration-300 ${
          isDarkMode ? "bg-[#111b21] border-white/5" : "bg-[#f0f2f5] border-black/5"
        }`}>
          <div className="p-4 hidden sm:block">
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-3 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-black/5"}`}>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">Live</span>
                </div>
                <div className="text-xl font-black">{stats.activeUsers}</div>
                <div className="text-[9px] opacity-40 uppercase font-bold">Active</div>
              </div>
              <div className={`p-3 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-black/5"}`}>
                <div className="flex items-center gap-2 text-orange-500 mb-1">
                  <Flame className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">Load</span>
                </div>
                <div className="text-xl font-black">{users.length}</div>
                <div className="text-[9px] opacity-40 uppercase font-bold">Total</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-2 space-y-2">
            {[
              { id: "users", icon: Users, label: "Users" },
              { id: "preview", icon: Eye, label: "Live Feed" },
              { id: "system", icon: Settings, label: "Control" },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all relative overflow-hidden group ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : `hover:${isDarkMode ? "bg-white/5" : "bg-black/5"}`
                }`}
              >
                <item.icon className={`w-6 h-6 shrink-0 ${activeTab === item.id ? "" : "opacity-60"}`} />
                <span className="hidden sm:block text-xs font-black uppercase tracking-wider">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div layoutId="nav-active" className="absolute right-2 w-1.5 h-1.5 bg-current rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 space-y-3">
             <button 
              onClick={toggleFreeze}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all active:scale-95 font-black uppercase text-[10px] tracking-widest ${
                isFrozen 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20"
              }`}
             >
               {isFrozen ? <Unlock className="w-4 h-4" /> : <Snowflake className="w-4 h-4" />}
               <span className="hidden sm:inline">{isFrozen ? "Unfreeze Chat" : "Freeze Room"}</span>
             </button>
             <button 
              onClick={wipeChat}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-destructive border border-destructive/20 text-white shadow-lg shadow-destructive/20 transition-all active:scale-95 font-black uppercase text-[10px] tracking-widest hover:brightness-110"
             >
               <Trash2 className="w-4 h-4" />
               <span className="hidden sm:inline">Nuke Room</span>
             </button>
          </div>
        </div>

        {/* ── Main Content Area ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {activeTab === "users" && (
              <motion.div 
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                    Active Sessions ({users.length})
                  </h2>
                  <div className="text-[10px] font-bold text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    REALTIME SYNC ACTIVE
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {users.map(u => (
                    <div key={u.uid} className={`p-4 rounded-[24px] border flex flex-col gap-4 relative overflow-hidden transition-all hover:scale-[1.02] ${
                      isDarkMode ? "bg-[#202c33]/40 border-white/5" : "bg-white border-black/5"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={u.avatar} alt="" className="w-12 h-12 rounded-2xl bg-muted object-cover border border-black/5" />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${u.online ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm truncate uppercase tracking-tighter">{u.name || "Anonymous User"}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] opacity-40 font-bold truncate max-w-[100px]">{u.uid}</span>
                            <span className="px-1 py-0.5 rounded bg-muted text-[8px] font-black uppercase opacity-60">
                              {u.device || "Browser"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase tracking-widest opacity-60">
                         <div className="flex items-center gap-1.5">
                           <Activity className="w-3 h-3" />
                           {u.typing ? <span className="text-primary animate-pulse">Typing...</span> : (u.recording ? <span className="text-destructive animate-pulse">Recording...</span> : "Idle")}
                         </div>
                         <div className="flex items-center gap-1.5 justify-end">
                           <Clock className="w-3 h-3" />
                           {u.lastSeen ? "Active" : "Unknown"}
                         </div>
                      </div>

                      <div className="flex gap-2 pt-2 mt-auto border-t border-black/5">
                        <button 
                          onClick={() => killUser(u.uid, u.name)}
                          className="flex-1 py-2.5 rounded-xl bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-wider hover:bg-destructive/20 transition-all active:scale-95 border border-destructive/10"
                        >
                          Force Logout
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "preview" && (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-widest opacity-60">Live Conversation Preview</h2>
                  <div className="text-[10px] opacity-40 font-bold">Showing last 50 events</div>
                </div>

                <div className={`rounded-[28px] border overflow-hidden flex flex-col h-[70vh] ${
                  isDarkMode ? "bg-[#202c33]/20 border-white/5" : "bg-white border-black/5"
                }`}>
                   <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                      {messages.map(m => (
                        <div key={m.id} className="flex gap-3 group/msg">
                          <img src={m.avatar} alt="" className="w-8 h-8 rounded-full bg-muted shrink-0 object-cover border border-black/5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black uppercase tracking-tight">{m.name || "User"}</span>
                              <span className="text-[9px] opacity-40 font-bold uppercase">{m.createdAt?.toDate()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              <div className="flex-1" />
                              <button 
                                onClick={() => deleteMsg(m.id)}
                                className="p-1 rounded bg-destructive/10 text-destructive opacity-0 group-hover/msg:opacity-100 transition-all hover:bg-destructive/20"
                              >
                                <Trash className="w-3 h-3" />
                              </button>
                            </div>
                            <div className={`p-3 rounded-2xl rounded-tl-none inline-block max-w-[80%] text-xs border ${
                              isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
                            }`}>
                               {m.type === "text" && m.content}
                               {m.type === "image" && (
                                 <div className="space-y-2">
                                   <img src={m.content} alt="" className="rounded-lg max-h-40 object-cover" />
                                   {m.caption && <p className="opacity-70">{m.caption}</p>}
                                 </div>
                               )}
                               {m.type === "voice" && (
                                 <div className="flex items-center gap-2 text-primary italic">
                                   <Activity className="w-4 h-4" /> Voice Note Captured
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="h-full flex items-center justify-center text-center opacity-40">
                           <div className="space-y-2">
                              <Eye className="w-12 h-12 mx-auto mb-4" />
                              <p className="text-xs font-black uppercase tracking-widest">Awaiting interaction...</p>
                           </div>
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "system" && (
              <motion.div 
                key="system"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* ── System Logs ── */}
                <div className="space-y-4">
                  <h2 className="text-sm font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Administrative Logs
                  </h2>
                  <div className={`rounded-[28px] border h-[60vh] overflow-hidden flex flex-col ${
                    isDarkMode ? "bg-[#111b21] border-white/5" : "bg-white border-black/5"
                  }`}>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                      {logs.map(log => (
                        <div key={log.id} className="flex gap-3 text-[10px] font-medium leading-relaxed group">
                           <span className="opacity-30 shrink-0 font-bold tabular-nums">
                             {log.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                           </span>
                           <span className={`shrink-0 font-black uppercase tracking-tighter ${
                             log.type === "warn" ? "text-orange-500" : log.type === "error" ? "text-destructive" : "text-primary"
                           }`}>
                             [{log.type}]
                           </span>
                           <span className="opacity-80">{log.msg}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── System Actions ── */}
                <div className="space-y-6">
                   <div className="space-y-4">
                      <h2 className="text-sm font-black uppercase tracking-widest opacity-60">Global Controls</h2>
                      <div className="grid grid-cols-2 gap-3">
                         <button className={`p-4 rounded-[22px] border text-left space-y-1 transition-all active:scale-95 ${
                           isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-black/5"
                         }`}>
                           <div className="text-primary"><Bell className="w-5 h-5" /></div>
                           <div className="text-[10px] font-black uppercase">System Notice</div>
                           <div className="text-[9px] opacity-40">Broadcast Alert</div>
                         </button>
                         <button className={`p-4 rounded-[22px] border text-left space-y-1 transition-all active:scale-95 ${
                           isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-black/5"
                         }`}>
                           <div className="text-orange-500"><HardDrive className="w-5 h-5" /></div>
                           <div className="text-[10px] font-black uppercase">Media Purge</div>
                           <div className="text-[9px] opacity-40">Wipe Folder</div>
                         </button>
                         <button className={`p-4 rounded-[22px] border text-left space-y-1 transition-all active:scale-95 ${
                           isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-black/5"
                         }`}>
                           <div className="text-destructive"><AlertTriangle className="w-5 h-5" /></div>
                           <div className="text-[10px] font-black uppercase">Maint. Mode</div>
                           <div className="text-[9px] opacity-40">Lock Everything</div>
                         </button>
                         <button className={`p-4 rounded-[22px] border text-left space-y-1 transition-all active:scale-95 ${
                           isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-black/5"
                         }`}>
                           <div className="text-blue-500"><Download className="w-5 h-5" /></div>
                           <div className="text-[10px] font-black uppercase">Export Data</div>
                           <div className="text-[9px] opacity-40">Backup Room</div>
                         </button>
                      </div>
                   </div>

                   <div className="p-6 rounded-[28px] border bg-primary/5 border-primary/10">
                      <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Room Health</h3>
                      <div className="space-y-4">
                         <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold">
                               <span className="opacity-60 uppercase">Sync Stability</span>
                               <span>99.9%</span>
                            </div>
                            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                               <div className="h-full bg-primary w-[99%]" />
                            </div>
                         </div>
                         <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold">
                               <span className="opacity-60 uppercase">Cloud Usage</span>
                               <span>24%</span>
                            </div>
                            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                               <div className="h-full bg-primary w-[24%]" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ── Status Bar ── */}
      <footer className={`h-8 shrink-0 border-t flex items-center justify-between px-4 text-[9px] font-black uppercase tracking-widest z-10 ${
        isDarkMode ? "bg-[#202c33] border-white/5 text-white/40" : "bg-white border-black/5 text-black/40"
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            System Secure
          </div>
          <div className="flex items-center gap-1.5">
             {isFrozen ? <Lock className="w-3 h-3 text-primary" /> : <Unlock className="w-3 h-3" />}
             {isFrozen ? "Room Frozen" : "Room Active"}
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span>Session: {new Date().toLocaleDateString()}</span>
           <span className="text-primary opacity-100">Ovii Cloud v2.0</span>
        </div>
      </footer>
    </div>
  );
}
