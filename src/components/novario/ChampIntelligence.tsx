import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Activity, 
  Users, 
  Zap, 
  AlertTriangle, 
  BarChart3, 
  Cpu, 
  Terminal, 
  X, 
  Settings, 
  Eye, 
  Trash2, 
  Lock, 
  Cloud, 
  Database, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  RefreshCw,
  Power,
  Layers,
  History
} from "lucide-react";

interface ChampIntelligenceProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  roomName: string;
}

export function ChampIntelligence({ isOpen, onClose, isDarkMode, roomName }: ChampIntelligenceProps) {
  const [activeModule, setActiveModule] = useState<string>("presence");
  const [systemLogs, setSystemLogs] = useState<{id: string, type: string, text: string, time: string, severity: 'info' | 'warn' | 'error'}[]>([]);
  const [heartbeat, setHeartbeat] = useState(0);

  // Simulation effect for heartbeat and logs
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setHeartbeat(prev => (prev + 1) % 100);
    }, 1000);

    const initialLogs = [
      { id: '1', type: 'system', text: 'Operational Intelligence Layer initialized', time: '10:17:05', severity: 'info' as const },
      { id: '2', type: 'network', text: 'Firebase Realtime Node: Synchronized', time: '10:17:10', severity: 'info' as const },
      { id: '3', type: 'security', text: 'E2EE Protocol: Verified', time: '10:17:12', severity: 'info' as const },
    ];
    setSystemLogs(initialLogs);

    return () => clearInterval(interval);
  }, [isOpen]);

  const modules = [
    { id: "presence", label: "Presence", icon: Users },
    { id: "health", label: "Health", icon: Activity },
    { id: "moderation", label: "Moderation", icon: Shield },
    { id: "events", label: "Events", icon: Terminal },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "device", label: "Device", icon: Cpu },
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
    { id: "build", label: "Build Book", icon: History },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case "presence":
        return <PresenceModule />;
      case "health":
        return <HealthModule />;
      case "moderation":
        return <ModerationModule />;
      case "events":
        return <EventsModule logs={systemLogs} />;
      case "analytics":
        return <AnalyticsModule />;
      case "device":
        return <DeviceModule />;
      case "emergency":
        return <EmergencyModule />;
      case "build":
        return <BuildModule />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full h-full md:max-w-6xl md:h-[90vh] bg-[#0b141a] border border-white/10 shadow-2xl flex flex-col overflow-hidden md:rounded-[32px] text-white font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111b21]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-black uppercase tracking-[0.2em]">Champ</h1>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500/80 border border-orange-500/20">Operational Intel</span>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Room Index: {roomName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Stable</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <span className="text-[10px] font-mono text-white/40">{heartbeat}% Sync</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <X className="w-5 h-5 opacity-40" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-16 sm:w-64 border-r border-white/10 bg-[#111b21] flex flex-col py-4">
              <div className="px-4 mb-4 hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Command Center</p>
              </div>
              <div className="flex-1 space-y-1 px-2">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveModule(m.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        activeModule === m.id 
                        ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                        : "text-white/40 hover:bg-white/5 hover:text-white/60"
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold hidden sm:block">{m.label}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="px-4 mt-auto hidden sm:block">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Network Status</span>
                    <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin-slow" />
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500" 
                      animate={{ width: ["30%", "85%", "60%", "95%"] }} 
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-[#0b141a] relative">
              <div className="p-6 md:p-8 max-w-5xl mx-auto">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderModule()}
                </motion.div>
              </div>
              
              {/* Tactical Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none" 
                   style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Presence Module ────────────────────────────────────────────────────────
function PresenceModule() {
  const sessions = [
    { id: 'S1', name: 'User_4922', device: 'Mobile', browser: 'Chrome', duration: '12m 4s', state: 'Typing', icon: Smartphone },
    { id: 'S2', name: 'User_1033', device: 'Desktop', browser: 'Safari', duration: '45m 12s', state: 'Idle', icon: Smartphone },
    { id: 'S3', name: 'User_8842', device: 'Mobile', browser: 'Firefox', duration: '2m 1s', state: 'Recording', icon: Smartphone },
    { id: 'S4', name: 'User_2291', device: 'Desktop', browser: 'Chrome', duration: '1h 5m', state: 'Online', icon: Smartphone },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight">Live Presence Grid</h2>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            {sessions.length} Active Sessions
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {sessions.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl bg-[#111b21] border border-white/10 hover:border-orange-500/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-white/80">{s.name}</div>
                  <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider">{s.id} · {s.device}</div>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                s.state === 'Recording' ? 'bg-red-500 text-white animate-pulse' :
                s.state === 'Typing' ? 'bg-emerald-500 text-white animate-pulse' :
                'bg-blue-500/20 text-blue-500'
              }`}>
                {s.state}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
              <div>
                <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Session Duration</div>
                <div className="text-xs font-mono">{s.duration}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Browser</div>
                <div className="text-xs font-bold">{s.browser}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Health Module ──────────────────────────────────────────────────────────
function HealthModule() {
  const metrics = [
    { label: "Sync Latency", value: "14ms", status: "Optimal", color: "emerald" },
    { label: "Throughput", value: "2.4k/m", status: "Stable", color: "emerald" },
    { label: "Firebase Load", value: "12%", status: "Optimal", color: "emerald" },
    { label: "Media Bucket", value: "88%", status: "Full", color: "orange" },
    { label: "WebSocket", value: "Active", status: "Connected", color: "emerald" },
    { label: "Push Nodes", value: "142", status: "Active", color: "blue" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-black uppercase tracking-tight">Room Health Engine</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#111b21] border border-white/10 shadow-lg">
            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{m.label}</div>
            <div className="text-2xl font-mono font-black mb-2">{m.value}</div>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full bg-${m.color}-500`} />
              <span className={`text-[10px] font-black uppercase tracking-widest text-${m.color}-500/80`}>{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-black/40 border border-white/5">
        <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
          <Activity className="w-4 h-4" /> Realtime Message Velocity
        </h3>
        <div className="h-40 flex items-end gap-1 px-2">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 100}%` }}
              transition={{ repeat: Infinity, duration: 1 + Math.random(), repeatType: "reverse" }}
              className="flex-1 bg-orange-500/40 rounded-t-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Moderation Module ──────────────────────────────────────────────────────
function ModerationModule() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-black uppercase tracking-tight">Moderation Layer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 group hover:border-orange-500/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
            <Trash2 className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-lg font-black uppercase mb-2">Purge Channel</h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">Permanently clear all non-pinned messages from the current room. This action generates a secure log.</p>
          <button className="px-6 py-3 rounded-xl bg-orange-500 text-white font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-orange-500/20">
            Execute Purge
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 group hover:border-blue-500/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-black uppercase mb-2">Freeze Protocol</h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">Place the room in read-only mode. Users will be unable to send new messages or media until unfrozen.</p>
          <button className="px-6 py-3 rounded-xl bg-blue-500 text-white font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            Enable Freeze
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 group hover:border-red-500/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
            <Eye className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-black uppercase mb-2">Media Disable</h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">Instantly disable image, video, and voice uploads for the entire ecosystem. Text remains functional.</p>
          <button className="px-6 py-3 rounded-xl bg-red-500 text-white font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-red-500/20">
            Kill Media Pipe
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group hover:border-emerald-500/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
            <Database className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-lg font-black uppercase mb-2">Cache Reset</h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">Force-clear client-side media caches for all active sessions to resolve potential corruption.</p>
          <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
            Reset Cache
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Events Module ──────────────────────────────────────────────────────────
function EventsModule({ logs }: { logs: any[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black uppercase tracking-tight">Pinned Event Intelligence</h2>
      
      <div className="rounded-2xl border border-white/10 bg-[#111b21] overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Realtime Operational Stream</div>
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> Live
          </span>
        </div>
        <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto scrollbar-hide">
          {logs.map((log) => (
            <div key={log.id} className="p-4 flex gap-4 hover:bg-white/5 transition-colors">
              <div className="font-mono text-[10px] text-white/20 pt-0.5 shrink-0">{log.time}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{log.type}</span>
                  {log.severity === 'error' && <AlertCircle className="w-3 h-3 text-red-500" />}
                </div>
                <p className="text-xs font-medium text-white/80">{log.text}</p>
              </div>
            </div>
          ))}
          <div className="p-4 flex gap-4 bg-orange-500/5">
            <div className="font-mono text-[10px] text-orange-500/40 pt-0.5 shrink-0">10:17:15</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">Security</span>
                <Shield className="w-3 h-3 text-orange-500" />
              </div>
              <p className="text-xs font-bold text-orange-500">Champ Admin Session: Established</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Module ───────────────────────────────────────────────────────
function AnalyticsModule() {
  const stats = [
    { label: "Avg Session", value: "18.4m" },
    { label: "Media Ratio", value: "62%" },
    { label: "Peak Load", value: "11:30" },
    { label: "Low-End HW", value: "45%" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-black uppercase tracking-tight">Champ Analytics</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[#111b21] border border-white/10 text-center">
            <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{s.label}</div>
            <div className="text-xl font-mono font-black">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-black/40 border border-white/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-6">Device Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "Android Mobile", val: "72%", color: "emerald" },
              { label: "iOS Mobile", val: "15%", color: "blue" },
              { label: "Windows PC", val: "8%", color: "orange" },
              { label: "Others", val: "5%", color: "white" },
            ].map((d, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                  <span className="opacity-60">{d.label}</span>
                  <span>{d.val}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-${d.color}-500/60`} style={{ width: d.val }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-orange-500/60" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest mb-2">Heatmap Intelligence</h3>
          <p className="text-[10px] text-white/30 uppercase tracking-wider leading-relaxed">Traffic analysis indicates stable communication node density across all regions.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Device Module ──────────────────────────────────────────────────────────
function DeviceModule() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-black uppercase tracking-tight">Device Intelligence</h2>
      
      <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#111b21] to-[#0b141a] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">System Detected</div>
              <h3 className="text-xl font-black">Modern Hardware Hub</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Memory Allocation</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500/60 w-[42%]" />
                  </div>
                  <span className="text-xs font-mono">4.2GB / 8GB</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">CPU Integrity</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/60 w-[15%]" />
                  </div>
                  <span className="text-xs font-mono">15% Load</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
                <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Battery</div>
                <div className="text-sm font-black text-emerald-500">88%</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
                <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Network</div>
                <div className="text-sm font-black text-blue-500">4G / Stable</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">
          Optimization Active: Hardware Acceleration Engaged
        </span>
      </div>
    </div>
  );
}

// ─── Emergency Module ───────────────────────────────────────────────────────
function EmergencyModule() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-red-500">Emergency Operations</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="p-8 rounded-3xl bg-red-500 text-white font-black uppercase text-sm tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all active:scale-95 border-4 border-red-400/50">
          Global Freeze
        </button>
        <button className="p-8 rounded-3xl bg-orange-500 text-white font-black uppercase text-sm tracking-widest shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all active:scale-95 border-4 border-orange-400/50">
          Invalidate Sessions
        </button>
        <button className="p-8 rounded-3xl bg-black/60 border-2 border-red-500/30 text-red-500 font-black uppercase text-sm tracking-widest transition-all active:scale-95">
          Emergency Restart
        </button>
        <button className="p-8 rounded-3xl bg-black/60 border-2 border-orange-500/30 text-orange-500 font-black uppercase text-sm tracking-widest transition-all active:scale-95">
          Purge Media Node
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-red-500/60 leading-relaxed">
          WARNING: Emergency controls bypass all standard confirmation flows and take immediate effect across the entire ecosystem.
        </p>
      </div>
    </div>
  );
}

// ─── Build Module ───────────────────────────────────────────────────────────
function BuildModule() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-black uppercase tracking-tight">Build Book Integration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#111b21] border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest">Protocol Evolution</h3>
          </div>
          <div className="space-y-6">
            {[
              { v: "v2.4.1", label: "Intelligence Layer", date: "Today", active: true },
              { v: "v2.3.0", label: "E2EE Synchronization", date: "Yesterday", active: false },
              { v: "v2.2.5", label: "Media Pipeline 2.0", date: "3d ago", active: false },
            ].map((b, i) => (
              <div key={i} className={`flex items-center gap-4 ${b.active ? "opacity-100" : "opacity-40"}`}>
                <div className="text-[10px] font-mono w-12">{b.v}</div>
                <div className="flex-1">
                  <div className="text-[11px] font-black uppercase tracking-tight">{b.label}</div>
                  <div className="text-[9px] font-medium">{b.date}</div>
                </div>
                {b.active && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#111b21] border border-white/10 flex flex-col justify-center">
          <div className="text-center space-y-4">
            <Zap className="w-12 h-12 text-primary mx-auto opacity-40" />
            <h3 className="text-xs font-black uppercase tracking-widest opacity-40">Deployment Monitor</h3>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">Awaiting next synchronization cycle...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
