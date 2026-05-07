import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs, writeBatch
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Image as ImageIcon, Send, Trash2, Folder, Reply, Download, X, Play, Pause, XCircle, ArrowLeftRight, ChevronDown, ChevronLeft, Sun, Moon, MoreVertical, ShieldOff, Clock } from "lucide-react";
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
      waveColor: "rgba(255,255,255,0.25)",
      progressColor: "#00a884",
      cursorWidth: 0,
      barWidth: 2,
      barGap: 3,
      barRadius: 2,
      height: 36,
      normalize: true,
    });
    ws.load(src);
    waveRef.current = ws;
    ws.on("ready", () => setDuration(ws.getDuration()));
    ws.on("audioprocess", () => setCurrentTime(ws.getCurrentTime()));
    ws.on("finish", () => { setPlaying(false); setCurrentTime(ws.getDuration()); });
    const stopOthers = (e: any) => { if (e.detail !== id && ws.isPlaying()) { ws.pause(); setPlaying(false); } };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);
    return () => { window.removeEventListener(STOP_AUDIO_EVENT, stopOthers); ws.destroy(); };
  }, [src, id, isDarkMode, mine]);

  const toggle = () => {
    if (!waveRef.current) return;
    if (playing) waveRef.current.pause();
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
    <div className={`flex flex-col gap-2 w-full max-w-[300px] p-4 rounded-[18px] transition-all ${
      mine ? "bg-[#005c4b] text-white" : "bg-[#202c33] text-white"
    }`}>
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="shrink-0 text-white active:scale-90 transition-all">
          {playing ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-0.5" />}
        </button>
        <div ref={containerRef} className="flex-1 h-[36px]" />
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <div className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
          {fmt(playing ? currentTime : duration)}
        </div>
        <div className="text-[10px] opacity-60 font-medium">
          {timeStr}
        </div>
        <button onClick={toggleSpeed} className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] font-bold hover:bg-white/20">
          {speed}x
        </button>
        {mine && <MsgTick status={status} />}
      </div>
    </div>
  );
};

