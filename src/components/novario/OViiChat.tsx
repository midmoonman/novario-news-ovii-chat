import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Image as ImageIcon, Send, Trash2, Folder, Reply, Download, X, Play, Pause, XCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import WaveSurfer from "wavesurfer.js";

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  name?: string;
  type: "text" | "image" | "voice";
  content: string;
  createdAt?: Timestamp;
  status?: "sending" | "sent" | "delivered" | "read";
  replyTo?: { id: string, content: string, avatar: string, name?: string };
};

const ROOM = "ovii-room";

const STOP_AUDIO_EVENT = "ovii_stop_audio";

const AudioPlayer = ({ src, id }: { src: string, id: string }) => {
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
      waveColor: 'rgba(255, 255, 255, 0.4)',
      progressColor: 'currentColor',
      cursorWidth: 0,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 24,
      normalize: true,
    });
    
    ws.load(src);
    waveRef.current = ws;

    ws.on('ready', () => setDuration(ws.getDuration()));
    ws.on('timeupdate', () => setCurrentTime(ws.getCurrentTime()));
    ws.on('finish', () => { setPlaying(false); setCurrentTime(ws.getDuration()); });

    const stopOthers = (e: any) => {
      if (e.detail !== id && ws.isPlaying()) {
        ws.pause();
        setPlaying(false);
      }
    };
    window.addEventListener(STOP_AUDIO_EVENT, stopOthers);

    return () => {
      window.removeEventListener(STOP_AUDIO_EVENT, stopOthers);
      ws.destroy();
    };
  }, [src, id]);

  const toggle = () => {
    if (!waveRef.current) return;
    if (playing) {
      waveRef.current.pause();
    } else {
      window.dispatchEvent(new CustomEvent(STOP_AUDIO_EVENT, { detail: id }));
      waveRef.current.play();
    }
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
    return `${m}:${ss < 10 ? '0' : ''}${ss}`;
  };

  return (
    <div className="flex items-center gap-2 min-w-[200px] sm:min-w-[240px]">
      <button onClick={toggle} className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 hover:bg-primary-foreground/30 transition-colors">
        {playing ? <Pause className="w-4 h-4 fill-current text-current" /> : <Play className="w-4 h-4 fill-current text-current ml-0.5" />}
      </button>
      <div className="flex-1" ref={containerRef} />
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={toggleSpeed} className="text-[9px] font-bold bg-primary-foreground/15 px-2 py-0.5 rounded-full text-current hover:bg-primary-foreground/25 transition-colors border border-primary-foreground/10">
          {speed}x
        </button>
        <span className="text-[10px] font-medium opacity-80 tabular-nums">
          {fmt(playing ? currentTime : duration)}
        </span>
      </div>
    </div>
  );
};

const RemainingTime = ({ msg }: { msg: Msg }) => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 10000); // 10s tick is enough to avoid lag, or 1s for precise
    return () => clearInterval(t);
  }, []);

  const remaining = () => {
    const t = msg.createdAt?.toMillis?.() ?? Date.now();
    const limit = msg.type === "voice" ? 8 * 24 * 60 * 60 * 1000 : 5 * 60_000;
    return Math.max(0, Math.ceil((t + limit - Date.now()) / 1000));
  };
  
  const formatTime = (seconds: number) => {
    if (seconds >= 86400) return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
    if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    if (seconds > 60) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return <>{formatTime(remaining())}</>;
};

