import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Image as ImageIcon, Send, Trash2, Folder, Reply, Download, X, Play, Pause, XCircle, ArrowLeftRight, ChevronDown, ChevronLeft, Sun, Moon } from "lucide-react";
import { Toaster, toast } from "sonner";
import WaveSurfer from "wavesurfer.js";

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  name?: string;
  type: "text" | "image" | "voice";
  content: string;
  caption?: string;
  createdAt?: Timestamp;
  status?: "sending" | "sent" | "delivered" | "read";
  replyTo?: { id: string, content: string, avatar: string, name?: string };
};

const ROOM = "ovii-room";
const STOP_AUDIO_EVENT = "ovii_stop_audio";

// ─── Detect if we're on a touch/mobile device ───────────────────────────────
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

// ─── AudioPlayer ─────────────────────────────────────────────────────────────
const AudioPlayer = ({ src, id, mine, status, createdAt, isDarkMode }: { src: string, id: string, mine: boolean, status?: string, createdAt?: any, isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: isDarkMode ? "#3b4a54" : "#d1d7db",
      progressColor: isDarkMode ? "#34b7f1" : "#34b7f1",
      cursorWidth: 0,
      barWidth: 2,
      barGap: 3,
      barRadius: 4,
      height: 32,
      normalize: true,
    });
    ws.load(src);
    waveRef.current = ws;
    ws.on("ready", () => setDuration(ws.getDuration()));
    ws.on("audioprocess", () => setCurrentTime(ws.getCurrentTime()));
    ws.on("finish", () => { setPlaying(false); setCurrentTime(ws.getDuration()); });
    const stopOthers = (e: any) => {
      if (e.detail !== id && ws.isPlaying()) { ws.pause(); setPlaying(false); }
    };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);
    return () => {
      window.removeEventListener(STOP_AUDIO_EVENT, stopOthers);
      ws.destroy();
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
        <div
          className="w-full opacity-100"
          style={{ height: 32, overflow: "hidden" }}
          ref={containerRef}
        />
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
function MediaList({ msgs, uid, downloadFile, isDarkMode }: { msgs: Msg[], uid: string | null, downloadFile: (u: string, i: string, t: string) => void, isDarkMode: boolean }) {
  const mediaMsgs = msgs.filter(m => m.type === "voice" || m.type === "image");
  if (mediaMsgs.length === 0) return <p className="text-muted-foreground text-center mt-10 text-xs">No saved media.</p>;

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
            <div key={m.id} className="bg-card/30 border border-border/10 p-2.5 rounded-2xl flex items-center gap-4 lg:gap-6 shadow-sm hover:bg-card/50 transition-all group">
              <div className="flex-1 min-w-0">
                {m.type === "voice" ? (
                  <AudioPlayer src={m.content} id={m.id} mine={m.uid === uid} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                ) : (
                  <div className="flex items-center gap-3 p-1">
                    <img src={m.content} className="w-12 h-12 rounded-lg object-cover shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={() => window.open(m.content, "_blank")} alt="" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] font-bold truncate ${isDarkMode ? "text-white/80" : "text-black/80"}`}>Photo</div>
                      <div className="text-[10px] opacity-40 uppercase">{m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {m.type === "image" && (
                  <button
                    onClick={() => window.open(m.content, "_blank")}
                    className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-all shrink-0"
                    aria-label="View photo"
                  >
                    <Play className="w-4 h-4 rotate-0" /> {/* Play icon as a "view" placeholder or similar, but maybe Eye is better */}
                  </button>
                )}
                <button
                  onClick={() => downloadFile(m.content, m.id, m.type)}
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

// ─── OViiChat ─────────────────────────────────────────────────────────────────
export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [inputHeight, setInputHeight] = useState(44);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("ovii_dark_mode");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("ovii_dark_mode", String(isDarkMode));
  }, [isDarkMode]);

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
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: instant ? "instant" : "smooth",
      });
    }
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
            if (lastSeen > 0 && now - lastSeen > 30_000 && d.id !== u.uid) {
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
              setOtherOnline(true);
            }
          });

          if (![...currentOnlineIds].some(id => id !== u.uid)) setOtherOnline(false);

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
          const tnow = Date.now();
          for (const m of list) {
            if (m.uid !== u.uid && m.status !== "read" && !s.metadata.hasPendingWrites) {
              setDoc(doc(db, "ovii", ROOM, "messages", m.id), { status: "read" }, { merge: true }).catch(() => { });
            }
            const ts = m.createdAt?.toMillis?.() ?? 0;
            if (!ts) continue;

            // Retention logic:
            // Text: 5 days
            // Voice/Photo: 14 days
            const limit = m.type === "text" 
              ? 5 * 24 * 60 * 60 * 1000 
              : 14 * 24 * 60 * 60 * 1000;

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
      if (Date.now() - lastActivity.current > 180_000) onLock();
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

  // ── Scroll to bottom on new messages ────────────────────────────────────
  useEffect(() => { scrollToBottom(); }, [msgs.length]);

  const setPres = (data: any) => {
    if (uid) setDoc(doc(db, "ovii", ROOM, "presence", uid), data, { merge: true }).catch(() => { });
  };

  const send = async (type: Msg["type"], content: string) => {
    if (!uid || !content) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type, content, status: "sent", createdAt: Timestamp.now() };
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

  const sendImage = async (url: string, caption?: string) => {
    if (!uid || !url) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, name, type: "image", content: url, caption, status: "sent", createdAt: Timestamp.now() };
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const onText = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const v = text.trim();
    if (!v) return;
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

  const onImage = async (file: File) => {
    if (!uid) return;
    if (file.size > 8 * 1024 * 1024) { setError("Image too large (max 8MB)"); return; }
    
    setIsUploading(true); // Show loader immediately
    try {
      const url = await uploadToCloudinary(file);
      await sendImage(url, ""); // Send immediately with empty caption
    } catch (e: any) { 
      setError("Image upload failed: " + (e.message || "Unknown error")); 
    } finally {
      setIsUploading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      if (e.clipboardData.items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = e.clipboardData.items[i].getAsFile();
        if (file) onImage(file);
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
    if (file && file.type.startsWith("image/")) onImage(file);
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
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = await uploadToCloudinary(blob);
          await send("voice", url);
        } catch (e: any) { setError("Voice upload failed: " + (e.message || "Unknown error")); }
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      setPres({ recording: true });
      cancelRecRef.current = false;
      setTimeout(() => {
        if (rec.state === "recording") { rec.stop(); setRecording(false); setPres({ recording: false }); }
      }, 10 * 60 * 1000);
    } catch (e: any) { setError("Microphone permission denied"); }
  };

  const stopAndSendRec = () => {
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setPres({ recording: false });
  };

  const cancelRec = () => {
    cancelRecRef.current = true;
    if (recRef.current?.state === "recording") recRef.current.stop();
    setRecording(false);
    setPres({ recording: false });
  };

  const downloadFile = async (url: string, id: string, type: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      const ext = type === "voice" ? "webm" : "jpg";
      a.download = `${type}-${id.slice(0, 8)}.${ext}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success("Download started");
    } catch { window.open(url, "_blank"); }
  };

  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

  // chatMsgs: Text for 5 days, Media for 7 days
  const chatMsgs = msgs.filter(m => {
    const ts = m.createdAt?.toMillis?.() ?? 0;
    if (!ts) return true; // Keep pending messages
    const age = now - ts;
    if (m.type === "text") return age < FIVE_DAYS;
    return age < SEVEN_DAYS;
  }).sort((a, b) => (a.createdAt?.toMillis?.() ?? 0) - (b.createdAt?.toMillis?.() ?? 0));

  const mediaMsgs = msgs.filter(m => m.type === "voice" || m.type === "image");
  const unreadMedia = mediaMsgs.length;

  // ── Root style: fixed + inset:0 on desktop, keyboard-adjusted on mobile ──
  const rootStyle: React.CSSProperties = isMobileDevice() && mobileKeyboardOffset > 0
    ? { paddingBottom: mobileKeyboardOffset }
    : {};

  return (
    <>
      {/*
        ARCHITECTURE:
        .ovii-chat-root     → position:fixed; inset:0; overflow:hidden (CSS in styles.css)
          .ovii-chat-frame  → desktop: centered card with max-width; mobile: full-bleed
            header          → shrink-0
            .ovii-body      → flex-1; overflow:hidden; display:flex
              .ovii-msgs-col → flex-1; overflow:hidden; flex-col
                scroll area → flex-1; overflow-y:auto; overflow-x:hidden
              .ovii-sidebar  → desktop only, 380px
            input bar       → shrink-0
      */}
      <div className={`ovii-chat-root transition-colors duration-300 ${isDarkMode ? "bg-[#0b141a]" : "bg-[#efeae2]"}`} style={rootStyle}>
        <Toaster position="top-center" />

        {/* ── Avatar Picker Overlay ── */}
        {showAvatarPicker && (
          <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-elegant text-center">
              <h2 className="text-xl font-bold mb-2">Select Your Identity</h2>
              <p className="text-xs text-muted-foreground mb-4">Enter your name and pick an avatar.</p>
              <input
                type="text"
                placeholder="Your Name"
                maxLength={20}
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-primary/40 text-center"
              />
              <div className="grid grid-cols-4 gap-4 mb-6">
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
                    }}
                    className="rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-transparent"
                  >
                    <img src={av.url} alt={av.name} className="w-full h-auto" />
                  </button>
                ))}
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
              className="absolute inset-0 z-50 bg-background/98 backdrop-blur-xl flex lg:hidden flex-col"
            >
              <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
                <h2 className="text-base font-bold uppercase tracking-wider flex items-center gap-2.5">
                  <Folder className="w-5 h-5 text-destructive" /> MY FILES
                </h2>
                <button onClick={() => setShowFolder(false)} className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <MediaList msgs={msgs} uid={uid} downloadFile={downloadFile} isDarkMode={isDarkMode} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/*
          ── Chat Frame ──────────────────────────────────────────────────────
          Mobile:  full-bleed, height 100%
          Desktop: centered card, max-width 1440px, 20px margin, rounded, bordered
          The CSS for .ovii-chat-frame lives in styles.css (see below comment).
          We use a single wrapper — NO duplicate ovii-chat-inner.
        */}
        <div
          className="ovii-chat-frame flex flex-col h-full w-full"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* ── Header ── */}
          <header className={`px-5 py-3 flex items-center justify-between z-20 shrink-0 shadow-md ${isDarkMode ? "bg-[#202c33] border-b border-white/5 text-white" : "bg-[#f0f2f5] border-b border-black/5 text-black"
            }`}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-black/5 bg-muted shadow-sm">
                {otherAvatar ? (
                  <img src={otherAvatar} alt="" className="w-full h-full object-cover" />
                ) : avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover opacity-40 grayscale" />
                ) : null}
              </div>
              <div>
                <div className="font-bold text-[15px] leading-tight">
                  {otherName || (count > 1 ? "Ovii User" : "Waiting...")}
                </div>
                <div className="text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                  {recordingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Recording...</span>
                  ) : typingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Typing...</span>
                  ) : otherOnline ? (
                    <span className="text-emerald-500">online</span>
                  ) : otherName ? (
                    "offline"
                  ) : (
                    "no one else here"
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => { window.location.href = "/news"; }}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title="Switch to News"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowFolder(true)}
                className={`p-2 rounded-full transition-colors relative ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title="My Files"
              >
                <Folder className="w-5 h-5" />
                {unreadMedia > 0 && <span className="absolute top-1 right-1 bg-[#25d366] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">{unreadMedia}</span>}
              </button>
              <button
                onClick={onLock}
                className={`ml-1 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all border ${isDarkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-black/80"
                  }`}
              >
                Lock
              </button>
            </div>
          </header>

          {/* ── Body: messages col + optional desktop sidebar ── */}
          <div className="flex-1 flex min-h-0 overflow-hidden">

            {/* ── Messages column ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

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
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='${isDarkMode ? "%23ffffff15" : "%2300000010"}'/%3E%3C/svg%3E")`,
                  backgroundSize: "20px 20px"
                }}
                onScroll={(e) => {
                  const t = e.currentTarget;
                  setShowScrollDown(t.scrollHeight - t.scrollTop > t.clientHeight + 80);
                }}
              >
                <div className="flex-1" />

                {error && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3 mb-3">{error}</div>}
                {!error && chatMsgs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm my-auto">
                    <div><div className="text-4xl mb-2">👋</div>No messages yet.</div>
                  </div>
                )}

                <div className="w-full space-y-1 flex flex-col justify-end items-stretch shrink-0 relative px-4 sm:px-6">
                  <AnimatePresence>
                    {chatMsgs.map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      return (
                        <div key={m.id} className={`w-full flex ${mine ? "justify-end" : "justify-start"} ${!isConsecutive ? "mt-4" : "mt-1.5"}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
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
                            className={`relative flex gap-2 group w-fit max-w-[85%] md:max-w-[95%] ${mine ? "ml-auto" : "mr-auto"}`}
                          >
                            <div className={`absolute inset-y-0 flex items-center transition-opacity pointer-events-none opacity-0 group-drag:opacity-100 ${mine ? "-right-12 pl-4" : "-left-12 pr-4"
                              }`}>
                              <Reply className="w-5 h-5 text-primary/40" />
                            </div>

                            {!mine && (
                              <div className="flex flex-col items-center mt-auto gap-1 w-8 shrink-0">
                                {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full bg-muted object-cover border border-border/40 shadow-sm" alt="" />}
                              </div>
                            )}

                            <div className={`flex-1 min-w-0 ${mine ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                              {!mine && !isConsecutive && m.name && <span className="text-[10px] font-bold text-muted-foreground ml-1.5 mb-0.5 uppercase tracking-tighter">{m.name}</span>}

                              {m.replyTo && (
                                <div className="bg-m3-surface-container-high/50 px-2.5 py-1.5 rounded-t-xl rounded-b-sm text-xs opacity-90 flex items-center gap-2 border-l-3 border-primary/80 mb-0.5 mx-1 max-w-full overflow-hidden">
                                  <img src={m.replyTo.avatar} className="w-4 h-4 rounded-full border border-border/20 shrink-0" alt="" />
                                  <div className="flex flex-col min-w-0">
                                    {m.replyTo.name && <span className="text-[8px] font-black text-primary uppercase tracking-tighter truncate">{m.replyTo.name}</span>}
                                    <span className="truncate italic text-[10px] leading-tight">{m.replyTo.content}</span>
                                  </div>
                                </div>
                              )}

                              {m.type === "voice" ? (
                                <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                              ) : (
                                <div
                                  className={`rounded-[18px] ${m.type === "image" ? "p-0 overflow-hidden" : "px-3 py-1.5 sm:px-4 sm:py-2.5"} text-[14.5px] leading-[1.45] break-words relative flex flex-col shadow-sm transition-all w-fit max-w-full
                                ${mine
                                      ? (isDarkMode ? "bg-[#005c4b] text-[#e9edef] " : "bg-[#dcf8c6] text-[#111b21] ") + (isLastInGroup ? "rounded-br-none" : "")
                                      : (isDarkMode ? "bg-[#202c33] text-[#e9edef] " : "bg-white text-[#111b21] ") + (isLastInGroup ? "rounded-bl-none" : "")
                                    }`}
                                >
                                  <div className="relative flex flex-col">
                                    {m.type === "image" && (
                                      <div className="mb-0 overflow-hidden rounded-[18px] relative group/img">
                                        <img src={m.content} alt="" className="w-full max-w-[320px] md:max-w-[600px] shadow-sm block transition-transform group-hover/img:scale-[1.02]" />
                                        
                                        {/* Photo overlay actions */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); window.open(m.content, "_blank"); }}
                                            className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
                                          >
                                            <Play className="w-4 h-4" /> {/* Simple icon for view */}
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

                                    <div className="relative overflow-hidden min-w-[60px]">
                                      {m.type === "text" && (
                                        <span className="block break-words whitespace-pre-wrap leading-relaxed text-[15px]">
                                          {m.content}
                                          <span className="inline-block w-[75px] h-[10px]" />
                                        </span>
                                      )}
                                      
                                      {/* Timestamp: absolute for image, relative for text */}
                                      <div className={`${m.type === "image" ? "absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md" : "absolute bottom-0 right-0"} flex items-center gap-1.5 opacity-90 pointer-events-none select-none`}>
                                        <span className={`text-[11px] tabular-nums font-['Inter'] font-extralight tracking-tight ${m.type === "image" ? "text-white" : ""}`}>
                                          {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || ""}
                                        </span>
                                        {mine && <div className={`shrink-0 scale-95 ${m.type === "image" ? "text-[#53bdeb]" : ""}`}><MsgTick status={m.status} /></div>}
                                      </div>
                                    </div>
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
                              <div className="flex flex-col items-center mt-auto gap-1 w-8 shrink-0">
                                {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full bg-muted object-cover border border-border/40 shadow-sm" alt="" />}
                              </div>
                            )}
                          </motion.div>
                        </div>
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
                        <span className="text-[12px] font-bold opacity-70">Sending photo...</span>
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

              {/* Input bar */}
              <div className={`px-2 py-2 sm:px-4 sm:py-3 pb-safe flex items-center gap-2 sm:gap-3 z-20 shrink-0 ${isDarkMode ? "bg-[#0b141a]" : "bg-[#efeae2]"
                }`}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,.gif"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) onImage(f); e.target.value = ""; }}
                />

                {recording ? (
                  /* ── Recording state: swipe-to-cancel with green skin ── */
                  <div className={`flex-1 flex items-center gap-3 rounded-[28px] px-4 h-[54px] overflow-hidden shadow-inner ${isDarkMode ? "bg-[#2a3942]" : "bg-white"
                    }`}>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_red] animate-pulse shrink-0" />
                      <RecordingVisualizer />
                    </div>
                    <motion.div
                      drag="x"
                      dragConstraints={{ right: 0 }}
                      dragElastic={0.1}
                      onDrag={(_, info) => { if (info.offset.x < -60) cancelRec(); }}
                      className="flex-1 flex items-center justify-center gap-2 cursor-grab active:cursor-grabbing select-none min-w-0 px-2"
                    >
                      <ChevronLeft className={`w-4 h-4 shrink-0 animate-pulse ${isDarkMode ? "text-white/30" : "text-black/30"
                        }`} />
                      <span className={`text-[12px] font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis ${isDarkMode ? "text-white/30" : "text-black/30"
                        }`}>Slide to cancel</span>
                    </motion.div>
                    <button
                      type="button"
                      onClick={stopAndSendRec}
                      className="shrink-0 h-10 px-4 rounded-full bg-[#00a884] text-white text-[12px] font-black flex items-center gap-1.5 active:scale-95 transition-all shadow-sm hover:bg-[#00c298]"
                    >
                      <Send className="w-3.5 h-3.5" /> Send
                    </button>
                  </div>
                ) : (
                  /* ── Normal state: image + mic + text input ── */
                  <>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={`h-11 w-11 shrink-0 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "text-white/50 hover:text-white hover:bg-white/10" : "text-black/40 hover:text-black hover:bg-black/10"
                        }`}
                      aria-label="Attach image"
                    >
                      <ImageIcon className="w-6 h-6" />
                    </button>

                    <div className={`flex-1 flex flex-col min-w-0 rounded-[24px] overflow-hidden shadow-sm ${isDarkMode ? "bg-[#2a3942]" : "bg-white"
                      }`}>
                      <AnimatePresence mode="wait">
                        {replyingTo && (
                          <motion.div
                            key="reply"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 px-4 pt-2 w-full border-b border-white/5 pb-1.5"
                          >
                            <div className="w-1 bg-[#25d366] h-8 rounded-full shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-bold text-[#25d366] truncate">{replyingTo.name || "User"}</div>
                              <div className={`text-[11px] italic truncate leading-tight ${isDarkMode ? "text-white/50" : "text-black/50"
                                }`}>
                                {replyingTo.type === "text" ? replyingTo.content : replyingTo.type === "image" ? "Photo" : "Voice Note"}
                              </div>
                            </div>
                            <button
                              onClick={() => setReplyingTo(null)}
                              className={`shrink-0 p-1 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                                }`}
                            >
                              <X className={`w-3.5 h-3.5 ${isDarkMode ? "text-white/40" : "text-black/40"}`} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <textarea
                        ref={inputRef}
                        rows={1}
                        autoComplete="off"
                        value={text}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isMobileDevice()) {
                            e.preventDefault();
                            onText();
                          }
                        }}
                        onPaste={handlePaste}
                        onChange={(e) => {
                          const val = e.target.value;
                          setText(val);
                          
                          // Correct autogrow: reset to auto then measure scrollHeight
                          e.target.style.height = "auto";
                          const nextH = Math.max(44, Math.min(e.target.scrollHeight, 350));
                          setInputHeight(nextH);

                          if (uid) {
                            const typingNow = val.length > 0;
                            if (typingNow !== isTyping) { setIsTyping(typingNow); setPres({ typing: typingNow }); }
                            if (typingTimer.current) clearTimeout(typingTimer.current);
                            if (typingNow) typingTimer.current = setTimeout(() => { setIsTyping(false); setPres({ typing: false }); }, 2000);
                          }
                        }}
                        className={`flex-1 bg-transparent px-4 py-3 text-[15.5px] leading-[1.5] focus:outline-none placeholder:opacity-40 resize-none overflow-y-auto scrollbar-hide break-words ${isDarkMode ? "text-white" : "text-black"
                          }`}
                        style={{ height: `${inputHeight}px` }}
                      />
                    </div>

                    <div className="shrink-0 w-12 h-12 flex items-center justify-center relative">
                      <AnimatePresence mode="popLayout">
                        {text.trim() ? (
                          <motion.button
                            key="send"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            type="button"
                            onClick={() => onText()}
                             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow-md md:shadow-lg active:scale-90 transition-all shrink-0"
                          >
                            <Send className="w-5 h-5 md:w-6 md:h-6 fill-white stroke-[1.5] md:stroke-2" />
                          </motion.button>
                        ) : (
                          <motion.button
                            key="mic"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            type="button"
                            onPointerDown={(e) => { e.preventDefault(); startRec(); }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "text-white/50 hover:text-white hover:bg-white/10" : "text-black/40 hover:text-black hover:bg-black/10"
                              }`}
                            aria-label="Tap to record"
                          >
                            <Mic className="w-7 h-7" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Desktop Sidebar (hidden on mobile via CSS/Tailwind) ── */}
            <AnimatePresence>
              {showFolder && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 380, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="hidden lg:flex flex-col border-l border-border/40 bg-muted/5 relative overflow-hidden shrink-0"
                >
                  <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/40 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-destructive" /> MY FILES
                    </h2>
                    <button onClick={() => setShowFolder(false)} className="p-1.5 rounded-full hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                    <FilesList voiceMsgs={voiceMsgs} uid={uid} downloadVoice={downloadVoice} isDarkMode={isDarkMode} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>{/* end body */}
        </div>{/* end ovii-chat-frame */}
      </div>{/* end ovii-chat-root */}
    </>
  );
}