const MsgTick = ({ status }: { status?: string }) => {
  if (status === "sending") return <svg className="w-3 h-3 opacity-40" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>;
  if (status === "sent") return (
    <svg className="w-[13px] h-[9px] opacity-40" viewBox="0 0 12 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "delivered") return (
    <svg className="w-[17px] h-[9px] opacity-40" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (status === "read") return (
    <svg className="w-[17px] h-[9px]" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="#34b7f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4.5L8.5 8L15 1" stroke="#34b7f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
                    <img src={m.content} className="w-12 h-12 rounded-lg object-cover shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedImage(m.content)} alt="" />
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
                    onClick={() => setSelectedImage(m.content)}
                    className="p-2.5 bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-all shrink-0"
                    aria-label="View photo"
                  >
                    <ImageIcon className="w-4 h-4" />
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
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // ── Scroll to bottom on load and new messages ──────────────────────────
  useEffect(() => { 
    const timer = setTimeout(() => scrollToBottom(true), 250); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { 
    const timer = setTimeout(() => scrollToBottom(false), 100); 
    return () => clearTimeout(timer);
  }, [msgs.length]);

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

  const clearChat = async () => {
    if (!confirm("Are you sure you want to clear all messages? This cannot be undone.")) return;
    try {
      const q = query(collection(db, "ovii", ROOM, "messages"));
      const snapshot = await getDocs(q);
      const batch = snapshot.docs.map(d => deleteDoc(doc(db, "ovii", ROOM, "messages", d.id)));
      await Promise.all(batch);
      toast.success("Chat cleared");
      setShowMenu(false);
    } catch (e) {
      toast.error("Failed to clear chat");
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
              className="fixed inset-0 z-[150] bg-background flex flex-col"
            >
              <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
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
          <header className={`h-[64px] px-2 flex items-center justify-between z-[60] shrink-0 shadow-sm ${isDarkMode ? "bg-[#202c33] border-b border-white/5 text-white" : "bg-white border-b border-black/5 text-black"}`}>
            <div className="flex items-center gap-1.5 min-w-0">
              <button onClick={() => window.location.href = "/news"} className="p-2 -ml-1 hover:bg-white/10 rounded-full transition-colors shrink-0">
                <ChevronLeft className="w-7 h-7" />
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10 bg-muted shrink-0 shadow-sm">
                {otherAvatar ? (
                  <img src={otherAvatar} alt="" className="w-full h-full object-cover" />
                ) : avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover opacity-40 grayscale" />
                ) : null}
              </div>
              <div className="flex flex-col min-w-0 ml-1">
                <div className="font-bold text-[16px] leading-tight truncate">
                  {otherName || (count > 1 ? "Ovii User" : "Waiting...") || "Waiting..."}
                </div>
                <div className="text-[11px] opacity-60 truncate font-medium">
                  {recordingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Recording...</span>
                  ) : typingUsers.length > 0 ? (
                    <span className="text-emerald-500 animate-pulse">Typing...</span>
                  ) : otherOnline ? (
                    <span className="text-emerald-500 uppercase tracking-tighter text-[10px]">online</span>
                  ) : otherName ? (
                    <span className="opacity-70 italic text-[10px]">last seen today at 11:27 PM</span>
                  ) : (
                    "no one else here"
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => { window.location.href = "/news"; }}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
              <button
                onClick={onLock}
                className={`ml-1 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all border ${isDarkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/90"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-black/90"
                  }`}
              >
                LOCK
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
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
                            <input 
                type="file" 
                ref={fileRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImage(file);
                  e.target.value = '';
                }} 
              />
              <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-stretch touch-pan-y relative bg-[#0b141a] premium-scrollbar"
                style={{ overscrollBehavior: "contain", overflowX: "hidden" }}
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

                <div className="flex-1 flex flex-col justify-end shrink-0 relative px-[10px] pt-[12px] pb-[90px] gap-[4px]">
                  <AnimatePresence>
                    {chatMsgs.map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      return (
                        <div key={m.id} className={`w-full flex ${mine ? "justify-end" : "justify-start"} ${!isConsecutive ? "mt-4" : "mt-0"}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-end gap-2 max-w-[85%] ${mine ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <div className="w-8 shrink-0 flex justify-center">
                              {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full object-cover shadow-md border border-white/5" alt="" />}
                            </div>

                            <div className={`flex-1 min-w-0 flex flex-col ${mine ? "items-end" : "items-start"}`}>
                              {!mine && !isConsecutive && m.name && (
                                <span className="text-[12px] font-bold text-white/40 ml-2 mb-1 uppercase tracking-wider">{m.name}</span>
                              )}

                              {m.type === "voice" ? (
                                <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                              ) : (
                                <div className={`relative px-[12px] py-[8px] shadow-md w-fit max-w-full ${
                                  mine 
                                    ? "bg-[#005c4b] text-white rounded-[18px] rounded-br-[4px]"
                                    : "bg-[#202c33] text-white rounded-[18px] rounded-bl-[4px]"
                                }`}>
                                  {m.type === "image" ? (
                                    <div className="flex flex-col gap-2">
                                      <div className="rounded-[12px] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(m.content)}>
                                        <img src={m.content} alt="" className="max-w-full h-auto object-cover max-h-[300px]" />
                                      </div>
                                      {m.caption && <p className="text-[16px] leading-[1.45]">{m.caption}</p>}
                                    </div>
                                  ) : (
                                    <p className="text-[16px] leading-[1.45] break-words whitespace-pre-wrap">{m.content}</p>
                                  )}
                                  
                                  <div className="flex items-center justify-end gap-1 opacity-50 mt-1">
                                    <span className="text-[10px] font-medium uppercase tracking-tighter">
                                      {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    {mine && <MsgTick status={m.status} />}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
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
                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 bg-[#00a884] text-white p-2 rounded-full shadow-lg z-20 flex items-center gap-1 px-3 text-[10px] font-bold uppercase"
                  >
                    New message ↓
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Input bar */}
              <footer className="shrink-0 p-2 pb-safe z-[60] relative overflow-hidden">
                <div className="flex items-end gap-2 max-w-5xl mx-auto px-1 relative">
                  
                  {/* --- Recording Overlay --- */}
                  <AnimatePresence>
                    {recording && (
                      <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="absolute inset-y-0 left-1 right-[62px] bg-[#202c33] z-[70] rounded-full flex items-center px-4 shadow-lg border border-white/5"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-white text-sm font-bold tabular-nums">Recording...</span>
                          <div className="flex-1 text-center">
                            <span className="text-white/40 text-xs uppercase tracking-widest animate-pulse">
                              Slide to cancel 
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={cancelRec}
                          className="text-[#8696a0] hover:text-white uppercase text-[11px] font-black tracking-wider px-2"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1 flex items-end bg-[#202c33] rounded-[32px] min-h-[52px] px-3 py-1.5 shadow-sm">
                    <button 
                      onClick={() => fileRef.current?.click()}
                      className="p-2.5 text-[#8696a0] hover:text-white transition-colors shrink-0"
                    >
                      <ImageIcon className="w-6 h-6" />
                    </button>
                    <textarea
                      rows={1}
                      ref={inputRef}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          onText();
                          e.currentTarget.style.height = 'auto';
                        }
                      }}
                      onPaste={handlePaste}
                      placeholder="Message"
                      className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] text-white py-2.5 px-2 resize-none max-h-[150px] overflow-y-auto premium-scrollbar leading-[1.4] placeholder-[#8696a0]"
                    />
                  </div>
                  <button
                    onClick={recording ? stopAndSendRec : (text.trim() ? onText : startRec)}
                    className="w-[52px] h-[52px] rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all shrink-0"
                  >
                    {recording ? (
                      <div className="relative">
                        <Send className="w-6 h-6 fill-white stroke-none" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#00a884]" />
                      </div>
                    ) : (
                      text.trim() ? <Send className="w-6 h-6 fill-white stroke-none" /> : <Mic className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </footer>

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

          </div>{/* end msgs-col */}
          </div>{/* end body */}
        </div>{/* end ovii-chat-frame */}
      </div>{/* end ovii-chat-root */}

      {/* ── Full Image Preview Overlay ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => downloadFile(selectedImage, "preview", "image")}
              className="absolute top-[75px] right-5 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-10"
            >
              <Download className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="" 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
