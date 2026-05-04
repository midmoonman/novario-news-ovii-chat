import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp,
  deleteDoc, doc, Timestamp, setDoc, getDocs
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "@/lib/firebase";
import { AVATARS } from "@/lib/avatars";
import { Mic, Image as ImageIcon, Send, Trash2, Folder, Reply, Link2, X, Play, Pause, XCircle } from "lucide-react";

type Msg = {
  id: string;
  uid: string;
  avatar: string;
  type: "text" | "image" | "voice";
  content: string;
  createdAt?: Timestamp;
  replyTo?: { id: string, content: string, avatar: string };
};

const ROOM = "ovii-room";

const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => { setPlaying(false); setProgress(0); });
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => { setPlaying(false); setProgress(0); });
    };
  }, []);

  const toggle = () => {
    if (audioRef.current) {
      if (playing) audioRef.current.pause();
      else audioRef.current.play();
      setPlaying(!playing);
    }
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss < 10 ? '0' : ''}${ss}`;
  };

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <audio ref={audioRef} src={src} className="hidden" preload="metadata" />
      <button onClick={toggle} className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 hover:bg-primary-foreground/30 transition-colors">
        {playing ? <Pause className="w-4 h-4 fill-current text-current" /> : <Play className="w-4 h-4 fill-current text-current ml-0.5" />}
      </button>
      <div className="text-[10px] font-medium min-w-[30px] opacity-80">
        {fmt(audioRef.current?.currentTime || 0)}
      </div>
      <div className="flex-1 h-4 flex items-center gap-[2px]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-[2px] bg-current rounded-full transition-all duration-200 ${playing ? "animate-pulse" : ""}`}
            style={{ 
              height: `${20 + Math.abs(Math.sin(i * 0.4)) * 80}%`,
              opacity: (i / 24) * 100 <= progress ? 1 : 0.4,
              animationDuration: `${0.4 + (i % 3) * 0.15}s`
            }}
          />
        ))}
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