// WhatsApp-style tick component — single SVG unit, no gap, no duplication
const MsgTick = ({ status }: { status?: string }) => {
  if (status === "sending") return <svg className="w-3 h-3 text-muted-foreground/60" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>;
  if (status === "sent") return (
    <svg className="w-3 h-3 text-muted-foreground/70" viewBox="0 0 12 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (status === "delivered") return (
    <svg className="w-4 h-3 text-muted-foreground/70" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (status === "read") return (
    <svg className="w-4 h-3 text-blue-400" viewBox="0 0 16 9" fill="none">
      <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 4.5L8.5 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return null;
};

export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  // Track exact visible viewport height to handle keyboard open/close
  const [vpHeight, setVpHeight] = useState<number>(() => window.visualViewport?.height ?? window.innerHeight);

  const [deviceId] = useState(() => {
    let id = localStorage.getItem("ovii_device_id");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("ovii_device_id", id);
      localStorage.removeItem("ovii-avatar-choice"); // ensure new users pick avatar
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
  const [onlineUsers, setOnlineUsers] = useState<{uid: string, name: string}[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [systemMsgs, setSystemMsgs] = useState<{id: string, text: string, ts: number}[]>([]);
  const prevOnlineRef = useRef<Map<string, string>>(new Map());
  
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelRecRef = useRef(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef<number>(Date.now());
  const chunksRef = useRef<Blob[]>([]);

  const scrollToBottom = (instant = false) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: instant ? "instant" : "smooth",
      });
    }
  };

  // Auth + presence (max 2 users)
  useEffect(() => {
    if (!avatar) return; // wait for avatar selection
    let unsubMsgs = () => {};
    let unsubPresence = () => {};
    let alive = true;
    let heartbeatId: NodeJS.Timeout | null = null;
    let currentUid: string | null = null;

    // Synchronous presence cleanup for browser close
    const cleanupPresence = () => {
      if (!currentUid) return;
      // Use sendBeacon for reliable cleanup on tab/browser close
      // Also attempt direct delete as fallback
      deleteDoc(doc(db, "ovii", ROOM, "presence", currentUid)).catch(() => {});
    };

    const handleBeforeUnload = () => cleanupPresence();
    const handlePageHide = () => cleanupPresence();

    (async () => {
      try {
        const u = await ensureAnonAuth();
        if (!alive) return;
        currentUid = u.uid;

        // presence cleanup: remove stale (>30s) presence docs — aggressive to avoid ghosts
        const presCol = collection(db, "ovii", ROOM, "presence");
        const snap = await getDocs(presCol);
        const now = Date.now();
        for (const d of snap.docs) {
          const ts = (d.data().lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
          if (now - ts > 30_000 && d.id !== u.uid) {
            await deleteDoc(d.ref).catch(() => {});
          }
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

        // Register cleanup listeners (only on actual close, NOT on visibility hidden)
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("pagehide", handlePageHide);

        // heartbeat every 15s (reduced from 20s for tighter stale detection)
        heartbeatId = setInterval(() => {
          setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
            uid: u.uid, avatar, name, lastSeen: serverTimestamp(),
          }, { merge: true }).catch(() => {});
        }, 15_000);

        unsubPresence = onSnapshot(presCol, (s) => {
          const t: string[] = [];
          const r: string[] = [];
          const currentOnline: {uid: string, name: string}[] = [];
          const currentOnlineIds = new Set<string>();
          const now = Date.now();

          s.forEach((d) => {
            const data = d.data();
            // Filter out stale presence docs in real-time too
            const lastSeen = (data.lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
            if (lastSeen > 0 && now - lastSeen > 30_000 && d.id !== u.uid) {
              // Stale — clean it up and skip
              deleteDoc(d.ref).catch(() => {});
              return;
            }
            currentOnline.push({ uid: d.id, name: data.name || "Unknown" });
            currentOnlineIds.add(d.id);
            if (d.id !== u.uid) {
              if (data.typing) t.push(data.avatar);
              if (data.recording) r.push(data.avatar);
            }
          });
          
          // In-chat system message diff logic (WhatsApp style)
          currentOnline.forEach(user => {
            if (user.uid !== u.uid && !prevOnlineRef.current.has(user.uid)) {
              setSystemMsgs(prev => [...prev, { id: crypto.randomUUID(), text: `${user.name} is online`, ts: Date.now() }]);
            }
          });
          if (prevOnlineRef.current.size > 0) {
            prevOnlineRef.current.forEach((prevName, prevUid) => {
              if (prevUid !== u.uid && !currentOnlineIds.has(prevUid)) {
                setSystemMsgs(prev => [...prev, { id: crypto.randomUUID(), text: `${prevName} went offline`, ts: Date.now() }]);
              }
            });
          }
          // Store uid→name mapping for next diff
          const nextMap = new Map<string, string>();
          currentOnline.forEach(user => nextMap.set(user.uid, user.name));
          prevOnlineRef.current = nextMap;

          setOnlineUsers(currentOnline);
          setTypingUsers(t);
          setRecordingUsers(r);
          setCount(currentOnline.length);
        });

        // messages stream
        const q = query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "asc"));
        unsubMsgs = onSnapshot(q, { includeMetadataChanges: true }, (s) => {
          const list: Msg[] = s.docs.map((d) => {
            const data = d.data() as any;
            const msg: Msg = { id: d.id, ...data };
            if (d.metadata.hasPendingWrites && msg.uid === u.uid) {
              msg.status = "sending";
            }
            return msg;
          });
          setMsgs(list);
          const tnow = Date.now();
          for (const m of list) {
            // mark as read if received
            if (m.uid !== u.uid && m.status !== "read" && !s.metadata.hasPendingWrites) {
              setDoc(doc(db, "ovii", ROOM, "messages", m.id), { status: "read" }, { merge: true }).catch(()=>{});
            }
            const ts = m.createdAt?.toMillis?.() ?? 0;
            if (!ts) continue;
            // 8 days for voice, 5 minutes for everything else
            const limit = m.type === "voice" ? 8 * 24 * 60 * 60 * 1000 : 5 * 60_000;
            if (tnow - ts > limit) {
              deleteDoc(doc(db, "ovii", ROOM, "messages", m.id)).catch(() => {});
            }
          }
        });

        return () => {
          if (heartbeatId) clearInterval(heartbeatId);
          unsubPresence();
          deleteDoc(doc(db, "ovii", ROOM, "presence", u.uid)).catch(() => {});
        };
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Connection failed";
        setError(msg);
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

  // Inactivity & Device lock (Priority 4)
  useEffect(() => {
    const bump = () => { lastActivity.current = Date.now(); };
    window.addEventListener("pointerdown", bump);
    window.addEventListener("keydown", bump);
    
    // On mobile, visibilityState changes when keyboard opens — do NOT lock on hidden.
    // Only lock on inactivity timeout.
    // Removed: document.addEventListener("visibilitychange", handleVisibility);

    const t = setInterval(() => {
      if (Date.now() - lastActivity.current > 180_000) onLock();
    }, 5_000);
    return () => {
      window.removeEventListener("pointerdown", bump);
      window.removeEventListener("keydown", bump);
      clearInterval(t);
    };
  }, [onLock]);

  // Robust dynamic height tracking (Priority 1)
  useEffect(() => {
    const vv = window.visualViewport;
    
    const syncLayout = () => {
      // Always match the EXACT visible pixels
      const h = vv ? vv.height : window.innerHeight;
      setVpHeight(h);
      
      // Snap to bottom to maintain anchor
      requestAnimationFrame(() => scrollToBottom(true));
      
      // Reset any unintentional window scrolling
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    vv?.addEventListener("resize", syncLayout);
    vv?.addEventListener("scroll", syncLayout);
    window.addEventListener("resize", syncLayout);
    window.addEventListener("orientationchange", syncLayout);
    window.addEventListener("focus", syncLayout);
    document.addEventListener("visibilitychange", syncLayout);

    syncLayout();

    // Secondary check for slow browser height updates
    const t = setInterval(syncLayout, 2000);

    return () => {
      vv?.removeEventListener("resize", syncLayout);
      vv?.removeEventListener("scroll", syncLayout);
      window.removeEventListener("resize", syncLayout);
      window.removeEventListener("orientationchange", syncLayout);
      window.removeEventListener("focus", syncLayout);
      document.removeEventListener("visibilitychange", syncLayout);
      clearInterval(t);
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [msgs.length]);

  const setPres = (data: any) => {
    if (uid) setDoc(doc(db, "ovii", ROOM, "presence", uid), data, { merge: true }).catch(() => {});
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
        name: replyingTo.name
      };
      setReplyingTo(null);
    }
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const onText = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText("");
    setIsTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setPres({ typing: false });

    // Auto-detect GIF/image URLs and send as image type
    const isImageUrl = /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(v);
    if (isImageUrl) {
      await send("image", v);
    } else {
      await send("text", v.slice(0, 1000));
    }
  };

  const uploadToCloudinary = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dte6c221f");
    const res = await fetch(`https://api.cloudinary.com/v1_1/dte6c221f/auto/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Upload failed");
    }
    const data = await res.json();
    return data.secure_url;
  };

  const onImage = async (file: File) => {
    if (!uid) return;
    if (file.size > 8 * 1024 * 1024) { setError("Image too large (max 8MB)"); return; }
    try {
      const url = await uploadToCloudinary(file);
      await send("image", url);
    } catch (e: any) {
      console.error("Image upload failed:", e);
      setError("Image upload failed: " + (e.message || "Unknown error"));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData.items;
    // Check for image file pastes first (e.g. screenshots, copied images)
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) onImage(file);
        return;
      }
    }
    // Check for pasted GIF/image URLs from keyboard GIF panels
    const pastedText = e.clipboardData.getData("text/plain")?.trim();
    if (pastedText && /^https?:\/\/.+\.(gif|png|jpg|jpeg|webp)(\?.*)?$/i.test(pastedText)) {
      e.preventDefault();
      send("image", pastedText);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const url = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
    if (url && (url.includes(".gif") || url.includes("images") || url.includes("media"))) {
      await send("image", url);
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImage(file);
    }
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
        } catch (e: any) {
          console.error("Voice upload failed:", e);
          setError("Voice upload failed: " + (e.message || "Unknown error"));
        }
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      setPres({ recording: true });
      cancelRecRef.current = false;
      
      setTimeout(() => {
        if (rec.state === "recording") {
          rec.stop();
          setRecording(false);
          setPres({ recording: false });
        }
      }, 10 * 60 * 1000);
    } catch (e: any) {
      console.error("Mic error:", e);
      setError("Microphone permission denied");
    }
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

  const downloadVoice = async (url: string, msgId: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `voice-note-${msgId.slice(0, 8)}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success("Download started");
    } catch {
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  // Only show text/image messages + the most recent voice note in the main chat
  const voiceMsgs = msgs.filter(m => m.type === "voice");
  const latestVoice = voiceMsgs.length > 0 ? voiceMsgs[voiceMsgs.length - 1] : null;
  const chatMsgs = [
    ...msgs.filter(m => m.type !== "voice"),
    ...(latestVoice ? [latestVoice] : []),
  ].sort((a, b) => (a.createdAt?.toMillis?.() ?? 0) - (b.createdAt?.toMillis?.() ?? 0));
  const unreadVoice = voiceMsgs.length;

  return (
    <div 
      className="fixed inset-x-0 top-0 z-50 flex flex-col bg-background"
      style={{
        height: `${vpHeight}px`,
        overflow: 'hidden',
        backgroundImage: "radial-gradient(circle at 50% 0%, oklch(0.2 0.05 250 / 0.4), transparent 50%), radial-gradient(circle at 100% 100%, oklch(0.72 0.18 35 / 0.05), transparent 50%)",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Toaster position="top-center" />
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

      {showFolder && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2"><Folder className="w-5 h-5 text-primary"/> Media Folder</h2>
            <button onClick={() => setShowFolder(false)} className="text-muted-foreground hover:text-foreground"><X className="w-6 h-6"/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {voiceMsgs.length === 0 ? (
               <p className="text-muted-foreground text-center mt-10">No saved voice notes.</p>
            ) : (
               Object.entries(voiceMsgs.reduce((acc, m) => {
                 const date = m.createdAt?.toDate().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) || "Today";
                 if (!acc[date]) acc[date] = [];
                 acc[date].push(m);
                 return acc;
               }, {} as Record<string, Msg[]>)).map(([date, msgs]) => (
                 <div key={date} className="space-y-3">
                   <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{date}</h3>
                   {msgs.map(m => (
                    <div key={m.id} className="bg-card border border-border p-3 rounded-xl flex items-center justify-between gap-3 shadow-sm">
                      <AudioPlayer src={m.content} id={m.id} />
                      <button onClick={() => downloadVoice(m.content, m.id)} className="p-2 bg-muted hover:bg-accent rounded-full text-muted-foreground hover:text-primary transition-colors shrink-0" aria-label="Download voice note">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                   ))}
                 </div>
               ))
            )}
          </div>
        </div>
      )}

      <header className="border-b border-border px-4 py-3 flex items-center justify-between bg-background/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full gradient-gold flex items-center justify-center text-lg overflow-hidden border border-border">
            {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : null}
          </div>
          <div>
            <div className="serif font-bold">OVii</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-dot" />
              {onlineUsers.length > 0 ? onlineUsers.map(u => u.uid === uid ? "You" : u.name).join(", ") : "Connecting..."}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <button onClick={() => setShowFolder(true)} className="hover:text-primary transition-colors p-1 relative" aria-label="Media Folder">
            <Folder className="w-5 h-5" />
            {unreadVoice > 0 && <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{unreadVoice}</span>}
          </button>
          <button onClick={onLock} className="text-xs font-medium hover:text-primary transition-colors uppercase tracking-wider px-2 py-1 rounded-md bg-accent/50 hover:bg-accent">Lock</button>
        </div>
      </header>

      <div 
        ref={scrollRef} 
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-2 flex flex-col"
        style={{ overscrollBehavior: 'contain' }}
        onScroll={(e) => {
          const t = e.currentTarget;
          const isAtBottom = t.scrollHeight - t.scrollTop <= t.clientHeight + 80;
          setShowScrollDown(!isAtBottom);
        }}
      >
        {/* Spacer pushes messages to bottom when few messages exist */}
        <div className="flex-1" />
        
        {error && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3 mb-3">{error}</div>}
        {!error && chatMsgs.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm my-auto">
            <div>
              <div className="text-4xl mb-2">👋</div>
              No messages yet.
            </div>
          </div>
        )}

        <div className="space-y-1 flex flex-col justify-end shrink-0 relative">
          <AnimatePresence>
          {chatMsgs.map((m, i) => {
            const mine = m.uid === uid;
            const prevMsg = chatMsgs[i - 1];
            const isConsecutive = prevMsg && prevMsg.uid === m.uid;
            
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2 ${mine ? "justify-end" : "justify-start"} group ${!isConsecutive ? 'mt-3' : ''}`}
              >
                {!mine && (
                  <div className="flex flex-col items-center mt-auto gap-1 w-7 shrink-0">
                    {!isConsecutive && <img src={m.avatar} className="h-7 w-7 rounded-full bg-muted object-cover border border-border" alt="" />}
                  </div>
                )}
                <div className={`max-w-[85%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {!mine && !isConsecutive && m.name && <span className="text-[10px] font-bold text-muted-foreground ml-1">{m.name}</span>}
                  
                  {m.replyTo && (
                    <div className="bg-accent/50 px-3 py-2 rounded-lg text-xs opacity-80 flex items-center gap-2 mb-1 border-l-2 border-primary">
                      <img src={m.replyTo.avatar} className="w-4 h-4 rounded-full" alt=""/>
                      <div className="flex flex-col">
                        {m.replyTo.name && <span className="text-[9px] font-bold text-primary">{m.replyTo.name}</span>}
                        <span className="truncate max-w-[120px] italic">{m.replyTo.content}</span>
                      </div>
                    </div>
                  )}
                  <div className={`rounded-2xl px-3 py-2 text-sm break-words relative flex items-center gap-2 ${mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                    {m.type === "text" && <span>{m.content}</span>}
                    {m.type === "image" && <img src={m.content} alt="" className="rounded-lg max-w-[240px]" />}
                    {m.type === "voice" && <AudioPlayer src={m.content} id={m.id} />}
                    
                    {/* Hover actions */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${mine ? "-left-10" : "-right-10"} flex items-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <button onClick={() => setReplyingTo(m)} className="p-1.5 rounded-full bg-background/80 hover:bg-background shadow-sm border border-border text-muted-foreground hover:text-primary">
                        <Reply className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-1 ${mine ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[9px] text-muted-foreground/60">
                      {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ""}
                    </span>
                    {mine && <MsgTick status={m.status} />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {typingUsers.length > 0 && (
          <div className="flex justify-start gap-2 items-end text-muted-foreground pt-2">
             <img src={typingUsers[0]} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border" alt="" />
             <div className="text-xs bg-card border border-border px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
               <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
               <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
               <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
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
         {/* System messages: WhatsApp-style centered status notifications */}
         {systemMsgs.map(sm => (
           <div key={sm.id} className="flex justify-center py-1">
             <span className="text-[10px] text-muted-foreground/60 bg-muted/40 rounded-full px-3 py-0.5 text-center">
               {sm.text}
             </span>
           </div>
         ))}
         <div ref={messagesEndRef} className="h-0 w-full shrink-0" />
        </div>
      </div>

      <AnimatePresence>
        {showScrollDown && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => scrollToBottom()}
            className="absolute bottom-[80px] right-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-20 flex items-center gap-1 px-3 text-xs font-bold"
          >
            New message ↓
          </motion.button>
        )}
      </AnimatePresence>

      <div className="px-3">
        <AnimatePresence>
          {replyingTo && (
            <motion.div 
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className="bg-accent/80 backdrop-blur-md rounded-t-xl p-3 border-x border-t border-border flex items-center justify-between"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Reply className="w-4 h-4 text-primary shrink-0" />
                <div className="w-1 bg-primary h-8 rounded-full shrink-0" />
                <div className="truncate text-sm text-muted-foreground italic max-w-[200px]">
                  {replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note")}
                </div>
              </div>
              <button onClick={() => setReplyingTo(null)} className="p-1 hover:bg-background/50 rounded-full text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <XCircle className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`border-t border-border p-3 flex items-center gap-2 bg-background/95 backdrop-blur-sm z-10 shrink-0 ${replyingTo ? 'border-t-0 rounded-b-xl' : ''}`}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.gif"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onImage(f); e.target.value = ""; }}
        />
        
        {recording ? (
          <div className="flex-1 flex items-center justify-between bg-muted rounded-full px-4 h-11">
            <div className="flex items-center gap-2 text-destructive font-bold text-sm animate-pulse">
              <Mic className="w-4 h-4" />
              Recording...
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={cancelRec} className="text-muted-foreground hover:text-destructive p-1.5 transition-colors" aria-label="Cancel recording">
                <Trash2 className="w-5 h-5" />
              </button>
              <button type="button" onClick={stopAndSendRec} className="h-8 px-4 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1" aria-label="Send recording">
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </div>
          </div>
        ) : (
          <>
            <button type="button" onClick={() => fileRef.current?.click()} className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-center transition-colors" aria-label="Attach image">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={startRec}
              className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-center transition-colors"
              aria-label="Tap to record"
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              id="ovii-chat-input"
              name={`ovii_nocomplete_${Date.now()}`}
              type="text"
              role="textbox"
              inputMode="text"
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
              data-protonpass-ignore="true"
              data-form-type="other"
              data-credential="false"
              aria-autocomplete="none"
              x-autocompletetype="off"
              value={text}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  onText(e);
                }
              }}
              onPaste={handlePaste}
              onFocus={(e) => {
                // Aggressively prevent Chrome autofill popup
                e.target.setAttribute('autocomplete', 'new-password');
                e.target.setAttribute('readonly', 'true');
                setTimeout(() => e.target.removeAttribute('readonly'), 50);
              }}
              onChange={(e) => {
                const val = e.target.value;
                setText(val);
                if (uid) {
                  const typingNow = val.length > 0;
                  if (typingNow !== isTyping) {
                    setIsTyping(typingNow);
                    setPres({ typing: typingNow });
                  }
                  if (typingTimer.current) clearTimeout(typingTimer.current);
                  if (typingNow) {
                    typingTimer.current = setTimeout(() => {
                      setIsTyping(false);
                      setPres({ typing: false });
                    }, 2000);
                  }
                }
              }}
              placeholder={uid ? "Message..." : "Connecting…"}
              disabled={!uid || !!error}
              className="flex-1 min-w-0 h-10 rounded-full bg-muted/60 border border-transparent px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
            />
            <button type="button" onClick={() => onText()} disabled={!text.trim()} className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:scale-95 transition-all shadow-sm">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
