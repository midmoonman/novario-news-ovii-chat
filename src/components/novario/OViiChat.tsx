import { useEffect, useRef, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs, writeBatch
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Paperclip, Image as ImageIcon, Send, Trash2, Folder, Reply, Download, X, Play, Pause, XCircle, ArrowLeftRight, ChevronDown, ChevronLeft, Sun, Moon, MoreVertical, ShieldOff, Clock, RotateCw, Phone, CheckCircle2, AlertCircle, Info, Pencil, Users2, File, FileText, Music, Video, FileArchive, History, Copy } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import changelogData from "../../lib/changelog.json";
import historyData from "../../lib/history.json";

// ─── Link Preview ────────────────────────────────────────────────────────────
const LinkPreview = ({ url, isDarkMode }: { url: string, isDarkMode: boolean }) => {
  const [preview, setPreview] = useState<{ title?: string; description?: string; image?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const fetchMetadata = async () => {
      try {
        // Try Microlink first - excellent for social media (Instagram, Reels, etc.)
        const microRes = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        if (microRes.ok) {
          const data = await microRes.json();
          if (alive && data.status === "success") {
            setPreview({
              title: data.data.title,
              description: data.data.description,
              image: data.data.image?.url || data.data.logo?.url || data.data.screenshot?.url
            });
            setLoading(false);
            return;
          }
        }

        // Fallback to manual parsing via allorigins
        const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxy);
        if (!res.ok) throw new Error("Fetch failed");
        const html = await res.text();

        if (!alive) return;

        const getMeta = (prop: string) => {
          const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["'](?:og:|twitter:)?${prop}["'][^>]+content=["']([^"']+)["']`, 'i'))
            || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:|twitter:)?${prop}["']`, 'i'));
          return match?.[1] || "";
        };

        const title = (getMeta("title") || html.match(/<title>([^<]+)<\/title>/i)?.[1] || "").trim();
        const description = (getMeta("description") || "").trim();
        const image = getMeta("image");

        if (title || description || image) {
          setPreview({ title, description, image });
        }
      } catch (e) {
        // Silently fail for previews
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchMetadata();
    return () => { alive = false; };
  }, [url]);

  if (loading) return (
    <div className={`mt-2 rounded-xl p-2 border animate-pulse flex gap-3 mb-2 ${isDarkMode ? "bg-black/20 border-white/5" : "bg-black/5 border-black/5"}`}>
      <div className="w-12 h-12 rounded-lg bg-muted/40 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 bg-muted/40 rounded" />
        <div className="h-2 w-full bg-muted/40 rounded" />
      </div>
    </div>
  );
  if (!preview) return null;

  return (
    <motion.a
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block mt-2 mb-1 rounded-xl overflow-hidden border transition-all hover:brightness-110 active:scale-[0.98] group/link ${isDarkMode ? "bg-[#0b141a]/60 border-white/5" : "bg-black/5 border-black/10"
        } no-underline max-w-[280px] sm:max-w-[320px]`}
    >
      {preview.image && (
        <div className="relative aspect-[1.91/1] overflow-hidden">
          <img src={preview.image} alt="" className="w-full h-full object-cover transition-transform group-hover/link:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="p-2.5">
        <div className={`text-[12px] font-bold truncate leading-tight ${isDarkMode ? "text-[#e9edef]" : "text-[#111b21]"}`}>{preview.title || "Link"}</div>
        {preview.description && <div className={`text-[10px] line-clamp-2 mt-1 opacity-70 leading-normal ${isDarkMode ? "text-white" : "text-black"}`}>{preview.description}</div>}
        <div className="flex items-center gap-1 mt-2 opacity-40">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
          <span className="text-[9px] font-bold uppercase tracking-widest truncate">
            {(() => {
              try { return new URL(url).hostname; }
              catch { return "Link"; }
            })()}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  name?: string;
  type: "text" | "image" | "voice" | "video" | "audio" | "file";
  content: string;
  caption?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt?: Timestamp;
  status?: "sending" | "sent" | "delivered" | "read";
  replyTo?: { id: string, content: string, avatar: string, name?: string };
  isEdited?: boolean;
  isDeleted?: boolean;
  deletedFor?: string[];
};

const ROOM = "ovii-room";
const STOP_AUDIO_EVENT = "ovii_stop_audio";

// ─── Detect if we're on a touch/mobile device ───────────────────────────────
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const formatMessageDate = (date: Date) => {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString(undefined, { weekday: 'long' });
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatLastSeen = (timestamp: number | null | undefined) => {
  if (!timestamp) return "";
  const now = Date.now();

  const date = new Date(timestamp);
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const isToday = date.toDateString() === new Date().toDateString();
  const isYesterday = date.toDateString() === new Date(Date.now() - 86400000).toDateString();
  
  const dayStr = isToday ? "today" : isYesterday ? "yesterday" : 
                 date.toLocaleDateString(undefined, { day: "numeric", month: "short" });

  return `last seen ${dayStr} at ${timeStr}`;
};

// ─── AudioPlayer ─────────────────────────────────────────────────────────────
const AudioPlayer = ({ src, id, mine, status, createdAt, isDarkMode }: { src: string, id: string, mine: boolean, status?: string, createdAt?: any, isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // WaveSurfer needs a bit of time to ensure container has dimensions
    let ws: WaveSurfer | null = null;

    const init = () => {
      try {
        ws = WaveSurfer.create({
          container: containerRef.current!,
          waveColor: isDarkMode ? "#3b4a54" : "#d1d7db",
          progressColor: isDarkMode ? "#34b7f1" : "#34b7f1",
          cursorWidth: 0,
          barWidth: 2,
          barGap: 3,
          barRadius: 4,
          height: 32,
          normalize: true,
          interact: true,
          hideScrollbar: true,
        });

        ws.on("ready", () => {
          setDuration(ws!.getDuration());
          setIsReady(true);
          setHasError(false);
        });

        ws.on("audioprocess", () => setCurrentTime(ws!.getCurrentTime()));
        ws.on("finish", () => { setPlaying(false); setCurrentTime(ws!.getDuration()); });
        ws.on("error", (err) => {
          console.error("WaveSurfer error:", err);
          setHasError(true);
        });

        ws.load(src);
        waveRef.current = ws;
      } catch (err) {
        console.error("WaveSurfer init error:", err);
        setHasError(true);
      }
    };

    // Use ResizeObserver to handle container size changes which can cause blank canvas
    const observer = new ResizeObserver(() => {
      if (ws && isReady) {
        // WaveSurfer 7 handles resize automatically but we can trigger redraw if needed
      }
    });
    observer.observe(containerRef.current);

    init();

    const stopOthers = (e: any) => {
      if (e.detail !== id && ws?.isPlaying()) { ws.pause(); setPlaying(false); }
    };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);

    return () => {
      window.removeEventListener(STOP_AUDIO_EVENT, stopOthers);
      observer.disconnect();
      if (ws) ws.destroy();
    };
  }, [src, id, isDarkMode]);

  const toggle = () => {
    if (!waveRef.current) return;
    if (playing) { waveRef.current.pause(); }
    else { window.dispatchEvent(new CustomEvent(STOP_AUDIO_EVENT, { detail: id })); waveRef.current.play(); }
    setPlaying(!playing);
  };

  const toggleSpeed = () => {
    if (!waveRef.current) return;
    const next = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    waveRef.current.setPlaybackRate(next);
    setSpeed(next);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss < 10 ? "0" : ""}${ss}`;
  };

  const timeStr = createdAt?.toDate?.()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "";

  return (
    <div className={`flex items-center gap-3 w-full p-3.5 rounded-[22px] overflow-hidden transition-all min-w-[280px] ${mine
      ? (isDarkMode ? "bg-[#005c4b] text-white" : "bg-[#dcf8c6] text-black")
      : (isDarkMode ? "bg-[#202c33] text-white" : "bg-white text-black")
      }`}>
      <div className="relative shrink-0">
        <button
          onClick={toggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 hover:bg-black/5 ${isDarkMode ? "text-white" : "text-[#54656f]"
            }`}
        >
          {playing ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </button>
        <div className={`absolute bottom-0 right-0 w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 ${isDarkMode ? "bg-[#202c33] border-[#005c4b]" : "bg-white border-[#dcf8c6]"
          }`}>
          <Mic className="w-3 h-3 text-[#00a884] fill-[#00a884]/10" />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="relative w-full" style={{ height: 32 }}>
          <div
            className={`w-full transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
            style={{ height: 32, overflow: "hidden" }}
            ref={containerRef}
          />
          {!isReady && !hasError && (
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="w-full flex items-center gap-1 h-full opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={`flex-1 bg-current rounded-full`} style={{ height: `${Math.random() * 60 + 20}%` }} />
                ))}
              </div>
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-start text-[10px] opacity-40 italic">
              Failed to load waveform
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-0.5 mt-1.5 gap-2">
          <div className="flex items-center gap-2 min-w-0 opacity-60">
            <span className="text-[10px] font-normal tabular-nums whitespace-nowrap">
              {fmt(playing ? currentTime : duration)}
            </span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2.5 shrink-0">
            {timeStr && (
              <span className="text-[11px] font-['Inter'] font-extralight uppercase tracking-tight whitespace-nowrap truncate opacity-40 mr-1">
                {timeStr}
              </span>
            )}
            <button
              onClick={toggleSpeed}
              className={`text-[9px] font-normal h-5 px-2 rounded-full border transition-all active:scale-90 flex items-center justify-center shrink-0 ${isDarkMode
                ? "bg-white/10 border-white/5 text-white/80 hover:bg-white/20"
                : "bg-black/5 border-black/5 text-black/70 hover:bg-black/10"
                }`}
            >
              {speed}x
            </button>
            {mine && (
              <div className="opacity-50 shrink-0 scale-90">
                <MsgTick status={status} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MsgTick ─────────────────────────────────────────────────────────────────
const MsgTick = ({ status }: { status?: string }) => {
  if (status === "sending") return <svg className="w-3 h-3 opacity-40" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>;
  if (status === "sent") return (
    <svg className="w-[13px] h-[9px] opacity-40" viewBox="0 0 12 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "delivered") return (
    <svg className="w-[17px] h-[9px] opacity-40" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "read") return (
    <svg className="w-[17px] h-[9px] text-[#53bdeb]" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
};

// ─── RecordingVisualizer ──────────────────────────────────────────────────────
const RecordingVisualizer = () => (
  <div className="flex items-center gap-0.5 h-4">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 4] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        className="w-1 bg-primary rounded-full"
      />
    ))}
  </div>
);

// ─── MediaList (formerly FilesList) ───────────────────────────────────────────
function MediaList({ msgs, uid, downloadFile, isDarkMode, setSelectedImage }: { msgs: Msg[], uid: string | null, downloadFile: (u: string, i: string, t: string) => void, isDarkMode: boolean, setSelectedImage: (url: string) => void }) {
  const mediaMsgs = msgs.filter(m => ["image", "voice", "video", "audio", "file"].includes(m.type));
  if (mediaMsgs.length === 0) return <p className="text-muted-foreground text-center mt-10 text-xs font-medium opacity-50">No files saved yet.</p>;

  const groups = mediaMsgs.reduce((acc, m) => {
    const date = m.createdAt?.toDate().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) || "Today";
    if (!acc[date]) acc[date] = [];
    acc[date].push(m);
    return acc;
  }, {} as Record<string, Msg[]>);

  return (
    <>
      {Object.entries(groups).map(([date, items]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest pl-1">{date}</h3>
          {items.map(m => (
            <div key={m.id} className={`p-2.5 rounded-2xl flex items-center gap-4 lg:gap-6 shadow-sm transition-all group border ${isDarkMode
                ? "bg-card/30 border-white/5 hover:bg-card/50"
                : "bg-white border-black/5 hover:bg-black/5 shadow-md"
              }`}>
              <div className="flex-1 min-w-0">
                {m.type === "voice" || m.type === "audio" ? (
                  <div className="flex-1">
                    <AudioPlayer src={m.content} id={m.id} mine={m.uid === uid} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                    {m.fileName && <div className={`text-[10px] mt-1 truncate px-2 opacity-50 ${isDarkMode ? "text-white" : "text-black"}`}>{m.fileName}</div>}
                  </div>
                ) : m.type === "image" ? (
                  <div className="flex items-center gap-3 p-1">
                    <img src={m.content} className="w-12 h-12 rounded-lg object-cover shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedImage(m.content)} alt="" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] font-bold truncate ${isDarkMode ? "text-white/80" : "text-black/80"}`}>{m.fileName || "Photo"}</div>
                      <div className="text-[10px] opacity-40 uppercase">{m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}>
                      {m.type === "video" ? <Video className="w-6 h-6 text-primary" /> : 
                       m.mimeType?.includes("pdf") ? <FileText className="w-6 h-6 text-red-500" /> :
                       m.mimeType?.includes("zip") || m.mimeType?.includes("rar") ? <FileArchive className="w-6 h-6 text-orange-500" /> :
                       <File className="w-6 h-6 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] font-bold truncate ${isDarkMode ? "text-white/80" : "text-black/80"}`}>{m.fileName || "Document"}</div>
                      <div className="text-[10px] opacity-40 uppercase">
                        {m.fileSize ? `${(m.fileSize / (1024 * 1024)).toFixed(1)} MB • ` : ""}
                        {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {m.type === "image" && (
                  <button
                    onClick={() => setSelectedImage(m.content)}
                    className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-all shrink-0"
                    aria-label="View photo"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                )}
                {m.type === "video" && (
                  <button
                    onClick={() => window.open(m.content, "_blank")}
                    className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-all shrink-0"
                    aria-label="Play video"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => downloadFile(m.content, m.fileName || m.id, m.type)}
                  className="p-2.5 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-all shrink-0 shadow-sm"
                  aria-label={`Download ${m.type}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingText, setUploadingText] = useState("");
  const [inputHeight, setInputHeight] = useState(44);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("ovii_dark_mode");
    return saved === null ? true : saved === "true";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recDuration, setRecDuration] = useState(0);
  const recTimerRef = useRef<any>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem("ovii_dark_mode", String(isDarkMode));
  }, [isDarkMode]);

  // -- Scroll to bottom on mount --
  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => scrollToBottom(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ── Viewport height: ONLY used on mobile to compensate for software keyboard ──
  // On desktop we let position:fixed + inset:0 do the work (no zoom whitespace).
  const [mobileKeyboardOffset, setMobileKeyboardOffset] = useState(0);

  const [deviceId] = useState(() => {
    let id = localStorage.getItem("ovii_device_id");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("ovii_device_id", id);
      localStorage.removeItem("ovii-avatar-choice");
    }
    return id;
  });

  const isReturning = !!localStorage.getItem("ovii-avatar-choice") && !!localStorage.getItem("ovii-name");
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem("ovii-avatar-choice") || "");
  const [name, setName] = useState<string>(() => localStorage.getItem("ovii-name") || "");
  const [showAvatarPicker, setShowAvatarPicker] = useState(!isReturning);
  const [inputName, setInputName] = useState(name);

  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [appNotifications, setAppNotifications] = useState<{ id: string, message: string, type: "success" | "error" | "info" }[]>([]);
  const [particles] = useState(() => Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  })));

  const addNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setAppNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAppNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const renderMessageContent = (content: string) => {
    if (!content) return null;
    // Regex for URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Regex for phone numbers (5+ digits, optionally starting with +)
    const phoneRegex = /(\+?\d{5,15})/g;

    const parts = content.split(/((?:https?:\/\/[^\s]+)|(?:\+?\d{5,15}))/g);

    return parts.map((part, i) => {
      if (!part) return null;
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#25d366] hover:brightness-110 break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      if (part.match(phoneRegex)) {
        return (
          <span
            key={i}
            className="underline font-bold cursor-pointer text-[#25d366] hover:brightness-110"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhone(part);
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [recordingUsers, setRecordingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Msg | null>(null);
  const [showFolder, setShowFolder] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<{ uid: string, name: string, avatar?: string }[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [systemMsgs, setSystemMsgs] = useState<{ id: string, text: string, ts: number, type: "join" | "leave" }[]>([]);
  const [otherLastSeen, setOtherLastSeen] = useState<number | null>(null);
  const [otherName, setOtherName] = useState<string | null>(null);
  const [otherOnline, setOtherOnline] = useState(false);
  const [otherAvatar, setOtherAvatar] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [logTab, setLogTab] = useState<"updates" | "history">("updates");
  const [historyLevel, setHistoryLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [showHistoryInfo, setShowHistoryInfo] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [contextMsg, setContextMsg] = useState<Msg | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // -- Android Gesture / History Handling (Thumb Rule) --
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // If any modal is open, close it and prevent navigation
      if (showLogs || showAvatarPicker || showFolder || selectedImage || selectedPhone || showClearConfirm || showMenu) {
        setShowLogs(false);
        setShowAvatarPicker(false);
        setShowFolder(false);
        setSelectedImage(null);
        setSelectedPhone(null);
        setShowClearConfirm(false);
        setShowMenu(false);
        // Push state back to prevent exit
        window.history.pushState({ modal: 'closed' }, "");
      }
    };

    // Push initial state
    window.history.pushState({ modal: 'closed' }, "");
    window.addEventListener("popstate", handlePopState);
    
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showLogs, showAvatarPicker, showFolder, selectedImage, selectedPhone, showClearConfirm, showMenu]);

  // -- Stable layout handling (anti-jitter) --
  useEffect(() => {
    if (showLogs || showAvatarPicker || showFolder || selectedImage) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Adjust if scrollbar width is known
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [showLogs, showAvatarPicker, showFolder, selectedImage]);

  // -- Back gesture handling for image preview --
  useEffect(() => {
    if (selectedImage) {
      window.history.pushState({ modal: "image" }, "");
      const handlePop = () => setSelectedImage(null);
      window.addEventListener("popstate", handlePop);
      return () => window.removeEventListener("popstate", handlePop);
    }
  }, [selectedImage]);
  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowNoLockSubmenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [noLockUntil, setNoLockUntil] = useState<number | null>(() => {
    const saved = localStorage.getItem("ovii_no_lock_until");
    return saved ? parseInt(saved) : null;
  });
  const [showNoLockSubmenu, setShowNoLockSubmenu] = useState(false);
  const prevOnlineRef = useRef<Map<string, string>>(new Map());

  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelRecRef = useRef(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef<number>(Date.now());
  const chunksRef = useRef<Blob[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (instant = false) => {
    if (!scrollRef.current) return;
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: instant ? "instant" : "smooth",
        });
      }
    };
    scroll();
    // Second pass for reliability
    setTimeout(scroll, 50);
  };

  // ── Auth + presence ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!avatar) return;
    let unsubMsgs = () => { };
    let unsubPresence = () => { };
    let alive = true;
    let heartbeatId: NodeJS.Timeout | null = null;
    let currentUid: string | null = null;

    const cleanupPresence = () => {
      if (!currentUid) return;
      deleteDoc(doc(db, "ovii", ROOM, "presence", currentUid)).catch(() => { });
    };
    const handleBeforeUnload = () => cleanupPresence();
    const handlePageHide = () => cleanupPresence();

    (async () => {
      try {
        const u = await ensureAnonAuth();
        if (!alive) return;
        currentUid = u.uid;

        const presCol = collection(db, "ovii", ROOM, "presence");
        const snap = await getDocs(presCol);
        const now = Date.now();
        for (const d of snap.docs) {
          const ts = (d.data().lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
          if (now - ts > 30_000 && d.id !== u.uid) await deleteDoc(d.ref).catch(() => { });
        }
        const fresh = await getDocs(presCol);
        const others = fresh.docs.filter((d) => d.id !== u.uid).length;
        if (others >= 2 - 0 && fresh.docs.length >= 2 && !fresh.docs.find((d) => d.id === u.uid)) {
          setError("Room is full (2/2). Try again later.");
          return;
        }

        await setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
          uid: u.uid, avatar, name, lastSeen: serverTimestamp(), typing: false, recording: false
        });
        setUid(u.uid);
        setCount(Math.min(2, fresh.docs.length + (fresh.docs.find((d) => d.id === u.uid) ? 0 : 1)));

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("pagehide", handlePageHide);

        heartbeatId = setInterval(() => {
          setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
            uid: u.uid, avatar, name, lastSeen: serverTimestamp(),
          }, { merge: true }).catch(() => { });
        }, 15_000);

        unsubPresence = onSnapshot(presCol, (s) => {
          const t: string[] = [];
          const r: string[] = [];
          const currentOnline: { uid: string, name: string, avatar?: string }[] = [];
          const currentOnlineIds = new Set<string>();
          const now = Date.now();

          s.forEach((d) => {
            const data = d.data();
            const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
            const isOnline = lastSeen > 0 && (now - lastSeen < 45_000); // 45s margin for heartbeat

            if (lastSeen > 0 && now - lastSeen > 60_000 && d.id !== u.uid) {
              deleteDoc(d.ref).catch(() => { });
              return;
            }

            currentOnline.push({ uid: d.id, name: data.name || "Unknown", avatar: data.avatar });
            currentOnlineIds.add(d.id);

            if (d.id !== u.uid) {
              if (data.typing) t.push(data.avatar);
              if (data.recording) r.push(data.avatar);
              setOtherName(data.name || "User");
              setOtherAvatar(data.avatar || null);
              setOtherLastSeen(lastSeen);
              setOtherOnline(isOnline);
            }
          });

          const othersOnline = [...currentOnlineIds].filter(id => id !== u.uid);
          if (othersOnline.length === 0) {
            setOtherOnline(false);
          }

          currentOnline.forEach(user => {
            if (user.uid !== u.uid && !prevOnlineRef.current.has(user.uid)) {
              const id = crypto.randomUUID();
              setSystemMsgs(prev => [...prev, { id, text: `${user.name} is online`, ts: Date.now(), type: "join" }]);
              setTimeout(() => setSystemMsgs(prev => prev.filter(m => m.id !== id)), 6000);
            }
          });
          if (prevOnlineRef.current.size > 0) {
            prevOnlineRef.current.forEach((prevName, prevUid) => {
              if (prevUid !== u.uid && !currentOnlineIds.has(prevUid)) {
                const id = crypto.randomUUID();
                setOtherLastSeen(Date.now());
                setSystemMsgs(prev => [...prev, { id, text: `${prevName} went offline`, ts: Date.now(), type: "leave" }]);
                setTimeout(() => setSystemMsgs(prev => prev.filter(m => m.id !== id)), 6000);
              }
            });
          }
          const nextMap = new Map<string, string>();
          currentOnline.forEach(user => nextMap.set(user.uid, user.name));
          prevOnlineRef.current = nextMap;

          setOnlineUsers(currentOnline);
          setTypingUsers(t);
          setRecordingUsers(r);
          setCount(currentOnline.length);
        });

        const q = query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "asc"));
        unsubMsgs = onSnapshot(q, { includeMetadataChanges: true }, (s) => {
          const list: Msg[] = s.docs.map((d) => {
            const data = d.data() as any;
            const msg: Msg = { id: d.id, ...data };
            if (d.metadata.hasPendingWrites && msg.uid === u.uid) msg.status = "sending";
            return msg;
          });
          setMsgs(list);
          setIsLoading(false);
          const tnow = Date.now();
          for (const m of list) {
            if (m.uid !== u.uid && m.status !== "read" && !s.metadata.hasPendingWrites) {
              setDoc(doc(db, "ovii", ROOM, "messages", m.id), { status: "read" }, { merge: true }).catch(() => { });
            }
            const ts = m.createdAt?.toMillis?.() ?? 0;
            if (!ts) continue;

            // Retention logic: 14 days for everything
            const limit = 14 * 24 * 60 * 60 * 1000;

            if (tnow - ts > limit) {
              deleteDoc(doc(db, "ovii", ROOM, "messages", m.id)).catch(() => { });
            }
          }
        });

        return () => {
          if (heartbeatId) clearInterval(heartbeatId);
          unsubPresence();
          deleteDoc(doc(db, "ovii", ROOM, "presence", u.uid)).catch(() => { });
        };
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Connection failed");
      }
    })();

    return () => {
      alive = false;
      unsubMsgs();
      unsubPresence();
      if (heartbeatId) clearInterval(heartbeatId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
      cleanupPresence();
    };
  }, [avatar]);

  // ── Inactivity lock ──────────────────────────────────────────────────────
  useEffect(() => {
    const bump = () => { lastActivity.current = Date.now(); };
    window.addEventListener("pointerdown", bump);
    window.addEventListener("keydown", bump);
    const t = setInterval(() => {
      const now = Date.now();
      if (noLockUntil && now < noLockUntil) return; // Bypass lock
      if (now - lastActivity.current > 180_000) onLock();
    }, 5_000);
    return () => {
      window.removeEventListener("pointerdown", bump);
      window.removeEventListener("keydown", bump);
      clearInterval(t);
    };
  }, [onLock]);

  // ── Mobile keyboard compensation (ONLY on mobile) ────────────────────────
  // Desktop: position:fixed + inset:0 handles everything — no JS height needed.
  // Mobile: track visualViewport to shrink the scroll area when keyboard opens.
  useEffect(() => {
    if (!isMobileDevice()) return; // ← desktop: skip entirely

    const vv = window.visualViewport;
    const syncKeyboard = () => {
      if (!vv) return;
      const keyboardHeight = window.innerHeight - vv.height;
      setMobileKeyboardOffset(Math.max(0, keyboardHeight));
      requestAnimationFrame(() => scrollToBottom(true));
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    vv?.addEventListener("resize", syncKeyboard);
    vv?.addEventListener("scroll", syncKeyboard);
    syncKeyboard();

    return () => {
      vv?.removeEventListener("resize", syncKeyboard);
      vv?.removeEventListener("scroll", syncKeyboard);
    };
  }, []);

  // ── Robust Auto-Scroll: Handles images, videos, and dynamic content ─────
  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Initial scroll sequence to ensure we land at the bottom
    const timers = [
      setTimeout(() => scrollToBottom(true), 100),
      setTimeout(() => scrollToBottom(true), 500),
      setTimeout(() => scrollToBottom(false), 1500)
    ];

    // ResizeObserver: Triggered when images or previews load and expand the container
    const observer = new ResizeObserver(() => {
      // Only auto-scroll if the user is already near the bottom or if it's the initial load
      const t = scrollRef.current;
      if (!t) return;
      const isNearBottom = t.scrollHeight - t.scrollTop < t.clientHeight + 200;
      if (isNearBottom || isLoading) {
        scrollToBottom(false);
      }
    });

    observer.observe(scrollRef.current);
    
    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [msgs.length, isLoading]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => scrollToBottom(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  useEffect(() => {
    if (isUploading) {
      setTimeout(() => scrollToBottom(false), 50);
      setTimeout(() => scrollToBottom(false), 200);
    }
  }, [isUploading]);

  const setPres = (data: any) => {
    if (uid) setDoc(doc(db, "ovii", ROOM, "presence", uid), data, { merge: true }).catch(() => { });
  };

  const send = async (type: Msg["type"], content: string, extra: Partial<Msg> = {}) => {
    if (!uid || !content) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type, content, status: "sent", createdAt: Timestamp.now(), ...extra };
    if (replyingTo) {
      msgData.replyTo = {
        id: replyingTo.id,
        content: replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note"),
        avatar: replyingTo.avatar,
        name: replyingTo.name,
      };
      setReplyingTo(null);
    }
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const deleteMessage = async (msgId: string, mode: "me" | "everyone") => {
    try {
      if (mode === "everyone") {
        await setDoc(doc(db, "ovii", ROOM, "messages", msgId), {
          isDeleted: true,
          content: "This message was deleted",
          type: "text"
        }, { merge: true });
      } else {
        const msg = msgs.find(m => m.id === msgId);
        if (!msg || !uid) return;
        const deletedFor = [...(msg.deletedFor || []), uid];
        await setDoc(doc(db, "ovii", ROOM, "messages", msgId), { deletedFor }, { merge: true });
      }
    } catch (e) {
      addNotification("Action failed", "error");
    }
  };

  const editMessage = async (msgId: string, newContent: string) => {
    try {
      await setDoc(doc(db, "ovii", ROOM, "messages", msgId), {
        content: newContent,
        isEdited: true
      }, { merge: true });
      setIsEditing(null);
    } catch (e) {
      addNotification("Edit failed", "error");
    }
  };

  const sendFile = async (type: Msg["type"], url: string, fileName: string, fileSize: number, mimeType: string, caption?: string) => {
    if (!uid || !url) return;
    lastActivity.current = Date.now();
    const msgData: any = { 
      uid, avatar, name, type, content: url, fileName, fileSize, mimeType, 
      caption: caption ?? "", 
      status: "sent", createdAt: Timestamp.now() 
    };
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
    if (type === "image" || type === "video") {
      setTimeout(() => scrollToBottom(false), 300);
    }
  };

  const sendImage = async (url: string, caption?: string) => {
    await sendFile("image", url, "Photo", 0, "image/jpeg", caption);
  };

  const onText = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const v = text.trim();
    if (!v) return;

    if (isEditing) {
      await editMessage(isEditing, v);
      setText("");
      setIsEditing(null);
      return;
    }

    setText("");
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    setIsTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setPres({ typing: false });
    requestAnimationFrame(() => inputRef.current?.focus());
    const isImageUrl = /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(v);
    if (isImageUrl) await send("image", v);
    else await send("text", v.slice(0, 5000));
    setInputHeight(44); // Reset height after send
  };

  const uploadToCloudinary = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dte6c221f");
    const res = await fetch(`https://api.cloudinary.com/v1_1/dte6c221f/auto/upload`, { method: "POST", body: formData });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error?.message || "Upload failed"); }
    const data = await res.json();
    return data.secure_url;
  };

  const onFile = async (file: File) => {
    if (!uid) return;
    if (file.size > 200 * 1024 * 1024) { 
      addNotification("File too large (max 200MB)", "error"); 
      return; 
    }

    const type = file.type.startsWith("image/") ? "image" :
                 file.type.startsWith("video/") ? "video" :
                 file.type.startsWith("audio/") ? "audio" : "file";

    setUploadingText(`Sending ${type}...`);
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      await sendFile(type, url, file.name, file.size, file.type);
    } catch (e: any) {
      addNotification("Upload failed: " + (e.message || "Unknown error"), "error");
    } finally {
      setIsUploading(false);
    }
  };

  const clearChat = async () => {
    setShowClearConfirm(false);
    try {
      const q = query(collection(db, "ovii", ROOM, "messages"));
      const snapshot = await getDocs(q);
      const batch = snapshot.docs.map(d => deleteDoc(doc(db, "ovii", ROOM, "messages", d.id)));
      await Promise.all(batch);
      addNotification("Chat cleared", "success");
      setShowMenu(false);
    } catch (e) {
      addNotification("Failed to clear chat", "error");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      if (e.clipboardData.items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = e.clipboardData.items[i].getAsFile();
        if (file) onFile(file);
        return;
      }
    }
    const pastedText = e.clipboardData.getData("text/plain")?.trim();
    if (pastedText && /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(pastedText)) {
      e.preventDefault();
      send("image", pastedText);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const url = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
    if (url && (url.includes(".gif") || url.includes("images") || url.includes("media"))) { await send("image", url); return; }
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (cancelRecRef.current) return;
        try {
          setUploadingText("Sending voice note...");
          setIsUploading(true);
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = await uploadToCloudinary(blob);
          await send("voice", url);
        } catch (e: any) { setError("Voice upload failed: " + (e.message || "Unknown error")); }
        finally { setIsUploading(false); }
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      setRecDuration(0);
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      recTimerRef.current = setInterval(() => {
        setRecDuration(prev => prev + 1);
      }, 1000);
      setPres({ recording: true });
      cancelRecRef.current = false;
      setTimeout(() => {
        if (rec.state === "recording") {
          if (recTimerRef.current) clearInterval(recTimerRef.current);
          rec.stop();
          setRecording(false);
          setPres({ recording: false });
        }
      }, 10 * 60 * 1000);
    } catch (e: any) { setError("Microphone permission denied"); }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const stopAndSendRec = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setRecDuration(0);
    setPres({ recording: false });
  };

  const cancelRec = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    cancelRecRef.current = true;
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setRecDuration(0);
    setPres({ recording: false });
  };

  const downloadFile = async (url: string, name: string, type: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      const ext = type === "voice" ? "webm" : 
                  type === "audio" ? "mp3" :
                  type === "video" ? "mp4" : "bin";
      a.download = name.includes(".") ? name : `${type}-${name.slice(0, 8)}.${ext}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      addNotification("Download started", "success");
    } catch { window.open(url, "_blank"); }
  };

  const now = Date.now();
  const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

  // chatMsgs: Everything for 14 days
  const chatMsgs = msgs.filter(m => {
    const ts = m.createdAt?.toMillis?.() ?? 0;
    if (!ts) return true; // Keep pending messages
    const age = now - ts;
    return age < FOURTEEN_DAYS;
  }).sort((a, b) => (a.createdAt?.toMillis?.() ?? 0) - (b.createdAt?.toMillis?.() ?? 0));

  const mediaMsgs = msgs.filter(m => ["image", "voice", "video", "audio", "file"].includes(m.type));
  const unreadMedia = mediaMsgs.length;

  // ── Root style: fixed + inset:0 on desktop, keyboard-adjusted on mobile ──
  const rootStyle: React.CSSProperties = {
    ...(isMobileDevice() && mobileKeyboardOffset > 0 ? { paddingBottom: mobileKeyboardOffset } : {}),
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='440' height='440' viewBox='0 0 440 440'%3E%3Cg fill='none' stroke='${isDarkMode ? "%23ffffff" : "%23000000"}' stroke-opacity='${isDarkMode ? "0.04" : "0.03"}' stroke-width='1'%3E%3Cpath d='M200 200c0-10 10-10 10-20s-10-10-10-20 10-10 10-20-10-10-10-20 10-10 10-20-10-10-10-20 10-10 10-20'/%3E%3Cpath d='M300 100c10 10 20 10 20 20s-10 10-20 10-10-10-20-10 10-10 20-10'/%3E%3Ccircle cx='350' cy='350' r='15'/%3E%3Ccircle cx='50' cy='150' r='10'/%3E%3Cpath d='M100 300l15 15m0-15l-15 15'/%3E%3Cpath d='M50 350q10-10 20 0t20 0 20 0 20 0'/%3E%3Cpath d='M380 50l10 10m0-10l-10 10'/%3E%3Ccircle cx='180' cy='80' r='5'/%3E%3Cpath d='M20 200h20m-10-10v20'/%3E%3Cpath d='M400 250c-10 0-10 10-20 10s-10-10-20-10'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: "440px 440px"
  };

  return (
    <AnimatePresence>
      <motion.div
        key="ovii-chat-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`ovii-chat-root fixed inset-0 z-[150] overflow-hidden flex flex-col items-center justify-center backdrop-blur-xl transition-colors duration-300 ${isDarkMode ? "bg-[#0b141a]/95" : "bg-[#efeae2]/95"}`}
        style={rootStyle}
      >
        {/* Magical Atmosphere Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          {particles.map(p => (
            <div
              key={p.id}
              className={`absolute rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-primary/20'} animate-float-slow`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                willChange: "transform, opacity"
              }}
            />
          ))}
        </div>
        <motion.div
          key="ovii-chat-frame"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
          className="ovii-chat-frame w-full h-full md:max-w-[1200px] md:h-[92vh] md:rounded-[32px] md:shadow-2xl overflow-hidden flex flex-col relative border border-white/5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* No Toaster needed anymore */}


          {/* ── Avatar Picker Overlay ── */}
          {showAvatarPicker && (
            <div className={`absolute inset-0 z-[500] flex items-center justify-center p-4 backdrop-blur-md ${isDarkMode ? "bg-black/40" : "bg-white/40"}`}>
              <div className={`w-full max-w-sm rounded-[32px] border p-8 shadow-2xl text-center relative overflow-hidden transition-all ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={() => setShowAvatarPicker(false)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white/50" : "bg-black/5 hover:bg-black/10 text-black/40"}`}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className={`text-2xl font-black mb-1 tracking-tight ${isDarkMode ? "text-white" : "text-black"}`}>Profile</h2>
                <p className={`text-xs mb-8 font-medium ${isDarkMode ? "text-white/50" : "text-black/40"}`}>Customize your presence in the room</p>

                <div className="space-y-6 relative z-10">
                  <div className="text-left">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 mb-1.5 block ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Display Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      maxLength={20}
                      value={inputName}
                      onChange={e => setInputName(e.target.value)}
                      className={`w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${isDarkMode ? "bg-white/5 border-white/10 text-white placeholder:text-white/20" : "bg-black/5 border-black/10 text-black placeholder:text-black/30"
                        }`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 mb-3 block text-left ${isDarkMode ? "text-white/40" : "text-black/40"}`}>Choose Avatar</label>
                    <div className="grid grid-cols-4 gap-4 max-h-[280px] overflow-y-auto pr-2 scrollbar-hide">
                      {AVATARS.map((av) => (
                        <button
                          key={av.id}
                          disabled={!inputName.trim()}
                          onClick={() => {
                            setAvatar(av.url);
                            setName(inputName.trim());
                            localStorage.setItem("ovii-avatar-choice", av.url);
                            localStorage.setItem("ovii-name", inputName.trim());
                            setShowAvatarPicker(false);
                            addNotification("Profile updated", "success");
                          }}
                          className={`rounded-full overflow-hidden border-2 aspect-square transition-all hover:scale-110 disabled:opacity-20 disabled:hover:scale-100 ${avatar === av.url ? "border-primary shadow-[0_0_15px_rgba(245,158,11,0.4)]" : `border-transparent ${isDarkMode ? "hover:border-white/30" : "hover:border-black/20"}`
                            }`}
                        >
                          <img src={av.url} alt={av.name} className="w-full h-full object-cover scale-[1.25]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Mobile Folder Overlay ── */}
          <AnimatePresence>
            {showFolder && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed inset-0 z-[150] flex flex-col ${isDarkMode ? "bg-[#0b141a]" : "bg-[#f0f2f5]"}`}
              >
                <div className={`p-4 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${isDarkMode ? "bg-[#202c33]/80 border-white/5 text-white" : "bg-white/80 border-black/5 text-black"
                  }`}>
                  <h2 className="text-base font-bold uppercase tracking-wider flex items-center gap-2.5">
                    <Folder className="w-5 h-5 text-destructive" /> FILES
                  </h2>
                  <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* ── Header ── */}
          <header className={`px-4 py-2 flex items-center justify-between z-[60] shrink-0 border-b backdrop-blur-xl transition-all duration-500 shadow-lg ${isDarkMode
              ? "bg-gradient-to-r from-[#202c33]/90 via-[#2a3942]/90 to-[#202c33]/90 border-white/5 text-white"
              : "bg-gradient-to-r from-white/95 via-[#f0f2f5]/95 to-white/95 border-black/5 text-black"
            }`}>
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full overflow-hidden border border-black/5 bg-muted shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all active:scale-95 relative"
                onClick={() => {
                  if (!otherAvatar) {
                    setShowAvatarPicker(true);
                  }
                }}
                title={!otherAvatar ? "Edit Profile" : ""}
              >
                {otherAvatar ? (
                  <img src={otherAvatar} alt="" className="w-full h-full object-cover" />
                ) : avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                ) : null}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0, 0.2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-primary rounded-full pointer-events-none"
                />
              </div>
              <div>
                <div className="font-bold text-[14px] leading-tight">
                  {otherName || (count > 1 ? "Ovii User" : "Waiting...") || "Waiting..."}
                </div>
                <div className="text-[10px] opacity-60 flex items-center gap-1.5 font-medium">
                  {recordingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Recording...</span>
                  ) : typingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Typing...</span>
                  ) : (
                    <span className={otherOnline ? "text-emerald-500" : ""}>
                      {otherOnline ? "Online" : formatLastSeen(otherLastSeen ?? undefined)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">

              {noLockUntil && Date.now() < noLockUntil && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  <ShieldOff className="w-3 h-3" />
                  <span>No Lock: {Math.ceil((noLockUntil - Date.now()) / 60000)}m left</span>
                </div>
              )}
              <label className="switch" title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <input
                  type="checkbox"
                  checked={!isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <span className="slider">
                  <span className="star star_1"></span>
                  <span className="star star_2"></span>
                  <span className="star star_3"></span>
                  <span className="cloud">
                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" fill="white">
                      <path d="M410.8,247c-2.3-25.6-23.7-45.6-49.8-45.6c-5.8,0-11.4,1-16.5,2.8c-12.8-31.9-43.9-54.6-80.4-54.6 c-32.2,0-60.1,17.7-74.8,44.1c-9.1-5.1-19.6-8-30.8-8c-33.8,0-61.1,27.3-61.1,61.1c0,1,0.1,2,0.2,3c-23.9,8.6-41,31.4-41,58.2 c0,33.9,27.5,61.4,61.4,61.4h276.7c33.9,0,61.4-27.5,61.4-61.4C451.8,278.4,434.7,255.6,410.8,247z" />
                    </svg>
                  </span>
                </span>
              </label>
              <button
                onClick={() => { onLock(); window.location.href = "/news"; }}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title="Switch to News"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={`p-2 rounded-full transition-colors relative ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                    } ${showMenu ? (isDarkMode ? "bg-white/10" : "bg-black/10") : ""}`}
                  title="Menu"
                >
                  <MoreVertical className="w-5 h-5" />
                  {unreadMedia > 0 && <span className="absolute top-1 right-1 bg-[#25d366] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">{unreadMedia}</span>}
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute right-0 mt-2 w-64 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                        }`}
                    >
                      <div className="py-2">
                        {/* Profile Item */}
                        <button
                          onClick={() => { setShowAvatarPicker(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all active:scale-[0.98] ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                            }`}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 shadow-sm">
                            <img src={avatar} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-black leading-tight truncate">{name || "Me"}</div>
                            <div className="text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-emerald-500/80">Online</span>
                            </div>
                          </div>
                          <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" />
                        </button>

                        <div className={`h-px mx-4 my-1 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        <button
                          onClick={() => { setShowFolder(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all active:scale-[0.98] ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                            }`}
                        >
                          <Folder className="w-4 h-4 text-destructive" />
                          <div className="flex-1 text-left font-medium">Files</div>
                          {unreadMedia > 0 && <span className="bg-[#25d366] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadMedia}</span>}
                        </button>

                        <button
                          onClick={() => { setShowLogs(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all active:scale-[0.98] ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                            }`}
                        >
                          <History className="w-4 h-4 text-primary" />
                          <div className="flex-1 text-left font-medium">Build Book</div>
                          <span className="text-[9px] font-bold opacity-40 uppercase">v2.4.1</span>
                        </button>

                        <div className={`h-px mx-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        {!showNoLockSubmenu ? (
                          <button
                            onClick={() => setShowNoLockSubmenu(true)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/90" : "hover:bg-black/5 text-black/80"
                              }`}
                          >
                            <ShieldOff className="w-4 h-4 text-primary" />
                            <div className="flex-1 text-left font-medium">No Lock</div>
                            {noLockUntil && Date.now() < noLockUntil ? (
                              <span className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">Active</span>
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 opacity-40" />
                            )}
                          </button>
                        ) : (
                          <div className="py-1">
                            <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? "text-white" : "text-black"}`}>Select Duration</div>
                            {[
                              { label: "15 Minutes", val: 15 * 60 * 1000 },
                              { label: "1 Hour", val: 60 * 60 * 1000 },
                              { label: "5 Hours", val: 5 * 60 * 60 * 1000 },
                              { label: "24 Hours", val: 24 * 60 * 60 * 1000 },
                            ].map((d) => (
                              <button
                                key={d.label}
                                onClick={() => {
                                  const until = Date.now() + d.val;
                                  setNoLockUntil(until);
                                  localStorage.setItem("ovii_no_lock_until", until.toString());
                                  setShowMenu(false);
                                  setShowNoLockSubmenu(false);
                                  addNotification(`No Lock enabled for ${d.label}`, "success");
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors ${isDarkMode ? "hover:bg-white/5 text-white/80" : "hover:bg-black/5 text-black/70"
                                  }`}
                              >
                                <Clock className="w-3.5 h-3.5 opacity-60" />
                                <span className="font-medium">{d.label}</span>
                              </button>
                            ))}
                            {noLockUntil && (
                              <button
                                onClick={() => {
                                  setNoLockUntil(null);
                                  localStorage.removeItem("ovii_no_lock_until");
                                  setShowMenu(false);
                                  setShowNoLockSubmenu(false);
                                  addNotification("No Lock disabled", "info");
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-destructive hover:bg-destructive/5 transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="font-bold">Turn off No Lock</span>
                              </button>
                            )}
                            <button
                              onClick={() => setShowNoLockSubmenu(false)}
                              className={`w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-black"}`}
                            >
                              ← Back
                            </button>
                          </div>
                        )}

                        <div className={`h-px mx-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />

                        <button
                          onClick={() => { setShowClearConfirm(true); setShowMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode ? "hover:bg-destructive/10 text-destructive" : "hover:bg-destructive/5 text-destructive"
                            }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <div className="flex-1 text-left font-medium">Clear Chat</div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>


              </div>
            </div>
          </header>
          
          {/* ── Error Toast (Up Front) ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
              >
                <div className="bg-destructive/10 backdrop-blur-md border border-destructive/20 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                  <div className="bg-destructive text-white p-1.5 rounded-full">
                    <X className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-0.5">Error</div>
                    <div className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-black"}`}>{error}</div>
                  </div>
                  <button onClick={() => setError("")} className="p-1 opacity-40 hover:opacity-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Body: messages col + optional desktop sidebar ── */}
          <div className="flex-1 flex min-h-0 overflow-hidden">

            {/* ── Messages column ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

              {/* App Notifications */}
              <div className="absolute top-[75px] left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full max-w-[320px]">
                <AnimatePresence mode="popLayout">
                  {appNotifications.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className={`px-5 py-3 rounded-[24px] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] border flex items-center gap-3 pointer-events-auto text-[13px] font-black tracking-tight transition-all ${n.type === "success" ? "bg-[#00a884] text-white border-white/20 shadow-[#00a884]/20" :
                          n.type === "error" ? "bg-[#ea4335] text-white border-white/20 shadow-red-500/20" :
                            "bg-[#005c4b] text-white border-white/20 shadow-primary/20"
                        }`}
                    >
                      {n.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {n.type === "error" && <AlertCircle className="w-4 h-4 shrink-0" />}
                      {n.type === "info" && <Info className="w-4 h-4 shrink-0" />}
                      <span>{n.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating join/leave toasts */}
              <AnimatePresence>
                {systemMsgs.length > 0 && (
                  <motion.div
                    key="toast-stack"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
                  >
                    {systemMsgs.slice(-1).map(sm => (
                      <div key={sm.id} className={`text-[11px] font-bold px-4 py-1.5 rounded-full backdrop-blur-xl shadow-elegant border ${sm.type === "join"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-muted/60 text-muted-foreground border-border/30"
                        }`}>
                        {sm.type === "join" ? "🟢" : "⚫"} {sm.text}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll area — overflow-x:hidden prevents horizontal bleed from drag */}
              <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-2 flex flex-col items-stretch touch-pan-y relative"
                style={{
                  overscrollBehavior: "contain",
                  overflowX: "hidden",
                  willChange: "scroll-position"
                }}
                onScroll={(e) => {
                  const t = e.currentTarget;
                  setShowScrollDown(t.scrollHeight - t.scrollTop > t.clientHeight + 80);
                }}
              >
                <div className="flex-1" />

                {!error && isLoading && (
                  <div className="h-full flex items-center justify-center text-center my-auto">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      <div className="text-muted-foreground text-sm font-medium animate-pulse">Loading messages...</div>
                    </div>
                  </div>
                )}
                {!error && !isLoading && chatMsgs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 my-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-24 h-24 mb-6 relative"
                    >
                      <div className={`absolute inset-0 rounded-full animate-ping ${isDarkMode ? "bg-primary/10" : "bg-primary/5"}`} />
                      <div className={`absolute inset-4 rounded-full animate-pulse ${isDarkMode ? "bg-primary/20" : "bg-primary/10"}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Send className={`w-10 h-10 rotate-[-20deg] ${isDarkMode ? "text-primary/40" : "text-primary/60"}`} />
                      </div>
                    </motion.div>
                    <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white opacity-80" : "text-black opacity-70"}`}>Start a Magical Conversation</h3>
                    <p className={`text-[11px] max-w-[200px] leading-relaxed font-medium ${isDarkMode ? "text-white opacity-50" : "text-black opacity-40"}`}>
                      Your messages are private and will disappear like stardust after a few days.
                    </p>
                  </div>
                )}

                <div className="w-full space-y-1 flex flex-col justify-end items-stretch shrink-0 relative px-3.5 sm:px-6">
                  <AnimatePresence initial={false}>
                    {chatMsgs.filter(m => !m.deletedFor?.includes(uid || "")).map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      // Date grouping logic
                      const showDateHeader = !prevMsg ||
                        m.createdAt?.toDate().toDateString() !== prevMsg.createdAt?.toDate().toDateString();

                      const dateStr = showDateHeader ? formatMessageDate(m.createdAt?.toDate() || new Date()) : null;

                      return (
                        <Fragment key={m.id}>
                          {showDateHeader && dateStr !== "Today" && (
                            <div className="w-full flex justify-center my-4 sticky top-2 z-10 pointer-events-none">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border pointer-events-auto ${isDarkMode ? "bg-[#182229] text-white/50 border-white/5" : "bg-white text-black/40 border-black/5"
                                }`}>
                                {dateStr}
                              </span>
                            </div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`w-full flex ${mine ? "justify-end" : "justify-start"} ${!isConsecutive ? "mt-4" : "mt-1.5"}`}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.2}
                              onDragStart={() => {
                                if (longPressTimer.current) clearTimeout(longPressTimer.current);
                              }}
                              onPointerDown={() => {
                                if (isMobileDevice()) {
                                  longPressTimer.current = setTimeout(() => {
                                    setContextMsg(m);
                                    if (window.navigator.vibrate) window.navigator.vibrate([20]);
                                  }, 500);
                                }
                              }}
                              onPointerUp={() => {
                                if (longPressTimer.current) clearTimeout(longPressTimer.current);
                              }}
                              onContextMenu={(e) => {
                                if (!isMobileDevice()) {
                                  e.preventDefault();
                                  setContextMsg(m);
                                }
                              }}
                              onDrag={(e, info) => {
                                const threshold = 70;
                                const isSwipeRight = info.offset.x > threshold;
                                const isSwipeLeft = info.offset.x < -threshold;

                                // Received messages: swipe right to reply
                                // Sent messages: swipe left to reply
                                if ((!mine && isSwipeRight) || (mine && isSwipeLeft)) {
                                  if (replyingTo?.id !== m.id) {
                                    setReplyingTo(m);
                                    if (window.navigator.vibrate) window.navigator.vibrate(10);
                                  }
                                }
                              }}
                              className={`relative flex gap-2 group w-fit max-w-[85%] md:max-w-[550px] lg:max-w-[600px] ${mine ? "ml-auto" : "mr-auto"}`}
                            >
                              <div className={`absolute inset-y-0 flex items-center transition-opacity pointer-events-none opacity-0 group-drag:opacity-100 ${mine ? "-right-12 pl-4" : "-left-12 pr-4"
                                }`}>
                                <Reply className="w-5 h-5 text-primary/40" />
                              </div>

                              {!mine && (
                                <div className="hidden md:flex flex-col items-center mt-auto gap-1 w-8 shrink-0">
                                  {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full bg-muted object-cover border border-border/40 shadow-sm" alt="" />}
                                </div>
                              )}

                              <div className={`flex-1 min-w-0 ${mine ? "items-end" : "items-start"} flex flex-col gap-[2px] md:gap-0.5`}>
                                {!mine && !isConsecutive && m.name && <span className="hidden md:inline-block text-[10px] font-bold text-muted-foreground ml-1.5 mb-0.5 uppercase tracking-tighter">{m.name}</span>}

                                {m.replyTo && (
                                  <div className={`px-2.5 py-1.5 rounded-t-xl rounded-b-sm text-xs opacity-90 flex items-center gap-2 border-l-3 border-primary/80 mb-0.5 mx-1 max-w-full overflow-hidden ${isDarkMode ? "bg-m3-surface-container-high/50 text-[#e9edef]/80" : "bg-black/5 text-[#111b21]/70"
                                    }`}>
                                    <img src={m.replyTo.avatar} className="w-4 h-4 rounded-full border border-border/20 shrink-0" alt="" />
                                    <div className="flex flex-col min-w-0">
                                      {m.replyTo.name && <span className="text-[8px] font-black text-primary uppercase tracking-tighter truncate">{m.replyTo.name}</span>}
                                      <span className="truncate italic text-[10px] leading-tight">{m.replyTo.content}</span>
                                    </div>
                                  </div>
                                )}

                                {m.type === "voice" || m.type === "audio" ? (
                                  <div className="flex flex-col gap-1 max-w-full">
                                    <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                                    {m.type === "audio" && m.fileName && (
                                      <div className={`text-[11px] px-3 py-1.5 rounded-[12px] opacity-90 font-medium break-all w-fit max-w-[280px] shadow-sm ${mine ? (isDarkMode ? "bg-[#005c4b] text-[#e9edef]" : "bg-[#dcf8c6] text-[#111b21]") : (isDarkMode ? "bg-[#202c33] text-[#e9edef]" : "bg-white text-[#111b21]")}`}>
                                        {m.fileName}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div
                                    className={`md:rounded-[20px] ${m.type === "image" ? "p-0 overflow-hidden rounded-[12px] md:rounded-[20px]" : "px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 md:sm:px-5 md:sm:py-2.5 min-w-[65px] md:min-w-[80px] md:sm:min-w-[140px] rounded-[10px]"} text-[14.5px] md:text-[14px] leading-[1.35] md:leading-relaxed break-words relative flex flex-col shadow-sm md:shadow-md transition-all w-fit max-w-full
                                  ${mine
                                        ? (isDarkMode ? "bg-[#005c4b] text-[#e9edef] " : "bg-[#dcf8c6] text-[#111b21] ") + (isLastInGroup ? "rounded-br-sm md:rounded-br-none" : "")
                                        : (isDarkMode ? "bg-[#202c33] text-[#e9edef] " : "bg-white text-[#111b21] ") + (isLastInGroup ? "rounded-bl-sm md:rounded-bl-none" : "")
                                      } ${m.isDeleted ? "opacity-60 italic" : ""}`}
                                  >
                                    <div className="relative flex flex-col">
                                      {!mine && !isConsecutive && m.name && <span className="md:hidden text-[12px] font-bold text-[#eb5528] dark:text-[#f28b82] mb-0.5 leading-tight">{m.name}</span>}


                                      {m.type === "image" && !m.isDeleted && (
                                        <div className="mb-0 overflow-hidden rounded-[18px] relative group/img cursor-pointer active:scale-[0.99] transition-transform" onClick={() => setSelectedImage(m.content)}>
                                          <img 
                                            src={m.content} 
                                            alt="" 
                                            onContextMenu={(e) => e.preventDefault()}
                                            style={{ WebkitTouchCallout: 'none' }}
                                            className="w-full max-w-[320px] md:max-w-[500px] max-h-[250px] object-cover shadow-sm block transition-transform group-hover/img:scale-[1.02]" 
                                          />

                                          {/* Photo overlay actions */}
                                          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            <button
                                              onClick={(e) => { e.stopPropagation(); setSelectedImage(m.content); }}
                                              className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
                                            >
                                              <ImageIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); downloadFile(m.content, m.id, "image"); }}
                                              className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
                                            >
                                              <Download className="w-4 h-4" />
                                            </button>
                                          </div>

                                          {m.caption && (
                                            <div className={`px-3 py-2 text-[13px] leading-tight font-medium ${isDarkMode ? "bg-black/20 text-white/90" : "bg-black/5 text-black/80"}`}>
                                              {m.caption}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {m.type === "video" && !m.isDeleted && (
                                        <div className="mb-0 overflow-hidden rounded-[18px] relative group/vid cursor-pointer active:scale-[0.99] transition-transform bg-black/10">
                                          <video 
                                            src={m.content} 
                                            controls
                                            className="w-full max-w-[320px] md:max-w-[500px] max-h-[300px] object-cover shadow-sm block" 
                                          />
                                          {m.caption && (
                                            <div className={`px-3 py-2 text-[13px] leading-tight font-medium ${isDarkMode ? "bg-black/20 text-white/90" : "bg-black/5 text-black/80"}`}>
                                              {m.caption}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {m.type === "file" && !m.isDeleted && (
                                        <div 
                                          className={`flex flex-col gap-2 p-3 pb-6 rounded-xl cursor-pointer hover:brightness-95 transition-all ${isDarkMode ? "bg-black/20" : "bg-black/5"}`}
                                          onClick={() => downloadFile(m.content, m.fileName || m.id, "file")}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDarkMode ? "bg-white/10" : "bg-black/10"}`}>
                                              {m.mimeType?.includes("pdf") ? <FileText className="w-5 h-5 text-red-500" /> :
                                               m.mimeType?.includes("zip") || m.mimeType?.includes("rar") ? <FileArchive className="w-5 h-5 text-orange-500" /> :
                                               <File className="w-5 h-5 text-blue-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="text-[13px] font-bold break-all leading-tight">{m.fileName || "File"}</div>
                                              <div className="text-[10px] opacity-50 uppercase font-bold">
                                                {m.fileSize ? `${(m.fileSize / (1024 * 1024)).toFixed(1)} MB` : "File"}
                                              </div>
                                            </div>
                                            <Download className="w-4 h-4 opacity-40 shrink-0" />
                                          </div>
                                        </div>
                                      )}

                                      <div className="relative min-w-[60px]">
                                        {m.type === "text" && (
                                          <>
                                            <span className={`block break-words whitespace-pre-wrap leading-relaxed text-[14px] ${m.isDeleted ? "text-[12px]" : ""}`}>
                                              {m.isDeleted ? (
                                                <span className="flex items-center gap-1.5">
                                                  <ShieldOff className="w-3.5 h-3.5" /> This message was deleted
                                                </span>
                                              ) : renderMessageContent(m.content)}
                                              {/* Spacer to reserve room for absolute timestamp on the same line */}
                                              <span className={`inline-block h-[1px] ${mine ? "w-[85px]" : "w-[65px]"} ${m.isEdited ? "ml-8" : "ml-2"}`} />
                                            </span>
                                            {(() => {
                                              const urlRegex = /(https?:\/\/[^\s]+)/g;
                                              const match = m.content.match(urlRegex);
                                              if (match && !m.isDeleted) {
                                                return (
                                                  <>
                                                    <div className="mt-1"><LinkPreview url={match[0]} isDarkMode={isDarkMode} /></div>
                                                    <div className="h-5 w-full" /> {/* Space for timestamp below preview */}
                                                  </>
                                                );
                                              }
                                              return null;
                                            })()}
                                          </>
                                        )}

                                        {/* Timestamp: absolute for image, relative for text */}
                                        <div className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-0 right-0"} flex items-center gap-1.5 opacity-90 pointer-events-none select-none`}>
                                          {m.isEdited && !m.isDeleted && <span className="text-[9px] opacity-40 font-bold uppercase mr-1">Edited</span>}
                                          <span className={`text-[11px] tabular-nums font-['Inter'] font-extralight tracking-tight ${m.type === "image" ? "text-white" : ""}`}>
                                            {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || ""}
                                          </span>
                                          {mine && <div className={`shrink-0 scale-95 ${m.type === "image" ? "text-[#53bdeb]" : ""}`}><MsgTick status={m.status} /></div>}
                                        </div>
                                      </div>

                                      {/* Reactions Display */}
                                    </div>

                                    {/* Desktop hover reply button */}
                                    <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${mine ? "-left-10" : "-right-10"} items-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                                      <button onClick={() => setReplyingTo(m)} className="p-2 rounded-full bg-background/60 hover:bg-background shadow-elegant border border-border/40 text-muted-foreground hover:text-primary">
                                        <Reply className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {mine && (
                                <div className="hidden md:flex flex-col items-center mt-auto gap-1 w-8 shrink-0">
                                  {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full bg-muted object-cover border border-border/40 shadow-sm" alt="" />}
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        </Fragment>
                      );
                    })}
                  </AnimatePresence>

                  {typingUsers.length > 0 && (
                    <div className="flex justify-start gap-2 items-end text-muted-foreground pt-2">
                      <img src={typingUsers[0]} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border" alt="" />
                      <div className="text-xs bg-card border border-border px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  {recordingUsers.length > 0 && (
                    <div className="flex justify-start gap-2 items-end text-muted-foreground pt-2">
                      <img src={recordingUsers[0]} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border" alt="" />
                      <div className="text-xs font-medium text-destructive bg-card border border-border px-3 py-1.5 rounded-2xl rounded-bl-sm flex gap-2 items-center animate-pulse">
                        <Mic className="w-3.5 h-3.5" /> Recording...
                      </div>
                    </div>
                  )}
                  {isUploading && (
                    <div className="w-full flex justify-end mt-2 px-4 sm:px-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#dcf8c6] dark:bg-[#005c4b] p-3 rounded-[20px] rounded-br-none shadow-sm flex items-center gap-3 min-w-[140px]"
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                        <span className="text-[12px] font-bold opacity-70">{uploadingText}</span>
                      </motion.div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-0 w-full shrink-0" />
                </div>
              </div>

              {/* Scroll-to-bottom button */}
              <AnimatePresence>
                {showScrollDown && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-20 flex items-center gap-1 px-3 text-xs font-bold"
                  >
                    New message ↓
                  </motion.button>
                )}
              </AnimatePresence>


              {/* ── Edit Message Preview Banner ── */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mx-4 mb-2 p-3 rounded-2xl flex items-center gap-3 border-l-4 border-orange-500 shadow-lg ${isDarkMode ? "bg-[#1f2c33]" : "bg-white"
                      }`}
                  >
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                      <ChevronDown className="w-4 h-4 rotate-180" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">Editing message</div>
                      <div className={`text-xs truncate ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        {msgs.find(m => m.id === isEditing)?.content || "..."}
                      </div>
                    </div>
                    <button onClick={() => { setIsEditing(null); setText(""); }} className={`p-2 transition-opacity ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Reply Preview Banner ── */}
              <AnimatePresence>
                {replyingTo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mx-4 mb-2 p-3 rounded-2xl flex items-center gap-3 border-l-4 border-primary shadow-lg ${isDarkMode ? "bg-[#1f2c33]" : "bg-white"
                      }`}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Reply className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-tighter">Replying to {replyingTo.name || "User"}</div>
                      <div className={`text-xs truncate ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        {replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note")}
                      </div>
                    </div>
                    <button onClick={() => setReplyingTo(null)} className={`p-2 transition-opacity ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>


              {/* Input bar */}
              <div className={`px-2 pt-2 pb-[max(14px,env(safe-area-inset-bottom))] sm:px-4 sm:pt-3 sm:pb-[max(16px,env(safe-area-inset-bottom))] flex items-end gap-2 sm:gap-3 z-20 shrink-0 bg-transparent`}>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }}
                />

                {recording ? (
                  /* ── Recording state ── */
                  <div className={`flex-1 flex items-center justify-between rounded-[28px] px-2 sm:px-4 h-[54px] overflow-hidden shadow-inner ${isDarkMode ? "bg-[#2a3942]" : "bg-white"}`}>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_red] animate-pulse" />
                      <div className="hidden sm:block">
                        <RecordingVisualizer />
                      </div>
                      <span className="text-red-500 font-black text-[10px] sm:text-xs uppercase tracking-widest ml-1">{formatDuration(recDuration)}</span>
                    </div>
                    
                    <motion.div 
                      drag="x"
                      dragConstraints={{ right: 0, left: -100 }}
                      dragElastic={0.1}
                      onDragEnd={(e, info) => {
                        if (info.offset.x < -60) {
                          cancelRec();
                          addNotification("Recording cancelled", "error");
                        }
                      }}
                      className="flex items-center gap-2 sm:gap-4 cursor-grab active:cursor-grabbing shrink-0"
                    >
                      <div className={`flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest select-none ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                        <ChevronLeft className="w-3 h-3 animate-pulse" />
                        Slide to cancel
                      </div>
                      <button type="button" onClick={stopAndSendRec} className="h-8 sm:h-9 px-3 sm:px-5 rounded-full bg-[#00a884] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#00a884]/90 transition-all shadow-lg flex items-center gap-1 sm:gap-2 active:scale-95">
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Send</span>
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={`shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"
                        }`}
                    >
                      <Paperclip className="w-6 h-6 md:w-7 md:h-7" />
                    </button>

                    <div className={`flex-1 flex items-end rounded-[24px] shadow-sm md:shadow-md border border-border/10 overflow-hidden relative ${isDarkMode ? "bg-[#2a3942]" : "bg-white"
                      }`}>
                      <textarea
                        ref={inputRef}
                        rows={1}
                        autoComplete="off"
                        value={text}
                        placeholder={isEditing ? "Edit message" : "Write a message"}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isMobileDevice()) {
                            e.preventDefault();
                            onText();
                          }
                          if (e.key === "Escape" && isEditing) {
                            setIsEditing(null);
                            setText("");
                          }
                        }}
                        onPaste={handlePaste}
                        onChange={(e) => {
                          const val = e.target.value;
                          setText(val);
                          const prevH = e.target.style.height;
                          e.target.style.height = '1px';
                          const nextH = Math.max(44, Math.min(e.target.scrollHeight, 138));
                          e.target.style.height = prevH;
                          setInputHeight(nextH);
                          if (uid && !isEditing) {
                            const typingNow = val.length > 0;
                            if (typingNow !== isTyping) { setIsTyping(typingNow); setPres({ typing: typingNow }); }
                            if (typingTimer.current) clearTimeout(typingTimer.current);
                            if (typingNow) typingTimer.current = setTimeout(() => { setIsTyping(false); setPres({ typing: false }); }, 2000);
                          }
                        }}
                        className={`w-full bg-transparent border-none focus:ring-0 focus:outline-none py-3.5 px-4 text-[15px] resize-none max-h-[150px] scrollbar-hide ${isDarkMode ? "text-[#e9edef] placeholder-[#8696a0]" : "text-[#111b21] placeholder-[#667781]"
                          }`}
                        style={{ height: `${inputHeight}px` }}
                      />
                    </div>

                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative">
                      <AnimatePresence mode="popLayout">
                        {text.trim() || isEditing ? (
                          <motion.button
                            key="send"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            type="button"
                            onClick={() => onText()}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${isEditing ? "bg-orange-500" : "bg-[#00a884]"} text-white flex items-center justify-center shadow-md md:shadow-lg active:scale-90 transition-all shrink-0`}
                          >
                            {isEditing ? <CheckCircle2 className="w-5 h-5" /> : <Send className="w-5 h-5 md:w-6 md:h-6 fill-white stroke-[1.5] md:stroke-2" />}
                          </motion.button>
                        ) : (
                          <motion.button
                            key="mic"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            type="button"
                            onPointerDown={(e) => { e.preventDefault(); startRec(); }}
                            onPointerUp={() => stopAndSendRec()}
                            onPointerLeave={() => { if (recording) stopAndSendRec(); }}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "text-white/50 hover:text-white hover:bg-white/10" : "text-black/40 hover:text-black hover:bg-black/10"
                              }`}
                            aria-label="Tap to record"
                          >
                            <Mic className="w-6 h-6 md:w-7 md:h-7" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Message Context Menu (Reactions, Edit, Delete) ── */}
            <AnimatePresence>
              {contextMsg && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
                  onPointerDown={() => setContextMsg(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                      }`}
                    onPointerDown={(e) => e.stopPropagation()}
                  >

                    <div className="py-2">
                      <button
                        onClick={() => {
                          setReplyingTo(contextMsg);
                          setContextMsg(null);
                          setTimeout(() => inputRef.current?.focus(), 100);
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium ${isDarkMode ? "hover:bg-white/5 text-white" : "hover:bg-black/5 text-black"}`}
                      >
                        <Reply className="w-4 h-4 opacity-60" /> Reply
                      </button>

                      {!contextMsg.isDeleted && contextMsg.uid === uid && contextMsg.type === "text" && (
                        <button
                          onClick={() => {
                            setIsEditing(contextMsg.id);
                            setText(contextMsg.content);
                            setContextMsg(null);
                            setTimeout(() => inputRef.current?.focus(), 100);
                          }}
                          className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium ${isDarkMode ? "hover:bg-white/5 text-white" : "hover:bg-black/5 text-black"}`}
                        >
                          <Pencil className="w-4 h-4 opacity-60" /> Edit Message
                        </button>
                      )}

                      <button
                        onClick={() => {
                          deleteMessage(contextMsg.id, "me");
                          setContextMsg(null);
                        }}
                        className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                      >
                        <Trash2 className="w-4 h-4 opacity-60" /> Delete for Me
                      </button>

                      {!contextMsg.isDeleted && contextMsg.uid === uid && (
                        <button
                          onClick={() => {
                            deleteMessage(contextMsg.id, "everyone");
                            setContextMsg(null);
                          }}
                          className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                        >
                          <Users2 className="w-4 h-4 opacity-60" /> Delete for Everyone
                        </button>
                      )}

                      {!contextMsg.isDeleted && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(contextMsg.content);
                            addNotification("Copied", "success");
                            setContextMsg(null);
                          }}
                          className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium ${isDarkMode ? "hover:bg-white/5 text-white" : "hover:bg-black/5 text-black"}`}
                        >
                          <CheckCircle2 className="w-4 h-4 opacity-60" /> Copy
                        </button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Desktop Sidebar (hidden on mobile via CSS/Tailwind) ── */}
            <AnimatePresence>
              {showFolder && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 380, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className={`hidden lg:flex flex-col border-l relative overflow-hidden shrink-0 ${isDarkMode ? "bg-[#202c33]/20 border-white/5" : "bg-white/40 border-black/5"
                    }`}
                >
                  <div className={`p-4 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${isDarkMode ? "bg-[#202c33]/80 border-white/5 text-white" : "bg-white/80 border-black/5 text-black"
                    }`}>
                    <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-destructive" /> FILES
                    </h2>
                    <button onClick={() => setShowFolder(false)} className="p-2 rounded-full bg-background/60 hover:bg-background text-foreground transition-all active:scale-90 border border-border/20 shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                    <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} setSelectedImage={setSelectedImage} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* ── Full Image Preview Overlay ── */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.button
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => { if (selectedImage) window.history.back(); else setSelectedImage(null); }}
                    className="absolute top-5 right-5 p-2.5 bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => downloadFile(selectedImage, "preview", "image")}
                    className="absolute top-[75px] right-5 p-2.5 bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
                  >
                    <Download className="w-6 h-6" />
                  </motion.button>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative max-w-5xl w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={selectedImage}
                      alt=""
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ WebkitTouchCallout: 'none' }}
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Custom Clear Chat Confirmation Modal ── */}
            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`w-full max-w-sm rounded-[32px] overflow-hidden border shadow-2xl p-8 relative ${isDarkMode ? "bg-[#233138] border-white/10 text-white" : "bg-white border-black/10 text-black"
                      }`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                        <Trash2 className="w-8 h-8 text-destructive" />
                      </div>
                      <h3 className="text-xl font-black mb-3 tracking-tight">Clear all messages?</h3>
                      <p className="text-sm opacity-60 font-medium mb-8">
                        This will permanently delete all messages in this room for everyone. This action cannot be undone.
                      </p>
                      <div className="flex flex-col w-full gap-3">
                        <button
                          onClick={() => {
                            clearChat();
                            setShowClearConfirm(false);
                          }}
                          className="w-full py-4 rounded-2xl text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-destructive/30 bg-[linear-gradient(45deg,#4a0000,#ff1a1a,#4a0000)] animate-gradient"
                        >
                          Yes, Clear Everything
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white/70" : "bg-black/5 hover:bg-black/10 text-black/60"
                            }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Immersive 'Greenery Build Book' Protocol Section ── */}
            <AnimatePresence>
              {showLogs && (
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className={`fixed inset-0 z-[400] flex flex-col overflow-x-hidden transition-colors duration-700 ${isDarkMode ? "bg-[#0b141a]" : "bg-[#f0f2f5]"}`}
                >
                  {/* Dynamic Neon Gradient Glow */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                    <div className="absolute top-0 left-0 w-full h-full will-change-transform">
                      <div className={`absolute -top-[20%] -left-[10%] w-[80%] h-[80%] blur-[140px] rounded-full pointer-events-none transition-colors duration-700 ${
                        logTab === "updates" ? "bg-emerald-500/20" : historyLevel === "easy" ? "bg-orange-500/20" : historyLevel === "medium" ? "bg-blue-500/20" : "bg-purple-500/20"
                      }`} />
                      <div className={`absolute top-[30%] -right-[20%] w-[70%] h-[70%] blur-[150px] rounded-full pointer-events-none transition-colors duration-700 ${
                        logTab === "updates" ? "bg-emerald-700/20" : historyLevel === "easy" ? "bg-orange-700/20" : historyLevel === "medium" ? "bg-blue-700/20" : "bg-purple-700/20"
                      }`} />
                    </div>
                  </div>

                  {/* Header / Protocol Identity */}
                  <div className={`px-4 sm:px-6 py-5 flex items-center justify-between border-b relative z-10 backdrop-blur-3xl transition-colors duration-700 ${
                    logTab === "updates" ? (isDarkMode ? "bg-[#202c33]/90 border-emerald-500/20" : "bg-white/90 border-emerald-500/20") :
                    historyLevel === "easy" ? (isDarkMode ? "bg-[#202c33]/90 border-orange-500/20" : "bg-white/90 border-orange-500/20") :
                    historyLevel === "medium" ? (isDarkMode ? "bg-[#202c33]/90 border-blue-500/20" : "bg-white/90 border-blue-500/20") :
                    (isDarkMode ? "bg-[#202c33]/90 border-purple-500/20" : "bg-white/90 border-purple-500/20")
                  }`}>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button onClick={() => setShowLogs(false)} className={`p-2 rounded-full transition-all active:scale-90 shadow-md ${
                        logTab === "updates" ? (isDarkMode ? "bg-white/10 hover:bg-emerald-500/20 text-emerald-400" : "bg-black/5 hover:bg-emerald-500/10 text-emerald-600") :
                        historyLevel === "easy" ? (isDarkMode ? "bg-white/10 hover:bg-orange-500/20 text-orange-400" : "bg-black/5 hover:bg-orange-500/10 text-orange-600") :
                        historyLevel === "medium" ? (isDarkMode ? "bg-white/10 hover:bg-blue-500/20 text-blue-400" : "bg-black/5 hover:bg-blue-500/10 text-blue-600") :
                        (isDarkMode ? "bg-white/10 hover:bg-purple-500/20 text-purple-400" : "bg-black/5 hover:bg-purple-500/10 text-purple-600")
                      }`}>
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <div className="min-w-0">
                        <h2 className={`text-lg sm:text-2xl font-black tracking-tighter truncate transition-colors duration-700 ${
                          logTab === "updates" ? (isDarkMode ? "text-emerald-400" : "text-emerald-600") :
                          historyLevel === "easy" ? (isDarkMode ? "text-orange-400" : "text-orange-600") :
                          historyLevel === "medium" ? (isDarkMode ? "text-blue-400" : "text-blue-600") :
                          (isDarkMode ? "text-purple-400" : "text-purple-600")
                        }`}>Build Book</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-700 ${
                            logTab === "updates" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" :
                            historyLevel === "easy" ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" :
                            historyLevel === "medium" ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" :
                            "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                          }`} />
                          <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] truncate transition-colors duration-700 ${isDarkMode ? "text-white/50" : "text-black/50"}`}>Protocol Synchronization</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                       <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest transition-colors duration-700 ${
                         logTab === "updates" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                         historyLevel === "easy" ? "bg-orange-500/10 border-orange-500/30 text-orange-500" :
                         historyLevel === "medium" ? "bg-blue-500/10 border-blue-500/30 text-blue-500" :
                         "bg-purple-500/10 border-purple-500/30 text-purple-500"
                       }`}>
                         v2.4.1
                       </div>
                    </div>
                  </div>

                  {/* Content / Book Body */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth scrollbar-hide">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-20 space-y-16 sm:space-y-24">
                      
                      {/* Genesis Header with Optimized Glow */}
                      <div className="text-center mb-24 sm:mb-40 relative px-4">
                         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 blur-[80px] rounded-full pointer-events-none transition-colors duration-700 ${
                           logTab === "updates" ? "bg-emerald-500/20" : historyLevel === "easy" ? "bg-orange-500/20" : historyLevel === "medium" ? "bg-blue-500/20" : "bg-purple-500/20"
                         }`} />
                         <div className={`relative inline-block p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] border-2 mb-6 sm:mb-8 transition-colors duration-700 ${
                           logTab === "updates" ? "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.2)]" :
                           historyLevel === "easy" ? "bg-orange-500/10 border-orange-500/20 shadow-[0_0_25px_rgba(249,115,22,0.2)]" :
                           historyLevel === "medium" ? "bg-blue-500/10 border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.2)]" :
                           "bg-purple-500/10 border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                         }`}>
                            <History className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-700 ${
                              logTab === "updates" ? (isDarkMode ? "text-emerald-400" : "text-emerald-600") :
                              historyLevel === "easy" ? (isDarkMode ? "text-orange-400" : "text-orange-600") :
                              historyLevel === "medium" ? (isDarkMode ? "text-blue-400" : "text-blue-600") :
                              (isDarkMode ? "text-purple-400" : "text-purple-600")
                            }`} />
                         </div>
                         <h1 className={`text-4xl sm:text-6xl font-black tracking-tighter mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>Build Theory</h1>
                         <p className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed font-semibold transition-colors duration-700 ${
                           logTab === "updates" ? (isDarkMode ? "text-emerald-100/60" : "text-emerald-900/60") :
                           historyLevel === "easy" ? (isDarkMode ? "text-orange-100/60" : "text-orange-900/60") :
                           historyLevel === "medium" ? (isDarkMode ? "text-blue-100/60" : "text-blue-900/60") :
                           (isDarkMode ? "text-purple-100/60" : "text-purple-900/60")
                         }`}>
                           Real-time synchronization of code architecture and strategic evolution protocols.
                         </p>
                      </div>

                      {/* Tabs */}
                      <div className="flex justify-center mb-10">
                        <div className={`relative flex p-1 rounded-full border shadow-inner w-64 ${isDarkMode ? "bg-black/30 border-white/5" : "bg-black/5 border-black/5"}`}>
                          <div className="absolute inset-y-1 left-1 right-1 pointer-events-none">
                            <div className="relative w-full h-full flex">
                              <div 
                                className={`absolute top-0 bottom-0 w-[50%] rounded-full border transition-all duration-300 ease-out ${
                                  logTab === "history" ? "translate-x-full" : "translate-x-0"
                                } ${
                                  logTab === "updates" ? "bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-500/30" : 
                                  historyLevel === "easy" ? "bg-orange-500/20 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]" :
                                  historyLevel === "medium" ? "bg-blue-500/20 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]" :
                                  "bg-purple-500/20 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                }`}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => setLogTab("updates")}
                            className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                              logTab === "updates"
                                ? isDarkMode ? "text-emerald-400" : "text-emerald-600"
                                : isDarkMode ? "text-white/40 hover:text-white/60" : "text-black/40 hover:text-black/60"
                            }`}
                          >
                            Updates
                          </button>
                          <button
                            onClick={() => setLogTab("history")}
                            className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                              logTab === "history"
                                ? historyLevel === "easy" ? (isDarkMode ? "text-orange-400" : "text-orange-600") :
                                  historyLevel === "medium" ? (isDarkMode ? "text-blue-400" : "text-blue-600") :
                                  (isDarkMode ? "text-purple-400" : "text-purple-600")
                                : isDarkMode ? "text-white/40 hover:text-white/60" : "text-black/40 hover:text-black/60"
                            }`}
                          >
                            History
                          </button>
                        </div>
                      </div>

                      <div className="relative w-full">
                        <div className={logTab === "updates" ? "block animate-in fade-in duration-300" : "hidden"}>
                        <div className="flex justify-end mb-8 relative z-50 px-4">
                           <button
                             onClick={() => {
                               const text = changelogData.map((day: any) => 
                                 `Date: ${day.date}\n` + day.updates.map((u: any) => `[${u.status}] ${u.title}\n${u.description}\n${u.rationale ? `Rationale: ${u.rationale}` : ''}`).join('\n\n')
                               ).join('\n\n---\n\n');
                               navigator.clipboard.writeText(text);
                               addNotification("Updates Copied!", "success");
                             }}
                             className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all active:scale-95 border ${isDarkMode ? "bg-white/5 text-white hover:bg-white/10 border-white/10" : "bg-black/5 text-black hover:bg-black/10 border-black/10"}`}
                           >
                             <Copy className="w-3.5 h-3.5" />
                             Copy Updates
                           </button>
                        </div>
                      {changelogData.map((day, idx) => (
                        <div key={day.date} className="relative pl-10 sm:pl-28">
                          {/* Intense Neon Timeline Line */}
                          <div className={`absolute left-4 sm:left-14 top-0 bottom-0 w-0.5 ${isDarkMode ? "bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent" : "bg-gradient-to-b from-emerald-500/40 via-emerald-500/10 to-transparent"}`} />
                          
                          <div className={`absolute left-0 sm:left-9 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] z-20 ${isDarkMode ? "bg-[#0b141a]" : "bg-white"}`}>
                             <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                          </div>

                          <div className="mb-10 sm:mb-16">
                            <div className={`text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-2 sm:mb-3 ${isDarkMode ? "text-emerald-400/40" : "text-emerald-600/40"}`}>
                              Sector: {day.date}
                            </div>
                            <h3 className={`text-3xl sm:text-5xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-black"}`}>
                              {day.date === new Date().toISOString().split('T')[0] ? "Active Build" : new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </h3>
                          </div>

                          <div className="space-y-12 sm:space-y-20">
                            {day.updates.map((update, uIdx) => (
                              <div 
                                key={uIdx}
                                className="group relative animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both"
                                style={{ animationDelay: `${uIdx * 100}ms` }}
                              >
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                  <span className={`px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-black tracking-widest border ${
                                    update.status === "DEPLOYED" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]" :
                                    update.status === "CONCEPTUAL" ? "bg-orange-500/10 border-orange-500/30 text-orange-500" :
                                    isDarkMode ? "bg-white/5 border-white/10 text-white/50" : "bg-black/5 border-black/10 text-black/50"
                                  }`}>
                                    {update.status}
                                  </span>
                                  <div className="flex-1 h-px bg-emerald-500/5" />
                                </div>

                                <h4 className={`text-lg sm:text-2xl font-black mb-3 sm:mb-5 tracking-tight group-hover:text-emerald-400 transition-colors ${isDarkMode ? "text-emerald-50" : "text-black"}`}>
                                  {update.title}
                                </h4>
                                <p className={`text-xs sm:text-base leading-relaxed font-medium mb-6 sm:mb-8 ${isDarkMode ? "text-white/50" : "text-black/60"}`}>
                                  {update.description}
                                </p>
                                {update.rationale && (
                                  <div className={`p-5 sm:p-8 rounded-[24px] sm:rounded-[40px] border relative overflow-hidden transition-all group-hover:border-emerald-500/30 ${isDarkMode ? "bg-black/40 border-emerald-500/10" : "bg-white border-emerald-500/10"}`}>
                                    <div className="absolute top-0 left-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-b from-emerald-500 to-orange-500" />
                                    <span className={`block text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-4 ${isDarkMode ? "text-emerald-500" : "text-emerald-600"}`}>
                                      Build Rationale
                                    </span>
                                    <p className={`text-[12px] sm:text-[15px] italic leading-relaxed font-medium ${isDarkMode ? "text-white/40" : "text-black/50"}`}>
                                      {update.rationale}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                        </div>
                        <div className={logTab === "history" ? "block animate-in fade-in duration-300 space-y-8 relative" : "hidden"}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-20">
                            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                              {(["easy", "medium", "hard"] as const).map((level) => (
                                <button
                                  key={level}
                                  onClick={() => setHistoryLevel(level)}
                                  className={`px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all border ${
                                    historyLevel === level
                                      ? level === "easy" ? "bg-orange-500/20 text-orange-500 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.4)]" : level === "medium" ? "bg-blue-500/20 text-blue-500 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "bg-purple-500/20 text-purple-500 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                      : isDarkMode ? "bg-black/20 text-white/40 border-white/5 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "bg-white/50 text-black/40 border-black/5 hover:bg-black/5 hover:shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                                  }`}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 relative z-50">
                              <div className="relative flex items-center justify-center">
                                <button 
                                  onClick={() => setShowHistoryInfo(true)}
                                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-colors ${
                                    showHistoryInfo ? (isDarkMode ? "bg-white/20 border-white/30 text-white" : "bg-black/20 border-black/30 text-black") :
                                    (isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white/50 hover:text-white" : "bg-black/5 border-black/10 hover:bg-black/10 text-black/50 hover:text-black")
                                  }`}
                                >
                                  <Info className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                  {showHistoryInfo && (
                                    <div className="fixed inset-0 z-[500] flex items-center justify-center px-4 pointer-events-auto bg-black/40 backdrop-blur-sm">
                                      <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                        className={`relative w-full max-w-[320px] p-6 rounded-3xl border shadow-2xl ${isDarkMode ? "bg-[#111c24] border-white/10 text-white" : "bg-white border-black/10 text-black"}`}
                                      >
                                        <button onClick={() => setShowHistoryInfo(false)} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10 text-white/50 hover:text-white" : "hover:bg-black/5 text-black/50 hover:text-black"}`}>
                                          <X className="w-5 h-5" />
                                        </button>
                                        <h4 className="text-sm font-black uppercase tracking-widest mb-5">Difficulty Levels</h4>
                                        <p className="mb-4 text-xs leading-relaxed"><strong className="text-orange-500 block text-sm mb-1 font-black">Easy</strong> Simple concepts without technical jargon.</p>
                                        <p className="mb-4 text-xs leading-relaxed"><strong className="text-blue-500 block text-sm mb-1 font-black">Medium</strong> General technical overview.</p>
                                        <p className="text-xs leading-relaxed"><strong className="text-purple-500 block text-sm mb-1 font-black">Hard</strong> Full architectural breakdown for developers.</p>
                                      </motion.div>
                                    </div>
                                  )}
                                </AnimatePresence>
                              </div>
                              <button
                                onClick={() => {
                                  const d = historyData[historyLevel];
                                  const text = [
                                    d.title,
                                    d.intro,
                                    "",
                                    ...d.sections.map((s: any) => `## ${s.heading}\n${s.content}\n`),
                                    d.summary
                                  ].join("\n");
                                  navigator.clipboard.writeText(text);
                                  addNotification("History Copied!", "success");
                                }}
                                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all active:scale-95 border ${isDarkMode ? "bg-white/5 text-white hover:bg-white/10 border-white/10" : "bg-black/5 text-black hover:bg-black/10 border-black/10"}`}
                              >
                                <Copy className="w-3.5 h-3.5" />
                                Copy
                              </button>
                            </div>
                          </div>

                          <div className={`p-6 sm:p-10 rounded-[32px] border-2 relative overflow-hidden shadow-2xl ${
                            logTab === "history" && historyLevel === "easy" ? isDarkMode ? "bg-[#0b141a] border-orange-500/20" : "bg-white border-orange-500/20" :
                            logTab === "history" && historyLevel === "medium" ? isDarkMode ? "bg-[#0b141a] border-blue-500/20" : "bg-white border-blue-500/20" :
                            logTab === "history" && historyLevel === "hard" ? isDarkMode ? "bg-[#0b141a] border-purple-500/20" : "bg-white border-purple-500/20" :
                            isDarkMode ? "bg-[#0b141a] border-white/10" : "bg-white border-black/10"
                          }`}>
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${historyLevel === "easy" ? "from-orange-400 to-orange-600" : historyLevel === "medium" ? "from-blue-400 to-blue-600" : "from-purple-400 to-purple-600"}`} />
                            
                            <h2 className={`text-2xl sm:text-4xl font-black tracking-tighter mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
                              {historyData[historyLevel].title}
                            </h2>
                            <p className={`text-sm sm:text-lg leading-relaxed font-medium mb-10 ${isDarkMode ? "text-white/70" : "text-black/70"}`}>
                              {historyData[historyLevel].intro}
                            </p>

                            <div className="space-y-8 sm:space-y-12">
                              {historyData[historyLevel].sections.map((section: any, idx: number) => (
                                <div key={idx} className="relative">
                                  <h3 className={`text-lg sm:text-xl font-black mb-3 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                                    {section.heading}
                                  </h3>
                                  <p className={`text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                                    {section.content}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className={`mt-12 p-6 rounded-2xl border ${isDarkMode ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-500/20"}`}>
                               <p className={`text-xs sm:text-sm italic font-medium leading-relaxed ${isDarkMode ? "text-emerald-100/70" : "text-emerald-900/70"}`}>
                                 {historyData[historyLevel].summary}
                               </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Book Footer */}
                      <div className="pt-24 sm:pt-40 pb-16 sm:pb-24 text-center relative">
                         <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
                         <div className="w-16 sm:w-24 h-0.5 bg-emerald-500/30 mx-auto mb-8 sm:mb-10 relative z-10" />
                         <p className={`text-[10px] sm:text-[12px] font-black uppercase tracking-[0.5em] relative z-10 ${isDarkMode ? "text-white/30" : "text-black/30"}`}>End of Technical Protocol</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phone Action Modal ── */}
            <AnimatePresence>
              {selectedPhone && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSelectedPhone(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={`relative w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? "bg-[#233138] border-white/10" : "bg-white border-black/10"
                      }`}
                  >
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                        {selectedPhone}
                      </h3>
                      <p className="text-xs opacity-50 mb-6 font-medium">Phone Number</p>

                      <div className="space-y-2">
                        <a
                          href={`tel:${selectedPhone}`}
                          onClick={() => setSelectedPhone(null)}
                          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                          Dial the number
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedPhone || "");
                            addNotification("Number copied!", "success");
                            setSelectedPhone(null);
                          }}
                          className={`w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 border ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-black"
                            }`}
                        >
                          Copy number
                        </button>
                        <button
                          onClick={() => setSelectedPhone(null)}
                          className="w-full py-3 text-xs opacity-50 font-bold uppercase tracking-widest hover:opacity-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>{/* end body */}
        </motion.div>{/* end ovii-chat-frame */}
      </motion.div>{/* end ovii-chat-root */}
    </AnimatePresence>
  );
}