export function OViiChat({ onLock }: { onLock: () => void }) {
  const [uid, setUid] = useState<string | null>(null);
  const [deviceId] = useState(() => {
    let id = localStorage.getItem("ovii_device_id");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("ovii_device_id", id);
      localStorage.removeItem("ovii-avatar-choice"); // ensure new users pick avatar
    }
    return id;
  });
  
  const isReturning = !!localStorage.getItem("ovii-avatar-choice");
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem("ovii-avatar-choice") || "");
  const [showAvatarPicker, setShowAvatarPicker] = useState(!isReturning);
  
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
  
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelRecRef = useRef(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef<number>(Date.now());
  const chunksRef = useRef<Blob[]>([]);

  // Auth + presence (max 2 users)
  useEffect(() => {
    if (!avatar) return; // wait for avatar selection
    let unsubMsgs = () => {};
    let unsubPresence = () => {};
    let alive = true;
    (async () => {
      try {
        const u = await ensureAnonAuth();
        if (!alive) return;

        // presence cleanup: remove stale (>90s) presence docs
        const presCol = collection(db, "ovii", ROOM, "presence");
        const snap = await getDocs(presCol);
        const now = Date.now();
        for (const d of snap.docs) {
          const ts = (d.data().lastSeen as Timestamp | undefined)?.toMillis() ?? 0;
          if (now - ts > 90_000 && d.id !== u.uid) {
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
          uid: u.uid, avatar, lastSeen: serverTimestamp(), typing: false, recording: false
        });
        setUid(u.uid);
        setCount(Math.min(2, fresh.docs.length + (fresh.docs.find((d) => d.id === u.uid) ? 0 : 1)));

        // heartbeat
        const hb = setInterval(() => {
          setDoc(doc(db, "ovii", ROOM, "presence", u.uid), {
            uid: u.uid, avatar, lastSeen: serverTimestamp(),
          }, { merge: true }).catch(() => {});
        }, 20_000);

        unsubPresence = onSnapshot(presCol, (s) => {
          const t: string[] = [];
          const r: string[] = [];
          s.forEach((d) => {
            if (d.id !== u.uid) {
              if (d.data().typing) t.push(d.data().avatar);
              if (d.data().recording) r.push(d.data().avatar);
            }
          });
          setTypingUsers(t);
          setRecordingUsers(r);
        });

        // messages stream
        const q = query(collection(db, "ovii", ROOM, "messages"), orderBy("createdAt", "asc"));
        unsubMsgs = onSnapshot(q, (s) => {
          const list: Msg[] = s.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Msg, "id">) }));
          setMsgs(list);
          const tnow = Date.now();
          for (const m of list) {
            const ts = m.createdAt?.toMillis?.() ?? 0;
            if (!ts) continue;
            // 8 days for voice, 5 minutes for everything else
            const limit = m.type === "voice" ? 8 * 24 * 60 * 60 * 1000 : 5 * 60_000;
            if (tnow - ts > limit) {
              deleteDoc(doc(db, "ovii", ROOM, "messages", m.id)).catch(() => {});
            }
          }
        });

        return () => { clearInterval(hb); unsubPresence(); deleteDoc(doc(db, "ovii", ROOM, "presence", u.uid)).catch(() => {}); };
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Connection failed";
        setError(msg);
      }
    })();
    return () => { alive = false; unsubMsgs(); unsubPresence(); };
  }, [avatar]);

  // Inactivity lock (3 min)
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

  // Removed global tick to fix lag

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length]);

  const setPres = (data: any) => {
    if (uid) setDoc(doc(db, "ovii", ROOM, "presence", uid), data, { merge: true }).catch(() => {});
  };

  const send = async (type: Msg["type"], content: string) => {
    if (!uid || !content) return;
    lastActivity.current = Date.now();
    const msgData: any = { uid, avatar, type, content, createdAt: Timestamp.now() };
    if (replyingTo) {
      msgData.replyTo = {
        id: replyingTo.id,
        content: replyingTo.type === "text" ? replyingTo.content : (replyingTo.type === "image" ? "Photo" : "Voice Note"),
        avatar: replyingTo.avatar
      };
      setReplyingTo(null);
    }
    await addDoc(collection(db, "ovii", ROOM, "messages"), msgData);
  };

  const onText = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText("");
    setIsTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setPres({ typing: false });
    await send("text", v.slice(0, 1000));
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
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) onImage(file);
        break;
      }
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

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
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
      className="fixed inset-0 z-40 flex flex-col bg-background transition-all duration-1000"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 0%, oklch(0.2 0.05 250 / 0.4), transparent 50%), radial-gradient(circle at 100% 100%, oklch(0.72 0.18 35 / 0.05), transparent 50%)",
        backgroundAttachment: 'fixed'
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {showAvatarPicker && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-elegant text-center">
            <h2 className="text-xl font-bold mb-2">Select Your Identity</h2>
            <p className="text-xs text-muted-foreground mb-6">You need an avatar to enter the room.</p>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => {
                    setAvatar(av.url);
                    localStorage.setItem("ovii-avatar-choice", av.url);
                    setShowAvatarPicker(false);
                  }}
                  className="rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all hover:scale-110"
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
                    <div key={m.id} className="bg-card border border-border p-3 rounded-xl flex items-center justify-between gap-4 shadow-sm">
                      <AudioPlayer src={m.content} />
                      <button onClick={() => copyLink(m.content)} className="p-2 bg-muted hover:bg-accent rounded-full text-muted-foreground hover:text-primary transition-colors shrink-0">
                        <Link2 className="w-4 h-4" />
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
              {count}/2 online
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

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {error && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3">{error}</div>}
        {!error && chatMsgs.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm">
            <div>
              <div className="text-4xl mb-2">👋</div>
              No messages yet.
            </div>
          </div>
        )}
        <AnimatePresence>
          {chatMsgs.map((m) => {
            const mine = m.uid === uid;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2 ${mine ? "justify-end" : "justify-start"} group`}
              >
                {!mine && <img src={m.avatar} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border mt-auto" alt="" />}
                <div className={`max-w-[85%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {m.replyTo && (
                    <div className="bg-accent/50 px-3 py-2 rounded-lg text-xs opacity-80 flex items-center gap-2 mb-1 border-l-2 border-primary">
                      <img src={m.replyTo.avatar} className="w-4 h-4 rounded-full" alt=""/>
                      <span className="truncate max-w-[120px] italic">{m.replyTo.content}</span>
                    </div>
                  )}
                  <div className={`rounded-2xl px-3 py-2 text-sm break-words relative flex items-center gap-2 ${mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                    {m.type === "text" && <span>{m.content}</span>}
                    {m.type === "image" && <img src={m.content} alt="" className="rounded-lg max-w-[240px]" />}
                    {m.type === "voice" && <AudioPlayer src={m.content} />}
                    
                    {/* Hover actions */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${mine ? "-left-10" : "-right-10"} flex items-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <button onClick={() => setReplyingTo(m)} className="p-1.5 rounded-full bg-background/80 hover:bg-background shadow-sm border border-border text-muted-foreground hover:text-primary">
                        <Reply className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-[9px] text-muted-foreground/70">vanishes in <RemainingTime msg={m} /></div>
                </div>
                {mine && <img src={m.avatar} className="h-7 w-7 rounded-full bg-muted object-cover shrink-0 border border-border mt-auto" alt="" />}
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
      </div>

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

      <form onSubmit={onText} className={`border-t border-border p-3 flex items-center gap-2 bg-background/95 backdrop-blur-sm z-10 ${replyingTo ? 'border-t-0 rounded-b-xl' : ''}`}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
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
              value={text}
              onPaste={handlePaste}
              onChange={(e) => {
                setText(e.target.value);
                if (uid) {
                  const typingNow = e.target.value.length > 0;
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
              placeholder={uid ? "Message... (Paste GIFs from keyboard)" : "Connecting…"}
              disabled={!uid || !!error}
              className="flex-1 min-w-0 h-10 rounded-full bg-muted/60 border border-transparent px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
            />
            <button type="submit" disabled={!text.trim()} className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:scale-95 transition-all shadow-sm">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
