import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Users, Shield, Zap, AlertTriangle, 
  Terminal, BarChart3, HardDrive, Smartphone, 
  Globe, Cpu, Database, Signal, Clock, X,
  Trash2, Lock, Unlock, Eye, EyeOff, RefreshCw,
  Power, ChevronRight, Settings, Info, Bell,
  Search, Filter, LayoutGrid, List
} from "lucide-react";
import { 
  collection, query, onSnapshot, doc, getDoc, 
  deleteDoc, setDoc, getDocs, writeBatch, serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ChampProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  msgs: any[];
}

export function Champ({ isOpen, onClose, isDarkMode, msgs }: ChampProps) {
  const [activeTab, setActiveTab] = useState<"presence" | "health" | "moderation" | "events" | "analytics" | "device" | "emergency">("presence");
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<any>({
    activeUsers: 0,
    msgThroughput: 0,
    mediaStatus: "Stable",
    syncLatency: "12ms",
    notificationHealth: "Healthy",
    websocketIntegrity: "100%",
    firebaseStatus: "Operational",
    storageLoad: "12%"
  });
  const [eventLogs, setEventLogs] = useState<any[]>([]);
  const [deviceQuality, setDeviceQuality] = useState<any>(null);

  // Subscribe to presence
  useEffect(() => {
    if (!isOpen) return;
    const q = query(collection(db, "ovii", "ovii-room", "presence"));
    const unsub = onSnapshot(q, (snapshot) => {
      const users: any[] = [];
      const now = Date.now();
      snapshot.forEach(d => {
        const data = d.data();
        const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
        const isOnline = now - lastSeen < 30000;
        users.push({ 
          id: d.id, 
          ...data, 
          isOnline,
          lastSeenFormatted: lastSeen ? new Date(lastSeen).toLocaleTimeString() : "N/A"
        });
      });
      setOnlineUsers(users);
      setHealthMetrics((prev: any) => ({ ...prev, activeUsers: users.length }));
    });

    // Mock initial events
    setEventLogs([
      { id: 1, type: "system", message: "CHAMP Operational Layer Initialized", severity: "info", time: new Date() },
      { id: 2, type: "network", message: "Firebase connection established", severity: "success", time: new Date() },
    ]);

    return () => unsub();
  }, [isOpen]);

  // Detect device intelligence
  useEffect(() => {
    if (!isOpen) return;
    const detect = () => {
      try {
        const ram = (navigator as any).deviceMemory || "Unknown";
        const cores = navigator.hardwareConcurrency || "Unknown";
        const conn = (navigator as any).connection || {};
        const isLowEnd = (typeof ram === 'number' && ram <= 4) || (typeof cores === 'number' && cores <= 4);
        
        setDeviceQuality({
          ram,
          cores,
          effectiveType: conn.effectiveType || "N/A",
          downlink: conn.downlink || "N/A",
          rtt: conn.rtt || "N/A",
          isLowEnd,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
      } catch (e) {}
    };
    detect();
  }, [isOpen]);

  if (!isOpen) return null;

  const NavItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
        activeTab === id 
          ? "bg-primary text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
          : "text-white/40 hover:text-white/70 hover:bg-white/5"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex flex-col p-4 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase italic">CHAMP</h1>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Operational Intelligence Layer</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-all active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 min-h-0 bg-[#0a0a0a] border border-white/10 rounded-[32px] flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Navigation */}
        <div className="flex items-center gap-2 p-4 border-b border-white/5 overflow-x-auto scrollbar-hide shrink-0 z-10">
          <NavItem id="presence" icon={Users} label="Presence" />
          <NavItem id="health" icon={Activity} label="Health" />
          <NavItem id="moderation" icon={Shield} label="Mod" />
          <NavItem id="events" icon={Terminal} label="Events" />
          <NavItem id="analytics" icon={BarChart3} label="Stats" />
          <NavItem id="device" icon={Smartphone} label="Device" />
          <NavItem id="emergency" icon={AlertTriangle} label="Danger" />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {/* 1. LIVE PRESENCE GRID */}
            {activeTab === "presence" && (
              <motion.div
                key="presence"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {onlineUsers.map(user => (
                  <div key={user.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3 group hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-white/10" alt="" />
                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a] ${user.isOnline ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-white/20'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-black text-white truncate">{user.name}</div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{user.isOnline ? "Active Session" : "Idle"}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-[8px] text-white/30 uppercase font-bold">Last Seen</div>
                        <div className="text-[10px] text-white/80 font-mono">{user.lastSeenFormatted}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-[8px] text-white/30 uppercase font-bold">State</div>
                        <div className="text-[10px] text-white/80 flex items-center gap-1.5">
                          {user.typing ? <span className="text-emerald-400 animate-pulse font-bold">Typing</span> : 
                           user.recording ? <span className="text-red-400 animate-pulse font-bold">Recording</span> : "Quiet"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {onlineUsers.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-20">
                    <Users className="w-16 h-16 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest">No active sessions detected</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. ROOM HEALTH ENGINE */}
            {activeTab === "health" && (
              <motion.div
                key="health"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Object.entries(healthMetrics).map(([key, val]: [string, any]) => (
                  <div key={key} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    </div>
                    <div className="text-2xl font-mono text-white font-black tracking-tighter">{val}</div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 3. MODERATION LAYER */}
            {activeTab === "moderation" && (
              <motion.div
                key="moderation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Moderation Controls
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: "Purge Inactive Messages", desc: "Clear all messages older than 24h", icon: Trash2, color: "text-red-500" },
                    { label: "Force Sync Room", desc: "Re-trigger presence for all users", icon: RefreshCw, color: "text-blue-500" },
                    { label: "Media Lockdown", desc: "Disable all media uploads temporarily", icon: EyeOff, color: "text-orange-500" },
                    { label: "Maintenance Mode", desc: "Set room to read-only for 5 mins", icon: Lock, color: "text-primary" },
                  ].map(tool => (
                    <button key={tool.label} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left group">
                      <tool.icon className={`w-8 h-8 mb-4 ${tool.color}`} />
                      <div className="text-sm font-bold text-white mb-1">{tool.label}</div>
                      <div className="text-[10px] text-white/40 leading-relaxed font-medium uppercase tracking-wider">{tool.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. PINNED EVENT INTELLIGENCE */}
            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 font-mono"
              >
                {eventLogs.map(log => (
                  <div key={log.id} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px]">
                    <span className="text-white/30 shrink-0">[{log.time.toLocaleTimeString()}]</span>
                    <span className={`font-black uppercase shrink-0 ${
                      log.severity === 'success' ? 'text-emerald-500' : 
                      log.severity === 'error' ? 'text-red-500' : 'text-primary'
                    }`}>{log.severity}</span>
                    <span className="text-white/80">{log.message}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 p-3 text-[11px] animate-pulse">
                  <span className="text-white/30">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-primary font-black uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" /> LISTENING FOR EVENTS...
                  </span>
                </div>
              </motion.div>
            )}

            {/* 5. CHAMP ANALYTICS */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Message Distribution (24h)</h4>
                    <div className="h-40 flex items-end gap-2 px-2">
                      {[40, 70, 45, 90, 65, 30, 55, 85, 50, 75, 40, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className="absolute bottom-0 inset-x-0 bg-primary rounded-t-lg group-hover:bg-primary/80 transition-colors" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Media Type Ratio</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Text", p: 70, color: "bg-emerald-500" },
                        { label: "Images", p: 15, color: "bg-blue-500" },
                        { label: "Voice", p: 10, color: "bg-red-500" },
                        { label: "Files", p: 5, color: "bg-primary" },
                      ].map(item => (
                        <div key={item.label} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-white/60">
                            <span>{item.label}</span>
                            <span>{item.p}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.p}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. DEVICE INTELLIGENCE */}
            {activeTab === "device" && deviceQuality && (
              <motion.div
                key="device"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {[
                  { label: "Processor Cores", val: deviceQuality.cores, icon: Cpu },
                  { label: "Device RAM", val: `${deviceQuality.ram}GB`, icon: HardDrive },
                  { label: "Network Type", val: deviceQuality.effectiveType, icon: Signal },
                  { label: "Connection Speed", val: `${deviceQuality.downlink} Mbps`, icon: Globe },
                  { label: "Round Trip Time", val: `${deviceQuality.rtt}ms`, icon: Clock },
                  { label: "Performance Mode", val: deviceQuality.isLowEnd ? "Eco / Low-End" : "Performance", icon: Zap },
                ].map(info => (
                  <div key={info.label} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[8px] text-white/30 uppercase font-black tracking-widest">{info.label}</div>
                      <div className="text-sm font-black text-white">{info.val}</div>
                    </div>
                  </div>
                ))}
                {deviceQuality.isLowEnd && (
                  <div className="col-span-full p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-4">
                    <Info className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-primary uppercase">Low-End Device Optimization Active</div>
                      <div className="text-[10px] text-primary/70 uppercase font-medium tracking-wider">Animations and blur reduced to preserve stability</div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 7. EMERGENCY OPERATIONS PANEL */}
            {activeTab === "emergency" && (
              <motion.div
                key="emergency"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-12 space-y-8"
              >
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-red-500/20 border-2 border-red-500/40 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Power className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight italic">Emergency Lockdown</h3>
                  <p className="text-xs text-white/40 uppercase font-medium tracking-[0.2em]">Authorized personnel only. Destructive actions follow.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  <button className="p-6 rounded-[24px] bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group flex flex-col items-center text-center">
                    <Lock className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-black text-white mb-1 uppercase">Freeze Ecosystem</div>
                    <div className="text-[10px] text-red-500/60 uppercase font-bold tracking-widest">Global read-only mode</div>
                  </button>
                  <button className="p-6 rounded-[24px] bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group flex flex-col items-center text-center">
                    <Trash2 className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-black text-white mb-1 uppercase">Wipe Presence</div>
                    <div className="text-[10px] text-red-500/60 uppercase font-bold tracking-widest">Invalidate all sessions</div>
                  </button>
                  <button className="p-6 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group flex flex-col items-center text-center">
                    <RefreshCw className="w-8 h-8 text-white/60 mb-4 group-hover:rotate-180 transition-transform duration-700" />
                    <div className="text-sm font-black text-white mb-1 uppercase">Restart Signal</div>
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Re-initialize SSE layers</div>
                  </button>
                  <button className="p-6 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group flex flex-col items-center text-center">
                    <Database className="w-8 h-8 text-white/60 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-black text-white mb-1 uppercase">Clear Cache</div>
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Global media reset</div>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4 text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM SYNCED
            </div>
            <div className="flex items-center gap-2">
              <Signal className="w-3 h-3" />
              LATENCY: 12MS
            </div>
          </div>
          <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
            NOVARIO OS // BUILD 2.4.1
          </div>
        </div>
      </div>
    </motion.div>
  );
}
